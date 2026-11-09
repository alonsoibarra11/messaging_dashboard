# messaging_dashboard

Dashboard that integrates your messaging services in one place. It summarizes and filters important messages through an agent orchestrator based on your tastes and recommendations.

Frontend en Next.js de la plataforma: vista de notificaciones prioritarias, canales, conexión de cuentas de correo y perfil.

## Inicio rápido

Requiere Node.js 22.12+ y pnpm.

```bash
cp .env.example .env.local
pnpm install
pnpm dev            # http://localhost:3000
```

## Verificación

```bash
pnpm lint && pnpm format:check && pnpm typecheck && pnpm test && pnpm build
```

## Documentación

Toda la documentación está en [`docs/`](docs/README.md):

- [Specs](docs/specs/README.md): stack, arquitectura, vistas, integración con la API, diseño, ejecución local.
- [Tickets](docs/tickets/README.md): plan de trabajo por fases.
