# Documentación — messaging_dashboard

Frontend web de la plataforma. Muestra en un solo lugar los mensajes priorizados por el orquestador y permite conectar cuentas de correo, configurar preferencias y crear canales.

> **Alcance actual: solo correo** (Gmail y Outlook). La UI está pensada para sumar otros servicios (WhatsApp, Telegram) más adelante sin rediseñarla.

## Estructura

- [`specs/`](specs/README.md) — especificaciones: stack, arquitectura, vistas y componentes, integración con la API, diseño, ejecución local.
- [`tickets/`](tickets/README.md) — una tarea por archivo, ordenadas por fase.

## Repos relacionados

- Backend: [`messaging_agent_service`](https://github.com/alonsoibarra11/messaging_agent_service). La referencia de la API está en `messaging_agent_service/docs/specs/api.md`.
