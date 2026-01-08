const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
let currentSlide = 0;

function showSlide(index) {
  slides.forEach((slide) => slide.classList.remove('active'));
  dots.forEach((dot) => dot.classList.remove('active'));

  slides[index].classList.add('active');
  dots[index].classList.add('active');

  currentSlide = index;
}

dots.forEach((dot) => {
  dot.addEventListener('click', () => {
    const index = dot.getAttribute('data-slide');
    showSlide(index);
  });
});

// Auto slide (optional – looks professional)
setInterval(() => {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}, 6000);
