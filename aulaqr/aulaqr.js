const screenImages = {
  pasaporte: new URL('./assets/pasaporte.png', import.meta.url).href,
  inicio: new URL('./assets/inicio.png', import.meta.url).href,
  aula: new URL('./assets/aula.png', import.meta.url).href,
  etiquetas: new URL('./assets/etiquetas.png', import.meta.url).href,
};
const screens = {
  pasaporte: {label:'Pasaporte digital',description:'Su identificación, hardware esencial, estado y últimas intervenciones. Cada equipo tiene un pasaporte que lo acompaña durante toda su vida.',alt:'Pasaporte real de un equipo con su identificación, ubicación y estado'},
  inicio: {label:'Tu centro, de un vistazo',description:'Equipos activos, incidencias abiertas y trabajo pendiente. Un punto de partida para entender qué necesita atención en el centro.',alt:'Inicio real de AulaQR con los equipos e incidencias del entorno de ejemplo'},
  aula: {label:'Aulas y equipos',description:'Reconoce el hardware de cada aula y localiza los equipos que tienen problemas. Abre su pasaporte para consultar los detalles.',alt:'Inventario real del aula Diseño Gráfico, organizado por equipos y estados'},
  etiquetas: {label:'Etiquetas QR',description:'El QR se genera al crear el equipo. Elige un espacio y prepara todas sus etiquetas o selecciona solo las que quieres imprimir.',alt:'Sección real para seleccionar e imprimir etiquetas QR por espacio'}
};
let activeScreen = 'pasaporte';
const dialog = document.querySelector('#screenshot-dialog');
const dialogImage = document.querySelector('#dialog-image');
const dialogCaption = document.querySelector('#dialog-caption');
let dialogOpener;
function openScreenshot(src, caption, opener) {
  dialogOpener = opener;
  dialogImage.src = src;
  dialogImage.alt = caption;
  dialogCaption.textContent = caption;
  dialog.showModal();
}
document.querySelectorAll('[data-zoom]').forEach(button => button.addEventListener('click', () => openScreenshot(button.querySelector('img').currentSrc || button.querySelector('img').src,button.dataset.caption,button)));
document.querySelectorAll('[data-gallery-zoom]').forEach(button => button.addEventListener('click', () => openScreenshot(screenImages[activeScreen],screens[activeScreen].description,button)));
document.querySelector('#close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {if(event.target === dialog) {const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom) dialog.close();}});
dialog.addEventListener('close',()=>{dialogImage.removeAttribute('src');dialogOpener?.focus();});
function selectTab(button) {
  const list = button.closest('[role="tablist"]');
  list.querySelectorAll('[role="tab"]').forEach(tab=>{tab.setAttribute('aria-selected',String(tab===button));tab.tabIndex=tab===button?0:-1;});
  if(button.dataset.screen){
    activeScreen=button.dataset.screen;
    document.querySelector('#screen-image').src=screenImages[activeScreen];
    document.querySelector('#screen-image').alt=screens[activeScreen].alt;
    document.querySelector('#screen-description').textContent=screens[activeScreen].description;
    document.querySelector('#screen-label').textContent=`AulaQR / ${screens[activeScreen].label}`;
    document.querySelector('#screen-panel').setAttribute('aria-labelledby',button.id);
  } else {
    document.querySelectorAll('.role-panel').forEach(panel=>{panel.hidden=panel.id!==button.getAttribute('aria-controls');});
  }
}
document.querySelectorAll('[role="tablist"]').forEach(list=>{
  const tabs=[...list.querySelectorAll('[role="tab"]')];
  list.addEventListener('click',event=>{const button=event.target.closest('[role="tab"]');if(button)selectTab(button);});
  list.addEventListener('keydown',event=>{
    if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;
    const current=tabs.indexOf(document.activeElement);if(current<0)return;
    event.preventDefault();
    const index=event.key==='Home'?0:event.key==='End'?tabs.length-1:(current+(event.key==='ArrowRight'?1:-1)+tabs.length)%tabs.length;
    selectTab(tabs[index]);tabs[index].focus();
  });
});
const enquiryForm = document.querySelector('#demo-form');
const contactAPI = 'https://portaldoc-contact.dani-ruizporcel.workers.dev';
const submitButton = document.querySelector('#demo-submit');
const formStatus = document.querySelector('#form-status');
let widgetId;
let sending = false;
let completed = false;
function feedback(message, state = 'error') {
  formStatus.textContent = message;
  formStatus.dataset.state = state;
  formStatus.hidden = false;
}
async function initialiseContact() {
  if (['localhost','127.0.0.1'].includes(location.hostname)) {
    submitButton.textContent = 'Enviar solicitud de demo ↗';
    feedback('Vista previa: el envío real estará disponible en la web publicada.','preview');
    return;
  }
  try {
    const response = await fetch(`${contactAPI}/config`, {signal:AbortSignal.timeout(10000)});
    if (!response.ok) throw new Error('configuration');
    const {siteKey} = await response.json();
    if (!siteKey) throw new Error('configuration');
    await new Promise((resolve,reject) => {
      const script=document.createElement('script');
      script.src='https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
      script.async=true;script.onload=resolve;script.onerror=reject;document.head.append(script);
    });
    document.querySelector('#contact-verification').hidden=false;
    widgetId=window.turnstile.render('#contact-verification',{
      sitekey:siteKey,action:'contact',theme:'light',size:'flexible',
      callback:()=>{if(sending||completed)return;submitButton.disabled=false;submitButton.textContent='Enviar solicitud de demo ↗';},
      'expired-callback':()=>{submitButton.disabled=true;submitButton.textContent='Verificando…';window.turnstile.reset(widgetId);},
      'error-callback':()=>{submitButton.disabled=true;feedback('No se ha podido completar la verificación antispam. Recarga la página o escribe a contacto@daniruiz.com.');}
    });
    submitButton.textContent='Verificando…';
  } catch {
    submitButton.textContent='Envío no disponible';
    feedback('El envío directo no está disponible temporalmente. Puedes escribir a contacto@daniruiz.com.');
  }
}
enquiryForm.addEventListener('submit',async event=>{
  event.preventDefault();
  if(sending||completed||!enquiryForm.reportValidity())return;
  const token=window.turnstile?.getResponse(widgetId);
  if(!token){feedback('Completa la verificación antispam antes de enviar.');return;}
  const values=new FormData(enquiryForm);
  const data=Object.fromEntries(['name','centre','email','message','website'].map(key=>[key,String(values.get(key)||'').trim()]));
  data.token=token;sending=true;submitButton.disabled=true;submitButton.textContent='Enviando solicitud…';enquiryForm.setAttribute('aria-busy','true');formStatus.hidden=true;
  try{
    const response=await fetch(`${contactAPI}/contact`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data),signal:AbortSignal.timeout(25000)});
    const result=await response.json();
    if(!response.ok||result.success!==true)throw new Error(result.error||'No se ha podido confirmar el envío. Prueba más tarde.');
    completed=true;feedback(result.message,'success');submitButton.textContent='Solicitud enviada ✓';
    enquiryForm.querySelectorAll('input,textarea').forEach(field=>field.disabled=true);
  }catch(error){
    feedback(error.name==='TimeoutError'||error.name==='TypeError'?'La conexión se ha interrumpido y no podemos confirmar el envío. Espera antes de intentarlo de nuevo o escribe a contacto@daniruiz.com.':error.message);
    window.turnstile.reset(widgetId);submitButton.textContent='Verificando…';
  }finally{sending=false;enquiryForm.removeAttribute('aria-busy');formStatus.focus({preventScroll:true});}
});
initialiseContact();
