# Tecnologías

| Tema | Elección | Notas |
| --- | --- | --- |
| Runtime | Node.js 22.12+ (LTS) | CI usa Node 22 |
| Gestor de paquetes | pnpm | |
| Framework | Next.js 16 (App Router) + React 19 | Proxy al backend con `rewrites`; `proxy.ts` (antes `middleware.ts`) para proteger rutas. Las guías de la versión instalada están en `node_modules/next/dist/docs/` (ver `AGENTS.md`) |
| Lenguaje | TypeScript en modo estricto | |
| Estilos | Tailwind CSS v4 | Tokens y utilidades propias en `src/app/globals.css` (`@theme`, `@utility`) |
| Componentes | shadcn/ui, estilo `base-nova` (primitivas de **Base UI**, `@base-ui/react`) + lucide-react | Los componentes se copian a `src/components/ui` y no se formatean con Prettier. `cn()` viene del paquete oficial `cn` (repo `shadcn-ui/cn`), reexportado en `src/lib/utils.ts` |
| Scroll y efectos de scroll | CSS nativo: scroll-driven animations, scroll-state queries, scroll snap, `overscroll-behavior`, `scrollbar-gutter` | Sin librerías de JS. Los efectos son mejora progresiva con `@supports` (ver [diseno-ui.md](diseno-ui.md#scroll-con-css)) |
| Datos del servidor | TanStack Query | Caché, paginación infinita, invalidación por eventos del WebSocket |
| Formularios | react-hook-form + zod | Los esquemas zod validan los formularios |
| Tipos de la API | `openapi-typescript` + `openapi-fetch` | Se generan desde `/api/v1/openapi.json` del backend |
| Estado de URL | `nuqs` | Los filtros de la vista Prioritarias viven en la query string, así se pueden compartir y guardar como canal |
| Fechas | `date-fns` (con locale `es`) | |
| Notificaciones en la UI | `sonner` (toasts) | |
| Tema claro/oscuro | `next-themes` | `ThemeProvider` en `src/components/theme-provider.tsx`; el tema por defecto sigue al sistema |
| Mocks | MSW (Mock Service Worker) | Permite desarrollar sin backend y se reutiliza en los tests |
| Tests unitarios y de componentes | Vitest + Testing Library + jsdom | `jsdom` está fijado en `^27`: las versiones 28 y posteriores exigen Node 22.22 o superior. Se puede subir cuando el entorno local y la CI usen esa versión |
| Tests E2E | Playwright | Desde FE-13 |
| Lint / formato | ESLint (config de Next) + Prettier | |
| Errores | Sentry (`@sentry/nextjs`) | FE-13 |
| Despliegue | **Vercel**, región `iad1`, con el backend en Render y la base de datos en Supabase | Ver [despliegue.md](despliegue.md) (FE-13) |

> **Auth:** el plan original mencionaba Auth.js o Clerk. Se descartan porque la sesión la emite y valida el backend (JWT en cookies `httpOnly`), según la arquitectura de "API gateway + auth". Así el frontend no guarda secretos y hay una sola fuente de verdad.
