/* ============================================================
   HERO — Video poster fade, scroll chevron, stat counters
   ============================================================ */

(function () {
  "use strict";

  // --- Fade out poster image once video plays ---
  const video = document.querySelector(".hero__video");
  const poster = document.querySelector(".hero__poster");

  if (video && poster) {
    video.addEventListener(
      "playing",
      () => {
        poster.classList.add("hidden");
      },
      { once: true }
    );

    // Fallback: hide poster after 3s even if video doesn't fire
    setTimeout(() => poster.classList.add("hidden"), 3000);
  }

  // --- Scroll indicator ---
  const scrollBtn = document.querySelector(".hero__scroll");
  if (scrollBtn) {
    scrollBtn.addEventListener("click", () => {
      const nextSection = document.querySelector(".hero + *") || document.querySelector("section:not(.hero)");
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  }

  // --- Animated counters (stats bar) ---
  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1800;
    const start = performance.now();

    function step(timestamp) {
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);
      el.textContent = current.toLocaleString() + (el.dataset.suffix || "");
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  const counters = document.querySelectorAll("[data-counter]");
  if (counters.length) {
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach((el) => counterObserver.observe(el));
  }
})();
