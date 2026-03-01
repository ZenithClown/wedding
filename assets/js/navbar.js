/* ============================================================
   NAVBAR — Scroll shrink, mobile drawer, active link
   ============================================================ */

(function () {
  'use strict';

  const navbar      = document.querySelector('.navbar');
  const hamburger   = document.querySelector('.navbar__hamburger');
  const drawer      = document.querySelector('.nav-drawer');
  const overlay     = document.querySelector('.nav-drawer__overlay');
  const body        = document.body;
  const SCROLL_THRESHOLD = 80;

  // --- Scroll: shrink navbar ---
  function onScroll() {
    if (window.scrollY > SCROLL_THRESHOLD) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run on load

  // --- Mobile drawer toggle ---
  function openDrawer() {
    body.classList.add('nav-open');
    hamburger.setAttribute('aria-expanded', 'true');
    hamburger.setAttribute('aria-label', 'Close navigation');
    // Focus trap: first drawer link
    const firstLink = drawer.querySelector('.nav-drawer__link');
    if (firstLink) firstLink.focus();
  }

  function closeDrawer() {
    body.classList.remove('nav-open');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'Open navigation');
  }

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      body.classList.contains('nav-open') ? closeDrawer() : openDrawer();
    });
  }

  if (overlay) {
    overlay.addEventListener('click', closeDrawer);
  }

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && body.classList.contains('nav-open')) {
      closeDrawer();
    }
  });

  // Close drawer when a link is clicked
  drawer && drawer.querySelectorAll('.nav-drawer__link').forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // --- Active link highlighting ---
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';

  document.querySelectorAll('.navbar__link, .nav-drawer__link').forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    const linkPage = href.split('/').pop();
    if (linkPage === currentPath || (currentPath === '' && linkPage === 'index.html')) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });

  // --- Reveal on scroll (shared IntersectionObserver) ---
  const revealEls = document.querySelectorAll(
    '.reveal, .reveal--left, .reveal--right, .reveal--scale'
  );

  if (revealEls.length) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(el => revealObserver.observe(el));
  }

})();
