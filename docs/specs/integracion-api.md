# Integración con la API

La referencia de los endpoints está en el backend: `messaging_agent_service/docs/specs/api.md`. Este archivo describe **cómo** los consume el frontend.

## Proxy

`next.config.ts`:

```ts
async rewrites() {
  return [{ source: "/api/v1/:path*", destination: `${process.env.BACKEND_URL}/api/v1/:path*` }];
}
```

El navegador siempre llama a `/api/v1/...` en el mismo origen. Las cookies de sesión son `httpOnly` y el JavaScript nunca las lee.

## Cliente tipado

- Los tipos se generan con `pnpm gen:api`, que ejecuta `openapi-typescript $BACKEND_URL/api/v1/openapi.json -o src/lib/api/schema.d.ts`. El archivo generado se commitea para que el build no dependa del backend.
- `src/lib/api/client.ts` crea un cliente de `openapi-fetch` con `baseUrl: "/api/v1"`, `credentials: "include"` y el header `X-Requested-With: messaging-dashboard`.
- Un middleware del cliente maneja el **401**: llama una sola vez a `POST /auth/refresh`, compartiendo una sola promesa entre requests concurrentes, y reintenta. Si el refresh falla, limpia la caché y redirige a `/login?next=<ruta actual>`.
- Los errores con forma `{error: {code, message}}` se convierten en `ApiError` y se muestran en un toast, o en línea en los formularios.

## TanStack Query

Query keys centralizadas en `src/lib/query-keys.ts`:

```ts
qk.me()                         // GET /me
qk.summary()                    // GET /me/summary
qk.providers()                  // GET /providers
qk.connections()                // GET /connections
qk.preferences(connectionId)    // GET /connections/{id}/preferences
qk.messages(filter)             // GET /messages (infinite)
qk.channels()                   // GET /channels
qk.channelMessages(id, filter)  // GET /channels/{id}/messages (infinite)
qk.unreadCounts()               // GET /channels/unread-counts
```

- `staleTime` de 30 s por defecto. Con el WebSocket activo, los mensajes se actualizan por eventos y no por polling.
- Mutaciones optimistas en: marcar como leído, editar regla y reordenar canales.

## Tiempo real (WebSocket)

1. `RealtimeProvider` (dentro del layout `(app)`) pide `POST /auth/ws-ticket` y abre (en producción, `NEXT_PUBLIC_WS_URL=wss://api.<dominio>/api/v1`) `new WebSocket(`${NEXT_PUBLIC_WS_URL}/ws?ticket=...`)`.
2. Se reconecta con backoff exponencial (1 s → 30 s), pidiendo un ticket nuevo cada vez. Al reconectar, invalida `qk.messages` y `qk.unreadCounts` para recuperar lo que se haya perdido.
3. Despacho de eventos:

| Evento | Efecto |
| --- | --- |
| `message.created` | Inserta el mensaje al inicio de las listas cargadas **si coincide con el filtro de cada una** (`matchesFilter(message, filter)`, una función pura compartida con los tests). Si la banda es `urgente`, muestra un toast. |
| `message.updated` | Actualiza `is_read` en todas las listas cargadas |
| `connection.updated` | Invalida `qk.connections()` y `qk.summary()`; si el estado es `reauth_required`, muestra un toast con "Reconectar" |
| `unread_counts.updated` | `setQueryData(qk.unreadCounts(), data)` |

4. El `AppHeader` muestra el estado de la conexión: en vivo, reconectando o desconectado.

## Mocks (MSW)

- `src/mocks/handlers/*.ts` tiene un handler por dominio, con fixtures realistas en español (jefe, mamá, banco, newsletters).
- Con `NEXT_PUBLIC_API_MOCKING=enabled`, el service worker de MSW se activa en el navegador y la app funciona sin backend. Sirve para avanzar en el frontend mientras el endpoint real no existe.
- Los mismos handlers se usan en los tests de Vitest (`msw/node`).
- **Regla:** cuando el endpoint real queda implementado en el backend, el ticket de integración del frontend reemplaza el mock por el endpoint real en el modo normal. El handler se queda solo para los tests y el modo mock. La tabla de [vistas-y-componentes.md](vistas-y-componentes.md) se actualiza en ese momento.

## Estado de integración por endpoint

| Dominio | Endpoints | Mock | Real | Ticket |
| --- | --- | --- | --- | --- |
| Auth | `/auth/*` | ⬜ | ⬜ | FE-03 |
| Perfil | `/me`, `/me/summary` | ⬜ | ⬜ | FE-04 |
| Conexiones | `/providers`, `/connections*` | ⬜ | ⬜ | FE-05 / FE-11 |
| Preferencias | `/connections/{id}/preferences`, `/rules` | ⬜ | ⬜ | FE-06 |
| Mensajes | `/messages*` | ⬜ | ⬜ | FE-07 |
| Tiempo real | `/auth/ws-ticket`, `/ws` | ⬜ | ⬜ | FE-08 |
| Canales | `/channels*` | ⬜ | ⬜ | FE-09 / FE-10 |
| Feedback | `/messages/{id}/feedback` | ⬜ | ⬜ | FE-12 |
