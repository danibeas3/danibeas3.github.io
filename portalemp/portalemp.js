const employees = ['Lucía Montes','Marcos Soler','Celia Vega','Álvaro Vidal','Nora Campos','Hugo Ferrer'];
// Keep the enlargement link in sync with Vite's emitted image URL.
document.querySelectorAll('.real-capture,.direction-capture').forEach(figure=>{
  figure.querySelectorAll('a').forEach(link=>{link.href=figure.querySelector('img').src;});
});
const initials = ['LM','MS','CV','AV','NC','HF'];
const matrix = document.getElementById('matrix-body');
const days = [['7:48','8:03','7:52','7:48','7:55','—','—'],['VAC','VAC','VAC','VAC','VAC','—','—'],['8:10','7:48','7:53','7:48','8:00','—','—'],['7:45','7:49','Revisar','7:52','7:48','—','—'],['7:48','7:50','7:48','8:02','7:55','—','—'],['8:03','7:48','7:57','7:48','8:01','—','—']];
matrix.innerHTML = employees.map((name,i) => `<tr><td>${name}</td>${days[i].map(day => `<td class="${day==='—'?'rest':day==='VAC'?'vac':day==='Revisar'?'warn':''}"><span>${day}</span></td>`).join('')}</tr>`).join('');
const panel = document.getElementById('product-panel');
const tabs = [...document.querySelectorAll('[data-view]')];
const heading = (label,title) => `<div class="dashboard-heading"><div><small>${label}</small><h3>${title}</h3></div><span class="badge lavender-badge">Horizonte · Datos ficticios</span></div>`;
const views = {
 admin: () => `${heading('CONTROL Y GESTIÓN LABORAL','Tu equipo, de un vistazo.')}<div class="stats"><div class="stat"><small>TRABAJANDO AHORA</small><strong>15</strong><span>En jornada</span></div><div class="stat"><small>AUSENCIAS JUSTIFICADAS</small><strong>1</strong><span>Solicitud validada</span></div><div class="stat"><small>EN VACACIONES</small><strong>2</strong><span>Periodo aprobado</span></div><div class="stat"><small>SIN REGISTRO ESPERADO</small><strong>2</strong><span>Requieren revisión</span></div></div><div class="dashboard-columns"><div class="mini-panel"><h4>Plantilla en tiempo real <span style="float:right;color:#a9a3b8;font-size:8px">20 personas</span></h4>${employees.slice(0,4).map((name,i) => `<div class="person-row"><span class="mini-avatar">${initials[i]}</span><div><strong>${name}</strong><small>${i===1?'Periodo de vacaciones':'Entrada · 08:'+['10','15','24','03'][i]}</small></div><span class="badge ${i===1?'cyan':'green'}">${i===1?'Vacaciones':'Dentro'}</span></div>`).join('')}</div><div class="mini-panel"><h4>Buzón de validaciones</h4><div class="pending-item"><span class="badge amber">Pendiente</span><strong>Vacaciones · Nora Campos</strong><small>19–23 octubre · 5 días</small></div><div class="pending-item"><span class="badge lavender-badge">Corrección de fichaje</span><strong>Hugo Ferrer</strong><small>Solicitud con dos tramos</small></div><div class="mini-callout">Todas las solicitudes, en un mismo lugar ↗</div></div></div>`,
 reports: () => `${heading('INFORMES DE DIRECCIÓN','Información con contexto.')}<div class="stats"><div class="stat"><small>HORAS COMPUTADAS</small><strong>684 h</strong><span>Periodo consolidado</span></div><div class="stat"><small>OBJETIVO DEL PERIODO</small><strong>680 h</strong><span>Hasta ayer</span></div><div class="stat"><small>BALANCE DE JORNADA</small><strong>+4 h</strong><span>Dato para gestión</span></div><div class="stat"><small>REQUIEREN REVISIÓN</small><strong>3</strong><span>Situaciones detectadas</span></div></div><div class="dashboard-columns"><div class="mini-panel"><h4>Indicadores por trabajador</h4>${employees.slice(0,4).map((name,i) => `<div class="person-row"><span class="mini-avatar">${initials[i]}</span><div><strong>${name}</strong><small>Objetivo · ${i===1?'Vacaciones aprobadas':'39 h / semana'}</small></div><span class="badge ${i===2?'amber':'green'}">${['+1 h 15','VAC','Revisar','+35 min'][i]}</span></div>`).join('')}</div><div class="mini-panel"><h4>La jornada de hoy</h4><div class="pending-item"><span class="badge green">En curso</span><strong>15 jornadas abiertas</strong><small>El día actual se muestra por separado</small></div><div class="pending-item"><strong>Balance consolidado</strong><small>Consulta el periodo cerrado hasta ayer</small></div><div class="mini-callout">Resumen · Matriz · Incidencias · Ficha ↗</div></div></div>`,
 worker: () => `${heading('ESPACIO DEL EMPLEADO','¡Hola, Lucía!')}<div class="stats"><div class="stat"><small>PROGRESO DEL MES</small><strong>35 h</strong><span>De 163 h 48 min</span></div><div class="stat"><small>ESTA SEMANA</small><strong>14 h</strong><span>De 39 h</span></div><div class="stat"><small>DÍAS TRABAJADOS</small><strong>5</strong><span>De 21 días hábiles</span></div><div class="stat"><small>DOCUMENTOS</small><strong>3</strong><span>En tu carpeta personal</span></div></div><div class="dashboard-columns"><div class="mini-panel"><h4>Mi registro de jornada</h4>${['Lunes · 05 octubre','Viernes · 02 octubre','Jueves · 01 octubre'].map((date,i) => `<div class="person-row"><span class="mini-avatar">◷</span><div><strong>${date}</strong><small>${i===0?'08:10 → En curso':'08:15 → 16:03'}</small></div><span class="badge ${i===0?'lavender-badge':'green'}">${i===0?'En curso':'7 h 48 min'}</span></div>`).join('')}<div class="mini-callout">Consulta y valida tu registro mensual ↗</div></div><div class="mini-panel"><h4>Todo lo tuyo, a mano</h4><div class="pending-item"><strong>☀ Mis vacaciones</strong><small>Solicitudes y estado</small></div><div class="pending-item"><strong>▱ Mi documentación</strong><small>Nóminas · Contratos · Fiscal</small></div><div class="pending-item"><strong>✉ Mis mensajes</strong><small>Comunicación con la empresa</small></div></div></div>`
};
function selectView(tab){
  tabs.forEach(item => { const active=item===tab;item.setAttribute('aria-selected',String(active));item.tabIndex=active?0:-1; });
  panel.setAttribute('aria-labelledby',tab.id);panel.innerHTML=views[tab.dataset.view]();
}
tabs.forEach((tab,index) => {
  tab.addEventListener('click',()=>selectView(tab));
  tab.addEventListener('keydown',event=>{
    let next;
    if(['ArrowRight','ArrowDown'].includes(event.key))next=(index+1)%tabs.length;
    if(['ArrowLeft','ArrowUp'].includes(event.key))next=(index-1+tabs.length)%tabs.length;
    if(event.key==='Home')next=0;
    if(event.key==='End')next=tabs.length-1;
    if(next!==undefined){event.preventDefault();selectView(tabs[next]);tabs[next].focus();}
  });
});
selectView(tabs[0]);
// Until the sending service is connected, never submit contact data or imply delivery.
document.querySelector('#enquiry-form').addEventListener('submit',event=>{
  event.preventDefault();
  const status=document.querySelector('#enquiry-status');
  status.textContent='El envío directo todavía no está conectado. Puedes escribir a contacto@daniruiz.com.';
  status.hidden=false;
});
if('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches){
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}}),{threshold:.08});
  document.querySelectorAll('.section-head,.feature,.precision-grid,.report-layout,.document-grid,.employee-grid,.trust-grid,.insight').forEach(element=>{element.classList.add('reveal');observer.observe(element);});
}
