/* ============================================================
   FILMS — Lazy YouTube embed on thumbnail click
   ============================================================ */

(function () {
  "use strict";

  // All film card thumbnails and featured thumbs
  document.querySelectorAll("[data-youtube-id]").forEach((thumb) => {
    thumb.addEventListener("click", function () {
      const videoId = this.dataset.youtubeId;
      if (!videoId) return;

      const iframe = document.createElement("iframe");
      iframe.className = "film-card__iframe";
      iframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&color=white`;
      iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
      iframe.allowFullscreen = true;
      iframe.setAttribute("loading", "lazy");
      iframe.setAttribute("title", this.dataset.title || "Wedding film");

      // Replace thumbnail contents with iframe
      this.innerHTML = "";
      this.appendChild(iframe);
      this.classList.add("playing");
      this.style.cursor = "default";
    });
  });

  // --- Films Carousel (homepage mini slideshow) ---
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

    // Keyboard navigation
    carousel.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") goTo(current - 1);
      if (e.key === "ArrowRight") goTo(current + 1);
    });

    // Touch swipe
    let touchStartX = 0;
    carouselTrack.addEventListener("touchstart", (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
    carouselTrack.addEventListener("touchend", (e) => {
      const delta = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(delta) > 50) goTo(current + (delta > 0 ? 1 : -1));
    });
  }
})();
