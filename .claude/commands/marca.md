---
description: Primer paso de una marca nueva — entrevista al dueño con el cuestionario de marca y, con sus respuestas, arma marca/ y el contexto de marketing
argument-hint: "[ruta a un cuestionario ya respondido | actualizar <bloque>]"
---

# /marca $ARGUMENTS

Paso de inicio: reúne el contexto de la marca (negocio, cliente ideal, objeciones, voz, identidad visual y reglas) para que los demás comandos trabajen sobre una base real. **No publica ni programa nada.**

El cuestionario está en `herramientas/plantillas/cuestionario-marca.md` (13 bloques; las preguntas con ★ son imprescindibles).

## 0. Antes de empezar

- **Si `marca/` ya tiene contenido** (por ejemplo, `marca/brand.json`), avisa de que este comando lo reemplazaría y pregunta si se trata de **otra marca** (empezar de cero, en otra carpeta o rama) o de **actualizar** algunos bloques (`/marca actualizar <bloque>`). No sobrescribas nada sin respuesta.
- **Si `$ARGUMENTS` es la ruta de un cuestionario ya respondido:** léelo, salta al paso 2 con lo que traiga y pregunta solo lo que falte.
- Si el dueño da su sitio web o un manual de marca, léelos primero. Lo que saques de ahí se presenta como **«Vi esto en tu sitio: ¿es correcto?»**, nunca como respuesta dada.

## 1. Entrevista

- **Un bloque por mensaje,** con un máximo de 6 preguntas, y el avance a la vista («Bloque 3 de 13 · Cliente ideal»).
- Usa las palabras del cuestionario y un ejemplo corto cuando ayude. Si una respuesta es vaga («a todo el mundo»), repregunta una sola vez con una opción concreta.
- Acepta «no sé» o «después»: la pregunta queda **pendiente**, no se rellena.
- Pide archivos cuando toque (logo, manual, textos propios, documentos de venta). Los archivos que entregue van a `fuentes/`, que no se modifica (regla 5 de `CLAUDE.md`).
- El bloque 12 (perfil personal) solo se pregunta si habrá destinos personales.
- **Guarda después de cada bloque** las respuestas **tal cual las dijo**, en `fuentes/cuestionario/AAAA-MM-DD_respuestas.md`, con el número de bloque y de pregunta. Así la entrevista se puede retomar otro día sin perder nada.

## 2. Revisión de lo recogido

Al terminar (o cuando el dueño diga que basta por ahora), muestra:

1. Un resumen de una línea por bloque.
2. **Pendientes:** las preguntas ★ sin respuesta. Sin ellas, los archivos que dependen de esas preguntas quedan como borrador.
3. **Contradicciones** entre sus respuestas, sus documentos y su sitio. Mandan los documentos y las respuestas del dueño (regla 10): se le pregunta cuál vale y se registra en `marca/decisiones.md`.

Pide su aprobación para generar la base de la marca.

## 3. Generar la base de la marca (solo con aprobación)

| Archivo | Sale de los bloques |
|---|---|
| `marca/brand.json` (colores, tipografías, logo, contacto, formatos), con la forma de `marca/brand.ejemplo.json` | 1, 10 |
| `marca/voz.md` (quiénes somos, tono, reglas, mensajes clave, CTA, cambios por red, palabras, CTEIT) | 2, 3, 8, 9, 11, 13 |
| `marca/voz_personal.md` | 12 (si aplica) |
| `marca/nichos.md` (cliente ideal y nichos, con su problema y lenguaje) | 4, 5 |
| `marca/objeciones.md` | 6 |
| `marca/decisiones.md` (lo que el dueño decidió y las contradicciones resueltas) | 13 y el paso 2 |
| `marca/zernio.json` | 1, después de que el dueño conecte sus cuentas en Zernio: solo lee `accounts_list`, no publica |
| `marca/plantillas/lamina-4x5.css` (adaptada a sus colores y tipografías) | 10 |
| `.agents/product-marketing.md` (contexto para las skills de marketing) | 2, 4, 5, 6, 7, 8, 9, 11 |
| `estrategia/pilares.md` (propuesta de pilares) | 5, 6, 8, 11 |

Reglas al generar:
- Cada afirmación lleva su código de fuente: `[CU b.p]` para una respuesta del cuestionario (bloque y pregunta), más los códigos de los documentos de `fuentes/` y `[WEB]` para el sitio. Lo que sea recomendación de Claude va como `[REC]`, pendiente de visto bueno.
- **Nada inventado:** sin testimonios, clientes, cifras ni anécdotas que el dueño no haya dado (reglas 2 y 3). Los huecos se marcan **[PENDIENTE]**.
- Lo marcado como **interno** (precios, clientes) se anota como tal y no entra en mensajes publicables (regla 4).
- Si existe una marca anterior, usa sus archivos de `marca/` como modelo de estructura, sin copiar su contenido.
- Actualiza en `CLAUDE.md` la tabla de destinos con las URLs confirmadas.

## 4. Entrega

Muestra la lista de archivos creados, los pendientes que quedan y un ejemplo de cómo sonaría una publicación con la nueva voz (rotulado «Ejemplo»). Pide la aprobación de la base de la marca. El paso siguiente es `/calendario`.
