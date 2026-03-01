/* ============================================================
   SCROLL-TO-TOP — Show/hide button and smooth scroll
   ============================================================ */

(function () {
  'use strict';

  const btn = document.getElementById('scroll-top');
  if (!btn) return;

  const THRESHOLD = 300;

  window.addEventListener('scroll', () => {
    if (window.scrollY > THRESHOLD) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  btn.setAttribute('aria-label', 'Scroll to top');
  btn.setAttribute('tabindex', '0');
  btn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });

})();
