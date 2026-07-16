// Stars
const sc = document.getElementById('stars');
for (let i = 0; i < 50; i++) {
const s = document.createElement('div');
s.className = 'star';
const sz = Math.random() * 4 + 2;
s.style.cssText = `width:${sz}px;height:${sz}px;top:${Math.random()*100}%;left:${Math.random()*100}%;animation-delay:${Math.random()*4}s;animation-duration:${2+Math.random()*3}s;`;
sc.appendChild(s);
}

/* ═══════════════════════════════════════════
   NUEVAS FUNCIONES — agregado para la feria
   ═══════════════════════════════════════════ */

// Smooth Scroll para el navbar
document.querySelectorAll('.navbar a[href^="#"]').forEach(function (link) {
  link.addEventListener('click', function (e) {
    var targetId = link.getAttribute('href').slice(1);
    var target = document.getElementById(targetId);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// Resalta el link activo del navbar según la sección visible
(function () {
  var navLinks = document.querySelectorAll('.navbar a[href^="#"]');
  var sections = [];
  navLinks.forEach(function (link) {
    var sec = document.getElementById(link.getAttribute('href').slice(1));
    if (sec) sections.push({ link: link, el: sec });
  });
  if (!sections.length || !('IntersectionObserver' in window)) return;

  var navObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        sections.forEach(function (s) { s.link.classList.remove('active'); });
        var match = sections.find(function (s) { return s.el === entry.target; });
        if (match) match.link.classList.add('active');
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

  sections.forEach(function (s) { navObserver.observe(s.el); });
})();

// Fade Up / Fade In al hacer scroll para las nuevas secciones
(function () {
  var revealEls = document.querySelectorAll('.reveal, .reveal-fade');
  if (!revealEls.length) return;

  if (!('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) { el.classList.add('visible'); });
    return;
  }

  var revealObserver = new IntersectionObserver(function (entries, obs) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealEls.forEach(function (el) { revealObserver.observe(el); });
})();
