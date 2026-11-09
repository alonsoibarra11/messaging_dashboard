# Testing y calidad

## Niveles

| Nivel | Herramienta | Qué cubre |
| --- | --- | --- |
| Unit | Vitest | Funciones puras: `priority.ts`, `filter-params.ts` (filtro ↔ URL), `matchesFilter`, reducers de eventos del WebSocket |
| Componentes | Vitest + Testing Library + MSW | Cada vista con sus estados: carga, vacío, error y datos; interacciones de filtros y formularios |
| E2E | Playwright (desde FE-13) | Flujos críticos contra los mocks, o contra el backend en un entorno de staging |

- MSW intercepta la red en los tests de componentes con los mismos handlers que el modo mock.
- Las consultas de Testing Library usan roles y textos accesibles (`getByRole`), no `data-testid` salvo que no haya otra opción.

## Verificación antes de mergear

```bash
pnpm lint && pnpm typecheck && pnpm test && pnpm build
```

## CI (GitHub Actions)

En cada push y PR: `pnpm install --frozen-lockfile`, lint, typecheck, tests y build (con `NEXT_PUBLIC_API_MOCKING=enabled` para no depender del backend).

## Convenciones

- Commits: `<tipo>(<ID-ticket>): <descripción>`, por ejemplo `feat(FE-07): lista de prioritarias con filtros`. El detalle está en el [CLAUDE.md](../../../CLAUDE.md) de `messaging_app/`.
- Ramas: `feat/fe-XX-descripcion-corta`, **solo locales**. Se mergean a `main` y solo se hace push de `main`. Si el ticket toca los dos repos, se usa la misma rama en ambos.
- Componentes en PascalCase y archivos en kebab-case (`message-item.tsx`). Los hooks empiezan con `use`.
- Cada ticket actualiza las tablas de estado de [vistas-y-componentes.md](vistas-y-componentes.md) y [integracion-api.md](integracion-api.md).
