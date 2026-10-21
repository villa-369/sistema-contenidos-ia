// Arma las láminas 4:5 de una pieza: une la plantilla de la marca con el contenido
// de cada lámina y añade el pie (icono + marca + paginación).
// Uso: node herramientas/scripts/armar-laminas.mjs <carpeta_pieza>
//   Lee  <carpeta_pieza>/slides/fuente/lamina-N.html  (solo el contenido interior)
//   Crea <carpeta_pieza>/slides/html/lamina-N.html    (HTML completo para open-carrusel)
// Plantilla: marca/plantillas/lamina-4x5.css. Logo: logoPath de herramientas/open-carrusel/data/brand.json.
// Nombre del pie: marca.logotipo_texto.partes de marca/brand.json (la primera parte va resaltada) o marca.nombre.
import { readFile, readdir, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");

const numero = (f) => Number(f.match(/(\d+)/)?.[1] ?? 0);
const escapar = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// Logotipo de texto del pie: la primera parte en <b> (la plantilla le da el color destacado).
function nombrePie(marca) {
  const partes = marca.logotipo_texto?.partes ?? [];
  if (partes.length === 0) return escapar(marca.nombre ?? "");
  const [primera, ...resto] = partes.map((p) => escapar(p.texto));
  return `<b>${primera}</b>${resto.join("")}`;
}

async function main() {
  const [carpeta] = process.argv.slice(2);
  if (!carpeta) throw new Error("Falta la carpeta de la pieza.");
  const pieza = path.resolve(carpeta);
  const fuente = path.join(pieza, "slides", "fuente");
  const salida = path.join(pieza, "slides", "html");

  const css = await readFile(path.join(ROOT, "marca", "plantillas", "lamina-4x5.css"), "utf8");
  const brand = JSON.parse(await readFile(path.join(ROOT, "herramientas", "open-carrusel", "data", "brand.json"), "utf8"));
  if (!brand.logoPath) throw new Error("open-carrusel no tiene logo: ejecuta sync-brand-open-carrusel.mjs.");
  const { marca = {} } = JSON.parse(await readFile(path.join(ROOT, "marca", "brand.json"), "utf8"));
  const pie = nombrePie(marca);
  if (!pie) throw new Error("marca/brand.json no tiene marca.nombre ni marca.logotipo_texto.");

  const archivos = (await readdir(fuente)).filter((f) => /^lamina-\d+\.html$/.test(f)).sort((a, b) => numero(a) - numero(b));
  if (archivos.length === 0) throw new Error(`No hay láminas en ${fuente}`);

  await mkdir(salida, { recursive: true });
  for (const [i, archivo] of archivos.entries()) {
    const contenido = (await readFile(path.join(fuente, archivo), "utf8")).trim();
    const pagina = archivos.length > 1 ? `<div class="pg">${i + 1}/${archivos.length}</div>` : "";
    const html =
      `<style>\n${css.trim()}\n</style><div class="s"><div class="glow"></div><div class="in">\n${contenido}\n</div>` +
      `<div class="foot"><div class="brand"><img src="${brand.logoPath}" alt=""><span>${pie}</span></div>${pagina}</div></div>\n`;
    await writeFile(path.join(salida, archivo), html);
  }
  console.log(`${archivos.length} lámina(s) en ${path.relative(ROOT, salida)}`);
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
