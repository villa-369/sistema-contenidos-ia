// Resume el estado de todas las piezas leyendo contenidos/*/meta.json.
// Uso: node herramientas/scripts/estado-piezas.mjs [--json]
// Muestra, por pieza y destino: estado, aprobación, fecha programada, ID de Zernio y bloqueos.
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const CONTENIDOS = path.join(ROOT, "contenidos");

async function leerPiezas() {
  const carpetas = (await readdir(CONTENIDOS, { withFileTypes: true })).filter((d) => d.isDirectory()).map((d) => d.name).sort();
  const piezas = [];
  for (const carpeta of carpetas) {
    try {
      const meta = JSON.parse(await readFile(path.join(CONTENIDOS, carpeta, "meta.json"), "utf8"));
      piezas.push({ carpeta, meta });
    } catch (err) {
      piezas.push({ carpeta, error: err.code === "ENOENT" ? "sin meta.json" : `meta.json ilegible: ${err.message}` });
    }
  }
  return piezas;
}

function filaDestino(d) {
  const partes = [
    d.destino.padEnd(18),
    (d.estado ?? "?").padEnd(11),
    d.aprobado ? "aprobado" : "sin aprobar",
    d.programado_para ? `· ${d.programado_para}` : d.hora_propuesta ? `· propuesta ${d.hora_propuesta}` : "",
    d.zernio_post_id ? `· zernio ${d.zernio_post_id}` : "",
    d.bloqueo ? `· BLOQUEO: ${d.bloqueo}` : "",
    d.publicacion ? `· ${d.publicacion}` : "",
  ];
  return "    " + partes.filter(Boolean).join(" ");
}

async function main() {
  const piezas = await leerPiezas();
  if (process.argv.includes("--json")) {
    console.log(JSON.stringify(piezas, null, 2));
    return;
  }
  const conteo = {};
  for (const { carpeta, meta, error } of piezas) {
    if (error) {
      console.log(`${carpeta}\n    ${error}`);
      continue;
    }
    console.log(`${carpeta} · ${meta.formato ?? "?"} · ${meta.titulo ?? ""}`);
    for (const d of meta.destinos ?? []) {
      console.log(filaDestino(d));
      conteo[d.estado ?? "?"] = (conteo[d.estado ?? "?"] ?? 0) + 1;
    }
  }
  console.log("\nDestinos por estado: " + Object.entries(conteo).map(([k, v]) => `${k} ${v}`).join(" · "));
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
