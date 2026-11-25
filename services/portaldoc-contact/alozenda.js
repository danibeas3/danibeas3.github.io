const sizes = [
  "1 apartamento",
  "De 2 a 5",
  "De 6 a 15",
  "Más de 15",
  "Estoy empezando",
];
const escape = (value) =>
  value.replace(
    /[&<>"']/g,
    (char) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        char
      ],
  );

export function validateAlozenda(data) {
  if (!data || typeof data !== "object" || Array.isArray(data)) return null;
  const clean = {};
  for (const [key, max] of [
    ["name", 100],
    ["company", 150],
    ["email", 150],
    ["apartments", 30],
    ["message", 2000],
    ["website", 200],
    ["token", 2048],
  ]) {
    if (typeof data[key] !== "string" || data[key].length > max) return null;
    clean[key] = data[key].trim();
  }
  if (
    !clean.name ||
    !clean.company ||
    /[\r\n\x00-\x1f]/.test(clean.name + clean.company + clean.email) ||
    !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9.-]*[a-zA-Z0-9])?\.[a-zA-Z]{2,}$/.test(
      clean.email,
    ) ||
    !sizes.includes(clean.apartments) ||
    !clean.token ||
    clean.website
  )
    return null;
  return clean;
}

export function alozendaEmailContent(data) {
  const rows = [
    ["Nombre", data.name],
    ["Alojamiento o empresa", data.company],
    ["Correo de contacto", data.email],
    ["Apartamentos", data.apartments],
  ];
  const message =
    data.message ||
    "Me gustaría solicitar Alozenda para gestionar mis apartamentos.";
  const text = [
    "Nueva solicitud de Alozenda",
    "",
    ...rows.map(([label, value]) => `${label}: ${value}`),
    "",
    "Mensaje",
    message,
    "",
    "Enviada desde alozenda.daniruiz.com",
  ].join("\n");
  const html = `<!doctype html><html lang="es"><head><meta charset="utf-8"></head><body style="margin:0;background:#edf4f2;color:#143b56;font-family:Arial,sans-serif"><table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:32px 12px"><table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;background:#fff;border-radius:16px;overflow:hidden"><tr><td style="background:#143b56;padding:32px;color:#fff"><div style="font-size:28px;font-weight:bold">Alozenda</div><h1 style="font-size:25px;margin:24px 0 12px">Un alojamiento quiere empezar.</h1><p style="color:#c7e5d7;line-height:1.6;margin:0">Nueva solicitud del programa gratuito de gestión de apartamentos.</p></td></tr><tr><td style="padding:28px 32px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rows.map(([label, value]) => `<tr><td style="padding:14px 0;border-bottom:1px solid #dbe5df"><div style="font-size:12px;color:#536572;margin-bottom:6px">${label}</div><div style="font-size:16px;line-height:1.6;overflow-wrap:anywhere">${escape(value)}</div></td></tr>`).join("")}</table><h2 style="font-size:17px;margin:28px 0 12px">Qué necesita su alojamiento</h2><div style="padding:20px;background:#edf4f2;border-radius:8px;line-height:1.8;overflow-wrap:anywhere">${escape(message).replace(/\r?\n/g, "<br>")}</div><p style="margin:28px 0 0"><a href="mailto:${escape(data.email)}" style="display:inline-block;padding:15px 22px;background:#143b56;color:#fff;border-radius:8px;text-decoration:none;font-weight:bold">Responder a la solicitud</a></p><p style="font-size:12px;color:#536572;line-height:1.7">También puedes responder directamente a este correo.</p></td></tr><tr><td style="padding:20px 32px;background:#f8faf9;color:#536572;font-size:12px">Alozenda · Una aplicación de Dani Ruiz<br>Solicitud enviada desde alozenda.daniruiz.com</td></tr></table></td></tr></table></body></html>`;
  return { html, text };
}
