/* ============================================================
   GALLERY — Infinite scroll, lightbox, category filter
   ============================================================ */

(function () {
  "use strict";

  // ---- Configuration ----------------------------------------
  const BATCH_SIZE = 9;
  const GRID_SELECTOR = ".gallery-grid";
  const SENTINEL_SEL = ".load-more-trigger";

  // ---- Image data (replace src with real images before deploy)
  // Each object: { src, thumb, alt, category, caption }
  // Uses Picsum for placeholders; unique seeds ensure variety.
  const IMAGE_DATA = [
    {
      src: "https://picsum.photos/seed/wed1/1200/800",
      thumb: "https://picsum.photos/seed/wed1/600/400",
      alt: "Wedding ceremony",
      category: "ceremony",
      caption: "The Vows",
    },
    {
      src: "https://picsum.photos/seed/wed2/800/1200",
      thumb: "https://picsum.photos/seed/wed2/400/600",
      alt: "Reception hall",
      category: "reception",
      caption: "Reception Elegance",
    },
    {
      src: "https://picsum.photos/seed/wed3/1200/800",
      thumb: "https://picsum.photos/seed/wed3/600/400",
      alt: "Couple portrait",
      category: "portraits",
      caption: "Golden Hour",
    },
    {
      src: "https://picsum.photos/seed/wed4/1200/900",
      thumb: "https://picsum.photos/seed/wed4/600/450",
      alt: "Wedding details",
      category: "details",
      caption: "Floral Arrangements",
    },
    {
      src: "https://picsum.photos/seed/wed5/1200/800",
      thumb: "https://picsum.photos/seed/wed5/600/400",
      alt: "Candid moment",
      category: "candid",
      caption: "A Stolen Glance",
    },
    {
      src: "https://picsum.photos/seed/wed6/900/1200",
      thumb: "https://picsum.photos/seed/wed6/450/600",
      alt: "Couple portrait outdoor",
      category: "portraits",
      caption: "Together",
    },
    {
      src: "https://picsum.photos/seed/wed7/1200/800",
      thumb: "https://picsum.photos/seed/wed7/600/400",
      alt: "Wedding ceremony details",
      category: "ceremony",
      caption: "The Ceremony",
    },
    {
      src: "https://picsum.photos/seed/wed8/1200/800",
      thumb: "https://picsum.photos/seed/wed8/600/400",
      alt: "Reception dance",
      category: "reception",
      caption: "First Dance",
    },
    {
      src: "https://picsum.photos/seed/wed9/800/1200",
      thumb: "https://picsum.photos/seed/wed9/400/600",
      alt: "Bridal portrait",
      category: "portraits",
      caption: "Bridal Radiance",
    },
    {
      src: "https://picsum.photos/seed/wed10/1200/800",
      thumb: "https://picsum.photos/seed/wed10/600/400",
      alt: "Wedding rings",
      category: "details",
      caption: "Eternal Rings",
    },
    {
      src: "https://picsum.photos/seed/wed11/1200/800",
      thumb: "https://picsum.photos/seed/wed11/600/400",
      alt: "Candid laughter",
      category: "candid",
      caption: "Pure Joy",
    },
    {
      src: "https://picsum.photos/seed/wed12/1200/800",
      thumb: "https://picsum.photos/seed/wed12/600/400",
      alt: "Couple walking",
      category: "portraits",
      caption: "Walking Together",
    },
    {
      src: "https://picsum.photos/seed/wed13/1200/800",
      thumb: "https://picsum.photos/seed/wed13/600/400",
      alt: "Wedding ceremony",
      category: "ceremony",
      caption: "Sacred Moment",
    },
    {
      src: "https://picsum.photos/seed/wed14/1200/800",
      thumb: "https://picsum.photos/seed/wed14/600/400",
      alt: "Reception table setup",
      category: "reception",
      caption: "Reception Décor",
    },
    {
      src: "https://picsum.photos/seed/wed15/800/1200",
      thumb: "https://picsum.photos/seed/wed15/400/600",
      alt: "Groom portrait",
      category: "portraits",
      caption: "The Groom",
    },
    {
      src: "https://picsum.photos/seed/wed16/1200/800",
      thumb: "https://picsum.photos/seed/wed16/600/400",
      alt: "Bridal details",
      category: "details",
      caption: "Bridal Jewelry",
    },
    {
      src: "https://picsum.photos/seed/wed17/1200/800",
      thumb: "https://picsum.photos/seed/wed17/600/400",
      alt: "Family candid",
      category: "candid",
      caption: "Family Moments",
    },
    {
      src: "https://picsum.photos/seed/wed18/1200/800",
      thumb: "https://picsum.photos/seed/wed18/600/400",
      alt: "Evening ceremony",
      category: "ceremony",
      caption: "Evening Nuptials",
    },
    {
      src: "https://picsum.photos/seed/wed19/900/1200",
      thumb: "https://picsum.photos/seed/wed19/450/600",
      alt: "Romantic portrait",
      category: "portraits",
      caption: "Romance",
    },
    {
      src: "https://picsum.photos/seed/wed20/1200/800",
      thumb: "https://picsum.photos/seed/wed20/600/400",
      alt: "Floral details",
      category: "details",
      caption: "Blooming Love",
    },
    {
      src: "https://picsum.photos/seed/wed21/1200/800",
      thumb: "https://picsum.photos/seed/wed21/600/400",
      alt: "Candid toast",
      category: "candid",
      caption: "The Toast",
    },
    {
      src: "https://picsum.photos/seed/wed22/1200/800",
      thumb: "https://picsum.photos/seed/wed22/600/400",
      alt: "Reception night",
      category: "reception",
      caption: "Night Reception",
    },
    {
      src: "https://picsum.photos/seed/wed23/1200/800",
      thumb: "https://picsum.photos/seed/wed23/600/400",
      alt: "Couple in garden",
      category: "portraits",
      caption: "Garden of Love",
    },
    {
      src: "https://picsum.photos/seed/wed24/1200/800",
      thumb: "https://picsum.photos/seed/wed24/600/400",
      alt: "Wedding cake cutting",
      category: "candid",
      caption: "Sweet Beginnings",
    },
    {
      src: "https://picsum.photos/seed/wed25/800/1200",
      thumb: "https://picsum.photos/seed/wed25/400/600",
      alt: "Bride portrait",
      category: "portraits",
      caption: "The Bride",
    },
    {
      src: "https://picsum.photos/seed/wed26/1200/800",
      thumb: "https://picsum.photos/seed/wed26/600/400",
      alt: "Reception speeches",
      category: "reception",
      caption: "Words of Love",
    },
    {
      src: "https://picsum.photos/seed/wed27/1200/800",
      thumb: "https://picsum.photos/seed/wed27/600/400",
      alt: "Ceremony rings exchange",
      category: "ceremony",
      caption: "Ring Exchange",
    },
    {
      src: "https://picsum.photos/seed/wed28/1200/800",
      thumb: "https://picsum.photos/seed/wed28/600/400",
      alt: "Wedding shoes",
      category: "details",
      caption: "Every Detail Matters",
    },
    {
      src: "https://picsum.photos/seed/wed29/1200/800",
      thumb: "https://picsum.photos/seed/wed29/600/400",
      alt: "Happy couple candid",
      category: "candid",
      caption: "Unscripted Happiness",
    },
    {
      src: "https://picsum.photos/seed/wed30/1200/800",
      thumb: "https://picsum.photos/seed/wed30/600/400",
      alt: "Night portrait",
      category: "portraits",
      caption: "Midnight Magic",
    },
  ];

  // ---- State -----------------------------------------------
  // Allow page-specific override (e.g. couple-shoot.html injects window.GALLERY_OVERRIDE)
  const SOURCE_DATA = window.GALLERY_OVERRIDE && window.GALLERY_OVERRIDE.length ? window.GALLERY_OVERRIDE : IMAGE_DATA;

  let allImages = [...SOURCE_DATA];
  let filteredImages = [...SOURCE_DATA];
  let loadedCount = 0;
  let isLoading = false;
  let activeCategory = "all";

  // ---- DOM refs -------------------------------------------
  const grid = document.querySelector(GRID_SELECTOR);
  const sentinel = document.querySelector(SENTINEL_SEL);
  const filterBtns = document.querySelectorAll(".filter-bar__btn");
  const countEl = document.querySelector(".filter-bar__count");

  if (!grid) return; // not a gallery page

  // ---- Size-based masonry for all gallery pages -----------
  grid.classList.add("gallery-grid--masonry");

  // ---- Build gallery item HTML ----------------------------
  function buildItem(img, index) {
    const item = document.createElement("div");
    item.className = "gallery-grid__item";
    item.dataset.category = img.category;
    item.dataset.index = index;
    item.setAttribute("role", "button");
    item.setAttribute("tabindex", "0");
    item.setAttribute("aria-label", `View photo: ${img.alt}`);

    // Span portrait images across 2 rows based on actual dimensions
    const match = img.thumb.match(/\/(\d+)\/(\d+)(?:\?.*)?$/);
    if (match) {
      const ratio = parseInt(match[1]) / parseInt(match[2]);
      if (ratio < 0.85) {
        item.classList.add("tall");
        item.style.gridRow = "span 2";
      }
    }

    item.innerHTML = `
      <img
        src="${img.thumb}"
        alt="${img.alt}"
        loading="lazy"
        decoding="async"
      >
      <div class="gallery-grid__caption">
        <span class="gallery-grid__caption-text">${img.caption || ""}</span>
      </div>
      <div class="gallery-grid__expand" aria-hidden="true">
        <svg viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg>
      </div>
    `;

    item.addEventListener("click", () => openLightbox(index));
    item.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openLightbox(index);
      }
    });

    return item;
  }

  // ---- Load next batch ------------------------------------
  function loadBatch() {
    if (isLoading) return;
    const remaining = filteredImages.length - loadedCount;
    if (remaining <= 0) {
      sentinel && (sentinel.style.display = "none");
      return;
    }

    isLoading = true;
    sentinel && (sentinel.innerHTML = '<div class="spinner"></div>');

    // Simulate async (replace with real fetch if needed)
    requestAnimationFrame(() => {
      const batch = filteredImages.slice(loadedCount, loadedCount + BATCH_SIZE);

      batch.forEach((img, i) => {
        const el = buildItem(img, loadedCount + i);
        // Stagger entrance animation
        el.style.opacity = "0";
        el.style.transform = "translateY(16px)";
        el.style.transition = `opacity 0.5s ease ${i * 60}ms, transform 0.5s ease ${i * 60}ms`;
        grid.appendChild(el);

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
          });
        });
      });

      loadedCount += batch.length;
      isLoading = false;

      updateCount();

      if (loadedCount >= filteredImages.length) {
        sentinel && (sentinel.style.display = "none");
      } else {
        sentinel && (sentinel.innerHTML = "");
      }
    });
  }

  // ---- Update visible count --------------------------------
  function updateCount() {
    if (countEl) {
      countEl.textContent = `${loadedCount} / ${filteredImages.length} photos`;
    }
  }

  // ---- IntersectionObserver for infinite scroll -----------
  if (sentinel) {
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadBatch();
      },
      { rootMargin: "200px" }
    );

    io.observe(sentinel);
  }

  // ---- Category filter ------------------------------------
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const cat = btn.dataset.filter;
      if (cat === activeCategory) return;

      activeCategory = cat;
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      // Reset
      grid.innerHTML = "";
      loadedCount = 0;

      filteredImages = cat === "all" ? [...allImages] : allImages.filter((img) => img.category === cat);

      sentinel && (sentinel.style.display = "");
      sentinel && (sentinel.innerHTML = "");

      loadBatch();
    });
  });

  // ---- Initial load ----------------------------------------
  loadBatch();

  // ================================================================
  // LIGHTBOX
  // ================================================================
  const lightbox = document.querySelector(".lightbox");
  const lbImg = lightbox && lightbox.querySelector(".lightbox__img");
  const lbClose = lightbox && lightbox.querySelector(".lightbox__close");
  const lbPrev = lightbox && lightbox.querySelector(".lightbox__nav--prev");
  const lbNext = lightbox && lightbox.querySelector(".lightbox__nav--next");
  const lbCounter = lightbox && lightbox.querySelector(".lightbox__counter");
  const lbCaption = lightbox && lightbox.querySelector(".lightbox__caption");
  const lbBackdrop = lightbox && lightbox.querySelector(".lightbox__backdrop");

  let currentIndex = 0;

  function openLightbox(index) {
    if (!lightbox) return;
    currentIndex = index;
    showImage(index);
    lightbox.classList.add("active");
    document.body.classList.add("lightbox-open");
    lbClose && lbClose.focus();
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove("active");
    document.body.classList.remove("lightbox-open");
  }

  function showImage(index) {
    const img = filteredImages[index];
    if (!img || !lbImg) return;

    lbImg.src = img.src;
    lbImg.alt = img.alt;
    if (lbCounter) lbCounter.textContent = `${index + 1} / ${filteredImages.length}`;
    if (lbCaption) lbCaption.textContent = img.caption || "";
    currentIndex = index;
  }

  function goPrev() {
    const newIdx = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
    showImage(newIdx);
  }

  function goNext() {
    const newIdx = (currentIndex + 1) % filteredImages.length;
    showImage(newIdx);
  }

  lbClose && lbClose.addEventListener("click", closeLightbox);
  lbBackdrop && lbBackdrop.addEventListener("click", closeLightbox);
  lbPrev && lbPrev.addEventListener("click", goPrev);
  lbNext && lbNext.addEventListener("click", goNext);

  document.addEventListener("keydown", (e) => {
    if (!lightbox || !lightbox.classList.contains("active")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") goPrev();
    if (e.key === "ArrowRight") goNext();
  });

  // Touch swipe support for lightbox
  let touchStartX = 0;
  lightbox &&
    lightbox.addEventListener(
      "touchstart",
      (e) => {
        touchStartX = e.changedTouches[0].clientX;
      },
      { passive: true }
    );
  lightbox &&
    lightbox.addEventListener(
      "touchend",
      (e) => {
        const dx = e.changedTouches[0].clientX - touchStartX;
        if (Math.abs(dx) > 50) dx > 0 ? goPrev() : goNext();
      },
      { passive: true }
    );
})();
