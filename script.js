/* ================================================
   SCRIPT.JS — Lógica del portafolio JDM
   Juan Diego Monsalve Martinez
   ================================================
   Este archivo maneja todo el comportamiento INTERACTIVO.
   Se ejecuta después de que todo el HTML haya cargado
   porque el <script> está al final del <body>.
   ================================================ */

/* ------------------------------------------------
   1. CAMBIO DE TEMA (claro / oscuro)
   ------------------------------------------------
   Al hacer click en el botón de luna/sol:
   - Cambia el atributo data-theme del <html>
   - CSS lee ese atributo y aplica las variables del tema
   - Guarda la preferencia en localStorage para recordarla
   ------------------------------------------------ */

/* Obtiene el elemento <html> — aquí se cambia data-theme="light/dark" */
const html = document.documentElement;

/* El botón de luna/sol en el navbar */
const themeBtn = document.getElementById('theme-toggle');

/* El ícono dentro del botón — cambia entre fa-moon y fa-sun */
const themeIcon = document.getElementById('theme-icon');

/* Lee el tema guardado anteriormente. Si no hay nada guardado, usa 'light'
   localStorage es una forma de guardar datos en el navegador
   que persisten aunque el usuario cierre la pestaña */
const savedTheme = localStorage.getItem('theme') || 'light';

/* Aplica el tema guardado al cargar la página */
html.setAttribute('data-theme', savedTheme);

/* Actualiza el ícono según el tema actual */
updateThemeIcon(savedTheme);

/* Escucha el click en el botón de tema */
themeBtn.addEventListener('click', () => {
  /* Lee el tema actual */
  const current = html.getAttribute('data-theme');

  /* Calcula el tema opuesto */
  const next = current === 'light' ? 'dark' : 'light';

  /* Aplica el nuevo tema — CSS reacciona automáticamente */
  html.setAttribute('data-theme', next);

  /* Guarda la preferencia para la próxima visita */
  localStorage.setItem('theme', next);

  /* Actualiza el ícono del botón */
  updateThemeIcon(next);
});

/* Cambia el ícono según el tema:
   - En modo oscuro muestra el sol (para poder volver al claro)
   - En modo claro muestra la luna (para poder ir al oscuro) */
function updateThemeIcon(theme) {
  if (theme === 'dark') {
    themeIcon.className = 'fa-solid fa-sun';
  } else {
    themeIcon.className = 'fa-solid fa-moon';
  }
}

/* ------------------------------------------------
   2. SCROLL REVEAL
   ------------------------------------------------
   Los elementos con class="reveal" empiezan ocultos
   (definido en animations.css).
   IntersectionObserver detecta cuando entran al viewport
   y les agrega la clase "visible" para que se animen.
   ------------------------------------------------ */

/* Selecciona todos los elementos con class="reveal" en la página */
const revealElements = document.querySelectorAll('.reveal');

/* IntersectionObserver: observa elementos y ejecuta el callback
   cuando entran o salen del viewport (la ventana visible) */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    /* Si el elemento está entrando al viewport */
    if (entry.isIntersecting) {
      /* Agrega la clase "visible" — CSS anima el cambio automáticamente */
      entry.target.classList.add('visible');

      /* Deja de observar el elemento — la animación solo se ejecuta UNA vez
         (no se repite si el usuario sube y vuelve a bajar) */
      observer.unobserve(entry.target);
    }
  });
}, {
  /* La animación se activa cuando el 15% del elemento es visible
     0 = apenas asoma, 1 = completamente visible */
  threshold: 0.15
});

/* Empieza a observar cada elemento con class="reveal" */
revealElements.forEach(el => observer.observe(el));

/* ------------------------------------------------
   3. SOMBRA DEL NAVBAR AL HACER SCROLL
   ------------------------------------------------
   Cuando el usuario baja, el navbar agrega la clase
   "scrolled" que hace el borde inferior más visible.
   ------------------------------------------------ */

const navbar = document.getElementById('navbar');

/* Se ejecuta cada vez que el usuario hace scroll */
window.addEventListener('scroll', () => {
  /* window.scrollY es cuántos píxeles se ha bajado desde el tope */
  if (window.scrollY > 20) {
    /* Agrega la clase — CSS hace el borde más visible */
    navbar.classList.add('scrolled');
  } else {
    /* Al volver arriba, el borde vuelve a ser sutil */
    navbar.classList.remove('scrolled');
  }
});

/* ------------------------------------------------
   4. LINK ACTIVO DEL NAV SEGÚN SECCIÓN VISIBLE
   ------------------------------------------------
   Mientras el usuario hace scroll, el link del navbar
   correspondiente a la sección visible se resalta
   con la clase "active".
   ------------------------------------------------ */

/* Selecciona todas las secciones que tienen un ID */
const sections = document.querySelectorAll('section[id]');

/* Selecciona todos los links del navbar */
const navLinks = document.querySelectorAll('.nav-link');

/* Otro IntersectionObserver, esta vez para las secciones completas */
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    /* Si la sección está suficientemente visible */
    if (entry.isIntersecting) {
      /* Obtiene el ID de la sección visible — "proyectos", "inicio", etc. */
      const id = entry.target.getAttribute('id');

      /* Quita la clase "active" de TODOS los links */
      navLinks.forEach(link => {
        link.classList.remove('active');

        /* Le pone "active" solo al link que apunta a esta sección
           href="#proyectos" coincide con id="proyectos" */
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active');
        }
      });
    }
  });
}, {
  /* Se activa cuando el 40% de la sección es visible
     40% es suficiente para saber qué sección domina la pantalla */
  threshold: 0.4
});

/* Empieza a observar cada sección */
sections.forEach(section => sectionObserver.observe(section));

/* ------------------------------------------------
   5. MENÚ MÓVIL
   ------------------------------------------------
   Al hacer click en el hamburger:
   - El menú se abre/cierra con la clase "open"
   - El ícono cambia entre hamburger y X
   Al hacer click en cualquier link del menú:
   - El menú se cierra automáticamente
   ------------------------------------------------ */

/* El botón hamburger (solo visible en móvil) */
const menuBtn = document.getElementById('menu-toggle');

/* La lista de links del navbar */
const navList = document.getElementById('nav-links');

/* Al hacer click en el hamburger */
menuBtn.addEventListener('click', () => {
  /* toggle agrega "open" si no está, la quita si ya está */
  navList.classList.toggle('open');

  /* Verifica si el menú quedó abierto o cerrado */
  const isOpen = navList.classList.contains('open');

  /* Cambia el ícono según el estado */
  menuBtn.querySelector('i').className = isOpen
    ? 'fa-solid fa-xmark' /* X para cerrar */
    : 'fa-solid fa-bars'; /* hamburger para abrir */
});

/* Al hacer click en cualquier link del menú, el menú se cierra
   Sin esto, el menú quedaría abierto después de navegar */
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    /* Cierra el menú */
    navList.classList.remove('open');
    /* Vuelve el ícono al hamburger */
    menuBtn.querySelector('i').className = 'fa-solid fa-bars';
  });
});