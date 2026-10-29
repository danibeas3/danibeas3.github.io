# AulaQR · Landing comercial

Propuesta aprobada por el usuario el 29/10/2026, con corrección de proporción de la captura del administrador y solicitud de envío real de correo. Publicación autorizada en aulaqr.daniruiz.com. Cloudflare autorizado. Proyecto Pages aulaqr-daniruiz creado y servicio de correo desplegado conservando los secretos existentes. Dominio personalizado asociado y CNAME aulaqr → aulaqr-daniruiz.pages.dev creado con proxy activado. Dominio activo y verificado en Pages; HTTPS responde 200.

Vista previa: `http://127.0.0.1:5173/aulaqr/` con Vite desde la raíz del repositorio. `node node_modules/vite/bin/vite.js build --outDir .preview-build` compila el portfolio y las tres landings. La carpeta aulaqr también funciona como sitio estático independiente, sin compilación ni dependencias de servidor.

## Contenido y marca

Se conserva el anagrama de AulaQR, verde petróleo y lima, con DM Sans y Manrope alojadas localmente. Sus licencias están en assets. Se explican QR permanente, pasaporte, inventario por espacios, incidencias, intervenciones, historial y roles. No se inventan testimonios, número de clientes, precios, resultados económicos ni funciones pendientes como adjuntos de fotos.

Galería con cuatro capturas, ampliación mediante diálogo accesible y tres recorridos por rol. Pestañas compatibles con flechas, Inicio y Fin. Formulario con campos etiquetados, contraste, foco visible y adaptación para móvil. El enlace del portfolio está preparado en Aplicaciones & Software para la futura dirección `https://aulaqr.daniruiz.com/`.

## Procedencia de las capturas

Siete capturas originales, sin recreaciones ni edición de contenido, tomadas el 29/10/2026 de la aplicación Laravel real en la demo local existente. Se muestran expresamente como un entorno con datos de ejemplo. No proceden de la base de producción del centro.

| Archivo | Pantalla local capturada |
| --- | --- |
| assets/inicio.png | /inicio |
| assets/pasaporte.png | /equipos/equipo-3 |
| assets/aula.png | /espacios/diseno |
| assets/etiquetas.png | /qr |
| assets/tecnico-movil.png | /q/tkn-21 |
| assets/aviso-movil.png | /reportar/tkn-21 |
| assets/historial-movil.png | /q/tkn-3/historial |

Las capturas se obtuvieron navegando con una cuenta de demostración; no se enviaron incidencias ni invitaciones ni se alteró el contenido de los registros. Los nombres y correos de cuentas .test pertenecen a la demo. Las imágenes solo ilustran la app; los códigos de las capturas pertenecen al entorno local.

## Contacto y publicación

El formulario envía una consulta JSON al Worker de contacto ya utilizado por PortalDoc y PortalEmp. Se ha añadido AulaQR sin cambiar sus destinatarios: AULAQR_RECIPIENT es el destino exclusivo de este producto, configurado como secreto en Cloudflare. Nunca se acepta un destinatario proporcionado por el visitante. El mensaje usa HTML con tablas y estilos inline, alternativa de texto plano, marca verde petróleo/lima y Reply-To del visitante.

La entrada valida campos y tamaño, cabeceras, campo trampa, límite por IP, Turnstile con hostname aulaqr.daniruiz.com y acción contact. El frontend diferencia envío confirmado, error y conexión interrumpida; impide doble envío. En localhost se muestra una vista previa sin solicitar tokens de prueba ni permitir envíos desde orígenes locales.

Configurado: destinatario verificado de Email Routing, secreto AULAQR_RECIPIENT, hostname de Turnstile, Worker publicado conservando los otros secretos y Pages con raíz aulaqr/salida `.`, vinculado al repositorio main. El portfolio enlaza al subdominio. No publicar la aplicación administrativa ni sus archivos PHP, credenciales, sesiones o base de datos.

11 pruebas del servicio de correo superadas, incluidas regresiones PortalDoc/PortalEmp. Proporción de la captura comprobada: 1265/712 original frente a 629/354 renderizada, sin estiramiento. Compilación de la web correcta. La recepción final del correo debe confirmarse en la bandeja de entrada; no se deduce solo de la respuesta del proveedor.

## Comprobaciones de la propuesta

- Compilación Vite y sintaxis JavaScript sin errores.
- Recursos y anclas locales existentes, identificadores únicos.
- Galería, ampliación/cierre de capturas y selección de los tres roles.
- Pestañas con flechas, Inicio y Fin; un único panel visible por rol.
- Revisión visual en escritorio y móvil; sin desbordamiento horizontal a tamaños de móvil pequeño, móvil y tableta (320, 390 y 768 de viewport solicitado).
- Entrada de AulaQR visible junto a PortalEmp, portalDoc y Gestión de Apartamentos en el portfolio local; enlace publicado al subdominio de AulaQR.

Capturas de revisión de la landing fuera del directorio público, en `../aulaqr-landing-revision` respecto al directorio padre del repositorio. Diseño y publicación aprobados por el usuario.

## Verificación de publicación · 29/10/2026

Landing pública en https://aulaqr.daniruiz.com/, dominio activo, verificación DNS activa y HTTPS 200. Assets publicados comprobados. Portfolio publicado con enlace al subdominio. Prueba real desde el formulario público, Turnstile de producción sin claves de prueba, con consulta expresamente marcada como prueba y correo ficticio: respuesta de envío satisfactorio y campos bloqueados para evitar duplicados. La aceptación del mensaje se confirmó en la web; la recepción en Gmail queda a confirmar por el propietario. Capturas de evidencia fuera del repositorio.
