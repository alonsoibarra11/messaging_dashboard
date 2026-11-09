# FE-05 — Vista "Conecta tu servicio" (Gmail)

| Fase | Depende de | Backend | Rama | Estado |
| --- | --- | --- | --- | --- |
| 2 | FE-03 | BE-07, BE-08 | `feat/fe-05-conectar-servicio` | ⬜ |

## Objetivo
Que el usuario pueda conectar una o varias cuentas de Gmail, ver su estado y gestionarlas.

## Alcance
- `ProviderCatalog` desde `GET /providers`:
  - Gmail habilitado;
  - Outlook, que se muestra como "Próximamente" hasta que `available` sea `true`;
  - WhatsApp y Telegram como tarjetas estáticas deshabilitadas ("Próximamente").
- `ConnectButton`: `POST /connections/gmail/start` → `window.location = authorize_url`.
- `OAuthResultToast`: lee `?connected=` o `?error=` al volver y limpia la URL.
- `ConnectionList` con `ConnectionStatusBadge` (el estado `syncing` muestra un spinner y `reauth_required` el botón "Reconectar") y `ConnectionActions`:
  - renombrar la etiqueta (`PATCH`);
  - ir a preferencias;
  - re-sincronizar;
  - desconectar, con un diálogo de confirmación que explica que se borrarán los mensajes de esa cuenta.
- Al conectar por primera vez, sugerir: "Ponle un nombre a esta cuenta (Personal/Trabajo)" y "Configura qué es prioritario".

## Criterios de aceptación
- Tests con MSW: catálogo, conectar (verifica la redirección), cada estado de la conexión y desconectar con confirmación.
- Prueba manual con una cuenta real de Gmail cuando BE-08 esté mergeado.

## Specs
[vistas-y-componentes.md](../specs/vistas-y-componentes.md#conecta-tu-servicio--conectar-fe-05-fe-11)
