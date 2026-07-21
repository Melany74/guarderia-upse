/* ══════════════════════════════════════════════════════════
   PEQUE CAMPUS UPSE — script.js
   1) Estrellas animadas (lógica original, movida desde el HTML)
   2) Menú de navegación (sticky navbar + toggle móvil)     [NUEVO]
   3) Animaciones fade-up / fade-in al hacer scroll         [NUEVO]
   ══════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── 1) ESTRELLAS (SIN CAMBIOS DE LÓGICA) ── */
  const starsContainer = document.getElementById('stars');
  if (starsContainer) {
    for (let i = 0; i < 50; i++) {
      const s = document.createElement('div');
      s.className = 'star';
      const sz = Math.random() * 4 + 2;
      s.style.cssText =
        `width:${sz}px;height:${sz}px;` +
        `top:${Math.random() * 100}%;left:${Math.random() * 100}%;` +
        `animation-delay:${Math.random() * 4}s;` +
        `animation-duration:${2 + Math.random() * 3}s;`;
      starsContainer.appendChild(s);
    }
  }

  /* ── 2) NAVBAR: menú móvil (NUEVO) ── */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      navToggle.classList.toggle('open', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Cierra el menú móvil al elegir una opción
    navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ── 2b) NAVBAR: resaltar el enlace activo según la sección visible (NUEVO) ── */
  const sections = document.querySelectorAll('section[id], .hero[id]');
  const navLinkMap = new Map();
  document.querySelectorAll('.nav-link').forEach(link => {
    navLinkMap.set(link.getAttribute('href').replace('#', ''), link);
  });

  const spyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const link = navLinkMap.get(entry.target.id);
      if (!link) return;
      if (entry.isIntersecting) {
        document.querySelectorAll('.nav-link.active').forEach(a => a.classList.remove('active'));
        link.classList.add('active');
      }
    });
  }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });

  sections.forEach(section => spyObserver.observe(section));

  /* ── 3) ANIMACIONES fade-up / fade-in al hacer scroll (NUEVO) ── */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.fade-up, .fade-in').forEach(el => {
    revealObserver.observe(el);
  });

});