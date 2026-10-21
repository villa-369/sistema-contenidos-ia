---
description: Crea una pieza nueva (carpeta, guion, textos por destino y meta.json) a partir del calendario o de una idea
argument-hint: "<AAAA-MM-DD> <tema-en-minusculas> <carrusel|imagen|reel> [destinos]"
---

# /pieza $ARGUMENTS

Crea el guion y los textos de **una** pieza. Todavía no hace láminas ni video: eso viene después, con `/laminas` o `/reel`, cuando el dueño apruebe el guion.

## 1. Contexto obligatorio

Lee siempre:
- `marca/decisiones.md`, `marca/voz.md`, `marca/nichos.md`, `marca/objeciones.md` y `marca/brand.json`;
- `marca/voz_personal.md` si hay destino personal (LinkedIn personal o Facebook personal);
- la ficha de la pieza en el calendario vigente (`estrategia/calendario/`), si existe.

Si la fecha choca con algo ya programado (`node herramientas/scripts/estado-piezas.mjs`), avísalo.

## 2. Carpeta

Crea `contenidos/<AAAA-MM-DD>_<tema>/`. Si ya existe, no la sobrescribas: pregunta.

## 3. Guion

Usa el CTEIT adaptado (`marca/voz.md` §8):
- **Carrusel:** 6 láminas.
- **Imagen:** 1 lámina.
- **Reel:** escenas de 15 a 25 s, legibles sin sonido, con la escena de cierre (CTA) del último Reel.

Cada afirmación lleva su código de fuente. Las maquetas de chat van rotuladas «Ejemplo ilustrativo». Sin cifras, casos ni testimonios (regla 2).

## 4. `copy.md`

Cabecera con fecha, pilar, nicho, objeción, estructura, fuentes, archivos y estado. Después, **una sección por destino**, con el formato de la pieza más reciente de `contenidos/` (si existe):

- **Instagram:** gancho en la primera línea, de 2 a 4 frases, CTA con palabra clave y enlace en la bio, y 5 hashtags del nicho (lista en `marca/nichos.md`).
- **Facebook página:** escena o pregunta, de 4 a 6 líneas cortas y CTA con `https://wa.me/<número>`. En los Reels, añade «Título del Reel».
- **LinkedIn empresa:** en «nosotros», sin emojis, centrado en el método y con CTA al sitio.
- **LinkedIn personal / Facebook personal:** en primera persona según `marca/voz_personal.md`. Solo vivencias y opiniones que el dueño haya dicho; si falta una, deja la pregunta marcada «Para revisar, dueño».
- **Reglas comunes:**
  - ningún texto repite a otro palabra por palabra (regla 7);
  - CTA: la llamada a la acción principal de `marca/voz.md` §5, con el contacto y el sitio que indica.

## 5. `meta.json`

Sigue el formato de las piezas existentes: pieza, título, formato, fecha prevista, pilar, nicho, objeción, estructura y archivos. Añade un objeto en `destinos` por destino, con:
- `medio`, `archivo` y `hora_propuesta` con desfase horario (ojo al cambio de horario);
- `estado: "borrador"`, `aprobado: false` y `zernio_post_id: null`;
- `bloqueo`, si el destino está en pausa según `marca/decisiones.md`.

Abre el `historial`.

## 6. Entrega

Muestra en el chat el guion y los textos por destino, y pide la aprobación del **guion**. No construyas la pieza visual hasta tenerla.
