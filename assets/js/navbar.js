(function () {
  "use strict";

  const navbar = document.querySelector(".navbar");
  const hamburger = document.querySelector(".navbar__hamburger");
  const drawer = document.querySelector(".nav-drawer");
  const overlay = document.querySelector(".nav-drawer__overlay");
  const body = document.body;

  function onScroll() {
    navbar.classList.toggle("scrolled", window.scrollY > 80);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  function openDrawer() {
    body.classList.add("nav-open");
    hamburger.setAttribute("aria-expanded", "true");
    hamburger.setAttribute("aria-label", "Close navigation");
    // Focus first drawer link for keyboard accessibility
    const firstLink = drawer.querySelector(".nav-drawer__link");
    if (firstLink) firstLink.focus();
  }

  function closeDrawer() {
    body.classList.remove("nav-open");
    hamburger.setAttribute("aria-expanded", "false");
    hamburger.setAttribute("aria-label", "Open navigation");
  }

  if (hamburger) {
    hamburger.addEventListener("click", () => {
      body.classList.contains("nav-open") ? closeDrawer() : openDrawer();
    });
  }

  if (overlay) overlay.addEventListener("click", closeDrawer);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && body.classList.contains("nav-open")) closeDrawer();
  });

  drawer &&
    drawer.querySelectorAll(".nav-drawer__link").forEach((link) => {
      link.addEventListener("click", closeDrawer);
    });

  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".navbar__link, .nav-drawer__link").forEach((link) => {
    const href = link.getAttribute("href");
    if (!href) return;
    const linkPage = href.split("/").pop();
    if (linkPage === currentPath || (currentPath === "" && linkPage === "index.html")) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    }
  });

  const revealEls = document.querySelectorAll(".reveal, .reveal--left, .reveal--right, .reveal--scale");
  if (revealEls.length) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach((el) => revealObserver.observe(el));
  }
})();
