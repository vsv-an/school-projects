const mainContainer = document.querySelector('.main-container');
const headerSearchInput = document.querySelector('.header-search');

searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  let searchWord = headerSearchInput.value;
  mainContainer.innerHTML = '';
  getData(searchWord);
});

async function getData(search) {
  const response = await fetch(`https://api.unsplash.com/search/photos?query=${search}&per_page=30&orientation=landscape&client_id=SouHY7Uul-OxoMl3LL3c0NkxUtjIrKwf3tsGk1JaiVo`)
  const data = await response.json();
  imgGrid(data);
}

function imgGrid(data) {
  for (let imgJson of data.results) {
    let img = document.createElement('img');
    img.setAttribute('src', imgJson.urls.small);
    img.classList.add('img-item');
    mainContainer.appendChild(img);
  }
}
