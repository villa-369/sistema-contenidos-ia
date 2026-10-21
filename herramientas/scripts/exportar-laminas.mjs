// Sube las láminas de una pieza a open-carrusel y exporta los PNG.
// Uso: node herramientas/scripts/exportar-laminas.mjs <carpeta_pieza> "<nombre>" [puerto]
//   Lee <carpeta_pieza>/slides/html/lamina-N.html, crea un carrusel 4:5, añade las láminas,
//   exporta el ZIP y deja slide-N.png en <carpeta_pieza>/slides/. Imprime el id del carrusel.
// Requiere el servidor de open-carrusel en marcha (npm run dev). Exportar tarda 2-3 min.
import { readFile, readdir, rm } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import path from "node:path";

const EXPORT_TIMEOUT_MS = 10 * 60 * 1000;
// En Windows, el tar de Git Bash (GNU) no abre ZIP ni rutas C:\; el del sistema (bsdtar) sí.
const TAR = process.platform === "win32" ? path.join(process.env.SystemRoot ?? "C:\\Windows", "System32", "tar.exe") : "tar";
const numero = (f) => Number(f.match(/(\d+)/)?.[1] ?? 0);

async function api(base, ruta, opciones = {}) {
  const res = await fetch(`${base}${ruta}`, {
    ...opciones,
    headers: { "Content-Type": "application/json", ...(opciones.headers ?? {}) },
  });
  if (!res.ok) throw new Error(`${ruta} respondió ${res.status}: ${await res.text()}`);
  return res;
}

async function main() {
  const [carpeta, nombre, puerto = "3000"] = process.argv.slice(2);
  if (!carpeta || !nombre) throw new Error('Uso: exportar-laminas.mjs <carpeta_pieza> "<nombre>" [puerto]');
  const base = `http://localhost:${puerto}`;
  const slides = path.join(path.resolve(carpeta), "slides");
  const dirHtml = path.join(slides, "html");

  const archivos = (await readdir(dirHtml)).filter((f) => /^lamina-\d+\.html$/.test(f)).sort((a, b) => numero(a) - numero(b));
  if (archivos.length === 0) throw new Error(`No hay láminas en ${dirHtml}`);

  const { id } = await (await api(base, "/api/carousels", { method: "POST", body: JSON.stringify({ name: nombre, aspectRatio: "4:5" }) })).json();
  for (const archivo of archivos) {
    const html = await readFile(path.join(dirHtml, archivo), "utf8");
    await api(base, `/api/carousels/${id}/slides`, { method: "POST", body: JSON.stringify({ html }) });
  }

  // Con fetch, Node corta la espera de cabeceras a los 300 s y exportar 6 láminas tarda más: se usa curl.
  const zip = path.join(slides, "export.zip");
  execFileSync("curl", ["-sS", "-f", "-m", String(EXPORT_TIMEOUT_MS / 1000), "-X", "POST", "-o", zip, `${base}/api/carousels/${id}/export`]);
  execFileSync(TAR, ["-xf", zip, "-C", slides]);
  await rm(zip);

  console.log(`open_carrusel_id=${id}`);
  console.log(`${archivos.length} PNG en ${slides}`);
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
