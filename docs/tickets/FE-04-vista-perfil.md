# FE-04 — Vista Perfil

| Fase | Depende de | Backend | Rama | Estado |
| --- | --- | --- | --- | --- |
| 1 | FE-03 | BE-06 | `feat/fe-04-perfil` | ⬜ |

## Objetivo
Mostrar en una sola página los datos del usuario, los servicios que tiene conectados y un resumen de sus preferencias y canales.

## Alcance
- `/perfil` con:
  - `ProfileForm`: nombre y zona horaria (select con búsqueda), con `PATCH /me`;
  - `ConnectedServicesSummary`: desde `GET /me/summary`, con enlaces a las preferencias de cada cuenta;
  - `PriorityStats`: 4 stat tiles con los mensajes de los últimos 7 días por banda. En móvil se muestran en una fila horizontal con scroll snap y sombras en los bordes (`scroll-shadow-x`);
  - `ChannelsSummary`.
- Estado vacío: sin cuentas → CTA a `/conectar`.
- Handlers de MSW para `/me/summary`.

## Criterios de aceptación
- Tests de componentes con los estados de datos, vacío, carga y error, y la edición del nombre con actualización optimista.

## Specs
[vistas-y-componentes.md](../specs/vistas-y-componentes.md#perfil--perfil-fe-04)
