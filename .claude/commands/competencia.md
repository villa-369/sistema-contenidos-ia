---
description: Descubre quiénes compiten con la marca (por tipo) a partir de su oferta, con fuentes públicas, y propone qué cambiar en el contenido
argument-hint: "[países, por defecto los del cuestionario] [actualizar]"
---

# /competencia $ARGUMENTS

Busca y ordena a la competencia de la marca partiendo de **su oferta y su cliente ideal**, no de una lista que el dueño ya tenga. **Solo investiga y propone:** no cambia `marca/` sin aprobación, no publica y no interactúa con ninguna cuenta.

## 1. Punto de partida

- Lee `.agents/product-marketing.md`, `marca/voz.md` §1, `marca/nichos.md`, `marca/objeciones.md` y, si existe, el bloque 7 del cuestionario (`fuentes/cuestionario/`). Si el dueño ya nombró competidores, inclúyelos.
- Si existe `estrategia/competencia.md` y el argumento es `actualizar`, parte de ella y marca lo nuevo y lo que cambió.
- Define de 6 a 10 **frases de búsqueda**: las que usaría el cliente para describir su problema o la solución (por ejemplo, «chatbot WhatsApp para clínica», «agente de IA para mi negocio»), en el idioma y los países de la marca.

## 2. Buscar por los cinco tipos de competidor

| Tipo | Qué buscar |
|---|---|
| 1 · Directos | Quien hace lo mismo para el mismo cliente (agencias, profesionales independientes) |
| 2 · Autoservicio | Herramientas y plataformas con las que el cliente lo arma solo, incluidas las funciones nativas de las grandes plataformas |
| 3 · Software del sector | Programas del rubro del cliente que ya traen la función incluida |
| 4 · Formación | Cursos, retos y webinars que enseñan a hacerlo (también crean nuevos competidores) |
| 5 · No hacer nada | Lo que el cliente usa hoy (herramientas básicas, hacerlo él mismo, contratar a alguien) |

**Fuentes, en este orden:**
1. **Búsqueda web** (`WebSearch`) con las frases del paso 1, por tipo.
2. **Biblioteca de Anuncios de Meta** con el navegador integrado, **sin iniciar sesión**: `https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=<XX>&q=<frase>&search_type=keyword_unordered&media_type=all`, para cada país relevante. Anota anunciante, mensaje, fecha de inicio y plataformas. Un anuncio que lleva semanas activo probablemente funciona.
3. Directorios y comparativas de software, sitios web de los competidores y YouTube (si `agent-reach` está disponible).

**Reglas:**
- Solo fuentes públicas. **Nunca** iniciar sesión con las cuentas de la marca, seguir, dar «me gusta», comentar ni escribir a un competidor.
- Cada dato lleva su enlace o su ID de anuncio y la fecha de consulta. Lo que dice el propio proveedor se marca **autodeclarado**; lo que no se pudo confirmar, **pendiente de verificar**.
- Las cifras de terceros no se publican (regla 2 de `CLAUDE.md`).
- Filtra a quien no apunta al mismo cliente, idioma o país.

## 3. Entrega: `estrategia/competencia.md`

1. **Resumen** de 4 o 5 hallazgos.
2. **Una tabla por tipo**: competidor, qué ofrece, cómo se presenta (gancho y promesa), canales y si tiene anuncios activos, y fuente.
3. **Qué significa para el contenido:** propuestas concretas (objeciones nuevas, ganchos que ya están gastados, en qué no competir, series o pilares nuevos), cada una apoyada en `fuentes/`, el sitio o `marca/`.
4. **A quién seguir de cerca** (de 3 a 5), que es la entrada de `/referentes`.
5. **Pendiente de verificar.**

Muestra el resumen en el chat y pide la aprobación de las propuestas. **Solo con aprobación** las pasas a `marca/objeciones.md`, `marca/voz.md`, `estrategia/pilares.md` y `marca/decisiones.md`. Nunca se nombra a un competidor en el contenido publicado.
