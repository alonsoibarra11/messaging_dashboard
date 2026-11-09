# Ejecución local

> **Estado:** objetivo. Los comandos exactos se confirman al cerrar [FE-01](../tickets/FE-01-scaffolding-proyecto.md); si cambian, actualiza este archivo.

## Requisitos

- Node.js LTS (22+) y pnpm (`corepack enable`)
- Opcional: el backend `messaging_agent_service` corriendo en `http://localhost:8000` (ver su `docs/specs/ejecucion-local.md`)

## Arranque

```bash
cp .env.example .env.local
pnpm install
pnpm dev                       # http://localhost:3000
```

### Modo sin backend (mocks)

```bash
NEXT_PUBLIC_API_MOCKING=enabled pnpm dev
```

La app usa los handlers de MSW de `src/mocks/`. Puedes iniciar sesión con cualquier email y contraseña.

### Con el backend real

1. Levanta el backend: la API en `:8000`, el orquestador y los agentes.
2. En `.env.local`, configura `BACKEND_URL=http://localhost:8000` y `NEXT_PUBLIC_WS_URL=ws://localhost:8000/api/v1`.
3. Opcional: carga datos de prueba en el backend (`uv run python -m app.scripts.seed`) e inicia sesión con `demo@local.test` / `demo1234`.

## Comandos

```bash
pnpm dev            # servidor de desarrollo
pnpm build          # build de producción
pnpm start          # sirve el build
pnpm lint           # ESLint
pnpm format         # Prettier
pnpm typecheck      # tsc --noEmit
pnpm test           # Vitest
pnpm test:e2e       # Playwright (desde FE-13)
pnpm gen:api        # regenera src/lib/api/schema.d.ts desde el backend
```
