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

// Garante que a âncora seja aplicada depois que o menu sair da tela.
mobileMenu.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener('click', () => {
  const target = document.querySelector(a.getAttribute('href'));
  if (target) target.scrollIntoView({ behavior: 'auto', block: 'start' });
}));

// Scroll reveal
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => io.observe(el));
