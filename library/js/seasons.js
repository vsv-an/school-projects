const winter = document.getElementById("winter");
const spring = document.getElementById("spring");
const summer = document.getElementById("summer");
const autumn = document.getElementById("autumn");
const winterBooks = document.getElementById("winter-id");
const springBooks = document.getElementById("spring-id");
const summerBooks = document.getElementById("summer-id");
const autumnBooks = document.getElementById("autumn-id");

function showSeason() {
  if (winter.checked) {
    winterBooks.classList.add("season-animation")
    winterBooks.classList.remove("season-hide-animation")
    winterBooks.style.display = 'flex';
    springBooks.style.display = 'none';
    summerBooks.style.display = 'none';
    // autumnBooks.style.display = 'none';
    autumnBooks.classList.add("season-hide-animation")
  }
  if (spring.checked) {
    springBooks.classList.add("season-animation")
    winterBooks.style.display = 'none';
    springBooks.style.display = 'flex';
    summerBooks.style.display = 'none';
    autumnBooks.style.display = 'none';
  }
  if (summer.checked) {
    summerBooks.classList.add("season-animation")
    winterBooks.style.display = 'none';
    springBooks.style.display = 'none';
    summerBooks.style.display = 'flex';
    autumnBooks.style.display = 'none';
  }
  if (autumn.checked) {
    winterBooks.style.display = 'none';
    winterBooks.classList.add("season-hide-animation")
    springBooks.style.display = 'none';
    summerBooks.style.display = 'none';
    autumnBooks.style.display = 'flex';
    autumnBooks.classList.add("season-animation")
    autumnBooks.classList.remove("season-hide-animation")
  }
}

const radioButtons = document.querySelectorAll('input[name="season"]');
radioButtons.forEach(radio => {
  radio.addEventListener('click', showSeason);
});

