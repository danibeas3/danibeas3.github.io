/**
 * Centralized Portfolio Data Store for Dani Ruiz Web
 * Organizado por ramas / categorías de proyectos
 */

export const categoriasPortfolio = [
  {
    id: "web",
    titulo: "Proyectos Web",
    subtitulo: "Diseño y desarrollo web a medida",
    icono: "🌐",
    colorClass: "globo-azul",
    badgeColor: "#3498db"
  },
  {
    id: "youtube",
    titulo: "YouTube & Media",
    subtitulo: "Canales y proyectos audiovisuales",
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
    titulo: "portalEmp",
    subtitulo: "Sistema web de gestión de jornada laboral y fichajes",
    descripcion: "Aplicación web completa para registro de horario laboral, gestión de ausencias, vacaciones, horas extraordinarias y partes de trabajo. Incluye módulo de administración, reportes detallados y generación de PDF justificativos.",
    tags: ["PHP 8", "MySQL", "JavaScript", "CSS3", "TCPDF"],
    imagen: "imagenes/21.png",
    demoUrl: "#",
    githubUrl: "#",
    destacado: true
  },
  {
    id: "portal-doc",
    categoriaId: "software",
    titulo: "portalDoc",
    subtitulo: "Presencia, horas y actividades\ndel profesorado autónomo",
    descripcion: "Plataforma para centros de formación que centraliza la presencia, las horas confirmadas, las tutorías, las extras y la documentación del profesorado autónomo.",
    tags: ["Presencia", "Horas", "Tutorías"],
    demoUrl: "/portaldoc/",
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
    id: 'beas-guadix', categoriaId: 'web', titulo: 'Beas de Guadix',
    subtitulo: 'Web turística e informativa\ndel municipio',
    tags: ['WordPress', 'Contenido'],
    imagenIlustrada: new URL('../../imagenes/portfolio/beas-guadix-atardecer.png', import.meta.url).href,
    demoUrl: 'http://beasdeguadix.com/'
  },
  {
    id: 'cronista-web', categoriaId: 'web', titulo: 'El Cronista Errante',
    subtitulo: 'Sitio web de El Cronista Errante',
    tags: ['Web'],
    imagenIlustrada: new URL('../../imagenes/portfolio/el-cronista-usuario.png', import.meta.url).href,
    demoUrl: 'https://elcronistaerrante.com/'
  },
  {
    id: 'estacion-diseno', categoriaId: 'web', titulo: 'Estación Diseño',
    subtitulo: 'Sitio web corporativo\nFormación oficial y másteres',
    tags: ['WordPress', 'Elementor'],
    imagenIlustrada: new URL('../../imagenes/portfolio/estacion-diseno-usuario.png', import.meta.url).href,
    demoUrl: 'https://estaciondiseno.es/'
  },
  {
    id: 'grupo-efp', categoriaId: 'web', titulo: 'Grupo EFP',
    subtitulo: 'Sitio web corporativo\nFormación para el empleo',
    tags: ['WordPress', 'Plesk'],
    imagenIlustrada: new URL('../../imagenes/portfolio/grupo-efp-usuario.png', import.meta.url).href,
    demoUrl: 'https://escueladeformacionprofesional.com/'
  },
  {
    id: 'arto-blanco', categoriaId: 'web', titulo: 'Arto Blanco',
    subtitulo: 'Web de apartamentos\nturísticos en Agua Amarga',
    tags: ['WordPress', 'Reservas'],
    imagenIlustrada: new URL('../../imagenes/portfolio/arto-blanco-usuario.png', import.meta.url).href,
    demoUrl: 'https://alojamiento-almeria.com/nueva/'
  },
  // --- CANALES DE YOUTUBE ---
  {
    id: 'el-cronista', categoriaId: 'youtube', titulo: 'El Cronista',
    subtitulo: 'El Cronista Errante',
    tags: ['YouTube', 'Lore'],
    imagenIlustrada: new URL('../../imagenes/portfolio/el-cronista-usuario.png', import.meta.url).href,
    demoUrl: 'https://www.youtube.com/@ElCronistaErranteLore'
  },
  {
    id: 'dr-tutoriales', categoriaId: 'youtube', titulo: 'DR Tutoriales',
    subtitulo: 'Mi canal de tutoriales',
    tags: ['YouTube', 'Tutoriales'],
    imagenIlustrada: new URL('../../imagenes/portfolio/dr-tutoriales-usuario.png', import.meta.url).href,
    demoUrl: 'https://www.youtube.com/@danibeas3'
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
