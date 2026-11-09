# FE-09 — Canales: CRUD, plantillas y guardar filtro como canal

| Fase | Depende de | Backend | Rama | Estado |
| --- | --- | --- | --- | --- |
| 4 | FE-07 | BE-16 | `feat/fe-09-canales` | ⬜ |

## Objetivo
Permitir que el usuario guarde moldes de filtro como canales, para no tener que filtrar cada vez la vista principal.

## Alcance
- `/canales`:
  - `ChannelList`;
  - `ChannelTemplates` (desde `GET /channels/templates`; un clic crea el canal). En móvil se muestran como un carrusel horizontal con scroll snap, solo con CSS;
  - crear o editar con `ChannelForm`, cuyo editor de filtro reutiliza los controles de `MessageFilters`.
- `/canales/[id]`: `ChannelView` reutiliza `MessageList` con `GET /channels/{id}/messages`. Se pueden agregar filtros temporales, con la opción "Actualizar canal con estos filtros".
- `SaveAsChannelDialog` en Prioritarias: toma el filtro actual de la URL y crea el canal.
- Los canales se listan en `AppSidebar` (sin contadores todavía).
- Eliminar con confirmación. Reordenar es opcional (`@dnd-kit`).
- Handlers de MSW.

## Criterios de aceptación
- Tests:
  - crear desde una plantilla;
  - guardar el filtro actual como canal (el filtro enviado coincide con el de la URL);
  - editar y eliminar;
  - la vista del canal muestra solo los mensajes que coinciden.

## Specs
[vistas-y-componentes.md](../specs/vistas-y-componentes.md#canales--canales-canalesid-fe-09-fe-10)
