const feedbackImage = document.querySelectorAll('.feedback__image');

// console.log(feedbackImage);

const images = Array.from(feedbackImage).map(function(item) {
  return item.currentSrc.replace('http://127.0.0.1:5500', '.');
});

// console.log(images);


new Swiper(".commentSwiper", {
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    keyboard: true,
    touchRatio: 0,
    spaceBetween: 280,

    pagination: {

      el: '.swiper-pagination',
      clickable: true,

      renderBullet: function (index, className) {
        
        return '<span class="' + className + '" style="background-image: url('+images[index] +'); ">' + '</span>';
      },  
    },
});