// Header scroll behavior
const header = document.getElementById('siteHeader');
const heroHeight = () => document.querySelector('.hero').offsetHeight;
function onScroll(){
  if(window.scrollY > 40){
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
  if(window.scrollY > heroHeight() - 90){
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

// Garante que a ancora seja aplicada depois que o menu sair da tela.
mobileMenu.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener('click', () => {
  const target = document.querySelector(a.getAttribute('href'));
  if(target) target.scrollIntoView({behavior: 'auto', block: 'start'});
}));

// Scroll reveal
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => io.observe(el));

// Artist modal ("Conhecer")
const artistModalOverlay = document.getElementById('artistModalOverlay');
const artistModalClose = document.getElementById('artistModalClose');
const artistModalName = document.getElementById('artistModalName');
const artistModalBio = document.getElementById('artistModalBio');

function openArtistModal(card){
  const name = card.getAttribute('data-name') || '';
  const bio = card.getAttribute('data-bio') || '';
  artistModalName.textContent = name;
  artistModalBio.textContent = bio;
  artistModalOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeArtistModal(){
  artistModalOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

document.querySelectorAll('.js-artist-open').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const card = btn.closest('.artist-card');
    if(card) openArtistModal(card);
  });
});

if(artistModalClose){
  artistModalClose.addEventListener('click', closeArtistModal);
}
if(artistModalOverlay){
  artistModalOverlay.addEventListener('click', (e) => {
    if(e.target === artistModalOverlay) closeArtistModal();
  });
}
document.addEventListener('keydown', (e) => {
  if(e.key === 'Escape') closeArtistModal();
});
