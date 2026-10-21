// Copia la marca de marca/brand.json a open-carrusel (PUT /api/brand).
// Uso: node herramientas/scripts/sync-brand-open-carrusel.mjs [logoUrl] [puerto]
//   logoUrl: ruta /uploads/... devuelta por POST /api/upload al subir marca/icono.png
// Requiere el servidor de open-carrusel en marcha (npm run dev).
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const [logoUrl = null, port = "3000"] = process.argv.slice(2);

async function main() {
  const brand = JSON.parse(await readFile(path.join(ROOT, "marca", "brand.json"), "utf8"));
  const c = brand.colores;

  const payload = {
    name: brand.marca.nombre,
    colors: {
      primary: c.primario.hex,
      secondary: c.secundario.hex,
      accent: c.acento.hex,
      background: c.fondo.hex,
      surface: c.superficie_hex ?? "#1a1924",
    },
    fonts: {
      heading: brand.tipografias.titulos.familia,
      body: brand.tipografias.cuerpo.familia,
    },
    customFonts: [],
    logoPath: logoUrl,
    styleKeywords: brand.palabras_clave_estilo,
  };

  const res = await fetch(`http://localhost:${port}/api/brand`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    throw new Error(`open-carrusel respondió ${res.status}: ${await res.text()}`);
  }
  console.log("Marca sincronizada:", JSON.stringify(await res.json()));
}

main().catch((err) => {
  console.error("Error al sincronizar la marca:", err.message);
  process.exit(1);
});
