(function () {
  "use strict";

  const scrollBtn = document.querySelector(".hero__scroll");
  if (scrollBtn) {
    scrollBtn.addEventListener("click", () => {
      const nextSection = document.querySelector(".hero + *") || document.querySelector("section:not(.hero)");
      if (nextSection) nextSection.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  function animateCounter(el) {
    const target = parseInt(el.dataset.counter, 10);
    const duration = 1800;
    const start = performance.now();

    function step(timestamp) {
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target).toLocaleString() + (el.dataset.suffix || "");
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
