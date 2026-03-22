(function () {
  "use strict";

  document.querySelectorAll("[data-youtube-id]").forEach((thumb) => {
    thumb.addEventListener("click", function () {
      if (this.classList.contains("playing")) return; // already playing — recreating would restart from beginning

      const videoId = this.dataset.youtubeId;
      if (!videoId) return;

      const iframe = document.createElement("iframe");
      iframe.className = "film-card__iframe";
      // origin= required for YouTube to allow embedding from localhost and custom domains
      iframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&color=white&enablejsapi=1&origin=${encodeURIComponent(window.location.origin)}`;
      iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
      iframe.allowFullscreen = true;
      iframe.setAttribute("loading", "lazy");
      iframe.setAttribute("title", this.dataset.title || "Wedding film");

      this.innerHTML = "";
      this.appendChild(iframe);
      this.classList.add("playing");
      this.style.cursor = "default";
    });
  });

  const igModal = document.getElementById("instagram-modal");
  const igEmbed = document.getElementById("instagram-modal-embed");

  function openInstagramModal(url) {
    if (!igModal || !igEmbed) return;

    igEmbed.innerHTML = `<blockquote class="instagram-media" data-instgrm-permalink="${url}" data-instgrm-version="14" style="margin:0 auto;max-width:540px;width:calc(100% - 2px);min-width:326px;"></blockquote>`;

    igModal.hidden = false;
    requestAnimationFrame(() => igModal.classList.add("is-open"));
    document.body.style.overflow = "hidden";

    if (window.instgrm) {
      window.instgrm.Embeds.process();
    } else if (!document.getElementById("instagram-embed-js")) {
      const script = document.createElement("script");
      script.id = "instagram-embed-js";
      script.src = "//www.instagram.com/embed.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }

  function closeInstagramModal() {
    igModal.classList.remove("is-open");
    document.body.style.overflow = "";
    setTimeout(() => {
      igModal.hidden = true;
      igEmbed.innerHTML = "";
    }, 300);
  }

  if (igModal) {
    igModal.querySelector(".instagram-modal__close").addEventListener("click", closeInstagramModal);
    igModal.addEventListener("click", (e) => {
      if (e.target === igModal) closeInstagramModal();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !igModal.hidden) closeInstagramModal();
    });
  }

  document.querySelectorAll("[data-instagram-url]").forEach((thumb) => {
    thumb.addEventListener("click", function () {
      const url = this.dataset.instagramUrl;
      if (url) openInstagramModal(url);
    });
    thumb.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        const url = this.dataset.instagramUrl;
        if (url) openInstagramModal(url);
      }
    });
  });

  const carouselTrack = document.getElementById("films-carousel-track");
  if (carouselTrack) {
    const slides = carouselTrack.querySelectorAll(".films-carousel__slide");
    const dots = document.querySelectorAll(".films-carousel__dot");
    const total = slides.length;
    let current = 0;

    function goTo(index) {
      current = (index + total) % total;
      carouselTrack.style.transform = `translateX(-${current * 100}%)`;
      dots.forEach((dot, i) => {
        const active = i === current;
        dot.classList.toggle("films-carousel__dot--active", active);
        dot.setAttribute("aria-label", `Slide ${i + 1} of ${total}`);
      });
    }

    const carousel = carouselTrack.closest(".films-carousel");
    carousel.querySelector(".films-carousel__btn--prev").addEventListener("click", () => goTo(current - 1));
    carousel.querySelector(".films-carousel__btn--next").addEventListener("click", () => goTo(current + 1));
    dots.forEach((dot, i) => dot.addEventListener("click", () => goTo(i)));

    carousel.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") goTo(current - 1);
      if (e.key === "ArrowRight") goTo(current + 1);
    });

    let touchStartX = 0;
    carouselTrack.addEventListener(
      "touchstart",
      (e) => {
        touchStartX = e.touches[0].clientX;
      },
      { passive: true }
    );
    carouselTrack.addEventListener(
      "touchend",
      (e) => {
        const delta = touchStartX - e.changedTouches[0].clientX;
        if (Math.abs(delta) > 50) goTo(current + (delta > 0 ? 1 : -1));
      },
      { passive: true }
    );
  }
})();
