/**
 * Centralized Portfolio Data Store for Dani Ruiz Web
 * Organizado por ramas / categorías de proyectos
 */

export const categoriasPortfolio = [
  {
    id: "web",
    titulo: "Proyectos Web",
    subtitulo: "Diseño y desarrollo web a medida & CMS",
    icono: "🌐",
    colorClass: "globo-azul",
    badgeColor: "#3498db"
  },
  {
    id: "youtube",
    titulo: "YouTube & Contenido",
    subtitulo: "Canales, tutoriales y divagación técnica",
    icono: "🎥",
    colorClass: "globo-naranja",
    badgeColor: "#e67e22"
  },
  {
    id: "software",
    titulo: "Aplicaciones & Software",
    subtitulo: "Sistemas de gestión, automatización y apps custom",
    icono: "💻",
    colorClass: "globo-morado",
    badgeColor: "#9b59b6"
  },
  {
    id: "sistemas",
    titulo: "Sistemas & Redes IT",
    subtitulo: "Infraestructura, Servidores Linux/Windows, Docker & Redes",
    icono: "🖥️",
    colorClass: "globo-verde",
    badgeColor: "#2ecc71"
  }
];

export const proyectosPortfolio = [
  // --- APLICACIONES & SOFTWARE ---
  {
    id: "fichaje",
    categoriaId: "software",
    titulo: "Control de Fichaje y Empleados",
    subtitulo: "Sistema web de gestión de jornada laboral y fichajes",
    descripcion: "Aplicación web completa para registro de horario laboral, gestión de ausencias, vacaciones, horas extraordinarias y partes de trabajo. Incluye módulo de administración, reportes detallados y generación de PDF justificativos.",
    tags: ["PHP 8", "MySQL", "JavaScript", "CSS3", "TCPDF"],
    imagen: "imagenes/21.png",
    demoUrl: "#",
    githubUrl: "#",
    destacado: true
  },
  {
    id: "apartamentos",
    categoriaId: "software",
    titulo: "Gestión de Apartamentos Turísticos",
    subtitulo: "Plataforma de reservas y administración de alojamientos",
    descripcion: "Software a medida para el control de disponibilidad de habitaciones, calendario interactivo de entradas y salidas, facturación electrónica y comunicación automática con huéspedes.",
    tags: ["PHP", "JavaScript ES6", "MySQL", "FullCalendar"],
    imagen: "imagenes/24.png",
    demoUrl: "#",
    githubUrl: "#",
    destacado: true
  },

  // --- PROYECTOS WEB ---
  {
    id: "web-personal",
    categoriaId: "web",
    titulo: "DaniRuizWeb – Portfolio Ilustrado",
    subtitulo: "Sitio web personal interactivo por escenarios",
    descripcion: "Web personal construida con maquetación por escenarios temáticos, micro-animaciones en CSS puro y diseño adaptativo responsivo.",
    tags: ["HTML5", "CSS3 Grid/Flexbox", "JavaScript Vanilla", "Vite"],
    imagen: "imagenes/logoHome.png",
    demoUrl: "#escenario1",
    githubUrl: "#",
    destacado: true
  },
  {
    id: "web-corporativa",
    categoriaId: "web",
    titulo: "Sitio Web Empresarial & WordPress",
    subtitulo: "Diseño corporativo con optimización SEO y UX/UI",
    descripcion: "Implementación de sitio web responsive enfocado en conversión, alta velocidad de carga y panel autogestionable para el cliente.",
    tags: ["WordPress", "Elementor Pro", "SASS", "SEO Local"],
    imagen: "imagenes/22.png",
    demoUrl: "#",
    destacado: false
  },

  // --- CANALES DE YOUTUBE & CONTENIDO ---
  {
    id: "canal-tech",
    categoriaId: "youtube",
    titulo: "Canal de YouTube Tecnológico",
    subtitulo: "Divulgación de Sistemas IT, Redes y Desarrollo Web",
    descripcion: "Canal enfocado en tutoriales prácticos sobre administración de servidores, resolución de incidencias en Windows/Linux, consejos de hardware y programación web.",
    tags: ["YouTube", "Vídeo Editing", "Tutoriales IT", "OBS Studio"],
    imagen: "imagenes/RedesSociales.png",
    demoUrl: "https://youtube.com",
    destacado: true
  },

  // --- SISTEMAS & REDES IT ---
  {
    id: "servidor-nas",
    categoriaId: "sistemas",
    titulo: "Infraestructura NAS Synology & Backups",
    subtitulo: "Despliegue de almacenamiento seguro y copias redundantes",
    descripcion: "Configuración de servidores NAS en entorno empresarial con volumen RAID, copias de seguridad automatizadas off-site, VPN de acceso remoto y servicios Cloud privados.",
    tags: ["Synology DSM", "RAID", "Hyper Backup", "OpenVPN"],
    imagen: "imagenes/23.png",
    demoUrl: "#",
    destacado: true
  },
  {
    id: "virtualizacion-docker",
    categoriaId: "sistemas",
    titulo: "Entornos Virtualizados & Contenedores",
    subtitulo: "Servidores Proxmox / Windows Server / Docker",
    descripcion: "Administración de máquinas virtuales y servicios contenedorizados (Nginx Reverse Proxy, Pi-hole, bases de datos y microservicios).",
    tags: ["Docker", "Proxmox", "Linux Server", "Active Directory"],
    imagen: "imagenes/24.png",
    demoUrl: "#",
    destacado: false
  }
];
