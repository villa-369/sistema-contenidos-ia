// Crea el proyecto HyperFrames de un Reel copiando otro como plantilla.
// Uso: node herramientas/scripts/nuevo-reel.mjs <AAAA-MM-DD_tema> [plantilla]
//   plantilla: nombre de un proyecto en herramientas/hyperframes/reels/
//              (por defecto, el más reciente que tenga compositions/frames/05-cta.html).
// Copia estructura, fondo, assets y escenas (para reescribirlas), sin renders ni artefactos.
// Después hay que reescribir BRIEF.md, STORYBOARD.md, las escenas e index.html.
import { cp, readdir, readFile, writeFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const REELS = path.join(ROOT, "herramientas", "hyperframes", "reels");
const EXCLUIR = new Set(["renders", ".hyperframes", ".thumbnails", "node_modules"]);
const NOMBRE_VALIDO = /^\d{4}-\d{2}-\d{2}_[a-z0-9-]+$/;

async function existe(p) {
  try {
    await stat(p);
    return true;
  } catch {
    return false;
  }
}

async function plantillaPorDefecto() {
  const nombres = (await readdir(REELS)).filter((n) => NOMBRE_VALIDO.test(n)).sort().reverse();
  for (const n of nombres) {
    if (await existe(path.join(REELS, n, "compositions", "frames", "05-cta.html"))) return n;
  }
  throw new Error("No hay ningún proyecto de Reel que sirva de plantilla.");
}

async function main() {
  const [nombre, plantillaArg] = process.argv.slice(2);
  if (!nombre || !NOMBRE_VALIDO.test(nombre)) throw new Error("Uso: nuevo-reel.mjs <AAAA-MM-DD_tema> [plantilla]");
  const destino = path.join(REELS, nombre);
  if (await existe(destino)) throw new Error(`Ya existe ${path.relative(ROOT, destino)}`);

  const plantilla = plantillaArg ?? (await plantillaPorDefecto());
  const origen = path.join(REELS, plantilla);
  if (!(await existe(origen))) throw new Error(`No existe la plantilla ${plantilla}`);

  await cp(origen, destino, {
    recursive: true,
    filter: (src) => !EXCLUIR.has(path.basename(src)),
  });

  const pkgPath = path.join(destino, "package.json");
  const pkg = JSON.parse(await readFile(pkgPath, "utf8"));
  await writeFile(pkgPath, JSON.stringify({ ...pkg, name: nombre }, null, 2) + "\n");
  await writeFile(path.join(destino, "meta.json"), JSON.stringify({ id: nombre, name: nombre }, null, 2) + "\n");

  console.log(`Proyecto creado: ${path.relative(ROOT, destino)} (plantilla: ${plantilla})`);
  console.log("Siguiente: reescribir BRIEF.md, STORYBOARD.md, compositions/frames/*.html e index.html; luego `npx hyperframes check`.");
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
