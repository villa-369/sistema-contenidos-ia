---
description: Construye el Reel de una pieza en HyperFrames (proyecto, escenas, check y capturas) y lo renderiza solo con aprobación
argument-hint: "<carpeta de la pieza en contenidos/> [render]"
---

# /reel $ARGUMENTS

Construye el Reel de una pieza cuyo **guion ya aprobó** el dueño. Con `render` como segundo argumento, renderiza un proyecto ya revisado, y solo si el dueño aprobó el render en la conversación.

Antes de tocar composiciones, carga la skill `hyperframes` (y `hyperframes-core` si vas a escribir HTML nuevo), como pide el `CLAUDE.md` de cada proyecto.

## Construir

1. **Proyecto:** `node herramientas/scripts/nuevo-reel.mjs <AAAA-MM-DD_tema>`. Copia el último Reel como plantilla: fondo, estilo de chat, escena de identidad y CTA con la palabra clave. **Primer Reel de la marca:** no hay plantilla; créalo con `npx hyperframes@<versión> init "herramientas/hyperframes/reels/<AAAA-MM-DD_tema>" --non-interactive --example=blank --skill=general-video --resolution portrait` (desde `herramientas/hyperframes/`) y deja `compositions/frames/05-cta.html` como escena de cierre para que sirva de plantilla a los siguientes.
2. **Reescribe** según el guion aprobado:
   - `BRIEF.md`: mensaje, público, duración y notas de reglas;
   - `STORYBOARD.md`;
   - `compositions/frames/NN-*.html`: una subcomposición por escena; `00-fondo.html` con `TOTAL` igual a la duración;
   - `index.html`: `data-start` y `data-duration` de cada escena y duración total.
3. **Reglas:**
   - zona segura: 108 px a los lados, unos 230 px arriba y unos 380 px libres abajo;
   - títulos de 90 px o más y cuerpo de 40 px o más;
   - chats rotulados «Ejemplo ilustrativo»;
   - sin cifras, precios ni testimonios;
   - de 15 a 25 s y sin audio, salvo que el dueño aporte una pista con licencia o conecte HeyGen.
4. **Valida:** `npx hyperframes@<versión del package.json> check`, con 0 errores.
5. **Capturas:**
   - `npx hyperframes@<versión> snapshot --at <un momento por escena>`;
   - mira la `contact-sheet.jpg`: texto cortado, solapes, legibilidad y que la animación termine dentro de su escena;
   - corrige y repite.
6. **Revisión:** envía la hoja de contacto al dueño (o deja `npx hyperframes preview --background` abierto) y pide la aprobación del **render**.

## Renderizar (`render`)

1. Desde el proyecto: `npx hyperframes@<versión> render --fps 30 --quality delivery -o renders/<tema>.mp4`. Renderiza un Reel cada vez y nada más en paralelo.
2. Copia el MP4 a `contenidos/<pieza>/video/<tema>.mp4`.
3. Verifica con `ffprobe`: H.264, 1080x1920, 30 fps, duración de 3 a 60 s y tamaño de 300 MB o menos (sirve para IG, FB y LinkedIn).
4. Portada: `ffmpeg -ss <momento de la primera escena> -i <mp4> -frames:v 1 contenidos/<pieza>/video/portada.png`.
5. Registra en `meta.json` las `especificaciones`, la `portada` del destino Instagram y una línea en el `historial`.
6. Envía el MP4 al dueño para la revisión final antes de programar.
