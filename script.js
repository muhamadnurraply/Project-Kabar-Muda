/* script.js - Kabar Muda (clean + optimized) */

document.addEventListener("DOMContentLoaded", () => {

  /* ===== FADE-IN OBSERVER ===== */
  const fadeItems = document.querySelectorAll(".fade-in");
  if (fadeItems.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add("show");
      });
    }, { threshold: 0.18 });
    fadeItems.forEach(el => observer.observe(el));
  }

  /* ===== HAMBURGER / MOBILE NAV TOGGLE ===== */
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navLinks.classList.toggle("active");
      document.body.classList.toggle("no-scroll", navLinks.classList.contains("active"));
    });

    navLinks.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", () => {
        navLinks.classList.remove("active");
        hamburger.classList.remove("active");
        document.body.classList.remove("no-scroll");
      });
    });
  }

  /* ===== SMOOTH SCROLL ===== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  /* ===== ACTIVE NAV ON SCROLL ===== */
  const sections = document.querySelectorAll("section[id]");
  const navAnchors = document.querySelectorAll(".nav-links a");

  if (sections.length && navAnchors.length) {
    window.addEventListener("scroll", () => {
      let current = "";
      sections.forEach(section => {
        const top = section.offsetTop - 120;
        if (pageYOffset >= top) current = section.getAttribute("id");
      });
      navAnchors.forEach(a => {
        a.classList.toggle("active", a.getAttribute("href") === "#" + current);
      });
    });
  }

  /* ===== SIMPLE CAROUSEL ===== */
  window.moveCarousel = function (id, direction) {
    const carousel = document.getElementById(id);
    if (!carousel) return;

    const track = carousel.querySelector(".carousel-track");
    const slide = carousel.querySelector(".slide");
    if (!track || !slide) return;

    const slideGap = 20;
    const slideWidth = slide.offsetWidth + slideGap;

    carousel.current = (carousel.current || 0) + direction;
    const total = track.children.length;

    if (carousel.current < 0) carousel.current = total - 1;
    if (carousel.current >= total) carousel.current = 0;

    track.style.transform = `translateX(-${carousel.current * slideWidth}px)`;
  };
});
