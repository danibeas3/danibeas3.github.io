# PortalDoc · Página de presentación

Landing pública independiente, disponible en `/portaldoc/`. El porfolio enlaza a esta página desde el proyecto PortalDoc.

## Vista previa y compilación

Instalar las dependencias del proyecto con `pnpm install` (o `npm install`). Ejecutar `pnpm dev` y abrir `/portaldoc/`. `pnpm build` genera el porfolio y la landing en `dist/`, mediante las dos entradas de `vite.config.js`.

## Contenido

- `index.html`: textos, estructura y enlace de contacto.
- `portaldoc.css`: estilo independiente y adaptación a móvil.
- `commercial.css`: presentación comercial y formulario de consulta.
- `portaldoc.js`: iconos, tres vistas de demostración y botón de presencia de ejemplo.
- `favicon.svg`: marca gráfica de esta presentación.

Las vistas son recreaciones en HTML basadas en las capturas facilitadas, con nombres y cifras ficticios. No se incluyen las capturas originales ni datos personales de los profesores. Las interacciones no registran actividad ni se conectan a PortalDoc.

El contacto utiliza contacto@daniruiz.com, el correo indicado para PortalDoc. La tipografía DM Sans se carga desde Google Fonts, con una alternativa del sistema si no está disponible.

El formulario prepara un enlace `mailto:` con el contexto del centro. El visitante revisa y envía la consulta en su aplicación de correo. No hay almacenamiento ni envío automático desde la web; se ofrece también el correo directo. Las tarifas, las condiciones comerciales y la demo completa están pendientes de definir. Las vistas ilustrativas actuales permanecen disponibles.

La dirección pública y canónica es `https://portaldoc.daniruiz.com/`.

## Publicación en Cloudflare Pages

Proyecto: `portaldoc-daniruiz`, conectado a `danibeas3/danibeas3.github.io`, rama `main`, con despliegues automáticos. Se publica como sitio estático sin comando de compilación: directorio raíz `portaldoc`, directorio de salida `.`. El dominio `portaldoc.daniruiz.com` apunta mediante CNAME a `portaldoc-daniruiz.pages.dev`.

El porfolio mantiene su proyecto Pages independiente (`danibeas3-github-io`) y enlaza a la dirección pública de PortalDoc. Ambos se actualizan al subir cambios a `main`. La landing no contiene autenticación ni lógica administrativa de la aplicación.
