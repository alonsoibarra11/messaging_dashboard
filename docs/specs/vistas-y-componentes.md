# Vistas y componentes

**Leyenda de estado:** ⬜ planificado · 🟨 en progreso · ✅ hecho. Actualiza la columna *Estado* al cerrar cada ticket.

## Shell de la aplicación (FE-02, FE-10)

```
┌──────────────┬───────────────────────────────────────────────┐
│ ● Logo       │  Header: título · búsqueda · 🔴 live · avatar │
│              ├───────────────────────────────────────────────┤
│ Prioritarias │                                               │
│        (12)  │                                               │
│ ─ Canales ─  │               contenido de la vista           │
│ Trabajo   3  │                                               │
│ Familia   1  │                                               │
│ Finanzas     │                                               │
│ + Canal      │                                               │
│ ──────────── │                                               │
│ Conectar     │                                               │
│ Perfil       │                                               │
└──────────────┴───────────────────────────────────────────────┘
```

| Componente | Descripción | Ticket | Estado |
| --- | --- | --- | --- |
| `AppSidebar` | Navegación, lista de canales con contadores de no leídos y botón "+ Canal" | FE-02 / FE-10 | ⬜ |
| `AppHeader` | Título de la vista, indicador de conexión en vivo y `UserMenu` | FE-02 / FE-08 | ⬜ |
| `UserMenu` | Avatar, enlace a Perfil y cerrar sesión | FE-03 | ⬜ |
| `RealtimeProvider` | Abre el WebSocket y despacha eventos a la caché | FE-08 | ⬜ |

## Auth — `/login`, `/registro` (FE-03)

| Componente | Descripción | Estado |
| --- | --- | --- |
| `LoginForm` | Email y contraseña; errores en línea; redirige a `next` | ⬜ |
| `RegisterForm` | Nombre, email y contraseña (mínimo 8 caracteres) | ⬜ |
| `GoogleButton` | Navega a `/api/v1/auth/google/start` | ⬜ |

## Notificaciones prioritarias — `/prioritarias` (FE-07)

Lista unificada de mensajes de todas las cuentas, ordenados por fecha o por prioridad. Por defecto se muestran los de prioridad ≥ 60.

```
[Servicio ▾] [Prioridad: Alta+ ▾] [Categoría ▾] [Fecha ▾] [☐ Solo no leídos]   [Guardar como canal]
───────────────────────────────────────────────────────────────────────────────────────────────
🔴 URGENTE  Trabajo · Outlook   Jefe <jefe@empresa.com>                    hace 5 min   ↗
            Reunión urgente mañana 9:00
            "Necesito el informe antes de..."   · Remitente VIP: Jefe
🟠 ALTA     Personal · Gmail    Banco Estado                                 10:32       ↗
            Cargo no reconocido en tu tarjeta   · Relacionado con cuentas de dinero
```

| Componente | Descripción | Estado |
| --- | --- | --- |
| `MessageFilters` | Barra de filtros sincronizada con la URL: servicio o cuenta, prioridad mínima (por banda), categorías, rango de fechas, solo no leídos y búsqueda por palabra | ⬜ |
| `MessageList` | Lista con scroll infinito (`useInfiniteQuery`) y estados de carga, vacío y error | ⬜ |
| `MessageItem` | Banda, cuenta, remitente, asunto, extracto, hora relativa, **razón de la prioridad** y estado leído/no leído | ⬜ |
| `PriorityBadge` | Chip de color por banda (urgente, alta, media, baja) | ⬜ |
| `ProviderIcon` | Ícono de Gmail u Outlook | ⬜ |
| `OpenInAppButton` | Abre `raw_ref` en una pestaña nueva y marca el mensaje como leído | ⬜ |
| `MessageDetailSheet` | Panel lateral con el detalle, la razón completa y las acciones | ⬜ |
| `MarkAllReadButton` | Marca como leído todo lo que coincide con el filtro actual | ⬜ |
| `SaveAsChannelDialog` | Guarda el filtro actual como canal (FE-09) | ⬜ |
| `FeedbackMenu` | "No era urgente", "Era más importante" o "Categoría incorrecta" (FE-12) | ⬜ |
| `NewMessagesToast` | Aviso cuando llega un mensaje urgente en vivo (FE-08) | ⬜ |

## Canales — `/canales`, `/canales/[id]` (FE-09, FE-10)

| Componente | Descripción | Estado |
| --- | --- | --- |
| `ChannelList` | Tarjetas de canales con su contador, editar y eliminar | ⬜ |
| `ChannelTemplates` | Plantillas "Trabajo urgente", "Familia" y "Finanzas"; un clic crea el canal | ⬜ |
| `ChannelForm` | Nombre, ícono y el editor de filtro (reutiliza los controles de `MessageFilters`) | ⬜ |
| `ChannelView` | `/canales/[id]`: `MessageList` con el filtro del canal; se puede afinar con filtros temporales | ⬜ |
| Reordenar | Arrastrar en la barra lateral (`@dnd-kit`), opcional | ⬜ |

## Conecta tu servicio — `/conectar` (FE-05, FE-11)

| Componente | Descripción | Estado |
| --- | --- | --- |
| `ProviderCatalog` | Tarjetas de Gmail y Outlook (y "Próximamente": WhatsApp, Telegram, deshabilitadas) | ⬜ |
| `ConnectButton` | `POST /connections/{provider}/start` y luego redirección a `authorize_url` | ⬜ |
| `ConnectionList` | Cuentas conectadas con su etiqueta, email, estado y última sincronización | ⬜ |
| `ConnectionStatusBadge` | `connected` · `syncing` · `error` · `reauth_required` (con el botón "Reconectar") | ⬜ |
| `ConnectionActions` | Renombrar etiqueta, ir a preferencias, re-sincronizar y desconectar (con confirmación) | ⬜ |
| `OAuthResultToast` | Lee `?connected=` o `?error=` al volver del proveedor | ⬜ |

## Preferencias de una cuenta — `/conectar/[connectionId]/preferencias` (FE-06)

| Componente | Descripción | Estado |
| --- | --- | --- |
| `RuleList` | Tabla de reglas: tipo, valor, alias, acción, prioridad, categoría y habilitada | ⬜ |
| `RuleForm` | Crear o editar una regla con presets: "Remitente VIP", "Palabra clave", "Dominio" y "Silenciar" | ⬜ |
| `FreeTextPreferences` | Texto libre (máximo 1000 caracteres) con ejemplos y el switch "Usar IA" (`llm_enabled`) | ⬜ |
| `SuggestedRules` | Sugerencias que vienen del feedback (FE-12) | ⬜ |

## Perfil — `/perfil` (FE-04)

| Componente | Descripción | Estado |
| --- | --- | --- |
| `ProfileForm` | Nombre y zona horaria | ⬜ |
| `ConnectedServicesSummary` | Cuentas, su estado, número de reglas y extracto del texto libre, con un enlace a preferencias | ⬜ |
| `PriorityStats` | Mensajes de los últimos 7 días por banda (4 stat tiles) | ⬜ |
| `ChannelsSummary` | Número de canales y enlace a `/canales` | ⬜ |
| `DangerZone` | Eliminar la cuenta (FE-13) | ⬜ |
