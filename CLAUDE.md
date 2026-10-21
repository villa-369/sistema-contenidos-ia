# Sistema de contenidos con IA

Sistema para producir posts, carruseles y Reels para Instagram, Facebook y LinkedIn (página de empresa y perfil personal), y programarlos con Zernio. Todo lo específico de la marca vive en `fuentes/`, `marca/` y `.agents/product-marketing.md`; los comandos y los scripts son genéricos.

> **Marca nueva:** si `marca/brand.json` no existe, el primer paso es `/marca` (ver «Flujo de trabajo»). Hasta entonces no se crea ninguna pieza.

## Reglas permanentes (obligatorias)

1. **Nunca publiques ni programes nada sin aprobación explícita** del dueño de la marca para esa pieza concreta y ese destino concreto. Esto aplica con más razón a los perfiles personales. Una aprobación no se extiende a otra pieza, otro destino ni otra fecha.
2. **No inventes testimonios, clientes, cifras ni resultados.** Los ejemplos ilustrativos van marcados como ejemplo («Ejemplo ilustrativo»); las recreaciones de una conversación, como «Recreación».
3. **Perfiles personales:** no inventes anécdotas, experiencias ni opiniones que el dueño no haya dicho o escrito. Usa solo lo que salga de `fuentes/`, del cuestionario o de lo que él cuente en la conversación; si una pieza necesita una vivencia personal, pregúntala.
4. **`fuentes/` es material interno:** úsalo para orientar el contenido, pero no publiques precios, nombres de clientes ni datos internos sin autorización.
5. **No modifiques los archivos de `fuentes/`.** Si se añaden documentos nuevos, actualiza `marca/` e informa qué cambió.
6. **Idioma:** el que indique el cuestionario (bloque 1). Por defecto, español neutro.
7. **Un texto por destino:** cada pieza lleva un texto adaptado a cada destino que le corresponda, con una llamada a la acción coherente con la plataforma. El texto del perfil personal nunca repite palabra por palabra el de la página de empresa.
8. **Claves en `.env`**, nunca en git. `.env.example` documenta qué variables existen.
9. **Herramientas:** si una falla o no encaja, no la sustituyas por otra por cuenta propia; explica el problema y ofrece alternativas.
10. **Prioridad de fuentes:** si los documentos de `fuentes/` o las respuestas del cuestionario contradicen el sitio web de la marca, mandan los documentos y las respuestas, y se avisa de la contradicción.

## Flujo de trabajo (comandos del proyecto)

Cada paso termina con una aprobación del dueño, y el siguiente no empieza sin ella.

| Paso | Comando | Qué hace | Aprobación que pide |
|---|---|---|---|
| Inicio | `/marca [cuestionario]` | Marca nueva: entrevista al dueño con `herramientas/plantillas/cuestionario-marca.md` (13 bloques), guarda sus respuestas en `fuentes/cuestionario/` y arma `marca/`, `.agents/product-marketing.md` y `estrategia/pilares.md`. Solo una vez por marca, o `actualizar <bloque>`. | Lo recogido y luego la base de la marca |
| Investigación | `/competencia` y `/referentes` | `/competencia`: descubre a la competencia por tipo (web y Biblioteca de Anuncios de Meta, sin iniciar sesión) y propone cambios de contenido en `estrategia/competencia.md`. `/referentes`: analiza sus anuncios y publicaciones y deja un banco de ideas adaptadas en `estrategia/referentes/`. Nunca copia ni nombra competidores. Al empezar y cada uno o dos meses. | Las propuestas y las ideas que pasan al calendario |
| 0 | `/estado` | Foto del sistema: piezas por estado, lo programado en Zernio, salud de cuentas, discrepancias. Solo lee. | — |
| 1 | `/calendario [inicio]` | Propone 2 semanas en `estrategia/calendario/` (pilares, nichos, objeciones, sin chocar con lo programado). | El calendario |
| 2 | `/pieza <fecha> <tema> <formato> [destinos]` | Crea `contenidos/<fecha>_<tema>/` con el guion CTEIT, `copy.md` (un texto por destino) y `meta.json`. | El guion y los textos |
| 3a | `/laminas <pieza>` | Carrusel o imagen: `slides/fuente/` → `armar-laminas.mjs` → `exportar-laminas.mjs` → hoja de revisión (y el PDF si va a LinkedIn). | Las láminas |
| 3b | `/reel <pieza>` y luego `/reel <pieza> render` | Reel: `nuevo-reel.mjs` → escenas → `check` → capturas; el render y el MP4 solo después de aprobar. | Las capturas (render) y luego el MP4 |
| 4 | `/programar <pieza> [destinos]` | Sube a Zernio, valida, crea (o sustituye) la publicación con un texto por destino y la registra en `meta.json`. | Pieza, destinos y fecha, en esa misma conversación |

**Scripts** (en `herramientas/scripts/`):
- `armar-laminas.mjs` y `exportar-laminas.mjs`: láminas;
- `png-a-pdf.mjs`: PDF para LinkedIn;
- `nuevo-reel.mjs`: copia el último Reel como plantilla;
- `estado-piezas.mjs`: resumen de los `meta.json`;
- `hoja-revision.py`: cuadrícula de imágenes para revisar;
- `sync-brand-open-carrusel.mjs`: marca en open-carrusel.

## Antes de escribir cualquier pieza

Leer siempre: `marca/decisiones.md`, `marca/voz.md` (y `marca/voz_personal.md` si va a un perfil personal), `marca/nichos.md`, `marca/objeciones.md` y `marca/brand.json`. Cada afirmación debe rastrearse a `fuentes/`, al cuestionario, al sitio o a `marca/decisiones.md`. Estructura del mensaje: **CTEIT adaptado** (`marca/voz.md` §8: Característica → Traducción → Experiencia → Identidad → Transferencia). Casos reales: solo con `marca/casos/PLANTILLA.md` completa y autorizada.

## Destinos

`/marca` completa esta tabla con las URLs que confirme el dueño (bloque 1 del cuestionario).

| Destino | Voz | Archivo de voz |
|---|---|---|
| Instagram | marca | `marca/voz.md` |
| Facebook (página) | marca | `marca/voz.md` |
| LinkedIn, página de empresa | marca, plural («nosotros») | `marca/voz.md` |
| LinkedIn, perfil personal del dueño | primera persona | `marca/voz_personal.md` |
| Facebook personal del dueño (**publicación manual**: se entrega el texto y él lo publica; Zernio no publica en perfiles personales de Facebook) | primera persona | `marca/voz_personal.md` |

## Estructura

```
CLAUDE.md                  este archivo
fuentes/                   documentos originales del dueño y respuestas del cuestionario, SIN MODIFICAR
marca/                     brand.json, voz.md, voz_personal.md, nichos.md, objeciones.md, decisiones.md, zernio.json, logo e icono
  casos/                   PLANTILLA.md y casos reales (subcarpeta privado/ fuera de git)
  plantillas/              lamina-4x5.css (diseño base de las láminas)
estrategia/                pilares.md, calendario/, competencia.md y referentes/
contenidos/AAAA-MM-DD_tema/
  copy.md                  una sección por destino
  slides/                  PNG (y PDF para LinkedIn si hace falta)
  video/                   MP4
  meta.json                destinos, estado, IDs de Zernio y fechas
herramientas/
  open-carrusel/           submódulo git (Hainrixz/open-carrusel)
  plantillas/              cuestionario-marca.md (genérico, lo usa /marca)
  hyperframes/reels/       un proyecto HyperFrames por Reel (1080x1920)
  scripts/                 scripts de apoyo
.agents/product-marketing.md   contexto de producto que leen las skills de marketingskills
.claude/skills/            skills de marketingskills (se instalan, ver README)
.claude/commands/          /marca /competencia /referentes /estado /calendario /pieza /laminas /reel /programar
```

## Herramientas

- **marketingskills** (coreyhaines31): estrategia y textos. Se instala con `npx skills add coreyhaines31/marketingskills -a claude-code -s '*' -y --copy` en `.claude/skills/`. Todas las skills leen primero `.agents/product-marketing.md`.
- **open-carrusel** (Hainrixz): app Next.js local que genera láminas HTML/CSS y las exporta a PNG con Puppeteer. Arranque: `cd herramientas/open-carrusel && npm install && npm run dev` (http://localhost:3000). La marca se configura en su `data/brand.json`.
  - **Uso por API:** `node herramientas/scripts/sync-brand-open-carrusel.mjs <logo /uploads/...>` copia `marca/brand.json` a su marca; `POST /api/carousels` (aspectRatio "4:5") crea el carrusel; `POST /api/carousels/<id>/slides` con `{html}` agrega láminas; `POST /api/carousels/<id>/export` devuelve un ZIP con `slide-N.png`. En Git Bash, anteponer `MSYS_NO_PATHCONV=1` a comandos con rutas `/uploads/...`.
  - **Flujo por scripts:** escribir el contenido interior de cada lámina en `contenidos/<pieza>/slides/fuente/lamina-N.html` → `node herramientas/scripts/armar-laminas.mjs contenidos/<pieza>` (une la plantilla `marca/plantillas/lamina-4x5.css` y añade el pie con el nombre de `marca/brand.json` y la paginación) → `MSYS_NO_PATHCONV=1 node herramientas/scripts/exportar-laminas.mjs contenidos/<pieza> "<nombre>"` (crea el carrusel, exporta con curl e imprime `open_carrusel_id`).
  - **Fuentes en el HTML de las láminas: SIN comillas** (`font-family:Poppins,sans-serif`). Con comillas, open-carrusel no detecta la fuente y exporta con una genérica.
  - **Exportar es lento** (de 2 a 7 minutos para 6 láminas). **Nunca dos exportaciones a la vez** ni con HyperFrames trabajando. Si da `Page.captureScreenshot timed out` (poca memoria libre), exportar **lámina por lámina** (un carrusel por lámina). Si se cuelga: detener el servidor y cerrar solo los procesos de Chrome cuya ruta esté en `.cache/puppeteer` (nunca el navegador del usuario). Si las rutas `/api/carousels/<id>/…` dan 404 con el servidor recién arrancado, borrar `herramientas/open-carrusel/.next` y reiniciar.
- **PDF para LinkedIn:** `node herramientas/scripts/png-a-pdf.mjs <carpeta_slides> <salida.pdf> "<título>"`. LinkedIn (vía Zernio) publica carruseles como **documento**: 1 PDF por post, `documentTitle` obligatorio en `platformSpecificData`; no se mezcla con imágenes ni video.
- **HyperFrames** (heygen-com): video en HTML → MP4. Skills con `npx hyperframes skills update`; flujo `general-video`. Requiere FFmpeg.
  - **Un proyecto por Reel** en `herramientas/hyperframes/reels/AAAA-MM-DD_tema`. El primero se crea con `npx hyperframes@<versión> init "herramientas/hyperframes/reels/AAAA-MM-DD_tema" --non-interactive --example=blank --skill=general-video --resolution portrait` (desde `herramientas/hyperframes/`); los siguientes, con `nuevo-reel.mjs`. Dentro: `BRIEF.md`, `frame.md` (marca para video, derivada de `marca/brand.json`), `STORYBOARD.md`, `compositions/frames/NN-*.html` (una subcomposición por escena + `00-fondo.html` continuo) e `index.html`.
  - Contenido clave en la zona segura: 108 px laterales, ~230 px arriba y ~380 px libres abajo (interfaz de Reels).
  - Ciclo: `npx hyperframes check` (0 errores) → `snapshot --at <momentos>` (hoja de contacto) → `preview --background` para que el dueño revise → **render solo con su aprobación**: `render --fps 30 --quality delivery -o renders/<nombre>.mp4` → copiar el MP4 a `contenidos/<pieza>/video/` y verificar con `ffprobe`.
  - Música: requiere una cuenta de HeyGen o una pista con licencia que aporte el dueño. Sin eso, los Reels van sin audio.
- **Especificaciones de video vía Zernio:** Instagram Reel MP4/MOV H.264, 9:16, 1080x1920, 30 fps, 3-90 s, máx. 300 MB; Facebook Reel `contentType: "reel"`, 9:16, 3-60 s; LinkedIn MP4/MOV/AVI, 3 s mínimo. **Un mismo MP4 vertical de 3 a 60 s sirve para los tres.**
- **Zernio**: publicación vía servidor MCP (plugin `zernio@zernio`, OAuth). Nunca se llama a herramientas de publicación sin aprobación (regla 1). Cuentas de la marca en `marca/zernio.json` (si la cuenta de Zernio tiene otras marcas, no usarlas). Procedimiento: subir con `media_get_media_presigned_url` + PUT, validar con `validate_post`, crear con `posts_create_post` (vía `call_tool`) con `customContent` por destino y `scheduled_for` en hora local + `timezone` (respeta el cambio de horario); para sustituir una publicación, `posts_update_post` en su lugar. Antes de proponer fechas, listar lo ya programado (`posts_list_posts`, status scheduled).
