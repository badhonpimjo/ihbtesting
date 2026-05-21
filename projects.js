document.addEventListener("DOMContentLoaded", () => {
  // === DOM References ===
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");
  const fadeElements = document.querySelectorAll(".fade-in");
  const dateSpan = document.getElementById("date");
  const navToggle = document.querySelector(".nav-toggle");
  const linksContainer = document.querySelector(".links-container");

  // === Dynamic Year ===
  if (dateSpan) dateSpan.textContent = new Date().getFullYear();

  // === Mobile Nav Toggle (Fallback if not handled by scroll.js) ===
  if (navToggle && linksContainer) {
    navToggle.addEventListener("click", () => {
      const isExpanded =
        linksContainer.style.height && linksContainer.style.height !== "0px";
      linksContainer.style.height = isExpanded
        ? "0"
        : `${linksContainer.scrollHeight}px`;
    });
    // Close on link click
    document.querySelectorAll(".links a").forEach((link) => {
      link.addEventListener("click", () => {
        linksContainer.style.height = "0";
      });
    });
  }

  // === Project Filtering ===
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter");

      projectCards.forEach((card) => {
        const category = card.getAttribute("data-category");
        if (filter === "all" || category === filter) {
          card.style.display = "block";
          // Trigger reflow for animation restart
          requestAnimationFrame(() => card.classList.add("visible"));
        } else {
          card.classList.remove("visible");
          setTimeout(() => (card.style.display = "none"), 300); // Match CSS transition
        }
      });
    });
  });

  // === Intersection Observer (Fade-in on scroll) ===
  const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        fadeObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  fadeElements.forEach((el) => fadeObserver.observe(el));
});
