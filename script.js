// Header scroll behavior
const header = document.getElementById('siteHeader');
const heroCounter = document.querySelector('.hero-footer span');
if (heroCounter) heroCounter.textContent = '01 / 08';

const heroHeight = () => document.querySelector('.hero').offsetHeight;
function onScroll(){
  if (window.scrollY > 40) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
  if (window.scrollY > heroHeight() - 90) {
    header.classList.remove('on-dark');
  } else {
    header.classList.add('on-dark');
  }
}
window.addEventListener('scroll', onScroll);
onScroll();

// Mobile menu
const hamburgerBtn = document.getElementById('hamburgerBtn');
const closeMenuBtn = document.getElementById('closeMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
hamburgerBtn.addEventListener('click', () => {
  mobileMenu.classList.add('open');
  hamburgerBtn.setAttribute('aria-expanded', 'true');
});
closeMenuBtn.addEventListener('click', () => {
  mobileMenu.classList.remove('open');
  hamburgerBtn.setAttribute('aria-expanded', 'false');
});
mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  mobileMenu.classList.remove('open');
  hamburgerBtn.setAttribute('aria-expanded', 'false');
}));

// Fecha os grupos desktop ao clicar fora e preserva o scroll suave nativo.
document.querySelectorAll('.nav-trigger').forEach(trigger => trigger.addEventListener('click', () => {
  const isOpen = trigger.getAttribute('aria-expanded') === 'true';
  document.querySelectorAll('.nav-trigger').forEach(item => item.setAttribute('aria-expanded', 'false'));
  trigger.setAttribute('aria-expanded', String(!isOpen));
}));

document.addEventListener('click', event => {
  if (!event.target.closest('.nav-group')) {
    document.querySelectorAll('.nav-trigger').forEach(trigger => trigger.setAttribute('aria-expanded', 'false'));
  }
});

// Hero: divide o título em letras animadas em sequência, sem efeito de máquina de escrever
(function splitHeroTitle() {
  const h1 = document.querySelector('.hero h1');
  if (!h1) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const animateLine = (line) => {
    const text = line.textContent.trim();
    if (!text) return;

    line.setAttribute('aria-label', text);
    line.textContent = '';

    [...text].forEach((char, charIndex) => {
      const span = document.createElement('span');
      span.className = 'char';
      span.textContent = char === ' ' ? String.fromCharCode(160) : char;
      if (reduce) span.style.animation = 'none';
      span.style.animationDelay = (0.2 + charIndex * 0.04).toFixed(3) + 's';
      line.appendChild(span);
    });
  };

  h1.querySelectorAll(':scope > span, :scope > em').forEach(line => animateLine(line));
})();

// Divide títulos de seção em linhas para o reveal em máscara
(function splitSectionTitles() {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) return;
  document.querySelectorAll('.section h2').forEach(h2 => {
    const html = h2.innerHTML.split(/<br\s*\/?>/i);
    if (html.length < 2) return;
    h2.innerHTML = html.map(line => `<span class="line-mask"><span>${line}</span></span>`).join('');
  });
})();

// Scroll reveal
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.team-grid .team-card').forEach((el, i) => el.style.setProperty('--i', i));
document.querySelectorAll('.project-grid .project').forEach((el, i) => el.style.setProperty('--i', i));
document.querySelectorAll('.timeline article').forEach((el, i) => el.style.setProperty('--i', i));
document.querySelectorAll('.section-intro > p, .about-copy, .legal-overview, .musical-overview, .contact-layout > div').forEach(el => el.classList.add('reveal'));

document.querySelectorAll('.reveal, .line-mask, .timeline article').forEach(el => {
  if (reduceMotion) { el.classList.add('in'); return; }
  io.observe(el);
});


