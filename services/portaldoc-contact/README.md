# Formularios de PortalDoc, PortalEmp, AulaQR y Alozenda

Worker compartido para `https://portaldoc.daniruiz.com` y `https://portalemp.daniruiz.com`. El origen permitido determina el producto, los campos y la plantilla; el token debe coincidir con el hostname de ese producto. PortalEmp recibe una plantilla morada con empresa, tamaño del equipo y mensaje.

## Configuración

- Endpoint: `https://portaldoc-contact.dani-ruizporcel.workers.dev`.
- `GET /config` entrega solamente la clave pública de Turnstile cuando el servicio está configurado.
- `POST /contact` valida tamaño, origen, campos, honeypot, límite de 5 intentos por IP y minuto, y Turnstile (hostname y acción `contact`).
- El destinatario se fija en el secreto `CONTACT_RECIPIENT`: la petición del visitante nunca puede elegir destinatarios.
- El remitente es `contacto@daniruiz.com` y `Reply-To` es el correo del visitante. Se entrega HTML y texto plano, con campos escapados.
- Secretos `TURNSTILE_SECRET` y `CONTACT_RECIPIENT` almacenados exclusivamente en Cloudflare. No añadir claves privadas ni el buzón real a Git.
- Envío a una dirección de destino verificada de Email Routing; dominio ya incorporado. No requiere contratar el envío general a terceros.
- Cloudflare confirma la aceptación del mensaje; la entrega final en la bandeja de entrada depende del proveedor del buzón.

## Desarrollo y publicación

`pnpm --ignore-workspace install` en este directorio. Las dependencias están fijadas en `pnpm-lock.yaml`. Ejecutar `node --test worker.test.js`.

Este Worker se publica con `pnpm exec wrangler deploy`, desde este directorio, usando un token con permiso **Scripts de Workers: Editar** limitado a la cuenta indicada en `wrangler.jsonc`. Mantener los secretos existentes al desplegar.

Las landings continúan publicándose automáticamente desde GitHub a Pages. El Worker está conectado a Workers Builds: repositorio `danibeas3/danibeas3.github.io`, rama `main`, directorio raíz `services/portaldoc-contact`, sin comando de compilación y publicación con `npx wrangler deploy --keep-vars`. Se reutiliza la integración y el token de Builds existentes; las compilaciones de ramas de vista previa están desactivadas. No crear tokens amplios ni incluir secretos en el repositorio.

El límite nativo de Cloudflare es aproximado y se aplica por ubicación de Cloudflare. Turnstile aporta la comprobación adicional; ningún filtro garantiza eliminar todo el spam.

Prueba de aceptación: usar la landing pública, una consulta marcada como prueba y un correo ficticio `prueba@example.com`. No usar claves de prueba Turnstile en producción ni desactivar validación para probar envíos.

## AulaQR

AulaQR utiliza exclusivamente el secreto AULAQR_RECIPIENT sin cambiar los destinatarios de los otros productos. Su plantilla HTML y texto plano incluye nombre, centro, correo y mensaje, con colores de AulaQR y Reply-To del visitante. Turnstile exige aulaqr.daniruiz.com. Desplegar con `wrangler deploy --keep-vars`.

## Alozenda

El origen permitido y el hostname de Turnstile son exclusivamente `alozenda.daniruiz.com`. Utiliza el destinatario ya configurado en `CONTACT_RECIPIENT`. La plantilla incluye nombre, alojamiento, correo, número de apartamentos y mensaje, con la identidad de Alozenda. No admite destinatarios proporcionados por el visitante. La demo de la aplicación mantiene sus propios correos simulados; este formulario comercial sí envía solicitudes al propietario.
