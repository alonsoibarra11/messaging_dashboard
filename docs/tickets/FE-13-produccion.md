# FE-13 — Legal, borrado de cuenta, Sentry, E2E y despliegue

| Fase | Depende de | Backend | Rama | Estado |
| --- | --- | --- | --- | --- |
| 6 | todos | BE-21, BE-22 | `feat/fe-13-produccion` | ⬜ |

## Objetivo
Dejar el dashboard listo para usuarios reales y cumplir los requisitos de verificación de Google.

## Alcance
- Páginas `/privacidad` y `/terminos`, que explican qué datos se leen (solo metadatos y un extracto), para qué, la retención y cómo borrar la cuenta. Google las exige para los scopes restringidos.
- `DangerZone` en Perfil: eliminar la cuenta (`DELETE /me`), con confirmación escribiendo el email.
- Sentry (`@sentry/nextjs`) con scrubbing de datos de mensajes.
- Playwright con flujos E2E contra los mocks:
  - login → prioritarias → filtrar → guardar canal;
  - conectar una cuenta (mock) → preferencias.
- Despliegue en Vercel (u otro): variables de entorno, `BACKEND_URL` de producción y dominio propio. La CI ejecuta los E2E.
- Revisión de Lighthouse: accesibilidad ≥ 90 en las vistas principales.

## Criterios de aceptación
- El dashboard está desplegado y el flujo completo funciona con el backend de producción.
- Los E2E pasan en CI.

## Specs
[testing-calidad.md](../specs/testing-calidad.md) · [diseno-ui.md](../specs/diseno-ui.md)
