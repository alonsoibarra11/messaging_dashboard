# FE-06 — Preferencias por cuenta (reglas + texto libre)

| Fase | Depende de | Backend | Rama | Estado |
| --- | --- | --- | --- | --- |
| 3 | FE-05 | BE-10 | `feat/fe-06-preferencias` | ⬜ |

## Objetivo
Que el usuario diga qué es prioritario en cada cuenta. Por ejemplo:
- en "Trabajo": mensajes del jefe y correos que contengan "urgencia";
- en "Personal": todo lo relacionado con cuentas de dinero.

## Alcance
- `/conectar/[connectionId]/preferencias` con dos secciones:
  1. **Reglas** (`RuleList` y `RuleForm`) con presets que llenan el formulario:
     - *Remitente VIP*: `sender` + alias + prioridad 90;
     - *Palabra clave*: `keyword` + prioridad 80;
     - *Dominio*: `domain`;
     - *Silenciar*: `mute`.

     Se puede habilitar y deshabilitar cada regla con un switch (actualización optimista).
  2. **Texto libre** (`FreeTextPreferences`): un textarea con ejemplos como placeholder, un contador de caracteres (máximo 1000) y el switch "Usar IA para clasificar lo que no cubren las reglas" (`llm_enabled`).
- Una explicación breve de cómo se combinan: "Primero se aplican tus reglas; si ninguna coincide, la IA decide usando tu descripción."
- Handlers de MSW.

## Criterios de aceptación
- Tests: crear, editar y eliminar reglas; validación (un email inválido en `sender`; prioridad requerida); guardar el texto libre.

## Specs
[vistas-y-componentes.md](../specs/vistas-y-componentes.md#preferencias-de-una-cuenta--conectarconnectionidpreferencias-fe-06)
