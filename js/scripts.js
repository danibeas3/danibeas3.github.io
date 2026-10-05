import { initPortfolioModal } from '../src/js/portfolioModal.js?v=productos-20261005';

document.addEventListener("DOMContentLoaded", function () {
  // 1. INICIALIZACIÓN DEL VISOR MODAL DE PORTFOLIO
  initPortfolioModal();

  // 2. CONTROL DEL MENÚ MÓVIL (HAMBURGUESA)
  const menuToggle = document.getElementById("menu-toggle");
  const navMenu = document.getElementById("nav-menu");
  const menuLinks = document.querySelectorAll(".menu a");
  const mainHeader = document.getElementById("main-header");
  const headerLogo = mainHeader?.querySelector(".logo img");
  const originalLogo = headerLogo?.src;
  const contactLogo = new URL('../imagenes/logo-contacto.png', import.meta.url).href;
  const brownContactLogo = new URL('../imagenes/logo-contacto-marron.png', import.meta.url).href;
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
      if (headerLogo) {
        const useCoralLogo = currentSectionId === "escenario4" &&
          document.getElementById("escenario4")?.classList.contains("modo-salmon");
        const logoSrc = currentSectionId === "escenario5" ? brownContactLogo :
          (useCoralLogo ? contactLogo : originalLogo);
        if (headerLogo.src !== logoSrc) headerLogo.src = logoSrc;
      }
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

  // 4. ENVÍO DE FORMULARIO DE CONTACTO VÍA EMAILJS (AJAX)
  const formContacto = document.getElementById("form-contacto");
  const formRespuesta = document.getElementById("form-respuesta");

  if (formContacto && formRespuesta) {
    formContacto.addEventListener("submit", function (e) {
      e.preventDefault();

      const btnSubmit = formContacto.querySelector("button[type='submit']");
      const originalBtnText = btnSubmit.innerHTML;
      btnSubmit.disabled = true;
      btnSubmit.innerHTML = "ENVIANDO...";

      const rawFormData = new FormData(formContacto);

      // Verificación de Honeypot Anti-Spam (Si el bot lo marca, simular éxito sin gastar cuota)
      const botcheck = rawFormData.get("botcheck");
      if (botcheck) {
        formRespuesta.style.display = "block";
        formRespuesta.className = "form-respuesta exito";
        formRespuesta.innerHTML = "¡Mensaje enviado con éxito! Me pondré en contacto contigo pronto.";
        formContacto.reset();
        btnSubmit.disabled = false;
        btnSubmit.innerHTML = originalBtnText;
        setTimeout(() => {
          formRespuesta.style.display = "none";
        }, 6000);
        return;
      }

      const nombre = (rawFormData.get("nombre") || "").trim();
      const apellidos = (rawFormData.get("apellidos") || "").trim();
      const contacto = (rawFormData.get("contacto") || "").trim();
      const mensaje = (rawFormData.get("mensaje") || "").trim();

      const nombreCompleto = `${nombre} ${apellidos}`.trim();
      const fechaActual = new Date().toLocaleString("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });

      // Payload para la API REST de EmailJS
      const payload = {
        service_id: "service_4w5xz7l",
        template_id: "template_xhrs979",
        user_id: "QAo2uBtzOXiFasLt8",
        template_params: {
          from_name: nombreCompleto,
          reply_to: contacto,
          message: mensaje,
          date_time: fechaActual
        }
      };

      fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      })
        .then((response) => {
          formRespuesta.style.display = "block";
          if (response.ok) {
            formRespuesta.className = "form-respuesta exito";
            formRespuesta.innerHTML = "¡Mensaje enviado con éxito! Me pondré en contacto contigo pronto.";
            formContacto.reset();
          } else {
            formRespuesta.className = "form-respuesta error";
            formRespuesta.innerHTML = "Ocurrió un error al enviar el mensaje. Inténtalo de nuevo.";
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
        escenario4.classList.toggle("modo-anochecer", tramo.fondo === "#7A6A8E");
        escenario4.classList.toggle("modo-salmon", tramo.fondo === "#E8B4A0");
        if (tramo.oscuro) {
          escenario4.classList.add("modo-oscuro");
        } else {
          escenario4.classList.remove("modo-oscuro");
        }
        onScroll();
      }
    }

    actualizarFondo();
    setInterval(actualizarFondo, 60 * 1000);
  })();

});
