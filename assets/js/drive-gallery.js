---
---
/* ============================================================
   DRIVE GALLERY — Homepage preview section
   Fetches all images from a public Google Drive folder and
   renders them into #drive-gallery-grid with lightbox support.

   API key is injected at build time from GitHub Secret DRIVE_API_KEY.
   See .github/workflows/deploy.yml for the injection step.
   ============================================================ */

(function () {
  "use strict";

  const DRIVE_FOLDER_ID = "19x2v4QAYeDUtMijUomtZd5xnkEsdy78l";
  const DRIVE_API_KEY = "{{ site.GOOGLE_DRIVE_API_KEY }}";

  const container = document.getElementById("drive-gallery-grid");
  if (!container) return;

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

  let driveImages = [];
  let currentLbIndex = 0;

  function openLightbox(index) {
    if (!lightbox) return;
    currentLbIndex = index;
    showLbImage(index);
    lightbox.removeAttribute("aria-hidden");
    lightbox.classList.add("active");
    document.body.classList.add("lightbox-open");
    lbClose && lbClose.focus();
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove("active");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("lightbox-open");
  }

  function showLbImage(index) {
    const file = driveImages[index];
    if (!file || !lbImg) return;
    lbImg.src = `https://drive.google.com/uc?export=view&id=${file.id}`;
    lbImg.alt = file.label;
    if (lbCounter) lbCounter.textContent = `${index + 1} / ${driveImages.length}`;
    if (lbCaption) lbCaption.textContent = "";
    currentLbIndex = index;
  }

  function goPrev() {
    showLbImage((currentLbIndex - 1 + driveImages.length) % driveImages.length);
  }

  function goNext() {
    showLbImage((currentLbIndex + 1) % driveImages.length);
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

  let touchStartX = 0;
  lightbox &&
    lightbox.addEventListener("touchstart", (e) => (touchStartX = e.changedTouches[0].clientX), { passive: true });
  lightbox &&
    lightbox.addEventListener(
      "touchend",
      (e) => {
        const dx = e.changedTouches[0].clientX - touchStartX;
        if (Math.abs(dx) > 50) (dx > 0 ? goPrev : goNext)();
      },
      { passive: true }
    );

  // ================================================================
  // REVEAL OBSERVER (re-implemented for dynamically added elements)
  // ================================================================
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -30px 0px" }
  );

  // ================================================================
  // ITEM BUILDER
  // ================================================================
  const EXPAND_SVG = `<svg viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg>`;

  function buildItem(file, index) {
    const item = document.createElement("div");
    item.className = "gallery-grid__item reveal";
    item.setAttribute("tabindex", "0");
    item.setAttribute("role", "button");
    item.setAttribute("aria-label", `View photo: ${file.label}`);

    const img = document.createElement("img");
    // sz=w800 gives a good quality thumbnail without downloading the full file
    img.src = `https://drive.google.com/thumbnail?id=${file.id}&sz=w800`;
    img.alt = file.label;
    img.loading = "lazy";
    img.decoding = "async";

    const expand = document.createElement("div");
    expand.className = "gallery-grid__expand";
    expand.setAttribute("aria-hidden", "true");
    expand.innerHTML = EXPAND_SVG;

    item.appendChild(img);
    item.appendChild(expand);

    item.addEventListener("click", () => openLightbox(index));
    item.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openLightbox(index);
      }
    });

    revealObserver.observe(item);
    return item;
  }

  // ================================================================
  // FETCH & RENDER
  // ================================================================
  async function loadDriveGallery() {
    if (DRIVE_API_KEY === "YOUR_GOOGLE_API_KEY") {
      container.innerHTML =
        '<p class="drive-gallery__msg">Add your Google API key to <code>drive-gallery.js</code> to load photos.</p>';
      return;
    }

    container.innerHTML = '<div class="drive-gallery__loading"><span>Loading photos…</span></div>';

    try {
      const params = new URLSearchParams({
        q: `'${DRIVE_FOLDER_ID}' in parents and mimeType contains 'image/' and trashed = false`,
        fields: "files(id,name,mimeType)",
        pageSize: "1000",
        orderBy: "name",
        key: DRIVE_API_KEY,
      });

      const res = await fetch(`https://www.googleapis.com/drive/v3/files?${params}`);
      if (!res.ok) throw new Error(`Drive API responded with ${res.status}`);

      const data = await res.json();

      if (!data.files || data.files.length === 0) {
        container.innerHTML = '<p class="drive-gallery__msg">No photos found in this folder.</p>';
        return;
      }

      driveImages = data.files.map((f) => ({
        id: f.id,
        label: f.name.replace(/\.[^.]+$/, "").replace(/[-_]/g, " "),
      }));

      container.innerHTML = "";
      driveImages.forEach((file, index) => container.appendChild(buildItem(file, index)));
    } catch (err) {
      console.error("[drive-gallery] Failed to load:", err);
      container.innerHTML = '<p class="drive-gallery__msg">Could not load photos. Please try again later.</p>';
    }
  }

  loadDriveGallery();
})();
