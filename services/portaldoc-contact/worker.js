const ORIGIN = 'https://portaldoc.daniruiz.com';
const HOSTNAME = 'portaldoc.daniruiz.com';
const MAX_BODY = 12000;
const choices = ['Por concretar', 'De 1 a 10', 'De 11 a 30', 'Más de 30'];
const escape = value => value.replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));

export function validate(data) {
  if (!data || typeof data !== 'object' || Array.isArray(data)) return null;
  const clean = {};
  for (const [key, max] of [['name',100],['centre',150],['email',150],['message',2000],['teachers',30],['website',200],['token',2048]]) {
    if (typeof data[key] !== 'string' || data[key].length > max) return null;
    clean[key] = data[key].trim();
  }
  if (!clean.name || !clean.centre || /[\r\n\x00-\x1f]/.test(clean.name + clean.centre + clean.email)) return null;
  if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9.-]*[a-zA-Z0-9])?\.[a-zA-Z]{2,}$/.test(clean.email)) return null;
  if (!choices.includes(clean.teachers) || !clean.token || clean.website) return null;
  return clean;
}

export function emailContent(data) {
  const rows = [['Nombre',data.name],['Centro',data.centre],['Correo de contacto',data.email],['Docentes colaboradores',data.teachers]];
  const message = data.message || 'Me gustaría conocer las posibilidades de PortalDoc.';
  const text = ['Nueva consulta de PortalDoc','',...rows.map(([label,value]) => `${label}: ${value}`),'','Mensaje:',message].join('\n');
  const html = `<!doctype html><html lang="es"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head><body style="margin:0;background:#f5f6f0;font-family:Arial,sans-serif;color:#183d30"><table role="presentation" width="100%" cellspacing="0" cellpadding="0"><tr><td align="center" style="padding:32px 16px"><table role="presentation" width="600" cellspacing="0" cellpadding="0" style="width:100%;max-width:600px;background:#fff;border:1px solid #e0e8dd;border-radius:18px;overflow:hidden"><tr><td style="padding:32px;background:#183d30;color:#fff"><div style="color:#d8ec94;font-size:13px;letter-spacing:2px">PORTALDOC · CONTACTO</div><h1 style="font-size:28px;margin:16px 0 8px">Una nueva conversación.</h1><p style="margin:0;color:#e0eadf;line-height:1.6">Un centro quiere saber más sobre PortalDoc.</p></td></tr><tr><td style="padding:28px 32px"><table role="presentation" width="100%" cellspacing="0" cellpadding="0">${rows.map(([label,value]) => `<tr><td style="padding:12px 0;border-bottom:1px solid #edf0e8"><div style="font-size:12px;color:#68796e;margin-bottom:5px">${label}</div><div style="font-size:16px;line-height:1.5;overflow-wrap:anywhere">${escape(value)}</div></td></tr>`).join('')}</table><h2 style="font-size:16px;margin:28px 0 12px">Lo que le gustaría simplificar</h2><div style="padding:20px;background:#f5f7f0;border-radius:12px;line-height:1.7;overflow-wrap:anywhere">${escape(message).replace(/\r?\n/g,'<br>')}</div><p style="margin:28px 0"><a href="mailto:${escape(data.email)}" style="display:inline-block;padding:14px 22px;background:#183d30;color:#fff;text-decoration:none;border-radius:8px;font-weight:bold">Responder a la consulta ↗</a></p><p style="font-size:13px;color:#68796e;line-height:1.6">También puedes responder directamente a este correo.</p></td></tr><tr><td style="padding:20px 32px;background:#f8f9f4;color:#68796e;font-size:12px">Enviado desde portaldoc.daniruiz.com · Contacto público: contacto@daniruiz.com</td></tr></table></td></tr></table></body></html>`;
  return { html, text };
}

async function readBody(request) {
  if (Number(request.headers.get('content-length')) > MAX_BODY) throw new Error('size');
  if (!request.body) throw new Error('body');
  const reader = request.body.getReader();
  let size = 0;
  const chunks = [];
  try {
    for (;;) {
      const {done,value} = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > MAX_BODY) { await reader.cancel(); throw new Error('size'); }
      chunks.push(value);
    }
  } finally { reader.releaseLock(); }
  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk,offset); offset += chunk.length; }
  return JSON.parse(new TextDecoder().decode(bytes));
}

export async function handle(request, env, fetcher = fetch) {
  const origin = request.headers.get('Origin');
  const json = (data,status = 200) => new Response(JSON.stringify(data),{status,headers:{
    'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff',
    ...(origin === ORIGIN ? {'Access-Control-Allow-Origin':ORIGIN,'Vary':'Origin'} : {})
  }});
  const ready = env.EMAIL && env.RATE_LIMITER && env.TURNSTILE_SECRET && env.TURNSTILE_SITE_KEY && env.CONTACT_RECIPIENT;
  const path = new URL(request.url).pathname;
  if (path === '/config' && request.method === 'GET') return ready ? json({siteKey:env.TURNSTILE_SITE_KEY}) : json({error:'Servicio no disponible temporalmente.'},503);
  if (path !== '/contact') return json({error:'No encontrado.'},404);
  if (origin !== ORIGIN) return json({error:'Origen no permitido.'},403);
  if (request.method === 'OPTIONS') return new Response(null,{status:204,headers:{'Access-Control-Allow-Origin':ORIGIN,'Access-Control-Allow-Methods':'POST','Access-Control-Allow-Headers':'Content-Type','Vary':'Origin'}});
  if (request.method !== 'POST') return json({error:'Método no permitido.'},405);
  if (!ready) return json({error:'No se ha enviado la consulta. Prueba más tarde o escribe a contacto@daniruiz.com.'},503);
  if (!/^application\/json(?:\s*;|$)/i.test(request.headers.get('content-type') || '')) return json({error:'Formato no válido.'},415);
  let data;
  try { data = validate(await readBody(request)); } catch { return json({error:'La consulta no es válida o es demasiado larga.'},400); }
  if (!data) return json({error:'Revisa los datos de la consulta y la verificación antispam.'},400);
  const ip = request.headers.get('CF-Connecting-IP');
  if (!ip) return json({error:'No se pudo verificar la solicitud.'},403);
  try {
    const limited = await env.RATE_LIMITER.limit({key:ip});
    if (!limited.success) return json({error:'Has realizado varios intentos. Espera un minuto y vuelve a intentarlo.'},429);
    const verified = await fetcher('https://challenges.cloudflare.com/turnstile/v0/siteverify',{
      method:'POST',headers:{'Content-Type':'application/json'},
      body:JSON.stringify({secret:env.TURNSTILE_SECRET,response:data.token,remoteip:ip}),signal:AbortSignal.timeout(10000)
    });
    if (!verified.ok) throw new Error('verification-unavailable');
    const result = await verified.json();
    if (!result.success || result.hostname !== HOSTNAME || result.action !== 'contact') return json({error:'La verificación antispam ha caducado o no es válida. Vuelve a intentarlo.'},400);
    await env.EMAIL.send({
      from:{email:'contacto@daniruiz.com',name:'PortalDoc · Consultas'},
      to:env.CONTACT_RECIPIENT,replyTo:data.email,
      subject:'Nueva consulta sobre PortalDoc',...emailContent(data)
    });
    return json({success:true,message:'Tu consulta se ha enviado. Gracias por contactar; te responderé en el correo que has indicado.'});
  } catch {
    // Do not log contact details, IPs, tokens or provider errors containing private data.
    return json({error:'No se ha podido confirmar el envío. Prueba más tarde o escribe a contacto@daniruiz.com.'},502);
  }
}

export default {fetch(request, env) { return handle(request, env); }};
