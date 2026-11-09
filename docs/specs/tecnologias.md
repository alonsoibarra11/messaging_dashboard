# Tecnologías

| Tema | Elección | Notas |
| --- | --- | --- |
| Runtime | Node.js LTS (22+) | |
| Gestor de paquetes | pnpm | |
| Framework | Next.js (App Router) + React | Proxy al backend con `rewrites`; middleware para proteger rutas |
| Lenguaje | TypeScript en modo estricto | |
| Estilos | Tailwind CSS | |
| Componentes | shadcn/ui (Radix) + lucide-react | Los componentes se copian a `src/components/ui` |
| Scroll y efectos de scroll | CSS nativo: scroll-driven animations, scroll-state queries, scroll snap, `overscroll-behavior`, `scrollbar-gutter` | Sin librerías de JS. Los efectos son mejora progresiva con `@supports` (ver [diseno-ui.md](diseno-ui.md#scroll-con-css)) |
| Datos del servidor | TanStack Query | Caché, paginación infinita, invalidación por eventos del WebSocket |
| Formularios | react-hook-form + zod | Los esquemas zod validan los formularios |
| Tipos de la API | `openapi-typescript` + `openapi-fetch` | Se generan desde `/api/v1/openapi.json` del backend |
| Estado de URL | `nuqs` | Los filtros de la vista Prioritarias viven en la query string, así se pueden compartir y guardar como canal |
| Fechas | `date-fns` (con locale `es`) | |
| Notificaciones en la UI | `sonner` (toasts) | |
| Mocks | MSW (Mock Service Worker) | Permite desarrollar sin backend y se reutiliza en los tests |
| Tests unitarios y de componentes | Vitest + Testing Library | |
| Tests E2E | Playwright | Desde FE-13 |
| Lint / formato | ESLint (config de Next) + Prettier | |
| Errores | Sentry (`@sentry/nextjs`) | FE-13 |
| Despliegue | Vercel (o el mismo proveedor que el backend) | FE-13 |

> **Auth:** el plan original mencionaba Auth.js o Clerk. Se descartan porque la sesión la emite y valida el backend (JWT en cookies `httpOnly`), según la arquitectura de "API gateway + auth". Así el frontend no guarda secretos y hay una sola fuente de verdad.
