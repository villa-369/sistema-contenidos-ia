---
description: Construye y exporta las láminas (carrusel o imagen 4:5) de una pieza con open-carrusel
argument-hint: "<carpeta de la pieza en contenidos/>"
---

# /laminas $ARGUMENTS

Construye las láminas de una pieza cuyo **guion ya aprobó** el dueño. Si no consta esa aprobación en la conversación o en el `historial` del `meta.json`, detente y pídela.

## 1. Contenido de las láminas

Escribe `contenidos/<pieza>/slides/fuente/lamina-N.html` con **solo el contenido interior** de cada lámina. La plantilla `marca/plantillas/lamina-4x5.css` pone el fondo, el pie y la paginación.

- **Clases disponibles:**
  - `k`: antetítulo;
  - `t` y `t2`: títulos (`g` para el degradado);
  - `p`: párrafo;
  - `card`, `dot` y `num`;
  - `cta`: botón;
  - `chat`, `msg` y `ej`: maqueta de chat y su rótulo «Ejemplo ilustrativo».
- **CTA:** `<div class="p" style="margin-top:52px;"><b>Escribe PALABRA</b> por WhatsApp:</div>` + `<div class="cta" style="margin-top:24px;">+número</div>`. El número entero dentro del botón no cabe en una línea.
- **Fuentes en `font-family` sin comillas.**
- Si ya hay piezas, mira como ejemplo el `slides/fuente/` del carrusel más reciente de `contenidos/`.

## 2. Armar

`node herramientas/scripts/armar-laminas.mjs contenidos/<pieza>`

## 3. Exportar

1. Arranca open-carrusel en segundo plano: `cd herramientas/open-carrusel && npm run dev`. Espera a que responda http://localhost:3000.
2. Si la marca no está sincronizada, ejecuta `node herramientas/scripts/sync-brand-open-carrusel.mjs <logo /uploads/...>`.
3. Exporta: `MSYS_NO_PATHCONV=1 node herramientas/scripts/exportar-laminas.mjs contenidos/<pieza> "<nombre>"`. Tarda de 2 a 7 minutos; guarda el `open_carrusel_id` en `meta.json`.
4. **Nunca dos exportaciones a la vez**, ni con HyperFrames trabajando.
5. **Si falla con `Page.captureScreenshot timed out`:**
   - detén el servidor;
   - cierra **solo** los `chrome.exe` cuya ruta esté en `.cache\puppeteer`, nunca el Chrome del usuario;
   - reinicia el servidor y exporta **lámina por lámina**: un carrusel por lámina, copiando `slides/html/lamina-N.html` a una carpeta temporal como `lamina-1.html` y renombrando el PNG resultante a `slide-N.png`.
6. Al terminar, detén el servidor y cierra sus Chrome.

## 4. LinkedIn (si hay destino LinkedIn)

`node herramientas/scripts/png-a-pdf.mjs contenidos/<pieza>/slides contenidos/<pieza>/slides/<nombre>.pdf "<título>"`

## 5. Revisión

1. Genera la hoja: `python -I herramientas/scripts/hoja-revision.py <scratchpad>/hoja.png "contenidos/<pieza>/slides/slide-*.png"`.
2. Mírala y comprueba:
   - el texto se lee y no se corta;
   - el botón del CTA ocupa una sola línea;
   - las maquetas llevan «Ejemplo ilustrativo»;
   - la paginación es correcta.
3. Corrige y vuelve a exportar si hace falta.
4. Envía la hoja al dueño (`SendUserFile`) y pide la aprobación de las láminas. Registra en el `historial` del `meta.json` cuando llegue.
