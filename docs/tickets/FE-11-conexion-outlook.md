# FE-11 — Outlook en el catálogo de conexiones

| Fase | Depende de | Backend | Rama | Estado |
| --- | --- | --- | --- | --- |
| 5 | FE-05 | BE-18 | `feat/fe-11-conexion-outlook` | ⬜ |

## Objetivo
Permitir conectar el correo de trabajo de Outlook o Microsoft 365.

## Alcance
- Habilitar la tarjeta de Outlook cuando `GET /providers` devuelva `available: true`. El flujo es el mismo que el de Gmail (`/connections/outlook/start`).
- `ProviderIcon` de Outlook en la lista de mensajes, en los filtros y en el perfil.
- Texto de ayuda: "Funciona con cuentas personales de Outlook y con cuentas de trabajo, si tu organización lo permite".
- Manejo del error típico de las cuentas corporativas, donde el administrador debe aprobar la app (`?error=admin_consent_required`).

## Criterios de aceptación
- Tests con MSW del flujo de conexión de Outlook y del mensaje de error de consentimiento.
- Prueba manual con una cuenta real cuando BE-18 esté mergeado.

## Specs
[vistas-y-componentes.md](../specs/vistas-y-componentes.md#conecta-tu-servicio--conectar-fe-05-fe-11)
