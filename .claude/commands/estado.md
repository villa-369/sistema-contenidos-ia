---
description: Resumen del sistema de contenidos — piezas por estado, lo programado en Zernio y lo que espera aprobación
argument-hint: "[sin argumentos]"
---

# /estado

Da una foto de dónde está todo. **Solo lee; no cambia nada.**

1. Ejecuta `node herramientas/scripts/estado-piezas.mjs` (estado por pieza y destino según cada `meta.json`).
2. En Zernio (servidor MCP `zernio`), con las cuentas de `marca/zernio.json`:
   - `posts_list_posts` con `status: "scheduled"` y luego `"failed"`; usa solo las publicaciones de las cuentas de la marca.
   - `accounts_get_all_accounts_health`: avisa si alguna cuenta de la marca no está `healthy` o si su token vence en menos de 21 días.
3. **Cruza los datos:**
   - Una publicación de Zernio sin pieza en `contenidos/` (ningún `meta.json` con ese `zernio_post_id`) es **externa**: señálala.
   - Un `meta.json` en estado `programado` cuyo ID no aparece en Zernio es una **discrepancia**: señálala.
4. Lee los bloqueos y decisiones vigentes: `meta.json` → `bloqueo`, y `marca/decisiones.md` (por ejemplo, destinos en pausa).

## Entrega

Una tabla corta **por fecha**: pieza · destino · estado · hora. Debajo, en este orden:

1. Lo que espera aprobación del dueño.
2. Bloqueos.
3. Fallos o discrepancias.
4. Próximo hueco libre en el calendario.

No propongas publicar nada desde aquí.
