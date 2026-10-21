---
description: Programa en Zernio una pieza aprobada, destino por destino, y la registra en meta.json
argument-hint: "<carpeta de la pieza en contenidos/> [destinos]"
---

# /programar $ARGUMENTS

Sube y programa una pieza en Zernio. Lo que hace este comando no se puede deshacer del todo una vez publicado, así que sigue estas reglas sin excepción.

## 0. Aprobación (regla 1 de `CLAUDE.md`)

- Hace falta una aprobación **explícita del dueño en esta conversación** para **esta pieza, estos destinos y esta fecha**.
- Un `aprobado: true` en `meta.json` de otro día **no basta**. Tampoco basta una aprobación de otra pieza.
- Si falta, muestra qué se va a programar (pieza, destinos, fecha y hora, inicio de cada texto) y **pide el sí**.
- **Perfil personal de LinkedIn:** confirma además que no queda ningún «Para revisar, dueño» en `copy.md`.
- **Destinos en pausa** según `marca/decisiones.md`: no se programan, aunque se pidan sin más; avisa.
- **Facebook personal:** Zernio no lo admite. Entrega el texto y los archivos para que el dueño los publique a mano.

## 1. Comprobaciones previas

1. Las cuentas salen de `marca/zernio.json`. Nunca uses cuentas de otras marcas.
2. Ejecuta `accounts_get_all_accounts_health` y comprueba que las cuentas de destino están sanas.
3. Ejecuta `posts_list_posts` (`status: "scheduled"`) y comprueba que la fecha no choca con otra publicación del mismo destino.
4. Comprueba los archivos:
   - **Reel:** MP4 verificado y portada;
   - **Carrusel o imagen:** `slide-N.png`;
   - **LinkedIn:** el PDF.

## 2. Subir archivos

Por cada archivo:
1. `call_tool` → `media_get_media_presigned_url` (nombre único con prefijo de la pieza y `content_type`).
2. `PUT` con `curl -X PUT -H "Content-Type: <tipo>" --data-binary @<archivo> "<uploadUrl>"`. Tiene que devolver 200.

Las subidas caducan a los 7 días si no se usan en una publicación.

## 3. Validar y crear

1. **Cuerpo de la publicación:** una sola publicación con un elemento por destino en `platforms`. Cada elemento lleva:
   - `accountId`;
   - `customContent`: el texto exacto de su sección en `copy.md`;
   - `platformSpecificData` según el formato:
     - Instagram Reel: `{ "instagramThumbnail": <portada> }`;
     - Facebook Reel: `{ "contentType": "reel", "title": <título del Reel> }`;
     - LinkedIn documento: `documentTitle`, con el PDF como `media_items` de tipo `document` y nada más.

   Fuera de `platforms`:
   - `media_items`: los archivos subidos (en los videos, añade `thumbnail` e `instagramThumbnail`);
   - `scheduled_for` en hora local sin desfase, más `timezone` de `marca/zernio.json` (así se respeta el cambio de horario);
   - `metadata.pieza`.
2. `validate_post` con ese mismo cuerpo. Tiene que salir sin errores.
3. `call_tool` → `posts_create_post`. **Para sustituir** una publicación existente, usa `posts_update_post` con su `post_id` e `is_draft: false`, en lugar de borrarla.
4. Comprueba la respuesta: `status: "scheduled"` y la hora en UTC correcta.

## 4. Registrar

En `meta.json`, por destino:
- `estado: "programado"`, `aprobado: true` y `aprobado_el`;
- `zernio_post_id` y `programado_para`.

Añade una línea en `historial`. Actualiza la tabla de `estrategia/publicacion.md` si la pieza aparece allí.

## 5. Después de publicar

Cuando pase la fecha, `posts_get` debe dar `published`. Si falla, revisa `posts_list_failed` y explica el error al dueño. **No reintentes sin avisar.**
