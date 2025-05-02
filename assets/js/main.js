
/* main.js - Core functionality for Shinhan Bank webpage */
document.addEventListener('DOMContentLoaded', () => {
  // Initialize LeanModal
  const modalLinks = document.querySelectorAll('a[rel*="leanModal"]');
  if (modalLinks.length && typeof jQuery !== 'undefined') {
    jQuery(modalLinks).leanModal({
      top: 200,
      closeButton: '.modal_close'
    });
  }

  // Lazy load images
  const images = document.querySelectorAll('img.image-lazy-loading');
  const loadImage = el => {
    const src = el.getAttribute('data-src');
    if (src) {
      const img = new Image();
      img.onload = () => {
        if (el.parentNode) {
          el.parentNode.replaceChild(img, el);
        } else {
          el.src = src;
        }
      };
      img.src = src;
    }
  };
  const processScroll = () => {
    images.forEach(img => {
      const rect = img.getBoundingClientRect();
      if (rect.top >= 0 && rect.left >= 0 && rect.top <= (window.innerHeight || document.documentElement.clientHeight)) {
        loadImage(img);
      }
    });
  };
  setTimeout(processScroll, 400);
  window.addEventListener('scroll', processScroll);

  // Language switcher
  setTimeout(() => {
    const langDiv = document.getElementById('vn4-the-languages_r3lPmIV5HM');
    if (langDiv) {
      langDiv.outerHTML = '<a hreflang="en" href="https://shinhan.com.vn/en/personal/consumer-loan.html" class="language"><span>en</span></a>';
    }
  }, 10);
});
