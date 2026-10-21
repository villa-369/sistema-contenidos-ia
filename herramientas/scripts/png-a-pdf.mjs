// Une las láminas PNG de un carrusel en un PDF (una página por lámina) para LinkedIn.
// Uso: node herramientas/scripts/png-a-pdf.mjs <carpeta_slides> <salida.pdf> [titulo]
// Toma los archivos slide-N.png en orden numérico. Usa sharp de open-carrusel (JPEG calidad 92).
import { createRequire } from "node:module";
import { readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const require = createRequire(path.join(ROOT, "herramientas", "open-carrusel", "package.json"));
const sharp = require("sharp");

const JPEG_QUALITY = 92;
const PX_TO_PT = 0.75; // 96 dpi → puntos PDF

function pdfString(text) {
  // Texto en UTF-16BE con BOM: admite acentos en los metadatos del PDF.
  const buf = Buffer.from("﻿" + text, "utf16le").swap16();
  return `<${buf.toString("hex")}>`;
}

async function loadSlides(dir) {
  const files = (await readdir(dir))
    .filter((f) => /^slide-\d+\.png$/i.test(f))
    .sort((a, b) => parseInt(a.match(/\d+/)[0], 10) - parseInt(b.match(/\d+/)[0], 10));
  if (files.length === 0) throw new Error(`No hay slide-N.png en ${dir}`);

  return Promise.all(
    files.map(async (f) => {
      const img = sharp(path.join(dir, f)).flatten({ background: "#ffffff" });
      const { width, height } = await img.metadata();
      const jpeg = await img.jpeg({ quality: JPEG_QUALITY }).toBuffer();
      return { name: f, width, height, jpeg };
    })
  );
}

function buildPdf(slides, title) {
  const chunks = [];
  const offsets = [];
  let size = 0;
  const push = (data) => {
    const b = Buffer.isBuffer(data) ? data : Buffer.from(data, "latin1");
    chunks.push(b);
    size += b.length;
  };
  const obj = (n, body) => {
    offsets[n] = size;
    push(`${n} 0 obj\n`);
    for (const part of body) push(part);
    push("\nendobj\n");
  };

  // Objetos: 1 catálogo, 2 páginas, 3 info; por lámina: página, imagen, contenido.
  const pageIds = slides.map((_, i) => 4 + i * 3);
  push("%PDF-1.4\n%\xE2\xE3\xCF\xD3\n");
  obj(1, ["<< /Type /Catalog /Pages 2 0 R >>"]);
  obj(2, [`<< /Type /Pages /Count ${slides.length} /Kids [${pageIds.map((id) => `${id} 0 R`).join(" ")}] >>`]);
  obj(3, [`<< /Title ${pdfString(title)} /Producer (png-a-pdf) >>`]);

  slides.forEach((s, i) => {
    const [pageId, imgId, contentId] = [pageIds[i], pageIds[i] + 1, pageIds[i] + 2];
    const w = +(s.width * PX_TO_PT).toFixed(2);
    const h = +(s.height * PX_TO_PT).toFixed(2);
    const content = `q ${w} 0 0 ${h} 0 0 cm /Im0 Do Q`;
    obj(pageId, [`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${w} ${h}] /Resources << /XObject << /Im0 ${imgId} 0 R >> >> /Contents ${contentId} 0 R >>`]);
    obj(imgId, [
      `<< /Type /XObject /Subtype /Image /Width ${s.width} /Height ${s.height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${s.jpeg.length} >>\nstream\n`,
      s.jpeg,
      "\nendstream",
    ]);
    obj(contentId, [`<< /Length ${content.length} >>\nstream\n${content}\nendstream`]);
  });

  const total = 4 + slides.length * 3;
  const xref = size;
  push(`xref\n0 ${total}\n0000000000 65535 f \n`);
  for (let n = 1; n < total; n++) push(`${String(offsets[n]).padStart(10, "0")} 00000 n \n`);
  push(`trailer\n<< /Size ${total} /Root 1 0 R /Info 3 0 R >>\nstartxref\n${xref}\n%%EOF\n`);
  return Buffer.concat(chunks);
}

async function main() {
  const [dir, out, title = "Carrusel"] = process.argv.slice(2);
  if (!dir || !out) {
    console.error("Uso: node png-a-pdf.mjs <carpeta_slides> <salida.pdf> [titulo]");
    process.exit(1);
  }
  const slides = await loadSlides(path.resolve(dir));
  const pdf = buildPdf(slides, title);
  await writeFile(path.resolve(out), pdf);
  console.log(`PDF creado: ${out} · ${slides.length} páginas · ${(pdf.length / 1024 / 1024).toFixed(2)} MB`);
}

main().catch((err) => {
  console.error("Error al crear el PDF:", err.message);
  process.exit(1);
});
