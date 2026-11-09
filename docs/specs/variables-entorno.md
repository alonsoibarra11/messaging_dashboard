# Variables de entorno

Van en `.env.local` (no se commitea). `.env.example` incluye todas las variables, sin secretos.

| Variable | Ejemplo | Lado | Descripción |
| --- | --- | --- | --- |
| `BACKEND_URL` | `http://localhost:8000` | servidor | Destino de los rewrites `/api/v1/*` |
| `NEXT_PUBLIC_WS_URL` | `ws://localhost:8000/api/v1` | cliente | Base del WebSocket (`/ws?ticket=`) |
| `NEXT_PUBLIC_API_MOCKING` | `enabled` \| vacío | cliente | Activa MSW en el navegador |
| `NEXT_PUBLIC_SENTRY_DSN` | | cliente | FE-13 |

Las variables `NEXT_PUBLIC_*` quedan expuestas en el bundle, así que nunca deben contener secretos.

`BACKEND_URL` (que usan los rewrites) y las `NEXT_PUBLIC_*` se leen **al hacer el build**: si cambian en Vercel, hay que volver a desplegar. Los valores de producción y de preview están en [despliegue.md](despliegue.md#variables-de-entorno).
