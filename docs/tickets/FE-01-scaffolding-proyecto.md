# FE-01 — Scaffolding: Next.js, Tailwind, shadcn, Vitest y CI

| Fase | Depende de | Backend | Rama | Estado |
| --- | --- | --- | --- | --- |
| 0 | — | — | `feat/fe-01-scaffolding` | ✅ |

## Objetivo
Dejar el repo listo para desarrollar, con las herramientas de calidad funcionando.

## Alcance
- `create-next-app` con TypeScript, App Router, Tailwind, ESLint, `src/` y pnpm.
- Inicializar shadcn/ui con los componentes base: button, input, label, card, badge, dialog, sheet, dropdown-menu, select, checkbox, switch, tabs, skeleton, sonner, tooltip, separator y avatar.
- Prettier (con el plugin de Tailwind) y `typecheck` en `package.json`.
- Vitest + Testing Library + jsdom, con un test de ejemplo.
- Tema claro y oscuro con `next-themes` y tokens de prioridad en el CSS ([diseno-ui.md](../specs/diseno-ui.md)).
- Base de scroll en `globals.css`:
  - `scroll-smooth` en `html` (desactivado con `prefers-reduced-motion`), con `scrollbar-color` y `scrollbar-width` según el tema;
  - las utilidades `reveal-on-scroll`, `scroll-shadow-x`, `scroll-progress` y `header-stuck`, dentro de `@supports` ([diseno-ui.md](../specs/diseno-ui.md#scroll-con-css)).
- `.env.example` ([variables-entorno.md](../specs/variables-entorno.md)) y `.gitignore`.
- GitHub Actions: lint, typecheck, test y build.
- `README.md` con un enlace a `docs/`.

## Criterios de aceptación
- `pnpm lint && pnpm typecheck && pnpm test && pnpm build` pasa en local y en CI.
- [ejecucion-local.md](../specs/ejecucion-local.md) refleja los comandos reales.

## Notas de implementación
- **Versiones:** Next.js 16.4 y React 19.3. En Next.js 16, `middleware.ts` pasó a llamarse `proxy.ts`; los docs ya se actualizaron (FE-03).
- **shadcn/ui:** el estilo por defecto es `base-nova`, que usa Base UI en vez de Radix. `cn()` viene del paquete oficial `cn`.
- **jsdom:** fijado en `^27`, porque la versión 31 exige Node 22.22 o superior y el entorno local usa 22.13.
- **Utilidades de scroll:** quedan definidas en `globals.css`, y se verificó que compilan. Se empiezan a usar en FE-02 y FE-07.
- **Página `/`:** es temporal y muestra las bandas de prioridad. FE-02 la reemplaza por una redirección a `/prioritarias`.

## Specs
[tecnologias.md](../specs/tecnologias.md) · [testing-calidad.md](../specs/testing-calidad.md)
