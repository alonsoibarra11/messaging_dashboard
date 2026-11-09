# Tickets — messaging_dashboard

Hay un archivo por ticket (`FE-XX-descripcion.md`). La rama de cada ticket se llama `feat/fe-XX-descripcion`. Si el ticket es la contraparte de un `BE-XX`, se mergea primero el backend.

**Estrategia:** cada vista se construye primero **contra mocks (MSW)** y después se conecta al endpoint real cuando el ticket del backend está terminado. Así el frontend no queda bloqueado.

**Estados:** ⬜ pendiente · 🟨 en progreso · ✅ hecho.

## Fase 0 — Base

| ID | Título | Depende de | Backend | Estado |
| --- | --- | --- | --- | --- |
| [FE-01](FE-01-scaffolding-proyecto.md) | Scaffolding: Next.js, Tailwind, shadcn, Vitest, CI | — | — | ⬜ |
| [FE-02](FE-02-shell-cliente-api-mocks.md) | Shell de la app, cliente API tipado y MSW | FE-01 | BE-01 | ⬜ |

## Fase 1 — Auth y perfil

| ID | Título | Depende de | Backend | Estado |
| --- | --- | --- | --- | --- |
| [FE-03](FE-03-auth.md) | Login, registro, Google y protección de rutas | FE-02 | BE-04, BE-05 | ⬜ |
| [FE-04](FE-04-vista-perfil.md) | Vista Perfil | FE-03 | BE-06 | ⬜ |

## Fase 2 — Conexiones

| ID | Título | Depende de | Backend | Estado |
| --- | --- | --- | --- | --- |
| [FE-05](FE-05-vista-conectar-servicio.md) | Vista "Conecta tu servicio" (Gmail) | FE-03 | BE-07, BE-08 | ⬜ |

## Fase 3 — Prioridad

| ID | Título | Depende de | Backend | Estado |
| --- | --- | --- | --- | --- |
| [FE-06](FE-06-preferencias-por-cuenta.md) | Preferencias por cuenta (reglas + texto libre) | FE-05 | BE-10 | ⬜ |
| [FE-07](FE-07-vista-prioritarias.md) | Vista Notificaciones prioritarias | FE-02 | BE-14 | ⬜ |
| [FE-08](FE-08-tiempo-real.md) | Tiempo real por WebSocket | FE-07 | BE-15 | ⬜ |

## Fase 4 — Canales

| ID | Título | Depende de | Backend | Estado |
| --- | --- | --- | --- | --- |
| [FE-09](FE-09-canales.md) | Canales: CRUD, plantillas, guardar filtro como canal | FE-07 | BE-16 | ⬜ |
| [FE-10](FE-10-contadores-sidebar.md) | Contadores de no leídos en la barra lateral | FE-09 | BE-17 | ⬜ |

## Fase 5 — Más correo y feedback

| ID | Título | Depende de | Backend | Estado |
| --- | --- | --- | --- | --- |
| [FE-11](FE-11-conexion-outlook.md) | Outlook en el catálogo de conexiones | FE-05 | BE-18 | ⬜ |
| [FE-12](FE-12-feedback-mensajes.md) | Feedback sobre la prioridad de un mensaje | FE-07, FE-06 | BE-19 | ⬜ |

## Fase 6 — Producción

| ID | Título | Depende de | Backend | Estado |
| --- | --- | --- | --- | --- |
| [FE-13](FE-13-produccion.md) | Legal, borrado de cuenta, Sentry, E2E y despliegue | todos | BE-21, BE-22 | ⬜ |

**Orden sugerido:** FE-01 → FE-02 → FE-03 → FE-07 (con mocks) → FE-04 → FE-05 → FE-06 → FE-08 → FE-09 → FE-10 → FE-11 → FE-12 → FE-13.
