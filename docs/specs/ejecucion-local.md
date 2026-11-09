# Ejecución local

> **Estado:** el arranque y los comandos están verificados ([FE-01](../tickets/FE-01-scaffolding-proyecto.md)). El modo mock y la conexión con el backend llegan en FE-02 y FE-03.

## Requisitos

- Node.js 22.12+ y pnpm (`corepack enable`)
- Opcional: el backend `messaging_agent_service` corriendo en `http://localhost:8000` (ver su `docs/specs/ejecucion-local.md`)

## Arranque

```bash
cp .env.example .env.local
pnpm install
pnpm dev                       # http://localhost:3000
```

### Modo sin backend (mocks, desde FE-02)

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
pnpm format         # Prettier (escribe)
pnpm format:check   # Prettier (solo verifica, lo usa la CI)
pnpm typecheck      # next typegen + tsc --noEmit
pnpm test           # Vitest (una pasada)
pnpm test:watch     # Vitest en modo watch
pnpm test:e2e       # Playwright (desde FE-13)
pnpm gen:api        # regenera src/lib/api/schema.d.ts desde el backend (desde FE-02)
```
