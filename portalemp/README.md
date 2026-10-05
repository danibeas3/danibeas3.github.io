# PortalEmp — landing

Primera versión de presentación comercial, en HTML, CSS y JavaScript estáticos.

- Vista local: `http://127.0.0.1:5173/portalemp/`.
- Las vistas de administración, dirección y trabajador son ilustrativas y emplean identidades y datos ficticios.
- `assets/resumen-mensual.png` es una captura real suministrada por el propietario, sin identificadores personales visibles. El PDF del trabajador no se incluye en la web.
- `assets/direccion-anonimizada.png` deriva de la captura de indicadores de gestión suministrada por el propietario. Se editó mediante el generador de imágenes integrado para sustituir todas las identidades y DNI; se revisó visualmente antes de incorporarla. La landing identifica expresamente la captura como editada. No se incluyen los originales con datos personales.
- Las cifras ilustran funciones; no representan métricas comerciales o resultados de clientes.
- Pestañas accesibles mediante flechas, Inicio y Fin. Animaciones desactivadas con `prefers-reduced-motion`.
- Formulario de contacto preparado con nombre, empresa, correo, tamaño de plantilla y mensaje. Envío desactivado hasta conectar el servicio y Turnstile; campo trampa preparado. Alternativa explícita por correo a `contacto@daniruiz.com`. Los datos introducidos no se transmiten ni guardan.
- Pendiente de configurar Cloudflare Pages, dominio `portalemp.daniruiz.com` y enlace desde el porfolio.

La carpeta puede servirse directamente, como PortalDoc. También se incluye en las entradas de Vite. Verificar con `node node_modules/vite/bin/vite.js build --outDir .preview-build` desde la raíz.

Comprobación realizada: compilación, tres vistas, navegación con teclado, apertura de preguntas frecuentes, carga de captura, anclas internas y anchuras de 320, 390, 768 y 1440 px.

## Segunda pasada de contenido

Se conserva hero, tipografías, paleta, bloques y navegación. Dirección incorpora cinco vistas, captura anonimizada, métricas de ficha individual con datos ficticios, matriz y CTA intermedio. Multiempresa se comunica en la tarjeta existente. El histórico de corrección se muestra como recorrido ilustrativo. Solo se modifica la landing.

Edición de imagen: herramienta integrada `image_gen`, modo `text-localization`. Prompt aplicado: preservar la interfaz, columnas, métricas, tipografías y colores de la captura; sustituir los nombres de cada fila por Lucía Montes, Marcos Soler, Celia Vega, Álvaro Vidal, Nora Campos, Hugo Ferrer, Elena Prado, Sergio Luna, Marta Oliva, Adrián Costa, Sara Beltrán, Iván Molina, Irene Roig, Leo Cabrera, Alicia Valls y Bruno Nieto; sustituir todos los DNI por «Datos de ejemplo»; sustituir «Hoy: IT» por «Hoy: ausencia»; eliminar completamente las identidades originales sin añadir ni rediseñar funciones.
