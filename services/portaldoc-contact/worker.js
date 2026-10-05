const ORIGIN = 'https://portaldoc.daniruiz.com';
const HOSTNAME = 'portaldoc.daniruiz.com';
const EMP_ORIGIN = 'https://portalemp.daniruiz.com';
const MAX_BODY = 12000;
const choices = ['Por concretar', 'De 1 a 10', 'De 11 a 30', 'Más de 30'];
const escape = value => value.replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));

export function validate(data, product = 'PortalDoc') {
  if (!data || typeof data !== 'object' || Array.isArray(data)) return null;
  const clean = {};
  const emp = product === 'PortalEmp';
  for (const [key, max] of [['name',100],[emp?'company':'centre',150],['email',150],['message',2000],[emp?'employees':'teachers',30],['website',200],['token',2048]]) {
    if (typeof data[key] !== 'string' || data[key].length > max) return null;
    clean[key] = data[key].trim();
  }
  const organisation = clean[emp?'company':'centre'];
  if (!clean.name || !organisation || /[\r\n\x00-\x1f]/.test(clean.name + organisation + clean.email)) return null;
  if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9.-]*[a-zA-Z0-9])?\.[a-zA-Z]{2,}$/.test(clean.email)) return null;
  const sizes = emp ? ['Por concretar','De 1 a 10','De 11 a 30','De 31 a 100','Más de 100'] : choices;
  if (!sizes.includes(clean[emp?'employees':'teachers']) || !clean.token || clean.website) return null;
  return clean;
}

export function emailContent(data, product = 'PortalDoc') {
  if (product === 'PortalEmp') return employeeEmailContent(data);
  const rows = [['Nombre',data.name],['Centro',data.centre],['Correo de contacto',data.email],['Docentes colaboradores',data.teachers]];
  const message = data.message || 'Me gustaría conocer las posibilidades de PortalDoc.';
  const text = ['Nueva consulta de PortalDoc','',...rows.map(([label,value]) => `${label}: ${value}`),'','Mensaje:',message].join('\n');
  const html = `<!doctype html><html lang="es"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head><body style="margin:0;background:#f5f6f0;font-family:Arial,sans-serif;color:#183d30"><table role="presentation" width="100%" cellspacing="0" cellpadding="0"><tr><td align="center" style="padding:32px 16px"><table role="presentation" width="600" cellspacing="0" cellpadding="0" style="width:100%;max-width:600px;background:#fff;border:1px solid #e0e8dd;border-radius:18px;overflow:hidden"><tr><td style="padding:32px;background:#183d30;color:#fff"><div style="color:#d8ec94;font-size:13px;letter-spacing:2px">PORTALDOC · CONTACTO</div><h1 style="font-size:28px;margin:16px 0 8px">Una nueva conversación.</h1><p style="margin:0;color:#e0eadf;line-height:1.6">Un centro quiere saber más sobre PortalDoc.</p></td></tr><tr><td style="padding:28px 32px"><table role="presentation" width="100%" cellspacing="0" cellpadding="0">${rows.map(([label,value]) => `<tr><td style="padding:12px 0;border-bottom:1px solid #edf0e8"><div style="font-size:12px;color:#68796e;margin-bottom:5px">${label}</div><div style="font-size:16px;line-height:1.5;overflow-wrap:anywhere">${escape(value)}</div></td></tr>`).join('')}</table><h2 style="font-size:16px;margin:28px 0 12px">Lo que le gustaría simplificar</h2><div style="padding:20px;background:#f5f7f0;border-radius:12px;line-height:1.7;overflow-wrap:anywhere">${escape(message).replace(/\r?\n/g,'<br>')}</div><p style="margin:28px 0"><a href="mailto:${escape(data.email)}" style="display:inline-block;padding:14px 22px;background:#183d30;color:#fff;text-decoration:none;border-radius:8px;font-weight:bold">Responder a la consulta ↗</a></p><p style="font-size:13px;color:#68796e;line-height:1.6">También puedes responder directamente a este correo.</p></td></tr><tr><td style="padding:20px 32px;background:#f8f9f4;color:#68796e;font-size:12px">Enviado desde portaldoc.daniruiz.com · Contacto público: contacto@daniruiz.com</td></tr></table></td></tr></table></body></html>`;
  return { html, text };
}

function employeeEmailContent(data) {
  const rows = [['Persona de contacto',data.name],['Empresa',data.company],['Correo para responder',data.email],['Personas en el equipo',data.employees]];
  const message = data.message || 'Me gustaría conocer las posibilidades de PortalEmp para mi empresa.';
  const text = ['Nueva consulta de PortalEmp','',...rows.map(([label,value])=>`${label}: ${value}`),'','Qué necesita su equipo:',message,'','Enviado desde portalemp.daniruiz.com'].join('\n');
  const html = `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head><body style="margin:0;background:#f3f1f8;color:#252252;font-family:Arial,Helvetica,sans-serif"><table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:32px 12px"><table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;background:#fff;border:1px solid #e5e0f1;border-radius:20px;overflow:hidden"><tr><td style="padding:34px 28px;background:#252252;color:#fff"><div style="font-size:24px;font-weight:bold">Portal<span style="color:#c2b1ff">Emp</span></div><div style="font-size:11px;letter-spacing:2px;color:#d1c7ed;margin-top:22px">NUEVA CONSULTA · CONTACTO WEB</div><h1 style="font-size:30px;line-height:1.2;margin:12px 0">Un equipo quiere<br>dar el siguiente paso.</h1><p style="font-size:15px;line-height:1.7;color:#e0d9ee;margin:0">Una nueva conversación sobre jornada laboral y gestión de personas.</p></td></tr><tr><td style="padding:28px"><div style="font-size:11px;letter-spacing:1px;color:#78648f;margin-bottom:8px">LOS DATOS DE LA CONSULTA</div><table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rows.map(([label,value])=>`<tr><td style="padding:14px 0;border-bottom:1px solid #eeeaf5"><div style="font-size:12px;color:#756d83;margin-bottom:5px">${label}</div><div style="font-size:16px;font-weight:bold;line-height:1.5;overflow-wrap:anywhere">${escape(value)}</div></td></tr>`).join('')}</table><h2 style="font-size:18px;margin:28px 0 12px">¿Qué necesita su equipo?</h2><div style="padding:20px;background:#f5f2fb;border-left:4px solid #7350dc;border-radius:8px;font-size:15px;line-height:1.8;overflow-wrap:anywhere">${escape(message).replace(/\r?\n/g,'<br>')}</div><table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:28px"><tr><td bgcolor="#7350dc" style="border-radius:10px"><a href="mailto:${escape(data.email)}" style="display:inline-block;padding:16px 22px;color:#fff;font-size:15px;font-weight:bold;text-decoration:none">Responder a ${escape(data.name)} ↗</a></td></tr></table><p style="font-size:13px;color:#756d83;line-height:1.6;margin:16px 0 0">Puedes responder directamente a este correo: la respuesta llegará a la persona que ha enviado la consulta.</p></td></tr><tr><td style="padding:20px 28px;background:#f8f6fc;font-size:12px;line-height:1.7;color:#756d83">PortalEmp · Tu equipo. Cada jornada. Todo conectado.<br>Consulta recibida desde <a href="https://portalemp.daniruiz.com/" style="color:#7350dc">portalemp.daniruiz.com</a><br>Contacto: contacto@daniruiz.com</td></tr></table></td></tr></table></body></html>`;
  return {html,text};
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
  const allowed = origin === ORIGIN || origin === EMP_ORIGIN;
  const product = origin === EMP_ORIGIN ? 'PortalEmp' : 'PortalDoc';
  const hostname = product === 'PortalEmp' ? 'portalemp.daniruiz.com' : HOSTNAME;
  const json = (data,status = 200) => new Response(JSON.stringify(data),{status,headers:{
    'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff',
    ...(allowed ? {'Access-Control-Allow-Origin':origin,'Vary':'Origin'} : {})
  }});
  const ready = env.EMAIL && env.RATE_LIMITER && env.TURNSTILE_SECRET && env.TURNSTILE_SITE_KEY && env.CONTACT_RECIPIENT;
  const path = new URL(request.url).pathname;
  if (path === '/config' && request.method === 'GET') return ready ? json({siteKey:env.TURNSTILE_SITE_KEY}) : json({error:'Servicio no disponible temporalmente.'},503);
  if (path !== '/contact') return json({error:'No encontrado.'},404);
  if (!allowed) return json({error:'Origen no permitido.'},403);
  if (request.method === 'OPTIONS') return new Response(null,{status:204,headers:{'Access-Control-Allow-Origin':origin,'Access-Control-Allow-Methods':'POST','Access-Control-Allow-Headers':'Content-Type','Vary':'Origin'}});
  if (request.method !== 'POST') return json({error:'Método no permitido.'},405);
  if (!ready) return json({error:'No se ha enviado la consulta. Prueba más tarde o escribe a contacto@daniruiz.com.'},503);
  if (!/^application\/json(?:\s*;|$)/i.test(request.headers.get('content-type') || '')) return json({error:'Formato no válido.'},415);
  let data;
  try { data = validate(await readBody(request),product); } catch { return json({error:'La consulta no es válida o es demasiado larga.'},400); }
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
    if (!result.success || result.hostname !== hostname || result.action !== 'contact') return json({error:'La verificación antispam ha caducado o no es válida. Vuelve a intentarlo.'},400);
    await env.EMAIL.send({
      from:{email:'contacto@daniruiz.com',name:`${product} · Consultas`},
      to:env.CONTACT_RECIPIENT,replyTo:data.email,
      subject:`Nueva consulta sobre ${product}`,...emailContent(data,product)
    });
    return json({success:true,message:'Tu consulta se ha enviado. Gracias por contactar; te responderé en el correo que has indicado.'});
  } catch {
    // Do not log contact details, IPs, tokens or provider errors containing private data.
    return json({error:'No se ha podido confirmar el envío. Prueba más tarde o escribe a contacto@daniruiz.com.'},502);
  }
}

export default {fetch(request, env) { return handle(request, env); }};
