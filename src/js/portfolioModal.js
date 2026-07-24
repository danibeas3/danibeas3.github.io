import { categoriasPortfolio, proyectosPortfolio } from '../data/portfolioData.js';

export function initPortfolioModal() {
  const modalOverlay = document.getElementById("portfolio-modal");
  const modalBody = document.getElementById("modal-projects-list");
  const modalCategoryTitle = document.getElementById("modal-category-title");
  const modalCategoryDesc = document.getElementById("modal-category-desc");
  const modalTabs = document.getElementById("modal-tabs");
  const btnCloseModal = document.getElementById("btn-close-modal");

  if (!modalOverlay || !modalBody) return;

  // Renderizar pestañas de categorías dentro del modal
  function renderCategoryTabs(activeCategoryId) {
    if (!modalTabs) return;
    modalTabs.innerHTML = categoriasPortfolio
      .map(
        (cat) => `
        <button 
          class="tab-btn ${cat.id === activeCategoryId ? "active" : ""}" 
          data-category="${cat.id}">
          <span class="tab-icon">${cat.icono}</span>
          <span class="tab-title">${cat.titulo}</span>
        </button>
      `
      )
      .join("");

    // Event listeners para cambiar de pestaña
    modalTabs.querySelectorAll(".tab-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const catId = btn.getAttribute("data-category");
        openCategoryModal(catId);
      });
    });
  }

  // Abrir modal con la categoría especificada
  function openCategoryModal(categoryId) {
    const categoria = categoriasPortfolio.find((c) => c.id === categoryId) || categoriasPortfolio[0];
    const proyectos = proyectosPortfolio.filter((p) => p.categoriaId === categoryId);

    // Actualizar encabezado del modal
    if (modalCategoryTitle) {
      modalCategoryTitle.innerHTML = `${categoria.icono} ${categoria.titulo}`;
    }
    if (modalCategoryDesc) {
      modalCategoryDesc.textContent = categoria.subtitulo;
    }

    // Renderizar pestañas
    renderCategoryTabs(categoryId);

    // Renderizar tarjetas de subproyectos
    if (proyectos.length === 0) {
      modalBody.innerHTML = `
        <div class="modal-empty">
          <p>Próximamente se añadirán más proyectos a esta sección.</p>
        </div>
      `;
    } else {
      modalBody.innerHTML = proyectos
        .map(
          (proj) => `
          <article class="project-card">
            <div class="project-card-header">
              <div class="project-card-icon">
                <img src="${proj.imagen}" alt="${proj.titulo}" onerror="this.src='imagenes/logoHome.png'">
              </div>
              <div class="project-card-titles">
                <h3>${proj.titulo}</h3>
                <span class="project-card-sub">${proj.subtitulo}</span>
              </div>
            </div>
            
            <p class="project-card-desc">${proj.descripcion}</p>

            <div class="project-card-tags">
              ${proj.tags.map((tag) => `<span class="tag-pill">${tag}</span>`).join("")}
            </div>

            ${
              proj.demoUrl && proj.demoUrl !== "#"
                ? `<div class="project-card-actions">
                    <a href="${proj.demoUrl}" target="_blank" rel="noopener noreferrer" class="btn-project-link">Ver Proyecto &rarr;</a>
                   </div>`
                : ""
            }
          </article>
        `
        )
        .join("");
    }

    // Mostrar modal
    modalOverlay.classList.add("active");
    document.body.style.overflow = "hidden"; // Prevenir scroll de fondo
  }

  // Cerrar modal
  function closeModal() {
    modalOverlay.classList.remove("active");
    document.body.style.overflow = "";
  }

  // Event Listeners para globos en el Escenario 4
  const globosElements = document.querySelectorAll("[data-category]");
  globosElements.forEach((globo) => {
    globo.addEventListener("click", (e) => {
      e.preventDefault();
      const catId = globo.getAttribute("data-category");
      openCategoryModal(catId);
    });
  });

  // Event Listeners para cerrar
  if (btnCloseModal) {
    btnCloseModal.addEventListener("click", closeModal);
  }

  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalOverlay.classList.contains("active")) {
      closeModal();
    }
  });
}
