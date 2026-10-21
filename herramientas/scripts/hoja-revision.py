"""Hoja de revisión: une varias imágenes en una cuadrícula para revisarlas de un vistazo.

Uso: python -I herramientas/scripts/hoja-revision.py <salida.png> <imagen1> [imagen2 ...] [--columnas N] [--ancho PX]
Ejemplo: python -I herramientas/scripts/hoja-revision.py hoja.png contenidos/<pieza>/slides/slide-*.png
Requiere Pillow.
"""
import argparse
import glob
import sys

from PIL import Image

COLUMNAS_POR_DEFECTO = 3
ANCHO_CELDA_POR_DEFECTO = 540


def main():
    parser = argparse.ArgumentParser(description="Une imágenes en una hoja de revisión.")
    parser.add_argument("salida")
    parser.add_argument("imagenes", nargs="+")
    parser.add_argument("--columnas", type=int, default=COLUMNAS_POR_DEFECTO)
    parser.add_argument("--ancho", type=int, default=ANCHO_CELDA_POR_DEFECTO)
    args = parser.parse_args()

    rutas = sorted({r for patron in args.imagenes for r in glob.glob(patron)}, key=lambda r: (len(r), r))
    if not rutas:
        sys.exit("No se encontró ninguna imagen.")

    celdas = []
    for ruta in rutas:
        with Image.open(ruta) as img:
            alto = round(img.height * args.ancho / img.width)
            celdas.append(img.convert("RGB").resize((args.ancho, alto)))

    columnas = min(args.columnas, len(celdas))
    filas = -(-len(celdas) // columnas)
    alto_celda = max(c.height for c in celdas)
    hoja = Image.new("RGB", (args.ancho * columnas, alto_celda * filas), "white")
    for i, celda in enumerate(celdas):
        hoja.paste(celda, ((i % columnas) * args.ancho, (i // columnas) * alto_celda))
    hoja.save(args.salida)
    print(f"{len(celdas)} imagen(es) en {args.salida}")


if __name__ == "__main__":
    main()
