# FE-07 — Vista Notificaciones prioritarias

| Fase | Depende de | Backend | Rama | Estado |
| --- | --- | --- | --- | --- |
| 3 | FE-02 | BE-14 | `feat/fe-07-prioritarias` | ⬜ |

## Objetivo
Construir la vista principal: una lista unificada de los mensajes importantes de todas las cuentas, con filtros y la razón de cada prioridad.

## Alcance
- `/prioritarias` con `MessageFilters`, `MessageList`, `MessageItem`, `PriorityBadge`, `ProviderIcon`, `OpenInAppButton`, `MessageDetailSheet` y `MarkAllReadButton` ([vistas-y-componentes.md](../specs/vistas-y-componentes.md#notificaciones-prioritarias--prioritarias-fe-07)).
- Los filtros viven en la URL con `nuqs`: `connection_ids`, `min_priority` (por banda), `categories`, `received_after`/`received_before` (presets: hoy, 7 días, 30 días), `unread_only`, `keywords` y `sort`. El default es `min_priority=60`.
- `features/messages/filter-params.ts`: conversión `MessageFilter` ↔ query string (lo reutilizan los canales).
- `features/messages/matches-filter.ts`: función pura `matchesFilter(message, filter)` (la usa FE-08).
- `useInfiniteQuery` con cursor. Marcar como leído al abrir el detalle o al abrir en la app original, con actualización optimista.
- Navegación por teclado (`j`/`k`/`Enter`/`o`), opcional.
- Scroll con CSS ([diseno-ui.md](../specs/diseno-ui.md#scroll-con-css)):
  - `MessageFilters` es sticky, y sus chips se desplazan con scroll snap horizontal en móvil, con sombras en los bordes;
  - entrada suave de los `MessageItem` con `view()`;
  - barra de progreso de lectura en `MessageDetailSheet`;
  - `scroll-mt-*` en los ítems para que el header no tape el que tiene el foco;
  - botón "Volver arriba" con scroll-state queries.
- La carga de páginas del scroll infinito sigue usando IntersectionObserver.
- Mocks de MSW con ~40 mensajes variados (jefe, mamá, banco, newsletters) que respetan los filtros.

## Criterios de aceptación
- Tests:
  - cada filtro cambia la URL y la consulta;
  - los estados de vacío, carga y error;
  - la razón de la prioridad es visible;
  - "abrir en la app" usa `raw_ref` con `target=_blank rel=noopener` y marca el mensaje como leído;
  - pruebas unitarias de `filter-params` y `matchesFilter`.
- Los efectos de scroll se desactivan con `prefers-reduced-motion: reduce`, y la vista funciona sin ellos en navegadores que no los soportan (revisión manual en Firefox o Safari).
- Funciona contra el backend real (seed) cuando BE-14 esté mergeado.

## Specs
[vistas-y-componentes.md](../specs/vistas-y-componentes.md) · [integracion-api.md](../specs/integracion-api.md) · [diseno-ui.md](../specs/diseno-ui.md)
