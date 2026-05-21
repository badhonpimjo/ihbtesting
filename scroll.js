document.addEventListener("DOMContentLoaded", () => {
  // === DOM ELEMENTS ===
  const nav = document.getElementById("nav");
  const navToggle = document.querySelector(".nav-toggle");
  const linksContainer = document.querySelector(".links-container");
  const topLink = document.querySelector(".top-link");
  const modal = document.getElementById("imageModal");
  const modalImage = document.getElementById("modal-image");
  const closeBtn = document.querySelector(".close");
  const tourImages = document.querySelectorAll(".tour-img");
  const scrollLinks = document.querySelectorAll(".scroll-link, .nav a");
  const fadeElements = document.querySelectorAll(".fade-in");
  const dateSpan = document.getElementById("date");

  // === UTILS ===
  const setYear = () => {
    dateSpan.textContent = new Date().getFullYear();
  };
  const toggleNav = () => {
    const isExpanded = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", !isExpanded);
    linksContainer.style.height = isExpanded
      ? "0"
      : `${linksContainer.scrollHeight}px`;
  };

  // === INIT ===
  setYear();
  navToggle.addEventListener("click", toggleNav);

  // Close mobile nav on link click
  document.querySelectorAll(".links a").forEach((link) => {
    link.addEventListener("click", () => {
      linksContainer.style.height = "0";
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  // === SCROLL EFFECTS ===
  const handleScroll = () => {
    const scrollY = window.scrollY;
    const navHeight = nav.offsetHeight;

    // Fixed Nav State
    nav.classList.toggle("scrolled", scrollY > navHeight * 0.8);

    // Back to Top Button
    topLink.classList.toggle("show", scrollY > 500);
  };

  // === SMOOTH SCROLL OFFSET CALCULATION ===
  scrollLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = link.getAttribute("href");

      // Only intercept internal anchors on the CURRENT page
      if (href.startsWith("#")) {
        e.preventDefault();
        const getId = href.slice(1);
        const targetId = document.getElementById(getId);

        if (targetId) {
          const navHeight = nav.getBoundingClientRect().height;
          const containerHeight = links.getBoundingClientRect().height;
          const fixedNav = nav.classList.contains("fixed-nav");
          let sectionPosition = targetId.offsetTop - navHeight;

          if (!fixedNav) sectionPosition -= navHeight;
          if (containerHeight > 83) sectionPosition += containerHeight;

          window.scrollTo({ top: sectionPosition, left: 0 });
          linksContainer.style.height = 0;
        }
      }
      // If link points to another page (e.g., index.html#about), let the browser navigate normally
    });
  });

  // === IMAGE MODAL ===
  const openModal = (src) => {
    modalImage.src = src;
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    modal.classList.remove("active");
    document.body.style.overflow = "";
    setTimeout(() => {
      modalImage.src = "";
    }, 300);
  };

  tourImages.forEach((img) =>
    img.addEventListener("click", () => openModal(img.src)),
  );
  closeBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => e.target === modal && closeModal());
  document.addEventListener(
    "keydown",
    (e) =>
      e.key === "Escape" && modal.classList.contains("active") && closeModal(),
  );

  // === TEXT ANIMATION (Character Wrapper) ===
  const textContainer = document.querySelector(".text-animation");
  if (textContainer) {
    const text = textContainer.textContent.trim();
    textContainer.innerHTML = "";
    [...text].forEach((char, i) => {
      const span = document.createElement("span");
      span.textContent = char === " " ? "\u00A0" : char;
      span.style.setProperty("--delay", `${i * 0.08}s`);
      textContainer.appendChild(span);
    });
  }

  // === INTERSECTION OBSERVER (Fade In Animations) ===
  const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        fadeObserver.unobserve(entry.target); // Animate only once
      }
    });
  }, observerOptions);

  fadeElements.forEach((el) => fadeObserver.observe(el));

  // === EVENT LISTENERS ===
  window.addEventListener("scroll", handleScroll, { passive: true });
  window.addEventListener("resize", () => {
    if (window.innerWidth > 991) linksContainer.style.height = "auto";
  });

  // Trigger initial scroll state
  handleScroll();
});
