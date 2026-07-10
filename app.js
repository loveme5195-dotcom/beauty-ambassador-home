const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

const nav = $('.navbar');
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 24);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.14, rootMargin: '0px 0px -40px' });
$$('.reveal').forEach((element) => revealObserver.observe(element));

$$('.filter-btn').forEach((button) => {
  button.addEventListener('click', () => {
    $$('.filter-btn').forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    const filter = button.dataset.filter;
    $$('.portfolio-item').forEach((item) => {
      item.classList.toggle('is-hidden', filter !== 'all' && item.dataset.category !== filter);
    });
  });
});

const lightbox = $('#lightbox');
const lightboxImage = $('.lightbox-content img', lightbox);
const lightboxTitle = $('#lightboxTitle');
const closeButton = $('.lightbox-close', lightbox);
let lastFocused = null;

const closeLightbox = () => {
  lightbox.hidden = true;
  document.body.style.overflow = '';
  lastFocused?.focus();
};

$$('.portfolio-item').forEach((item) => {
  item.addEventListener('click', () => {
    lastFocused = item;
    lightboxImage.src = item.dataset.image;
    lightboxImage.alt = $('img', item).alt;
    lightboxTitle.textContent = item.dataset.title;
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
    closeButton.focus();
  });
});

closeButton.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (event) => { if (event.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && !lightbox.hidden) closeLightbox(); });

$$('.nav-link').forEach((link) => link.addEventListener('click', () => {
  const collapseElement = $('#mainNav');
  if (collapseElement.classList.contains('show') && window.bootstrap) {
    bootstrap.Collapse.getOrCreateInstance(collapseElement).hide();
  }
}));

$('#year').textContent = new Date().getFullYear();
