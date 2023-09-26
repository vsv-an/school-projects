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

console.log(`
Score: 60 / 60
1. Вёрстка 10 / 10
 - [x] на странице есть несколько фото и строка поиска +5
 - [x]в футере приложения есть ссылка на гитхаб автора приложения, год создания приложения, логотип курса со ссылкой на курс +5
2. [x] При загрузке приложения на странице отображаются полученные от API изображения +10
3. [x] Если в поле поиска ввести слово и отправить поисковый запрос, на странице отобразятся изображения соответствующей тематики, если такие данные предоставляет API +10
4. Поиск 30/ 30
 - [x] при открытии приложения курсор находится в поле ввода +5
 - [x] есть placeholder +5
 - [x] автозаполнение поля ввода отключено (нет выпадающего списка с предыдущими запросами) +5
 - [x] поисковый запрос можно отправить нажатием клавиши Enter +5
 - [x] после отправки поискового запроса и отображения результатов поиска, поисковый запрос продолжает отображаться в поле ввода +5
 - [x] в поле ввода есть крестик при клике по которому поисковый запрос из поля ввода удаляется и отображается placeholder +5
5. [x] Очень высокое качество оформления приложения и/или дополнительный не предусмотренный в задании функционал, улучшающий качество приложения +10
 - высокое качество оформления приложения предполагает собственное оригинальное оформление равное или отличающееся в лучшую сторону по сравнению с демо
`);
