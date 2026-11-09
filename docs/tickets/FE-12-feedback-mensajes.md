# FE-12 — Feedback sobre la prioridad de un mensaje

| Fase | Depende de | Backend | Rama | Estado |
| --- | --- | --- | --- | --- |
| 5 | FE-07, FE-06 | BE-19 | `feat/fe-12-feedback` | ⬜ |

## Objetivo
Que el usuario pueda corregir al orquestador ("esto no era urgente") y que esas correcciones mejoren la clasificación.

## Alcance
- `FeedbackMenu` en `MessageItem` y `MessageDetailSheet` con las opciones "No era tan importante", "Era más importante" (con un selector de banda), "Categoría incorrecta" (con un selector) y "Correcto".
- Actualización optimista de la prioridad y la razón del mensaje ("Ajustado por ti").
- `SuggestedRules` en las preferencias de la cuenta: muestra `suggested_rules`, que se pueden aceptar (crea la regla) o descartar.

## Criterios de aceptación
- Tests: el envío de cada tipo de feedback, el cambio visible en el mensaje y aceptar una regla sugerida.

## Specs
[vistas-y-componentes.md](../specs/vistas-y-componentes.md)
