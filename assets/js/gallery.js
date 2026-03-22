(function () {
  "use strict";

  const BATCH_SIZE = 9;

  // Replace src/thumb with real image paths before deploy.
  // Each object: { src, thumb, alt, category, caption }
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

  const SOURCE_DATA = window.GALLERY_OVERRIDE && window.GALLERY_OVERRIDE.length ? window.GALLERY_OVERRIDE : IMAGE_DATA;

  let filteredImages = [...SOURCE_DATA];
  let loadedCount = 0;
  let isLoading = false;
  let activeCategory = "all";

  const grid = document.querySelector(".gallery-grid");
  const sentinel = document.querySelector(".load-more-trigger");
  const filterBtns = document.querySelectorAll(".filter-bar__btn");
  const countEl = document.querySelector(".filter-bar__count");

  if (!grid) return;

  function buildItem(img, index) {
    const item = document.createElement("div");
    item.className = "gallery-grid__item";
    item.dataset.category = img.category;
    item.dataset.index = index;
    item.setAttribute("role", "button");
    item.setAttribute("tabindex", "0");
    item.setAttribute("aria-label", `View photo: ${img.alt}`);

    item.innerHTML = `
      <img src="${img.thumb}" alt="${img.alt}" loading="lazy" decoding="async">
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

  function loadBatch() {
    if (isLoading) return;
    const remaining = filteredImages.length - loadedCount;
    if (remaining <= 0) {
      if (sentinel) sentinel.style.display = "none";
      return;
    }

    isLoading = true;
    if (sentinel) sentinel.innerHTML = '<div class="spinner"></div>';

    requestAnimationFrame(() => {
      const batch = filteredImages.slice(loadedCount, loadedCount + BATCH_SIZE);

      batch.forEach((img, i) => {
        const el = buildItem(img, loadedCount + i);
        el.style.cssText = `opacity:0;transform:translateY(16px);transition:opacity 0.5s ease ${i * 60}ms,transform 0.5s ease ${i * 60}ms`;
        grid.appendChild(el);
        // Double rAF forces a style recalc before the transition begins
        requestAnimationFrame(() =>
          requestAnimationFrame(() => {
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
          })
        );
      });

      loadedCount += batch.length;
      isLoading = false;

      if (countEl) countEl.textContent = `${loadedCount} / ${filteredImages.length} photos`;

      if (loadedCount >= filteredImages.length) {
        if (sentinel) sentinel.style.display = "none";
      } else {
        if (sentinel) sentinel.innerHTML = "";
      }
    });
  }

  if (sentinel) {
    new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadBatch();
      },
      { rootMargin: "200px" }
    ).observe(sentinel);
  }

  const namesDropdown = document.querySelector(".filter-dropdown--names");
  const locationsDropdown = document.querySelector(".filter-dropdown--locations");

  if (namesDropdown && locationsDropdown) {
    // COLLAGES MODE: section single-select | name & location multi-select
    let activeSection = "all";
    let activeNames = new Set();
    let activeLocations = new Set();

    const allNames = [...new Set(SOURCE_DATA.flatMap((img) => img.names || []))].sort();
    const allLocations = [...new Set(SOURCE_DATA.map((img) => img.location).filter(Boolean))].sort();

    function makeOption(label, value) {
      const li = document.createElement("li");
      li.className = "filter-dropdown__option" + (value === "all" ? " active" : "");
      li.dataset.filter = value;
      li.setAttribute("role", "option");
      li.setAttribute("aria-selected", value === "all" ? "true" : "false");
      li.textContent = label;
      return li;
    }

    const namesList = namesDropdown.querySelector(".filter-dropdown__list");
    if (allNames.length && namesList) {
      namesList.appendChild(makeOption("All", "all"));
      allNames.forEach((name) => namesList.appendChild(makeOption(name, name)));
    } else {
      namesDropdown.style.display = "none";
    }

    const locationsList = locationsDropdown.querySelector(".filter-dropdown__list");
    if (allLocations.length && locationsList) {
      locationsList.appendChild(makeOption("All", "all"));
      allLocations.forEach((loc) => locationsList.appendChild(makeOption(loc, loc)));
    } else {
      locationsDropdown.style.display = "none";
    }

    function closeAll() {
      document.querySelectorAll(".filter-dropdown.open").forEach((d) => {
        d.classList.remove("open");
        d.querySelector(".filter-dropdown__trigger").setAttribute("aria-expanded", "false");
      });
    }

    document.querySelectorAll(".filter-dropdown__trigger").forEach((trigger) => {
      trigger.addEventListener("click", (e) => {
        e.stopPropagation();
        const dropdown = trigger.closest(".filter-dropdown");
        const isOpen = dropdown.classList.contains("open");
        closeAll();
        if (!isOpen) {
          dropdown.classList.add("open");
          trigger.setAttribute("aria-expanded", "true");
        }
      });
      trigger.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeAll();
      });
    });

    document.addEventListener("click", closeAll);

    function applyFilter() {
      grid.innerHTML = "";
      loadedCount = 0;
      filteredImages = SOURCE_DATA.filter((img) => {
        const sectionOk = activeSection === "all" || img.category === activeSection;
        const nameOk = activeNames.size === 0 || (img.names && img.names.some((n) => activeNames.has(n)));
        const locationOk = activeLocations.size === 0 || activeLocations.has(img.location);
        return sectionOk && nameOk && locationOk;
      });
      if (sentinel) {
        sentinel.style.display = "";
        sentinel.innerHTML = "";
      }
      loadBatch();
    }

    function syncMulti(dropdown, activeSet) {
      const isAll = activeSet.size === 0;
      dropdown.querySelectorAll(".filter-dropdown__option").forEach((opt) => {
        const sel = opt.dataset.filter === "all" ? isAll : activeSet.has(opt.dataset.filter);
        opt.classList.toggle("active", sel);
        opt.setAttribute("aria-selected", sel ? "true" : "false");
      });
      const valueEl = dropdown.querySelector(".filter-dropdown__value");
      if (valueEl) {
        if (isAll) valueEl.textContent = "All";
        else if (activeSet.size === 1) valueEl.textContent = [...activeSet][0];
        else valueEl.textContent = `${activeSet.size} selected`;
      }
      dropdown.querySelector(".filter-dropdown__trigger").classList.toggle("active", !isAll);
    }

    document.querySelectorAll(".filter-dropdown").forEach((dropdown) => {
      const type = dropdown.dataset.filterType;
      dropdown.addEventListener("click", (e) => {
        const option = e.target.closest(".filter-dropdown__option");
        if (!option) return;
        const val = option.dataset.filter;

        if (type === "section") {
          activeSection = val;
          dropdown.querySelectorAll(".filter-dropdown__option").forEach((opt) => {
            const sel = opt.dataset.filter === val;
            opt.classList.toggle("active", sel);
            opt.setAttribute("aria-selected", sel ? "true" : "false");
          });
          const valueEl = dropdown.querySelector(".filter-dropdown__value");
          if (valueEl) valueEl.textContent = option.textContent;
          dropdown.querySelector(".filter-dropdown__trigger").classList.toggle("active", val !== "all");
          closeAll();
        } else {
          // Multi-select: toggle value, stay open
          const activeSet = type === "name" ? activeNames : activeLocations;
          if (val === "all") {
            activeSet.clear();
          } else {
            activeSet.has(val) ? activeSet.delete(val) : activeSet.add(val);
          }
          syncMulti(dropdown, activeSet);
        }

        applyFilter();
      });
    });
  } else {
    filterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const cat = btn.dataset.filter;
        if (cat === activeCategory) return;

        activeCategory = cat;
        filterBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        grid.innerHTML = "";
        loadedCount = 0;
        filteredImages = cat === "all" ? [...SOURCE_DATA] : SOURCE_DATA.filter((img) => img.category === cat);

        if (sentinel) {
          sentinel.style.display = "";
          sentinel.innerHTML = "";
        }

        loadBatch();
      });
    });
  }

  loadBatch();

  // Lightbox
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
    showImage((currentIndex - 1 + filteredImages.length) % filteredImages.length);
  }

  function goNext() {
    showImage((currentIndex + 1) % filteredImages.length);
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

  if (lightbox) {
    let touchStartX = 0;
    lightbox.addEventListener(
      "touchstart",
      (e) => {
        touchStartX = e.changedTouches[0].clientX;
      },
      { passive: true }
    );
    lightbox.addEventListener(
      "touchend",
      (e) => {
        const dx = e.changedTouches[0].clientX - touchStartX;
        if (Math.abs(dx) > 50) dx > 0 ? goPrev() : goNext();
      },
      { passive: true }
    );
  }
})();
