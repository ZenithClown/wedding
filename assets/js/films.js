/* ============================================================
   FILMS — Lazy YouTube embed on thumbnail click
   ============================================================ */

(function () {
  'use strict';

  // All film card thumbnails and featured thumbs
  document.querySelectorAll('[data-youtube-id]').forEach(thumb => {
    thumb.addEventListener('click', function () {
      const videoId = this.dataset.youtubeId;
      if (!videoId) return;

      const iframe = document.createElement('iframe');
      iframe.className    = 'film-card__iframe';
      iframe.src          = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&color=white`;
      iframe.allow        = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      iframe.allowFullscreen = true;
      iframe.setAttribute('loading', 'lazy');
      iframe.setAttribute('title', this.dataset.title || 'Wedding film');

      // Replace thumbnail contents with iframe
      this.innerHTML = '';
      this.appendChild(iframe);
      this.classList.add('playing');
      this.style.cursor = 'default';
    });
  });

})();
