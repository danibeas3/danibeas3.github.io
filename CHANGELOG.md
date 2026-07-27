# Registro de Cambios (Changelog)

Todos los cambios notables realizados en este proyecto serán documentados en este archivo.

El formato se basa en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/) y este proyecto adhiere a la versión semántica.

---

## [Unreleased] - 2026-07-27

### 📩 Añadido / Modificado
- **Integración de Formulario de Contacto en GitHub Pages (Web3Forms + Anti-Spam):**
  - Configurada la API de Web3Forms con token de acceso seguro en [index.html](file:///c:/xampp/htdocs/daniruizweb/index.html#L340-L352).
  - Añadido campo trampolín *Honeypot* oculto (`botcheck`) para filtrado automático de spam y bots.
  - Actualizado [js/scripts.js](file:///c:/xampp/htdocs/daniruizweb/js/scripts.js#L258-L320) estructurando el payload de Web3Forms con nombres de campo formateados en español, asunto dinámico con el nombre del emisor, fecha/hora de envío y asignación automática de cabecera `Reply-To`.

## [Unreleased] - 2026-07-25

### 🌟 Añadido
- **Estrellas fugaces en Escenario 4 (Modo Noche):**
  - Incorporadas 4 estrellas fugaces animadas dentro del `<section id="escenario4">` en [index.html](file:///f:/Desarrollo/danibeas3.github.io/index.html#L237-L241).
  - Regla CSS en [estilo.css](file:///f:/Desarrollo/danibeas3.github.io/css/estilo.css#L2070-L2075) para mantener las estrellas ocultas de día y mostrarlas exclusivamente cuando el Escenario 4 entra en `.modo-oscuro` (madrugada, anochecer y noche).

### ✏️ Modificado
- **Competencias y Estilo de Círculos en Escenario 3 (#escenario3):**
  - Actualizada la lista `<ul>` del círculo izquierdo en [index.html](file:///f:/Desarrollo/danibeas3.github.io/index.html#L186-L192) incorporando conocimientos en Inteligencia Artificial y LLMs (APIs REST / SQL / IA, Integration LLM / Prompting).
  - Ajustados márgenes, padding e interlineado en [estilo.css](file:///f:/Desarrollo/danibeas3.github.io/css/estilo.css#L848-L895) para círculos laterales, eliminando el desbordamiento de texto manteniendo el diseño circular limpio.
- **Tipografía y colores dinámicos de globos en Escenario 4 (#escenario4):**
  - `.globo-label` cambia a fuente `'Marcelle', cursive` (1.5rem) con color cálido oscuro `#4A3B53` de día, y lavanda claro `#EDE0F5` de noche en [estilo.css](file:///f:/Desarrollo/danibeas3.github.io/css/estilo.css#L2082-L2100).
  - `.globo-badge` sustituye el morado neón fijo por un rosa-malva pastel suave `#C8A8D8` de día y violeta apagado `#8B6BAE` de noche, con `transition: background 1s ease, color 1s ease` para cambio fluido entre ciclos horarios.
- **Reorganización de bloques en Escenario 2 (#escenario2):**
  - **Bloque 1:** Actualizada la primera burbuja con imagen `imagenes/21.png`, título **Software & Apps** y descripción sobre aplicaciones a medida y herramientas de gestión en [index.html](file:///f:/Desarrollo/danibeas3.github.io/index.html#L98-L102).
  - **Bloque 2:** Actualizada la segunda burbuja con imagen `imagenes/22.png`, título **Desarrollo Web** y descripción sobre sitios web funcionales y modernos en [index.html](file:///f:/Desarrollo/danibeas3.github.io/index.html#L104-L108).

### 🔍 Auditado y Verificado
- **Fondo dinámico por franja horaria en Escenario 4:**
  - Verificada la función `aplicarFondoHorario()` en [js/scripts.js](file:///f:/Desarrollo/danibeas3.github.io/js/scripts.js#L309-L345) que adapta los colores pastel y marinos según la hora local del usuario (8 tramos del día) mediante `new Date()`.
