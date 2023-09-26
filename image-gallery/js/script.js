const mainContainer = document.querySelector('.main-container');
const headerSearchInput = document.querySelector('.header-search');
const headerCloseButton = document.querySelector('.header-close-btn');
const searchForm = document.querySelector('.search-form');

searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  let searchWord = headerSearchInput.value;
  mainContainer.innerHTML = '';
  getData(searchWord);
});

headerCloseButton.addEventListener('click', (event) => {
  event.preventDefault();
  headerSearchInput.value = '';
});

async function getData(search) {
  const response = await fetch(`https://api.unsplash.com/search/photos?query=${search}&per_page=30&orientation=landscape&client_id=p3UTBU5SZsaooCpbmGKjkUtXC8aMbPNZJOUbTElAJOI`)
  const data = await response.json();
  imgGrid(data);
};

function imgGrid(data) {
  for (let imgJson of data.results) {
    let img = document.createElement('img');
    img.setAttribute('src', imgJson.urls.small);
    img.classList.add('img-item');
    mainContainer.appendChild(img);
  };
};

window.onload = () => getData('Mountains');
