const container = document.querySelector('.about-slider-wrapper');
const slider = document.querySelector('.about-slider-inner');
const slide = document.querySelector('.about-slide');
const switchActiveStatusButtons = document.querySelectorAll('.slider-manual-btn-span');
const switchButton = document.querySelectorAll('.slider-manual-btn');
const next = document.querySelector('.about-slider-arrow-right');
const prev = document.querySelector('.about-slider-arrow-left');

let media = window.matchMedia('(max-width: 1024px');

next.addEventListener('click', nextSlide);
prev.addEventListener('click', prevSlide);

let offset = 0;

window.addEventListener("resize", checkWidth);

function checkWidth() {
  slider.style.left = 0 + 'px';
  activeButton(0);
  // slider.style.left = ((-slide.offsetWidth - 25) * (offset + 1)) + 'px';
}

function nextSlide() {
  offset++;
  if (media.matches) {
    if (offset >= 5) {
      offset = 4;
    }
  } else {
    if (offset >= 3) {
      offset = 2;
    }
  }

  if (offset == 4) {
    next.classList.add('about-slider-arrow-inactive');
    prev.classList.remove('about-slider-arrow-inactive');
  } else if (offset == 0) {
    next.classList.remove('about-slider-arrow-inactive');
    prev.classList.add('about-slider-arrow-inactive');
  } else {
    next.classList.remove('about-slider-arrow-inactive');
    prev.classList.remove('about-slider-arrow-inactive');
  }

  switchSlide();
  activeButton(offset);
}

function prevSlide() {
  offset--;
  if (offset < 0) {
    offset = 0;
  }

  if (offset == 4) {
    next.classList.add('about-slider-arrow-inactive');
    prev.classList.remove('about-slider-arrow-inactive');
  } else if (offset == 0) {
    next.classList.remove('about-slider-arrow-inactive');
    prev.classList.add('about-slider-arrow-inactive');
  } else {
    next.classList.remove('about-slider-arrow-inactive');
    prev.classList.remove('about-slider-arrow-inactive');
  }

  switchSlide();
  activeButton(offset);
}

function switchSlide() {
  slider.style.left = ((-slide.offsetWidth - 25) * offset) + 'px';

  if (offset == 4) {
    next.classList.add('about-slider-arrow-inactive');
    prev.classList.remove('about-slider-arrow-inactive');
  } else if (offset == 0) {
    next.classList.remove('about-slider-arrow-inactive');
    prev.classList.add('about-slider-arrow-inactive');
  } else {
    next.classList.remove('about-slider-arrow-inactive');
    prev.classList.remove('about-slider-arrow-inactive');
  }
}

function activeButton(index) {
  switchActiveStatusButtons.forEach(element => element.classList.remove('slider-manual-btn-span-active'));
  switchActiveStatusButtons[index].classList.add('slider-manual-btn-span-active');

  switchButton.forEach(element => element.classList.remove('slider-manual-btn-active'));
  switchButton[index].classList.add('slider-manual-btn-active');
}

switchButton.forEach((elements, index) => {
  elements.addEventListener('click', function() {
    offset = index;

    switchSlide();
    activeButton(offset);
  })
})
