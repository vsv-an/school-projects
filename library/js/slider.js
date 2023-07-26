const radio1 = document.getElementById("slider-radio1");
const radio2 = document.getElementById("slider-radio2");
const radio3 = document.getElementById("slider-radio3");
const slide1 = document.getElementById("slide1");
const slide2 = document.getElementById("slide2");
const slide3 = document.getElementById("slide3");
const slide4 = document.getElementById("slide4");
const slide5 = document.getElementById("slide5");


function slider () {
  if (radio1.checked) {
    slide1.style.display = 'flex';
    slide2.style.display = 'flex';
    slide3.style.display = 'flex';
    slide4.style.display = 'none';
    slide5.style.display = 'none';
  }
  if (radio2.checked) {
    slide1.style.display = 'none';
    slide2.style.display = 'flex';
    slide3.style.display = 'flex';
    slide4.style.display = 'flex';
    slide5.style.display = 'none';
  }
  if (radio3.checked) {
    slide1.style.display = 'none';
    slide2.style.display = 'none';
    slide3.style.display = 'flex';
    slide4.style.display = 'flex';
    slide5.style.display = 'flex';
  }
}

const sliderRadioButtons = document.querySelectorAll('input[name="slider-btn"]');
sliderRadioButtons.forEach(radio => {
  radio.addEventListener('click', slider);
});