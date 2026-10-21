---
description: Propone el calendario de contenidos de las próximas 2 semanas a partir de pilares, nichos, objeciones y lo ya programado
argument-hint: "[AAAA-MM-DD de inicio, por defecto el próximo lunes]"
---

# /calendario $ARGUMENTS

Propone un calendario de **2 semanas** que empieza el día indicado (o el próximo lunes). **No programa nada** (regla 1 de `CLAUDE.md`).

## Antes de proponer

1. Lee `marca/decisiones.md`, `marca/voz.md`, `marca/nichos.md`, `marca/objeciones.md`, `estrategia/pilares.md` y el último archivo de `estrategia/calendario/`.
2. Revisa lo que ya existe, para no repetir temas ni chocar fechas:
   - `node herramientas/scripts/estado-piezas.mjs`;
   - en Zernio, `posts_list_posts` con `status: "scheduled"`, filtrado por las cuentas de `marca/zernio.json`.
3. Respeta las decisiones vigentes (por ejemplo, destinos en pausa) y las horas recomendadas del último calendario.

## Reglas del calendario

- **Ritmo:** el que diga el último calendario aprobado. Si no hay, 4 piezas por semana: 2 carruseles, 1 Reel y 1 imagen.
- **Rotación:**
  - reparte los pilares según los pesos de `estrategia/pilares.md`;
  - rota nichos y objeciones;
  - no repitas la misma objeción en menos de 2 semanas ni la misma escena que una pieza reciente.
- **Destinos por pilar:** según `estrategia/pilares.md` §5 y `marca/voz.md` §6.
- **Ficha de cada pieza:**
  - fecha y hora, formato, pilar, nicho y objeción;
  - idea en una frase;
  - estructura (láminas o escenas, con CTEIT de `marca/voz.md` §8);
  - fuentes (códigos de `marca/voz.md`) y destinos.
- **Piezas para el perfil personal de LinkedIn:** si necesitan una vivencia u opinión del dueño, escribe la pregunta concreta en «Preguntas para el dueño». Nunca la inventes (regla 3).

## Entrega

1. Escribe `estrategia/calendario/AAAA-MM-DD_a_AAAA-MM-DD.md` con el mismo formato que el anterior: resumen en tabla, detalle por semana y preguntas para el dueño. Pon **Estado: propuesta, pendiente de aprobación**.
2. Resume en el chat: la tabla y las preguntas.
3. Espera la aprobación. Cuando llegue, cambia el estado a «aprobado (fecha)» y registra en `marca/decisiones.md` cualquier decisión nueva.
