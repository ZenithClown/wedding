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

  const previewGrid = document.querySelector(".gallery-preview__grid");
  if (previewGrid && window.LANDING_PREVIEW && window.LANDING_PREVIEW.length) {
    const images = window.LANDING_PREVIEW;
    const lightbox = document.querySelector(".lightbox");
    const lbImg = lightbox && lightbox.querySelector(".lightbox__img");
    const lbClose = lightbox && lightbox.querySelector(".lightbox__close");
    const lbPrev = lightbox && lightbox.querySelector(".lightbox__nav--prev");
    const lbNext = lightbox && lightbox.querySelector(".lightbox__nav--next");
    const lbCounter = lightbox && lightbox.querySelector(".lightbox__counter");
    const lbCaption = lightbox && lightbox.querySelector(".lightbox__caption");
    const lbBackdrop = lightbox && lightbox.querySelector(".lightbox__backdrop");
    let currentIdx = 0;

    const showPreviewImg = (idx) => {
      if (!lbImg) return;
      lbImg.src = images[idx].src;
      lbImg.alt = "Wedding photo";
      if (lbCounter) lbCounter.textContent = `${idx + 1} / ${images.length}`;
      if (lbCaption) lbCaption.textContent = "";
      currentIdx = idx;
    };

    const openPreviewLightbox = (idx) => {
      if (!lightbox) return;
      showPreviewImg(idx);
      lightbox.classList.add("active");
      document.body.classList.add("lightbox-open");
      lbClose && lbClose.focus();
    };

    const closePreviewLightbox = () => {
      if (!lightbox) return;
      lightbox.classList.remove("active");
      document.body.classList.remove("lightbox-open");
    };

    images.forEach((item, idx) => {
      const el = document.createElement("div");
      el.className = "gallery-grid__item";
      el.setAttribute("role", "button");
      el.setAttribute("tabindex", "0");
      el.setAttribute("aria-label", "View wedding photo");
      el.innerHTML = `<img src="${item.src}" alt="Wedding photo" loading="lazy" decoding="async">`;
      el.style.cssText = `opacity:0;transform:translateY(16px);transition:opacity 0.5s ease ${idx * 40}ms,transform 0.5s ease ${idx * 40}ms`;
      el.addEventListener("click", () => openPreviewLightbox(idx));
      el.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openPreviewLightbox(idx);
        }
      });
      previewGrid.appendChild(el);
    });

    // Double rAF forces a style recalc before transitions begin
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        previewGrid.querySelectorAll(".gallery-grid__item").forEach((el) => {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
        });
      })
    );

    if (lightbox) {
      lbClose && lbClose.addEventListener("click", closePreviewLightbox);
      lbBackdrop && lbBackdrop.addEventListener("click", closePreviewLightbox);
      lbPrev && lbPrev.addEventListener("click", () => showPreviewImg((currentIdx - 1 + images.length) % images.length));
      lbNext && lbNext.addEventListener("click", () => showPreviewImg((currentIdx + 1) % images.length));

      document.addEventListener("keydown", (e) => {
        if (!lightbox.classList.contains("active")) return;
        if (e.key === "Escape") closePreviewLightbox();
        if (e.key === "ArrowLeft") showPreviewImg((currentIdx - 1 + images.length) % images.length);
        if (e.key === "ArrowRight") showPreviewImg((currentIdx + 1) % images.length);
      });

      let touchStartX = 0;
      lightbox.addEventListener("touchstart", (e) => { touchStartX = e.changedTouches[0].clientX; }, { passive: true });
      lightbox.addEventListener("touchend", (e) => {
        const dx = e.changedTouches[0].clientX - touchStartX;
        if (Math.abs(dx) > 50) dx > 0
          ? showPreviewImg((currentIdx - 1 + images.length) % images.length)
          : showPreviewImg((currentIdx + 1) % images.length);
      }, { passive: true });
    }
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
