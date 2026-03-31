/* ================================================
   SCRIPT.JS — Lógica del portafolio JDM
   Juan Diego Monsalve Martinez
   ================================================ */

/* ------------------------------------------------
   1. CAMBIO DE TEMA (claro / oscuro)
   ------------------------------------------------ */

const html = document.documentElement;
const themeBtn = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const savedTheme = localStorage.getItem('theme') || 'light';

html.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeBtn.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next = current === 'light' ? 'dark' : 'light';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  updateThemeIcon(next);
});

function updateThemeIcon(theme) {
  if (theme === 'dark') {
    themeIcon.className = 'fa-solid fa-sun';
  } else {
    themeIcon.className = 'fa-solid fa-moon';
  }
}

/* ------------------------------------------------
   2. SCROLL REVEAL
   ------------------------------------------------ */

const revealElements = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealElements.forEach(el => observer.observe(el));

/* ------------------------------------------------
   3. SOMBRA DEL NAVBAR AL HACER SCROLL
   ------------------------------------------------ */

const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

/* ------------------------------------------------
   4. LINK ACTIVO DEL NAV SEGÚN SECCIÓN VISIBLE
   ------------------------------------------------ */

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active');
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(section => sectionObserver.observe(section));

/* ------------------------------------------------
   5. MENÚ MÓVIL
   ------------------------------------------------ */

const menuBtn = document.getElementById('menu-toggle');
const navList = document.getElementById('nav-links');

menuBtn.addEventListener('click', () => {
  navList.classList.toggle('open');
  const isOpen = navList.classList.contains('open');
  menuBtn.querySelector('i').className = isOpen
    ? 'fa-solid fa-xmark'
    : 'fa-solid fa-bars';
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navList.classList.remove('open');
    menuBtn.querySelector('i').className = 'fa-solid fa-bars';
  });
});