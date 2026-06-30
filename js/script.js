// Small script for carousel, counters, and lightbox (robustified)
document.addEventListener('DOMContentLoaded', function () {
  // Carousel
  const slides = Array.from(document.querySelectorAll('.slide'));
  let idx = 0;
  const nextBtn = document.querySelector('.carousel-btn.next');
  const prevBtn = document.querySelector('.carousel-btn.prev');

  function show(i) {
    if (!slides.length) return;
    slides.forEach(s => s.classList.remove('active'));
    slides[i].classList.add('active');
  }

  function next() { if (!slides.length) return; idx = (idx + 1) % slides.length; show(idx); }
  function prev() { if (!slides.length) return; idx = (idx - 1 + slides.length) % slides.length; show(idx); }

  if (nextBtn) nextBtn.addEventListener('click', next);
  if (prevBtn) prevBtn.addEventListener('click', prev);

  let auto = slides.length > 1 ? setInterval(next, 6000) : null;
  [nextBtn, prevBtn].forEach(b => {
    if (!b) return;
    b.addEventListener('click', () => {
      if (auto) { clearInterval(auto); auto = setInterval(next, 6000); }
    });
  });

  // Counters
  const counters = Array.from(document.querySelectorAll('.stat-number'));
  const runCounters = () => {
    counters.forEach(c => {
      const target = Number(c.dataset.target) || 0;
      const duration = 1400;
      const start = Number(c.textContent) || 0;
      const startTime = performance.now();
      function tick(now) {
        const progress = Math.min((now - startTime) / duration, 1);
        c.textContent = Math.floor(progress * (target - start) + start);
        if (progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    });
  };

  // Trigger when stats in view
  const stats = document.querySelector('.stats');
  if (stats && 'IntersectionObserver' in window) {
    const obs = new IntersectionObserver((entries, observer) => {
      if (entries[0] && entries[0].isIntersecting) { runCounters(); observer.disconnect(); }
    }, { threshold: 0.4 });
    obs.observe(stats);
  } else {
    // Fallback
    runCounters();
  }

  // Lightbox for gallery
  const items = Array.from(document.querySelectorAll('.gallery-item'));
  const lightbox = document.getElementById('lightbox');
  const lbImg = document.getElementById('lightbox-img');
  const lbCaption = document.getElementById('lightbox-caption');
  const lbClose = document.getElementById('lightbox-close');

  function openLightbox(src, caption) {
    if (!lightbox || !lbImg) return;
    lbImg.src = src || '';
    lbImg.alt = caption || '';
    if (lbCaption) lbCaption.textContent = caption || '';
    lightbox.classList.remove('hidden');
    if (lbClose) lbClose.focus();
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.add('hidden');
    if (lbImg) { lbImg.src = ''; lbImg.alt = ''; }
  }

  items.forEach(it => {
    it.addEventListener('click', function (e) {
      e.preventDefault();
      const img = this.querySelector('img');
      const src = img ? img.src : this.href;
      const caption = this.dataset.caption || (img && img.alt) || '';
      openLightbox(src, caption);
    });
  });

  if (lbClose) lbClose.addEventListener('click', closeLightbox);
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }
  // keyboard support
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });

  // Year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
