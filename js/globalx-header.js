// mobile menu toggle (minimal)
document.addEventListener('DOMContentLoaded', function () {
  const btn = document.getElementById('mobileMenuBtn');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!expanded));
    const nav = document.querySelector('nav[aria-label="Main navigation"]');
    if (nav) nav.classList.toggle('hidden');
  });
});
