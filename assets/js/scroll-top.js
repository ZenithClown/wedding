(function () {
  "use strict";

  const btn = document.getElementById("scroll-top");
  if (!btn) return;

  window.addEventListener("scroll", () => btn.classList.toggle("visible", window.scrollY > 300), { passive: true });

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  btn.setAttribute("aria-label", "Scroll to top");
  btn.setAttribute("tabindex", "0");
  btn.addEventListener("click", scrollToTop);
  btn.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      scrollToTop();
    }
  });
})();
