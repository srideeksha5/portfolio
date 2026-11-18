/* =========================================
   1. MOBILE NAVIGATION
========================================= */

const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");
const navigationLinks = document.querySelectorAll(".site-nav a");

if (menuToggle && siteNav) {

  menuToggle.addEventListener("click", () => {

    const isExpanded =
      menuToggle.getAttribute("aria-expanded") === "true";

    menuToggle.setAttribute("aria-expanded", String(!isExpanded));

    menuToggle.setAttribute(
      "aria-label",
      isExpanded ? "Open navigation" : "Close navigation"
    );

    siteNav.classList.toggle("is-open");

  });

  // Close navigation after selecting a section.
  navigationLinks.forEach((link) => {

    link.addEventListener("click", () => {

      siteNav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");

    });

  });

  // Close navigation when Escape is pressed.
  document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

      siteNav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");

    }

  });

}


/* =========================================
   2. SHOW MORE / SHOW LESS
========================================= */

const toggleButtons = document.querySelectorAll(".text-toggle");

toggleButtons.forEach((button) => {

  button.addEventListener("click", () => {

    const extraContent = button.nextElementSibling;

    const isExpanded =
      button.getAttribute("aria-expanded") === "true";

    button.setAttribute("aria-expanded", String(!isExpanded));

    extraContent.hidden = isExpanded;

    button.innerHTML = isExpanded
      ? 'More about this role <span>↗</span>'
      : 'Show less <span>↗</span>';

  });

});


/* =========================================
   3. SCROLL REVEAL ANIMATION
========================================= */

const revealElements = document.querySelectorAll(".reveal");

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

if ("IntersectionObserver" in window && !prefersReducedMotion) {

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {

          entry.target.classList.add("is-visible");

          observer.unobserve(entry.target);

        }

      });

    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -40px 0px"
    }
  );

  revealElements.forEach((element) => {

    revealObserver.observe(element);

  });

} else {

  // Fallback for browsers without IntersectionObserver.
  revealElements.forEach((element) => {

    element.classList.add("is-visible");

  });

}


/* =========================================
   4. FAMILY FLIP CARDS
========================================= */

const familyCards = document.querySelectorAll(".family-flip");

familyCards.forEach((card) => {

  card.addEventListener("click", () => {

    const isFlipped = card.classList.toggle("is-flipped");
    card.setAttribute("aria-pressed", String(isFlipped));

  });

  card.addEventListener("keydown", (event) => {

    if (event.key === "Enter" || event.key === " ") {

      event.preventDefault();

      const isFlipped = card.classList.toggle("is-flipped");
      card.setAttribute("aria-pressed", String(isFlipped));

    }

  });

});


/* =========================================
   5. HOBBIES LIGHTBOX
========================================= */

const hobbyItems = document.querySelectorAll(".hobby-item");

const lightbox = document.querySelector(".lightbox");
const lightboxImage = document.querySelector(".lightbox-image");
const lightboxTitle = document.querySelector("#lightbox-title");
const lightboxDescription = document.querySelector(
  "#lightbox-description"
);
const lightboxClose = document.querySelector(".lightbox-close");

let previousFocusedElement = null;

function openLightbox(item) {

  if (!lightbox) {
    return;
  }

  // Remember the currently focused element.
  previousFocusedElement = document.activeElement;

  // Read information from the selected hobby card.
  const imagePath = item.dataset.image;
  const title = item.dataset.title;
  const description = item.dataset.copy;

  // Update lightbox content.
  lightboxImage.src = imagePath;
  lightboxImage.alt = title;

  lightboxTitle.textContent = title;
  lightboxDescription.textContent = description;

  // Show the lightbox.
  lightbox.hidden = false;

  document.body.style.overflow = "hidden";

  // Move keyboard focus into the lightbox.
  lightboxClose.focus();

}


function closeLightbox() {

  if (!lightbox || lightbox.hidden) {
    return;
  }

  lightbox.hidden = true;

  document.body.style.overflow = "";

  // Return focus to the previously selected hobby card.
  if (previousFocusedElement) {

    previousFocusedElement.focus();

  }

}


hobbyItems.forEach((item) => {

  item.addEventListener("click", () => {

    openLightbox(item);

  });

});


if (lightboxClose) {

  lightboxClose.addEventListener("click", closeLightbox);

}


// Close when clicking outside the lightbox content.
if (lightbox) {

  lightbox.addEventListener("click", (event) => {

    if (event.target === lightbox) {

      closeLightbox();

    }

  });

}


// Close the lightbox with the Escape key.
document.addEventListener("keydown", (event) => {

  if (event.key === "Escape" && lightbox && !lightbox.hidden) {

    closeLightbox();

  }

});


/* =========================================
   6. DYNAMIC FOOTER YEAR
========================================= */

const currentYear = document.querySelector("#current-year");

if (currentYear) {

  currentYear.textContent = new Date().getFullYear();

}


/* =========================================
   7. SMOOTH BACK TO TOP
========================================= */

const backToTop = document.querySelector(".back-top");

if (backToTop) {

  backToTop.addEventListener("click", (event) => {

    event.preventDefault();

    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth"
    });

  });

}