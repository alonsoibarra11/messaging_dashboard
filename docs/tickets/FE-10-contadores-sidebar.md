# FE-10 — Contadores de no leídos en la barra lateral

| Fase | Depende de | Backend | Rama | Estado |
| --- | --- | --- | --- | --- |
| 4 | FE-09 | BE-17 | `feat/fe-10-contadores` | ⬜ |

## Objetivo
Mostrar en la barra lateral cuántos mensajes no leídos hay en Prioritarias y en cada canal.

## Alcance
- `useUnreadCounts()` (`GET /channels/unread-counts`), que se actualiza con `unread_counts.updated` del WebSocket.
- Badges en `AppSidebar`. Más de 99 se muestra como "99+".
- Título de la pestaña con el total: `(12) Prioritarias`.
- Al marcar como leído (individual o masivo), los contadores se decrementan de forma optimista y se corrigen con el evento del servidor.

## Criterios de aceptación
- Tests: render de los contadores, actualización por evento y decremento optimista.

## Specs
[integracion-api.md](../specs/integracion-api.md#tiempo-real-websocket)
