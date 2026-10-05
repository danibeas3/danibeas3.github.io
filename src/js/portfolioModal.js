import { categoriasPortfolio, proyectosPortfolio } from '../data/portfolioData.js?v=productos-20261005';
import { portfolioArtwork, portfolioCategoryIcon } from './portfolioArtwork.js';

export function initPortfolioModal() {
  const overlay = document.getElementById('portfolio-modal');
  const list = document.getElementById('modal-projects-list');
  const title = document.getElementById('modal-category-title');
  const description = document.getElementById('modal-category-desc');
  const pagination = document.getElementById('modal-tabs');
  const closeButton = document.getElementById('btn-close-modal');
  if (!overlay || !list) return;
  const mobileLayout = window.matchMedia('(max-width: 900px)');
  let pageSize = mobileLayout.matches ? 1 : 4;
  let category;
  let projects = [];
  let page = 0;
  let opener;
  let previousOverflow;

  mobileLayout.addEventListener('change', () => {
    const firstProject = page * pageSize;
    pageSize = mobileLayout.matches ? 1 : 4;
    page = Math.floor(firstProject / pageSize);
    if (overlay.classList.contains('active')) {
      renderPage();
      closeButton.focus();
    }
  });

  function renderPage() {
    const pageCount = Math.ceil(projects.length / pageSize);
    const visibleProjects = projects.slice(page * pageSize, (page + 1) * pageSize);
    overlay.dataset.projectCount = Math.min(projects.length, pageSize);
    list.innerHTML = visibleProjects.length ? visibleProjects.map(p => {
      const hasLink = p.demoUrl && p.demoUrl !== '#';
      const artwork = p.imagenIlustrada ? `<img src="${p.imagenIlustrada}" alt="" loading="eager">` : portfolioArtwork(p);
      const label = category.id === 'youtube' ? 'Ver en YouTube' : 'Ver proyecto';
      return `<article class="project-card">
        <div class="project-artwork">${artwork}</div>
        <h3>${p.titulo}</h3>
        <p class="project-card-sub">${p.subtitulo}</p>
        <div class="project-card-tags">${p.tags.map(t => `<span class="tag-pill">${t}</span>`).join('')}</div>
        ${hasLink ? `<a class="btn-project-link" href="${p.demoUrl}" target="_blank" rel="noopener noreferrer">${label} <span aria-hidden="true">→</span></a>` : `<span class="btn-project-link pending-link" aria-label="${label}: enlace pendiente">${label} <span aria-hidden="true">→</span></span>`}
      </article>`;
    }).join('') : '<p class="modal-empty">Próximamente se añadirán más proyectos a esta sección.</p>';
    pagination.setAttribute('aria-label', `Páginas de ${category.titulo}`);
    pagination.hidden = pageCount <= 1;
    pagination.innerHTML = Array.from({length: pageCount}, (_, index) => `<button class="tab-btn ${index === page ? 'active' : ''}" data-page="${index}" aria-label="Página ${index + 1} de ${pageCount}" ${index === page ? 'aria-current="page"' : ''}><span class="tab-title">${index + 1}</span></button>`).join('');
    list.scrollTop = 0;
  }

  function openCategory(categoryId) {
    category = categoriasPortfolio.find(c => c.id === categoryId) || categoriasPortfolio[0];
    projects = proyectosPortfolio.filter(p => p.categoriaId === category.id);
    page = 0;
    if (!overlay.classList.contains('active')) {
      opener = document.activeElement;
      previousOverflow = document.body.style.overflow;
    }
    overlay.dataset.category = category.id;
    title.innerHTML = `<span class="modal-category-icon" aria-hidden="true">${portfolioCategoryIcon(category.id)}</span><span>${category.titulo}</span>`;
    description.textContent = category.subtitulo;
    renderPage();
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    closeButton.focus();
  }

  function close() {
    overlay.classList.remove('active');
    document.body.style.overflow = previousOverflow || '';
    opener?.focus();
  }
  document.querySelectorAll('#escenario4 [data-category]').forEach(balloon => {
    balloon.addEventListener('click', event => {
      event.preventDefault();
      openCategory(balloon.dataset.category);
    });
  });
  pagination.addEventListener('click', event => {
    const button = event.target.closest('[data-page]');
    if (!button) return;
    page = Number(button.dataset.page);
    renderPage();
    pagination.querySelector(`[data-page="${page}"]`).focus();
  });
  closeButton.addEventListener('click', close);
  overlay.addEventListener('click', event => { if (event.target === overlay) close(); });
  document.addEventListener('keydown', event => {
    if (!overlay.classList.contains('active')) return;
    if (event.key === 'Escape') close();
    if (event.key === 'Tab') {
      const focusables = [...overlay.querySelectorAll('button, a[href]')].filter(el => el.getClientRects().length);
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault(); last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault(); first.focus();
      }
    }
  });
}
