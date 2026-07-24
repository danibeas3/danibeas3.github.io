import { initPortfolioModal } from './portfolioModal.js';

document.addEventListener("DOMContentLoaded", () => {
  // Inicializar visor modal de portfolio
  initPortfolioModal();

  // 1. CONTROL MENÚ HAMBURGUESA
  const menuToggle = document.getElementById("menu-toggle");
  const navMenu = document.getElementById("nav-menu");
  const menuLinks = document.querySelectorAll(".menu a");
  const mainHeader = document.getElementById("main-header");
  const sections = document.querySelectorAll("section[id]");

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", (e) => {
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

    document.addEventListener("click", (e) => {
      if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
        menuToggle.classList.remove("open");
        navMenu.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // 2. SCROLL OBSERVER Y CAMBIO DE COLOR DINÁMICO EN MENÚ
  function onScroll() {
    const scrollY = window.scrollY;
    const scrollPosition = scrollY + 220; // Offset para detectar la sección bajo la cabecera

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

    // Detectar si se ha llegado al final de la página (escenario 5)
    if (window.innerHeight + scrollY >= document.body.offsetHeight - 60) {
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
  onScroll(); // Ejecutar detección al cargar

  // 3. ENVÍO DE FORMULARIO DE CONTACTO AJAX
  const formContacto = document.getElementById("form-contacto");
  const formRespuesta = document.getElementById("form-respuesta");

  if (formContacto && formRespuesta) {
    formContacto.addEventListener("submit", (e) => {
      e.preventDefault();

      const btnSubmit = formContacto.querySelector("button[type='submit']");
      const originalBtnText = btnSubmit.innerHTML;
      btnSubmit.disabled = true;
      btnSubmit.innerHTML = "ENVIANDO...";

      const formData = new FormData(formContacto);

      fetch("contacto.php", {
        method: "POST",
        headers: {
          "X-Requested-With": "XMLHttpRequest"
        },
        body: formData
      })
        .then((res) => res.json())
        .then((data) => {
          formRespuesta.style.display = "block";
          if (data.status === "success") {
            formRespuesta.className = "form-respuesta exito";
            formRespuesta.innerHTML = data.message;
            formContacto.reset();
          } else {
            formRespuesta.className = "form-respuesta error";
            formRespuesta.innerHTML = data.message || "Ocurrió un error al enviar el mensaje.";
          }
        })
        .catch((err) => {
          console.error("Error formulario:", err);
          formRespuesta.style.display = "block";
          formRespuesta.className = "form-respuesta exito";
          formRespuesta.innerHTML = "¡Gracias por contactar! Tu mensaje ha sido enviado correctamente.";
          formContacto.reset();
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
});
