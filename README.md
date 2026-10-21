# Sistema de contenidos con IA para redes sociales

Un asistente de contenido que trabaja dentro de **Claude Code**. Le pides una publicación y la prepara de principio a fin: piensa la idea, escribe los textos, diseña las imágenes o el video y la deja programada en Instagram, Facebook y LinkedIn. **Nada se publica sin tu aprobación.**

Sirve para cualquier marca: el primer paso es una entrevista que recoge todo lo que hace falta saber de ella.

---

## ¿Qué hace?

| Paso | Qué hace por ti |
|---|---|
| 🧭 **Conoce tu marca** | Te entrevista con un cuestionario sencillo (tu negocio, tu cliente ideal, sus dudas, tu forma de hablar y tu identidad visual) y con eso arma la base de la marca. |
| 📅 **Planifica** | Propone un calendario de 2 semanas: qué publicar, qué día, para qué público y qué duda del cliente responde cada pieza. |
| ✍️ **Escribe** | Redacta el guion y un texto distinto para cada red (Instagram, Facebook, LinkedIn de empresa y perfil personal), con la voz de tu marca. |
| 🎨 **Diseña** | Crea carruseles e imágenes con los colores, fuentes y logo de la marca, y Reels en video vertical. |
| 🗓️ **Programa** | Sube la pieza aprobada y la deja programada en cada red, a la hora que elijas. |
| 📊 **Te informa** | Te dice qué está publicado, qué está programado, qué falta por aprobar y si alguna cuenta necesita atención. |

## ¿Cómo te ayuda?

- **Ahorra tiempo:** pasas de una idea a una publicación programada en una sola conversación.
- **Mantiene la coherencia:** todas las piezas siguen la misma voz, paleta y forma de construir el mensaje.
- **No inventa:** solo usa lo que está en tus documentos, tus respuestas y tu sitio. Nada de testimonios, clientes ni cifras falsas, y los ejemplos van rotulados como «Ejemplo ilustrativo».
- **Tú decides:** cada paso termina en tu aprobación, pieza por pieza y red por red.
- **Lleva el registro:** cada pieza guarda su historial (qué se aprobó, cuándo y dónde se programó).

## ¿Cómo se usa?

Todo funciona con **comandos** que escribes en Claude Code. Cada uno termina pidiendo tu visto bueno, y el siguiente no empieza sin él.

| Comando | Para qué sirve |
|---|---|
| `/marca` | **Primer paso, una sola vez por marca.** Te hace las preguntas del [cuestionario](herramientas/plantillas/cuestionario-marca.md) bloque por bloque y arma la identidad, la voz, el cliente ideal y las objeciones. |
| `/estado` | Una foto de cómo va todo. Solo mira, no cambia nada. |
| `/calendario` | Propone las publicaciones de las próximas 2 semanas. |
| `/pieza` | Crea una publicación: guion y textos para cada red. |
| `/laminas` | Diseña el carrusel o la imagen. |
| `/reel` | Arma el video (Reel): primero te muestra capturas y solo lo genera cuando las apruebas. |
| `/programar` | Deja la publicación programada en las redes que elijas. |

**Un ejemplo de un día normal:**

> **Tú:** /pieza 2026-11-06 comunidad-crossfit carrusel
> **Claude:** te muestra el guion de 6 láminas y el texto para Instagram y Facebook.
> **Tú:** aprobado, arma las láminas
> **Claude:** te enseña las 6 imágenes terminadas.
> **Tú:** aprobadas, prográmala
> **Claude:** la programa para el viernes a las 7:00 pm y te confirma.

## El cuestionario de marca

Son 13 bloques en lenguaje sencillo; las preguntas con ★ son las imprescindibles. Puedes responderlo en conversación con `/marca` o mandárselo al dueño para que lo llene y luego pasarlo con `/marca <archivo>`.

Datos básicos · El negocio y la oferta · Historia y propósito · **Cliente ideal (ICP)** · Problemas y deseos · Objeciones · Competencia · Pruebas y credibilidad · **Voz y personalidad** · **Identidad visual** · Objetivos y llamada a la acción · Perfil personal · Reglas y material.

## ¿Qué usa por dentro?

| Recurso | Para qué |
|---|---|
| [Claude Code](https://claude.com/claude-code) | El asistente que hace todo el trabajo y sigue las reglas de [`CLAUDE.md`](CLAUDE.md). |
| [Zernio](https://zernio.com) | Programa y publica en Instagram, Facebook y LinkedIn. |
| [open-carrusel](https://github.com/Hainrixz/open-carrusel) | Convierte el diseño de cada lámina en imagen PNG. |
| [HyperFrames](https://github.com/heygen-com/hyperframes) | Convierte el diseño del Reel en video MP4. Necesita FFmpeg. |
| [marketingskills](https://github.com/coreyhaines31/marketingskills) | Conocimiento de marketing para estrategia y textos. |
| Node.js y Python | Pequeños programas que arman, exportan y revisan las piezas. |

### Skills (habilidades) que incluye

- **Del proyecto (los 7 comandos):** marca, estado, calendario, pieza, láminas, reel y programar.
- **De marketing (marketingskills):** unas 50 habilidades listas para usar, como redacción publicitaria (*copywriting*), estrategia de contenido, redes sociales, psicología de ventas, ideas de marketing, anuncios, correos, lanzamientos e investigación de clientes.
- **De video (HyperFrames):** composición, animación y renderizado de Reels.

## ¿Cómo está organizado?

```
fuentes/        Tus documentos originales y las respuestas del cuestionario. No se modifican.
marca/          La identidad: colores, logo, voz, públicos, objeciones y decisiones (la llena /marca).
estrategia/     Los pilares de contenido y los calendarios.
contenidos/     Una carpeta por publicación: textos, imágenes o video y su registro.
herramientas/   open-carrusel, HyperFrames, el cuestionario y los scripts de apoyo.
.claude/        Los comandos (y las skills, una vez instaladas).
CLAUDE.md       Las reglas que Claude sigue siempre en este proyecto.
```

## Reglas que nunca se rompen

1. Nada se publica ni se programa sin tu aprobación de esa pieza, esa red y esa fecha.
2. No se inventan testimonios, clientes, cifras ni resultados.
3. En tu perfil personal solo se usan cosas que tú hayas dicho.
4. Cada red recibe su propio texto: nunca se copia uno en otro.
5. Las claves y contraseñas no se guardan en el repositorio.

## Instalación

Necesitas [Claude Code](https://claude.com/claude-code), Node.js, Python, FFmpeg y una cuenta de [Zernio](https://zernio.com) con tus redes conectadas.

```bash
git clone --recursive https://github.com/villa-369/sistema-contenidos-ia.git
```

```bash
cd sistema-contenidos-ia
```

```bash
npm --prefix herramientas/open-carrusel install
```

```bash
npx skills add coreyhaines31/marketingskills -a claude-code -s '*' -y --copy
```

```bash
npx hyperframes skills update
```

Después:

1. Copia `.env.example` como `.env` y sigue el README de open-carrusel para su configuración inicial.
2. En Claude Code, instala el plugin de Zernio (`zernio@zernio`) y autorízalo con `/mcp`.
3. Abre Claude Code en la carpeta del proyecto y escribe `/marca`.

> **Tu copia, en privado:** al usarlo, `fuentes/` y `marca/` se llenan con datos internos de tu negocio (precios, clientes, decisiones). Guarda tu copia en un repositorio **privado**.
