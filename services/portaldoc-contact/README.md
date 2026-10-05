# Formularios de PortalDoc y PortalEmp

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

La landing continúa publicándose automáticamente desde GitHub a Pages. El Worker se despliega por separado; no se conectó Workers Builds porque sus opciones exigen un token con permisos adicionales innecesarios para este servicio. No crear tokens amplios ni incluir secretos en el repositorio.

El límite nativo de Cloudflare es aproximado y se aplica por ubicación de Cloudflare. Turnstile aporta la comprobación adicional; ningún filtro garantiza eliminar todo el spam.

Prueba de aceptación: usar la landing pública, una consulta marcada como prueba y un correo ficticio `prueba@example.com`. No usar claves de prueba Turnstile en producción ni desactivar validación para probar envíos.
