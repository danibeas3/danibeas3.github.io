const icons = {
  grid: '<rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M7 3v4m10-4v4M3 11h18m-13 4h2m4 0h2"/>',
  users: '<circle cx="9" cy="8" r="3"/><path d="M3 21v-3a6 6 0 0 1 12 0v3M17 5a3 3 0 0 1 0 6m1 4a5 5 0 0 1 3 5"/>',
  folder: '<path d="M3 7a2 2 0 0 1 2-2h5l2 3h7a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
  file: '<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9zM14 3v6h6M8 13h8m-8 4h5"/>',
  shield: '<path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6zM8 12l3 3 5-6"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  lock: '<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
  arrow: '<path d="M4 12h16m-6-6 6 6-6 6"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6m0-10v1"/>',
  book: '<path d="M12 5v16M12 5C8 2 3 3 3 3v16s5-1 9 2c4-3 9-2 9-2V3s-5-1-9 2z"/>',
};
function paintIcons(root = document) {
  root.querySelectorAll('[data-icon]').forEach(el => {
    el.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[el.dataset.icon] || icons.grid}</svg>`;
  });
}
const teachers = [
  { name: 'Lucía Campos', initials: 'LC', color: 'purple', time: '08:30', duration: '2 h 15 min' },
  { name: 'Marcos Ríos', initials: 'MR', color: 'blue', time: '09:00', duration: '1 h 45 min' },
  { name: 'Elena Vidal', initials: 'EV', color: 'teal', time: '10:00', duration: '45 min' },
];
function calendar(compact = false) {
  const active = [1, 2, 5, 6, 8, 9, 13, 15, 19, 20, 22, 26, 27, 29];
  return ['L', 'M', 'X', 'J', 'V', 'S', 'D'].map(d => `<span class="weekday">${d}</span>`).join('') +
    Array.from({ length: 35 }, (_, i) => {
      const n = i - 2;
      if (n < 1 || n > 31) return '<span class="calendar-day muted"></span>';
      return `<span class="calendar-day ${active.includes(n) ? 'recorded' : ''} ${n === 5 ? 'today' : ''}"><b>${n}</b>${!compact && active.includes(n) ? '<small>3 h 00</small>' : ''}</span>`;
    }).join('');
}
document.querySelectorAll('[data-calendar]').forEach(el => el.innerHTML = calendar(true));
const panel = document.querySelector('#demo-panel');
const tabs = [...document.querySelectorAll('[data-view]')];
const card = (icon, value, label, style = '') => `<div class="demo-stat ${style}"><span data-icon="${icon}"></span><strong>${value}</strong><small>${label}</small></div>`;
const people = () => teachers.map(t => `<div class="person"><span class="avatar ${t.color}">${t.initials}</span><div>${t.name}<small>Entrada ${t.time} · ${t.duration}</small></div><span class="pill">Dentro</span></div>`).join('');
const views = {
  inicio: () => `<div class="demo-topline"><span>BIENVENIDA A TU CENTRO</span><span class="demo-admin">AS · Secretaría</span></div><div class="demo-title"><h3>Un buen día empieza con claridad.</h3><span class="demo-date">Lunes, 5 de octubre</span></div><div class="demo-stats">${card('users','3','Docentes en el centro')}${card('calendar','8','Con presencia hoy')}${card('clock','2','Actividades pendientes','warm')}${card('check','6 h','Extras aprobadas')}</div><div class="demo-columns"><div class="demo-card"><div class="demo-card-title"><strong><span class="status-dot"></span> Ahora en el centro</strong><span class="pill">Presencia activa</span></div>${people()}</div><div class="demo-card"><div class="demo-card-title"><strong>Actividad reciente</strong><span class="muted-text">Hoy</span></div><div class="timeline"><div><span class="timeline-dot"></span><small>10:00</small><p><strong>Elena Vidal</strong><br>Registró su entrada</p></div><div><span class="timeline-dot neutral"></span><small>09:45</small><p><strong>Pablo Serrano</strong><br>Registró su salida</p></div><div><span class="timeline-dot"></span><small>09:00</small><p><strong>Marcos Ríos</strong><br>Registró su entrada</p></div></div></div></div><div class="demo-bottom"><span data-icon="check"></span> Toda la actividad, en un mismo lugar.<span>Datos ficticios</span></div>`,
  presencia: () => `<div class="demo-topline"><span>HISTÓRICO MENSUAL</span><span class="demo-admin">AS · Secretaría</span></div><div class="demo-title"><h3>Los días, con todo su detalle.</h3><span class="demo-date">Octubre de 2026</span></div><div class="demo-filter"><span class="avatar purple">LC</span><strong>Lucía Campos</strong><span>Docente de ejemplo</span></div><div class="demo-stats three">${card('calendar','14','Días con presencia')}${card('clock','42 h','Presencia acumulada')}${card('clock','3 h','Media diaria')}</div><div class="demo-card demo-calendar-card"><div class="demo-card-title"><strong>Calendario de presencia</strong><span class="pill">Octubre</span></div><div class="demo-calendar">${calendar()}</div></div><div class="demo-bottom"><span data-icon="info"></span> Presencia informativa, independiente del cálculo económico.</div>`,
  horas: () => `<div class="demo-topline"><span>REVISIÓN DE HORAS</span><span class="demo-admin">AS · Secretaría</span></div><div class="demo-title"><h3>Un periodo revisado. Un cálculo claro.</h3><span class="demo-date">Octubre de 2026</span></div><div class="demo-filter"><span class="avatar purple">LC</span><strong>Lucía Campos</strong><span>20 h/semana · 21 €/h</span></div><div class="demo-stats three">${card('clock','80 h','Base confirmada')}${card('check','6 h','Extras aprobadas')}${card('file','1.806 €','Estimación orientativa')}</div><div class="demo-card hours-table"><div class="demo-card-title"><strong>Horas base por semana</strong><span class="pill">Periodo confirmado</span></div><div class="hours-table-row table-head"><span>SEMANA / TRAMO</span><span>HORAS</span><span>ESTADO</span></div>${[['1–4 oct','4 h'],['5–11 oct','20 h'],['12–18 oct','20 h'],['19–25 oct','20 h'],['26–31 oct','16 h']].map(([week,hours]) => `<div class="hours-table-row"><span>${week}</span><strong>${hours}</strong><span class="pill">Confirmado</span></div>`).join('')}</div><div class="demo-bottom"><span data-icon="info"></span> Base confirmada + extras aprobadas. La presencia se consulta aparte.</div>`,
};
function selectView(tab, focus = false) {
  tabs.forEach(button => {
    const selected = button === tab;
    button.setAttribute('aria-selected', String(selected));
    button.tabIndex = selected ? 0 : -1;
  });
  panel.setAttribute('aria-labelledby', tab.id);
  panel.innerHTML = views[tab.dataset.view]();
  paintIcons(panel);
  if (focus) tab.focus();
}
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectView(tab));
  tab.addEventListener('keydown', event => {
    let next;
    if (['ArrowDown','ArrowRight'].includes(event.key)) next = (index + 1) % tabs.length;
    if (['ArrowUp','ArrowLeft'].includes(event.key)) next = (index - 1 + tabs.length) % tabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = tabs.length - 1;
    if (next !== undefined) { event.preventDefault(); selectView(tabs[next], true); }
  });
});
selectView(tabs[0]);
paintIcons();
let inside = false;
const attendance = document.querySelector('#demo-attendance');
const phoneStatus = document.querySelector('#phone-status');
phoneStatus.setAttribute('role','status');
attendance.addEventListener('click', () => {
  inside = !inside;
  document.querySelector('#phone-action').textContent = inside ? 'Salir del centro' : 'Entrar al centro';
  phoneStatus.textContent = inside ? 'Dentro del centro' : 'Fuera del centro';
  attendance.classList.toggle('is-inside', inside);
});

const enquiryForm = document.querySelector('#enquiry-form');
enquiryForm.addEventListener('submit', event => {
  event.preventDefault();
  if (!enquiryForm.reportValidity()) return;
  const data = new FormData(enquiryForm);
  const value = key => String(data.get(key) || '').trim();
  const body = [
    'Hola, Dani:',
    '',
    'Me gustaría recibir información sobre PortalDoc para nuestro centro.',
    '',
    `Nombre: ${value('name')}`,
    `Centro: ${value('centre')}`,
    `Correo de contacto: ${value('email')}`,
    `Docentes colaboradores: ${value('teachers')}`,
    '',
    'Lo que nos gustaría simplificar:',
    value('message') || 'Me gustaría conocer las posibilidades de PortalDoc.',
  ].join('\n');
  const link = document.querySelector('#enquiry-email');
  link.href = `mailto:contacto@daniruiz.com?subject=${encodeURIComponent('Información sobre PortalDoc')}&body=${encodeURIComponent(body)}`;
  document.querySelector('#enquiry-status').textContent = 'Tu consulta está preparada. Ábrela en tu correo para revisarla y enviarla a Dani.';
  document.querySelector('#enquiry-result').hidden = false;
  link.focus();
});
enquiryForm.addEventListener('input', () => {
  document.querySelector('#enquiry-result').hidden = true;
  document.querySelector('#enquiry-email').removeAttribute('href');
});
