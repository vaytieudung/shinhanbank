/* custom.js - General UI enhancements and event listeners */
document.addEventListener('DOMContentLoaded', () => {
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Toggle mobile navigation
  const hamburger = document.querySelector('.c-hamburger');
  const navMobile = document.querySelector('.nav-mobile');
  if (hamburger && navMobile) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('is-active');
      navMobile.style.display = navMobile.style.display === 'block' ? 'none' : 'block';
    });
  }

  // Lazy load images (backup if main.js fails)
  const lazyImages = document.querySelectorAll('img.image-lazy-loading');
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        obs.unobserve(img);
      }
    });
  });
  lazyImages.forEach(img => observer.observe(img));
});
