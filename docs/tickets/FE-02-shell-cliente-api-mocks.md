# FE-02 — Shell de la app, cliente API tipado y MSW

| Fase | Depende de | Backend | Rama | Estado |
| --- | --- | --- | --- | --- |
| 0 | FE-01 | BE-01 (OpenAPI) | `feat/fe-02-shell-api` | ⬜ |

## Objetivo
Montar la estructura común que usan todas las vistas: layout, navegación, cliente HTTP, TanStack Query y mocks.

## Alcance
- Rutas y layouts según [arquitectura.md](../specs/arquitectura.md#rutas-app-router), con páginas placeholder. `/` redirige a `/prioritarias`.
- `AppSidebar` (navegación, sin contadores todavía), `AppHeader` y un layout responsive (la barra lateral se vuelve un `Sheet` en móvil).
- Scroll del shell ([diseno-ui.md](../specs/diseno-ui.md#scroll-con-css)):
  - la barra lateral y el contenido tienen scroll independiente (`overscroll-contain` y `scrollbar-gutter: stable`);
  - `AppHeader` es sticky y muestra una sombra cuando está "pegado" (`header-stuck`).
- `providers.tsx`: `QueryClientProvider` (con devtools en desarrollo), `Toaster`, `ThemeProvider` y `NuqsAdapter`.
- `lib/api/client.ts` (`openapi-fetch`), con `ApiError` y el header `X-Requested-With`. El refresh ante un 401 se agrega en FE-03.
- Script `pnpm gen:api` y un `schema.d.ts` inicial. Si el backend aún no tiene esquemas, se usan tipos escritos a mano en `lib/api/types.ts`, que se reemplazan al generar.
- `rewrites` en `next.config.ts` hacia `BACKEND_URL`.
- MSW: setup para el navegador (`NEXT_PUBLIC_API_MOCKING`) y para Node (tests); handler de `/health` y una base de fixtures (`src/mocks/fixtures/`).
- `lib/priority.ts` y `lib/categories.ts` con las bandas, colores, etiquetas e íconos.

## Criterios de aceptación
- Se navega entre todas las vistas placeholder, en escritorio y en móvil.
- Tests de `priority.ts` y un test de render del layout.

## Specs
[arquitectura.md](../specs/arquitectura.md) · [integracion-api.md](../specs/integracion-api.md)
