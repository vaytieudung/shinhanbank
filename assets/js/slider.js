
/* slider.js - Initializes Slick slider for carousels */
document.addEventListener('DOMContentLoaded', () => {
  if (typeof jQuery !== 'undefined' && jQuery.fn.slick) {
    // Initialize Slick slider for benefits section
    const benefitsSlider = document.querySelector('.tab-expand');
    if (benefitsSlider) {
      jQuery(benefitsSlider).slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true,
        dots: true,
        responsive: [
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      });
    }

    // Initialize Slick slider for support section
    const supportSlider = document.querySelector('.list-support');
    if (supportSlider) {
      jQuery(supportSlider).slick({
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: false,
        arrows: true,
        dots: false,
        responsive: [
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      });
    }
  } else {
    console.error('Slick or jQuery not loaded.');
  }
});
