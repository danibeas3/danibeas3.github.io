document.addEventListener("DOMContentLoaded", function () {
  // 1. INICIALIZACIÓN DEL VISOR MODAL DE PORTFOLIO
  initPortfolioModal();

  function initPortfolioModal() {
    const modalOverlay = document.getElementById("portfolio-modal");
    const modalBody = document.getElementById("modal-projects-list");
    const modalCategoryTitle = document.getElementById("modal-category-title");
    const modalCategoryDesc = document.getElementById("modal-category-desc");
    const modalTabs = document.getElementById("modal-tabs");
    const btnCloseModal = document.getElementById("btn-close-modal");

    if (!modalOverlay || !modalBody) return;

    const categorias = [
      { id: "web", titulo: "Proyectos Web", icono: "🌐", subtitulo: "Diseño y desarrollo web a medida & CMS" },
      { id: "youtube", titulo: "YouTube & Medios", icono: "🎥", subtitulo: "Canales, tutoriales y divulgación IT" },
      { id: "software", titulo: "Aplicaciones & Software", icono: "💻", subtitulo: "Sistemas de gestión, automatización y apps custom" },
      { id: "sistemas", titulo: "Sistemas & Redes IT", icono: "🖥️", subtitulo: "Servidores Linux/Windows, Docker & Redes" }
    ];

    const proyectos = [
      {
        id: "fichaje",
        categoriaId: "software",
        titulo: "Control de Fichaje y Empleados",
        subtitulo: "Sistema web de gestión de jornada laboral y fichajes",
        descripcion: "Aplicación web completa para registro de horario laboral, gestión de ausencias, vacaciones, horas extraordinarias y partes de trabajo. Incluye módulo de administración, reportes detallados y generación de PDF justificativos.",
        tags: ["PHP 8", "MySQL", "JavaScript", "CSS3", "TCPDF"],
        imagen: "imagenes/21.png",
        demoUrl: "#"
      },
      {
        id: "apartamentos",
        categoriaId: "software",
        titulo: "Gestión de Apartamentos Turísticos",
        subtitulo: "Plataforma de reservas y administración de alojamientos",
        descripcion: "Software a medida para el control de disponibilidad de habitaciones, calendario interactivo de entradas y salidas, facturación electrónica y comunicación automática con huéspedes.",
        tags: ["PHP", "JavaScript ES6", "MySQL", "FullCalendar"],
        imagen: "imagenes/24.png",
        demoUrl: "#"
      },
      {
        id: "web-personal",
        categoriaId: "web",
        titulo: "DaniRuizWeb – Portfolio Ilustrado",
        subtitulo: "Sitio web personal interactivo por escenarios",
        descripcion: "Web personal construida con maquetación por escenarios temáticos, micro-animaciones en CSS puro y diseño adaptativo responsivo.",
        tags: ["HTML5", "CSS3 Grid/Flexbox", "JavaScript Vanilla", "Vite"],
        imagen: "imagenes/logoHome.png",
        demoUrl: "#escenario1"
      },
      {
        id: "web-corporativa",
        categoriaId: "web",
        titulo: "Sitio Web Empresarial & WordPress",
        subtitulo: "Diseño corporativo con optimización SEO y UX/UI",
        descripcion: "Implementación de sitio web responsive enfocado en conversión, alta velocidad de carga y panel autogestionable para el cliente.",
        tags: ["WordPress", "Elementor Pro", "SASS", "SEO Local"],
        imagen: "imagenes/22.png",
        demoUrl: "#"
      },
      {
        id: "canal-tech",
        categoriaId: "youtube",
        titulo: "Canal de YouTube Tecnológico",
        subtitulo: "Divulgación de Sistemas IT, Redes y Desarrollo Web",
        descripcion: "Canal enfocado en tutoriales prácticos sobre administración de servidores, resolución de incidencias en Windows/Linux, consejos de hardware y programación web.",
        tags: ["YouTube", "Vídeo Editing", "Tutoriales IT", "OBS Studio"],
        imagen: "imagenes/RedesSociales.png",
        demoUrl: "https://youtube.com"
      },
      {
        id: "servidor-nas",
        categoriaId: "sistemas",
        titulo: "Infraestructura NAS Synology & Backups",
        subtitulo: "Despliegue de almacenamiento seguro y copias redundantes",
        descripcion: "Configuración de servidores NAS en entorno empresarial con volumen RAID, copias de seguridad automatizadas off-site, VPN de acceso remoto y servicios Cloud privados.",
        tags: ["Synology DSM", "RAID", "Hyper Backup", "OpenVPN"],
        imagen: "imagenes/23.png",
        demoUrl: "#"
      },
      {
        id: "virtualizacion-docker",
        categoriaId: "sistemas",
        titulo: "Entornos Virtualizados & Contenedores",
        subtitulo: "Servidores Proxmox / Windows Server / Docker",
        descripcion: "Administración de máquinas virtuales y servicios contenedorizados (Nginx Reverse Proxy, Pi-hole, bases de datos y microservicios).",
        tags: ["Docker", "Proxmox", "Linux Server", "Active Directory"],
        imagen: "imagenes/24.png",
        demoUrl: "#"
      }
    ];

    function renderCategoryTabs(activeCategoryId) {
      if (!modalTabs) return;
      modalTabs.innerHTML = categorias
        .map(
          (cat) => `
          <button class="tab-btn ${cat.id === activeCategoryId ? "active" : ""}" data-category="${cat.id}">
            <span class="tab-icon">${cat.icono}</span>
            <span class="tab-title">${cat.titulo}</span>
          </button>
        `
        )
        .join("");

      modalTabs.querySelectorAll(".tab-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          const catId = btn.getAttribute("data-category");
          openCategoryModal(catId);
        });
      });
    }

    function openCategoryModal(categoryId) {
      const categoria = categorias.find((c) => c.id === categoryId) || categorias[0];
      const proys = proyectos.filter((p) => p.categoriaId === categoryId);

      if (modalCategoryTitle) modalCategoryTitle.innerHTML = `${categoria.icono} ${categoria.titulo}`;
      if (modalCategoryDesc) modalCategoryDesc.textContent = categoria.subtitulo;

      renderCategoryTabs(categoryId);

      if (proys.length === 0) {
        modalBody.innerHTML = `<div class="modal-empty"><p>Próximamente se añadirán más proyectos a esta sección.</p></div>`;
      } else {
        modalBody.innerHTML = proys
          .map(
            (p) => `
            <article class="project-card">
              <div class="project-card-header">
                <div class="project-card-icon">
                  <img src="${p.imagen}" alt="${p.titulo}" onerror="this.src='imagenes/logoHome.png'">
                </div>
                <div class="project-card-titles">
                  <h3>${p.titulo}</h3>
                  <span class="project-card-sub">${p.subtitulo}</span>
                </div>
              </div>
              <p class="project-card-desc">${p.descripcion}</p>
              <div class="project-card-tags">
                ${p.tags.map((t) => `<span class="tag-pill">${t}</span>`).join("")}
              </div>
              ${p.demoUrl && p.demoUrl !== "#" ? `<div class="project-card-actions"><a href="${p.demoUrl}" target="_blank" rel="noopener noreferrer" class="btn-project-link">Ver Proyecto &rarr;</a></div>` : ""}
            </article>
          `
          )
          .join("");
      }

      modalOverlay.classList.add("active");
      document.body.style.overflow = "hidden";
    }

    function closeModal() {
      modalOverlay.classList.remove("active");
      document.body.style.overflow = "";
    }

    const globosElements = document.querySelectorAll("[data-category]");
    globosElements.forEach((globo) => {
      globo.addEventListener("click", (e) => {
        e.preventDefault();
        const catId = globo.getAttribute("data-category");
        openCategoryModal(catId);
      });
    });

    if (btnCloseModal) btnCloseModal.addEventListener("click", closeModal);

    modalOverlay.addEventListener("click", (e) => {
      if (e.target === modalOverlay) closeModal();
    });

    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modalOverlay.classList.contains("active")) closeModal();
    });
  }

  // 2. CONTROL DEL MENÚ MÓVIL (HAMBURGUESA)
  const menuToggle = document.getElementById("menu-toggle");
  const navMenu = document.getElementById("nav-menu");
  const menuLinks = document.querySelectorAll(".menu a");
  const mainHeader = document.getElementById("main-header");
  const sections = document.querySelectorAll("section[id]");

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", function (e) {
      e.stopPropagation();
      menuToggle.classList.toggle("open");
      navMenu.classList.toggle("open");
      const isExpanded = navMenu.classList.contains("open");
      menuToggle.setAttribute("aria-expanded", isExpanded);
    });

    menuLinks.forEach((link) => {
      link.addEventListener("click", () => {
        menuToggle.classList.remove("open");
        navMenu.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });

    document.addEventListener("click", function (e) {
      if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
        menuToggle.classList.remove("open");
        navMenu.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // 3. CAMBIO DE COLOR DINÁMICO DEL MENÚ AL HACER SCROLL
  function onScroll() {
    const scrollY = window.scrollY;
    const scrollPosition = scrollY + 200;

    if (mainHeader) {
      if (scrollY > 40) {
        mainHeader.classList.add("scrolled");
      } else {
        mainHeader.classList.remove("scrolled");
      }
    }

    let currentSectionId = "escenario1";
    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPosition >= top && scrollPosition < top + height) {
        currentSectionId = section.getAttribute("id");
      }
    });

    // Detectar si está en la parte inferior de la página (escenario 5)
    if (window.innerHeight + scrollY >= document.body.offsetHeight - 80) {
      currentSectionId = "escenario5";
    }

    if (mainHeader) {
      mainHeader.setAttribute("data-theme", currentSectionId);
    }

    menuLinks.forEach((link) => {
      const href = link.getAttribute("href");
      if (href === `#${currentSectionId}`) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }

  window.addEventListener("scroll", onScroll);
  onScroll(); // Ejecutar al cargar la página

  // 4. ENVÍO DE FORMULARIO DE CONTACTO VÍA WEB3FORMS (AJAX)
  const formContacto = document.getElementById("form-contacto");
  const formRespuesta = document.getElementById("form-respuesta");

  if (formContacto && formRespuesta) {
    formContacto.addEventListener("submit", function (e) {
      e.preventDefault();

      const btnSubmit = formContacto.querySelector("button[type='submit']");
      const originalBtnText = btnSubmit.innerHTML;
      btnSubmit.disabled = true;
      btnSubmit.innerHTML = "ENVIANDO...";

      const formData = new FormData(formContacto);
      const jsonObject = Object.fromEntries(formData);
      const json = JSON.stringify(jsonObject);

      fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: json
      })
        .then(async (response) => {
          const resJson = await response.json();
          formRespuesta.style.display = "block";
          if (response.status === 200 && resJson.success) {
            formRespuesta.className = "form-respuesta exito";
            formRespuesta.innerHTML = "¡Mensaje enviado con éxito! Me pondré en contacto contigo pronto.";
            formContacto.reset();
          } else {
            formRespuesta.className = "form-respuesta error";
            formRespuesta.innerHTML = resJson.message || "Ocurrió un error al enviar el mensaje.";
          }
        })
        .catch((err) => {
          console.error("Error al enviar el formulario:", err);
          formRespuesta.style.display = "block";
          formRespuesta.className = "form-respuesta error";
          formRespuesta.innerHTML = "Hubo un problema al conectar con el servidor. Inténtalo de nuevo.";
        })
        .finally(() => {
          btnSubmit.disabled = false;
          btnSubmit.innerHTML = originalBtnText;
          setTimeout(() => {
            formRespuesta.style.display = "none";
          }, 6000);
        });
    });
  }

  // 5. FONDO DINÁMICO DEL ESCENARIO 4 SEGÚN LA HORA DEL DÍA
  //    Cambia el color del cielo de forma suave dependiendo de la hora local
  (function aplicarFondoHorario() {
    const escenario4 = document.getElementById("escenario4");
    if (!escenario4) return;

    // Paleta pastel armoniosa con la web — colores planos, sin degradados
    // Base: coral #E94E5D, turquesa #59BCB3, morado #473A5C, rosa #FDECEA, lavanda #D0C7E0
    const paleta = [
      { desde: 0,  hasta: 6,  fondo: "#1A2A3A", oscuro: true  }, // Madrugada: azul marino noche
      { desde: 6,  hasta: 9,  fondo: "#C9A8B8", oscuro: false }, // Amanecer:  rosa lavanda pastel
      { desde: 9,  hasta: 12, fondo: "#B8D8D5", oscuro: false }, // Mañana:    turquesa claro pastel
      { desde: 12, hasta: 16, fondo: "#FDECEA", oscuro: false }, // Mediodía:  rosa pálido original
      { desde: 16, hasta: 19, fondo: "#F5D9C8", oscuro: false }, // Tarde:     melocotón suave
      { desde: 19, hasta: 21, fondo: "#E8B4A0", oscuro: false }, // Atardecer: salmón pastel
      { desde: 21, hasta: 23, fondo: "#7A6A8E", oscuro: true  }, // Anochecer: morado medio pastel
      { desde: 23, hasta: 24, fondo: "#1A2A3A", oscuro: true  }  // Noche:     azul marino noche
    ];

    function actualizarFondo() {
      const ahora = new Date();
      const hora  = ahora.getHours() + ahora.getMinutes() / 60;
      const tramo = paleta.find(p => hora >= p.desde && hora < p.hasta);
      if (tramo) {
        escenario4.style.backgroundImage = "none";
        escenario4.style.backgroundColor = tramo.fondo;
        if (tramo.oscuro) {
          escenario4.classList.add("modo-oscuro");
        } else {
          escenario4.classList.remove("modo-oscuro");
        }
      }
    }

    actualizarFondo();
    setInterval(actualizarFondo, 60 * 1000);
  })();

});