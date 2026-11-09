# FE-08 — Tiempo real por WebSocket

| Fase | Depende de | Backend | Rama | Estado |
| --- | --- | --- | --- | --- |
| 3 | FE-07 | BE-15 | `feat/fe-08-tiempo-real` | ⬜ |

## Objetivo
Que los mensajes nuevos aparezcan sin recargar la página y que un mensaje urgente avise al usuario en el momento.

## Alcance
- `lib/realtime/`:
  - cliente con ticket (`POST /auth/ws-ticket`);
  - reconexión con backoff;
  - estado `live | reconnecting | offline`.
- `RealtimeProvider` en el layout `(app)`, que despacha los eventos a la caché según la tabla de [integracion-api.md](../specs/integracion-api.md#tiempo-real-websocket).
- Indicador de estado en `AppHeader`.
- `NewMessagesToast` para la banda urgente, con el botón "Ver".
- Opcional: Notification API del navegador (con permiso explícito) para los urgentes cuando la pestaña no está activa.
- Mock: un emisor de eventos falsos en modo MSW (por ejemplo, un mensaje cada 30 s) para probar sin backend.

## Criterios de aceptación
- Tests unitarios del reducer de eventos: insertar solo en las listas cuyo filtro coincide, actualizar `is_read` y aplicar los contadores.
- Test del cliente con un WebSocket falso: reconexión e invalidación de la caché al reconectar.

## Specs
[integracion-api.md](../specs/integracion-api.md#tiempo-real-websocket)
