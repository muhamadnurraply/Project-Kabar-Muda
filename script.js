// Fade In Animation
document.addEventListener("DOMContentLoaded", () => {
    const elements = document.querySelectorAll(".fade-in");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    }, { threshold: 0.2 });

    elements.forEach(el => observer.observe(el));
});

// Carousel Function
function moveCarousel(id, direction) {
    const carousel = document.getElementById(id);
    const track = carousel.querySelector(".carousel-track");
    const slide = carousel.querySelector(".slide");

    const slideWidth = slide.offsetWidth + 20;

    carousel.current = (carousel.current || 0) + direction;

    const totalSlides = track.children.length;
    const maxIndex = totalSlides - 1;

    if (carousel.current < 0) carousel.current = maxIndex;
    if (carousel.current > maxIndex) carousel.current = 0;

    track.style.transform = `translateX(-${carousel.current * slideWidth}px)`;
}
