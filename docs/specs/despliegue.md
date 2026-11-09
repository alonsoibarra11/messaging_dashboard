# Despliegue a producción

**Estado:** planificado ([FE-13](../tickets/FE-13-produccion.md)). El frontend se publica en **Vercel**. El backend corre en Render y la base de datos en Supabase; esa parte está en `messaging_agent_service/docs/specs/despliegue.md`.

## Topología

```
Navegador ──► https://app.<dominio> (Vercel: Next.js)
                 │  rewrites /api/v1/*  ──────────────►  https://api.<dominio>/api/v1/*  (Render: api)
                 │
                 └─ el JS del navegador abre el WebSocket directo a ► wss://api.<dominio>/api/v1/ws?ticket=…
```

- **Mismo origen para la API:** el navegador solo llama a `https://app.<dominio>/api/v1/...` y Vercel reenvía esas requests a Render (*external rewrite*). Así las cookies `httpOnly` de sesión quedan en el dominio del frontend y no hace falta CORS con credenciales ([integracion-api.md](integracion-api.md#proxy)).
- **WebSocket directo:** los rewrites de Vercel no hacen proxy de WebSockets, así que el socket va directo a `api.<dominio>`. Se autentica con el ticket de un solo uso y el backend valida el `Origin`.
- **OAuth:** los callbacks de Google y Microsoft se registran con el dominio del frontend (`https://app.<dominio>/api/v1/.../callback`). Vercel los reenvía al backend, y el `Set-Cookie` y la redirección final llegan al navegador en el origen correcto.

## Proyecto en Vercel

| Ajuste | Valor |
| --- | --- |
| Repositorio | `messaging_dashboard` (integración con GitHub) |
| Framework preset | Next.js (detectado) |
| Gestor de paquetes | pnpm, según el `packageManager` de `package.json`; instala con `pnpm install --frozen-lockfile` |
| Node.js | 22.x |
| Production branch | `main` (cada push a `main` despliega a producción) |
| Región de funciones | `iad1` (Washington, D.C.), cerca de Render Virginia, para que `proxy.ts` y el SSR queden en la misma zona |
| Dominio | `app.<dominio>`, con TLS automático |

> Las ramas son solo locales (ver `messaging_app/CLAUDE.md`), así que en la práctica no habrá *preview deployments* de ramas. Si en algún momento se suben, deben usar mocks (ver abajo).

## Variables de entorno

Se configuran en *Project Settings → Environment Variables*, separadas por entorno.

| Variable | Production | Preview | Notas |
| --- | --- | --- | --- |
| `BACKEND_URL` | `https://api.<dominio>` | (vacía) | La leen los `rewrites` de `next.config.ts` **al hacer el build**: si cambia, hay que volver a desplegar |
| `NEXT_PUBLIC_WS_URL` | `wss://api.<dominio>/api/v1` | (vacía) | Queda dentro del bundle al hacer el build |
| `NEXT_PUBLIC_API_MOCKING` | (vacía) | `enabled` | Las previews no tocan el backend real: no se pueden registrar redirect URIs de OAuth para cada URL de preview |
| `NEXT_PUBLIC_SENTRY_DSN` | DSN de Sentry | opcional | FE-13 |

Las variables `NEXT_PUBLIC_*` son públicas, así que nunca deben llevar secretos. El frontend no necesita ningún secreto: la sesión la maneja el backend.

## Headers de seguridad

Se definen en `headers()` de `next.config.ts` (FE-13):

- `Content-Security-Policy`:
  - `default-src 'self'`;
  - `connect-src 'self' wss://api.<dominio>` (más Sentry si se usa);
  - `img-src 'self' data:`;
  - `frame-ancestors 'none'`.
- `Referrer-Policy: strict-origin-when-cross-origin`
- `X-Content-Type-Options: nosniff`
- `Permissions-Policy` restrictivo: sin cámara, micrófono ni geolocalización. Las notificaciones del navegador se piden aparte.

Vercel agrega HSTS automáticamente en los dominios con TLS.

## Caché

- El dashboard no hace fetch de datos de usuario en el servidor ([arquitectura.md](arquitectura.md#capas-y-reglas)), así que las páginas pueden ser estáticas o generarse en el edge sin riesgo de mezclar datos entre usuarios.
- Las respuestas de `/api/v1/*` vienen del backend con `Cache-Control: no-store`, por lo que Vercel no las cachea.

## Orden de despliegue

1. Cuando un cambio toca los dos repos, primero se hace push del backend a `main`; Render despliega y corre las migraciones.
2. Después se hace push del frontend a `main`, y Vercel despliega.
3. El frontend siempre debe ser compatible con la versión del backend que está en producción. Si un cambio de API rompe la compatibilidad, primero se despliega un backend que acepte las dos versiones.

## Checklist del primer despliegue

1. Importar el repo en Vercel, elegir Node 22.x y la región `iad1`.
2. Cargar las variables de Production y Preview.
3. Configurar el dominio `app.<dominio>` (DNS en el proveedor del dominio).
4. Verificar que el backend ya responde en `https://api.<dominio>/api/v1/health/ready`.
5. Desplegar y probar el login, la conexión de Gmail (que el callback vuelva a `/conectar?connected=…`) y que el indicador "en vivo" se conecte por WebSocket.
