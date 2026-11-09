# FE-13 — Legal, borrado de cuenta, Sentry, E2E y despliegue en Vercel

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
- Despliegue en **Vercel** según [despliegue.md](../specs/despliegue.md):
  - proyecto con Node 22.x y región `iad1`;
  - variables de Production y Preview (las previews usan mocks);
  - dominio `app.<dominio>`.
- Headers de seguridad en `next.config.ts` (CSP con `connect-src wss://api.<dominio>`, `Referrer-Policy`, `nosniff`, `Permissions-Policy`).
- La CI ejecuta los E2E.
- Revisión de Lighthouse: accesibilidad ≥ 90 en las vistas principales.

## Criterios de aceptación
- El checklist de [despliegue.md](../specs/despliegue.md#checklist-del-primer-despliegue) está completo.
- El dashboard está desplegado en `app.<dominio>` y el flujo completo funciona con el backend de producción en Render: login, conexión de Gmail y mensajes en vivo.
- Los E2E pasan en CI.

## Specs
[despliegue.md](../specs/despliegue.md) · [testing-calidad.md](../specs/testing-calidad.md) · [diseno-ui.md](../specs/diseno-ui.md)
