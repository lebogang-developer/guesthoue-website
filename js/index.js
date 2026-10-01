const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");
let currentSlide = 0;

function showSlide(index) {
  slides.forEach((slide) => slide.classList.remove("active"));
  dots.forEach((dot) => dot.classList.remove("active"));

  slides[index].classList.add("active");
  dots[index].classList.add("active");

  currentSlide = index;
}

dots.forEach((dot) => {
  dot.addEventListener("click", () => {
    const index = dot.getAttribute("data-slide");
    showSlide(index);
  });
});

// Auto slide (optional – looks professional)
setInterval(() => {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}, 6000);

// =====================================================
// GALLERY
// =====================================================

const filterButtons = document.querySelectorAll(".gallery-filter");
const galleryItems = document.querySelectorAll(".gallery-page-item");

const lightbox = document.getElementById("galleryLightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxCategory = document.getElementById("lightboxCategory");
const lightboxTitle = document.getElementById("lightboxTitle");

const closeLightboxButton = document.querySelector(".lightbox-close");
const previousButton = document.querySelector(".lightbox-prev");
const nextButton = document.querySelector(".lightbox-next");

let visibleGalleryItems = [...galleryItems];
let currentImageIndex = 0;

// =====================================================
// FILTER GALLERY
// =====================================================

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedFilter = button.dataset.filter;

    // Active filter button
    filterButtons.forEach((btn) => {
      btn.classList.remove("active");
    });

    button.classList.add("active");

    // Filter images
    galleryItems.forEach((item) => {
      const category = item.dataset.category;

      if (selectedFilter === "all" || category === selectedFilter) {
        item.classList.remove("gallery-hidden");
      } else {
        item.classList.add("gallery-hidden");
      }
    });

    // Update lightbox navigation list
    visibleGalleryItems = [...galleryItems].filter(
      (item) => !item.classList.contains("gallery-hidden"),
    );
  });
});

// =====================================================
// OPEN LIGHTBOX
// =====================================================

galleryItems.forEach((item) => {
  item.addEventListener("click", () => {
    visibleGalleryItems = [...galleryItems].filter(
      (galleryItem) => !galleryItem.classList.contains("gallery-hidden"),
    );

    currentImageIndex = visibleGalleryItems.indexOf(item);

    showLightboxImage(currentImageIndex);

    lightbox.classList.add("active");

    document.body.style.overflow = "hidden";
  });
});

// =====================================================
// DISPLAY LIGHTBOX IMAGE
// =====================================================

function showLightboxImage(index) {
  const item = visibleGalleryItems[index];

  if (!item) return;

  const image = item.querySelector("img");

  const category = item.querySelector(".gallery-page-overlay span");

  const title = item.querySelector(".gallery-page-overlay h3");

  lightboxImage.src = image.src;
  lightboxImage.alt = image.alt;

  lightboxCategory.textContent = category ? category.textContent : "";

  lightboxTitle.textContent = title ? title.textContent : "";
}

// =====================================================
// NEXT IMAGE
// =====================================================

function nextImage() {
  currentImageIndex++;

  if (currentImageIndex >= visibleGalleryItems.length) {
    currentImageIndex = 0;
  }

  showLightboxImage(currentImageIndex);
}

// =====================================================
// PREVIOUS IMAGE
// =====================================================

function previousImage() {
  currentImageIndex--;

  if (currentImageIndex < 0) {
    currentImageIndex = visibleGalleryItems.length - 1;
  }

  showLightboxImage(currentImageIndex);
}

// =====================================================
// CLOSE LIGHTBOX
// =====================================================

function closeLightbox() {
  lightbox.classList.remove("active");

  document.body.style.overflow = "";
}

// =====================================================
// BUTTON EVENTS
// =====================================================

nextButton.addEventListener("click", (event) => {
  event.stopPropagation();

  nextImage();
});

previousButton.addEventListener("click", (event) => {
  event.stopPropagation();

  previousImage();
});

closeLightboxButton.addEventListener("click", closeLightbox);

// =====================================================
// CLOSE WHEN CLICKING BACKGROUND
// =====================================================

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

// =====================================================
// KEYBOARD CONTROLS
// =====================================================

document.addEventListener("keydown", (event) => {
  if (!lightbox.classList.contains("active")) {
    return;
  }

  if (event.key === "Escape") {
    closeLightbox();
  }

  if (event.key === "ArrowRight") {
    nextImage();
  }

  if (event.key === "ArrowLeft") {
    previousImage();
  }
});
