# Diseño de UI

## Principios

- **Lo importante primero:** la prioridad y su razón son lo más visible de cada mensaje. El usuario debe entender *por qué* algo es urgente sin abrirlo.
- **Una sola lista mental:** todas las cuentas se ven en la misma lista. La cuenta se identifica con su etiqueta ("Trabajo", "Personal") y con el ícono del proveedor.
- **Los filtros se pueden guardar:** cualquier combinación de filtros se puede convertir en canal con un clic.
- Idioma de la UI: **español**. Las fechas usan el formato relativo de `date-fns` con el locale `es` y la zona horaria del perfil.

## Bandas de prioridad

Se definen en `src/lib/priority.ts` y coinciden con las del backend.

| Banda | Rango | Color (token) | Uso |
| --- | --- | --- | --- |
| Urgente | 80–100 | `--priority-urgent` (rojo) | Badge relleno y toast en vivo |
| Alta | 60–79 | `--priority-high` (naranja) | Badge relleno |
| Media | 30–59 | `--priority-medium` (amarillo o ámbar) | Badge con contorno |
| Baja | 0–29 | `--priority-low` (gris) | Badge tenue |

El color nunca es la única señal: el badge siempre lleva texto ("Urgente") y un `aria-label` con el valor numérico.

## Categorías

`trabajo`, `familia`, `finanzas`, `personal`, `compras`, `notificaciones`, `promociones`, `spam` y `otros`. Cada una tiene un ícono de lucide y una etiqueta en español, definidos en `src/lib/categories.ts`.

## Tema

- shadcn/ui con variables CSS, tema claro y oscuro (`next-themes`) y el oscuro según el sistema por defecto.
- Tipografía Geist (la de Next.js). Bordes `rounded-lg`. Densidad media en la lista de mensajes.

## Scroll con CSS

El comportamiento y los efectos de scroll se resuelven con **CSS nativo**, sin librerías de JavaScript (nada de listeners de `scroll`, IntersectionObserver para animaciones ni librerías tipo Framer Motion o Lenis para esto). Las utilidades propias se definen en `src/app/globals.css` con `@utility` de Tailwind v4, o con las utilidades que Tailwind ya trae.

### Base (siempre activa)

| Propiedad | Dónde | Para qué |
| --- | --- | --- |
| `scroll-behavior: smooth` (`scroll-smooth`) | `html` | Saltos suaves a anclas y al "volver arriba". Se desactiva con `prefers-reduced-motion: reduce` |
| `scrollbar-gutter: stable` | Contenedores con scroll (lista de mensajes, sidebar) | Evita que el layout salte cuando aparece la barra |
| `scrollbar-width: thin` + `scrollbar-color` | Sidebar y paneles | Barras discretas que usan los tokens del tema (claro y oscuro) |
| `overscroll-behavior: contain` (`overscroll-contain`) | Sidebar, `MessageDetailSheet`, diálogos y menús | El scroll de un panel no arrastra la página de fondo |
| `scroll-margin-top` (`scroll-mt-*`) | Elementos que reciben foco o anclas | El header sticky no tapa el elemento enfocado (navegación `j`/`k`) |
| `scroll-snap-type` / `scroll-snap-align` (`snap-x`, `snap-start`) | Barras horizontales: chips de filtros en móvil, `PriorityStats` y plantillas de canales en móvil | Desplazamiento por elementos completos |
| `position: sticky` | `AppHeader` y la barra de `MessageFilters` | Los filtros quedan visibles mientras se recorre la lista |

### Efectos ligados al scroll (mejora progresiva)

Usan **scroll-driven animations** (`animation-timeline: scroll()` / `view()`) y **scroll-state container queries** (`container-type: scroll-state`). Siempre van dentro de `@supports`: si el navegador no las soporta, la UI funciona igual pero sin el efecto.

| Efecto | Técnica | Componente |
| --- | --- | --- |
| Sombra o borde del header al hacer scroll | `@container scroll-state(stuck: top)` en la barra sticky (o `animation-timeline: scroll()` como alternativa) | `AppHeader`, `MessageFilters` |
| Barra de progreso de lectura del detalle | `animation-timeline: scroll(nearest)` sobre `scaleX` | `MessageDetailSheet` |
| Entrada suave de los ítems al aparecer en la lista | `animation-timeline: view()` + `animation-range: entry` (fade + translate corto) | `MessageItem` |
| Sombras de "hay más contenido" en los bordes de listas horizontales | `animation-timeline: scroll(self inline)` | Chips de filtros, `PriorityStats` |
| Botón "Volver arriba" que aparece solo tras bajar | `@container scroll-state(scrollable: top)` | `MessageList` |

```css
/* Ejemplo: entrada de ítems, solo si hay soporte y el usuario no pide menos movimiento */
@supports (animation-timeline: view()) {
  @media (prefers-reduced-motion: no-preference) {
    .reveal-on-scroll {
      animation: reveal linear both;
      animation-timeline: view();
      animation-range: entry 0% entry 40%;
    }
  }
}
@keyframes reveal { from { opacity: 0; translate: 0 8px; } }
```

### Reglas

- Todo efecto respeta `prefers-reduced-motion: reduce` y en ese caso se desactiva.
- Solo se animan `opacity`, `transform`/`translate`/`scale` y sombras, nunca propiedades de layout.
- El scroll infinito de `MessageList` sigue necesitando JavaScript (IntersectionObserver en un sentinel para pedir la página siguiente). CSS se usa solo para la presentación, no para cargar datos.
- Las utilidades (`reveal-on-scroll`, `scroll-shadow-x`, `scroll-progress`, `header-stuck`) viven en `globals.css` y están documentadas aquí. No se crean variantes por componente.

## Estados obligatorios en cada vista

- **Cargando:** skeletons, no spinners de página completa.
- **Vacío:** mensaje con una acción. Por ejemplo, en Prioritarias sin cuentas: "Conecta tu primer correo" → `/conectar`.
- **Error:** mensaje y botón "Reintentar".
- **Sin conexión en vivo:** indicador discreto en el header.

## Accesibilidad

- Navegación completa por teclado. En la lista de mensajes: `j`/`k` para moverse, `Enter` para abrir el detalle y `o` para abrir en la app original (opcional, FE-07).
- Contraste AA en ambos temas.
- Los toasts no roban el foco.
