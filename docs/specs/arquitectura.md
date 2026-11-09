# Arquitectura

## Rol en el sistema

```
Navegador ──► Next.js (este repo) ──rewrites /api/*──► API gateway (FastAPI)
    ▲                                                      │
    └──────────── WebSocket directo (/ws?ticket=) ─────────┘
```

- El dashboard **no** contiene lógica de clasificación. Muestra lo que el backend ya clasificó y guardó.
- Todas las llamadas REST van a `/api/v1/*` en el mismo origen. Next.js las reenvía a `BACKEND_URL` con `rewrites`, así las cookies `httpOnly` de sesión funcionan sin CORS.
- El WebSocket se conecta directo al backend (`NEXT_PUBLIC_WS_URL`) con un ticket de un solo uso, porque los rewrites no hacen proxy de WebSocket.

## Rutas (App Router)

| Ruta | Vista | Protegida | Ticket |
| --- | --- | --- | --- |
| `/login` | Iniciar sesión (email o Google) | no | FE-03 |
| `/registro` | Crear cuenta | no | FE-03 |
| `/` | Redirige a `/prioritarias` | — | FE-02 |
| `/prioritarias` | **Notificaciones prioritarias** (vista principal) | sí | FE-07 |
| `/canales` | Gestión de canales (lista, crear, plantillas) | sí | FE-09 |
| `/canales/[id]` | Mensajes del canal (misma lista con el filtro del canal) | sí | FE-09 |
| `/conectar` | **Conecta tu servicio** (catálogo y cuentas conectadas) | sí | FE-05 |
| `/conectar/[connectionId]/preferencias` | Preferencias de una cuenta (reglas + texto libre) | sí | FE-06 |
| `/perfil` | **Perfil**: datos, servicios y resumen de preferencias | sí | FE-04 |
| `/privacidad`, `/terminos` | Textos legales | no | FE-13 |

Las rutas protegidas usan `middleware.ts`: si no existe la cookie `has_session`, se redirige a `/login?next=...`. La autorización real la hace el backend; ante un 401 de la API, el cliente intenta `/auth/refresh` una vez y, si falla, redirige a `/login`.

## Estructura de carpetas (propuesta)

```
messaging_dashboard/
├── next.config.ts            # rewrites /api/v1/* → BACKEND_URL
├── middleware.ts             # protección de rutas por cookie de presencia
├── src/
│   ├── app/
│   │   ├── (auth)/login/  (auth)/registro/
│   │   ├── (app)/layout.tsx           # shell: sidebar + header + provider de realtime
│   │   ├── (app)/prioritarias/  canales/  canales/[id]/  conectar/  perfil/
│   │   ├── (legal)/privacidad/  terminos/
│   │   ├── layout.tsx  providers.tsx  # QueryClientProvider, Toaster, NuqsAdapter
│   ├── components/
│   │   ├── ui/                        # shadcn/ui
│   │   └── layout/                    # AppSidebar, AppHeader, UserMenu
│   ├── features/                      # un módulo por dominio
│   │   ├── auth/  profile/  connections/  preferences/  messages/  channels/
│   │   │   └── components/ hooks/ api.ts schemas.ts
│   ├── lib/
│   │   ├── api/client.ts              # openapi-fetch con refresh automático
│   │   ├── api/schema.d.ts            # tipos generados (no se editan a mano)
│   │   ├── realtime/                  # cliente WebSocket + RealtimeProvider
│   │   ├── query-keys.ts
│   │   └── priority.ts                # bandas, colores y etiquetas
│   └── mocks/                         # handlers y fixtures de MSW
└── tests/e2e/                         # Playwright
```

## Capas y reglas

- **`app/`**: solo arma las páginas y lee los parámetros de la ruta. No contiene lógica.
- **`features/*/api.ts`**: funciones que llaman a la API con el cliente tipado.
- **`features/*/hooks`**: hooks de TanStack Query (`useMessages`, `useChannels`...) que envuelven esas funciones con sus query keys.
- **`features/*/components`**: componentes de la UI de cada dominio. Solo usan hooks; nunca llaman a `fetch` directamente.
- Los componentes compartidos entre dominios van en `components/`.
- Los filtros viven en la URL (`nuqs`), y un canal no es más que un filtro con nombre. `MessageFilter` ↔ query string es una función pura (`features/messages/filter-params.ts`).
- Los datos de la página se cargan del lado del cliente con TanStack Query. Los Server Components se usan para el layout y las páginas estáticas; no se hace fetch de datos de usuario en el servidor en el MVP, para que el manejo de cookies y refresh sea simple.

## Estado

| Tipo | Dónde |
| --- | --- |
| Datos del servidor | TanStack Query (con la caché actualizada por los eventos del WebSocket) |
| Filtros | URL (`nuqs`) |
| UI efímera (diálogos, selección) | Estado local de React |
| Sesión | Cookies `httpOnly` y `useMe()` (query a `/me`) |

No se usa un store global (Redux o Zustand) a menos que aparezca una necesidad concreta.
