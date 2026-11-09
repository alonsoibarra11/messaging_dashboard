# FE-03 — Login, registro, Google y protección de rutas

| Fase | Depende de | Backend | Rama | Estado |
| --- | --- | --- | --- | --- |
| 1 | FE-02 | BE-04, BE-05 | `feat/fe-03-auth` | ⬜ |

## Objetivo
Que el usuario pueda registrarse, iniciar sesión (con email o con Google) y cerrar sesión, y que las vistas privadas queden protegidas.

## Alcance
- `/login` y `/registro` con `LoginForm`, `RegisterForm` (react-hook-form + zod) y `GoogleButton`.
- Errores de la API mostrados en línea: 401 → "Email o contraseña incorrectos" y 409 → "Ese email ya está registrado".
- `middleware.ts`: redirige a `/login?next=` si falta `has_session`, y redirige de `/login` a `/prioritarias` si existe.
- Refresh automático ante un 401 en `client.ts`, con una sola promesa compartida entre requests concurrentes ([integracion-api.md](../specs/integracion-api.md#cliente-tipado)).
- Hook `useMe()` y `UserMenu` con "Cerrar sesión" (`POST /auth/logout`, limpia la caché y redirige).
- Manejo de `?error=` al volver del login con Google.
- Handlers de MSW para `/auth/*` y `/me`.

## Criterios de aceptación
- Tests de componentes: validación de formularios, login correcto que redirige a `next` y error mostrado.
- Test del refresh: dos requests con 401 simultáneas generan un solo refresh.
- Funciona contra el backend real cuando BE-04 y BE-05 estén mergeados. Actualiza [integracion-api.md](../specs/integracion-api.md#estado-de-integración-por-endpoint).

## Specs
[arquitectura.md](../specs/arquitectura.md#rutas-app-router) · [vistas-y-componentes.md](../specs/vistas-y-componentes.md#auth--login-registro-fe-03)
