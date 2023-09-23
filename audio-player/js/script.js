function createTrackItem(index, name, duration) {
  const trackItem = document.createElement('div');
  trackItem.setAttribute("class", "playlist-track");
  trackItem.setAttribute("id", "ptc-" + index);
  trackItem.setAttribute("data-index", index);
  document.querySelector(".playlist").appendChild(trackItem);

  const playBtnItem = document.createElement('div');
  playBtnItem.setAttribute('class', 'playlist-btn-play');
  playBtnItem.setAttribute('id', 'pbp-' + index);
  document.querySelector('#ptc-' + index).appendChild(playBtnItem);

  const btnImg = document.createElement('i');
  btnImg.setAttribute('class', 'fas fa-play');
  btnImg.setAttribute('height', '40');
  btnImg.setAttribute('width', '40');
  btnImg.setAttribute('id', 'p-img-' + index);
  document.querySelector('#pbp-' + index).appendChild(btnImg);

  const trackInfoItem = document.createElement('div');
  trackInfoItem.setAttribute('class', 'playlist-info-track');
  trackInfoItem.innerHTML = name;
  document.querySelector('#ptc-' + index).appendChild(trackInfoItem);

  const trackDurationItem = document.createElement('div');
  trackDurationItem.setAttribute('class', 'playlist-duration');
  trackDurationItem.innerHTML = duration;
  document.querySelector('#ptc-' + index).appendChild(trackDurationItem);
}

const listAudio = [
  {
    name: "Gipsy Flame - For Your Eyes",
    file: "./songs/Gypsy_Flame-For_Your_Eyes.mp3",
    duration: "04:54",
    img: "url('./img/img-1.jpg')",
  },
  {
    name: "Rubia - Mi Amor",
    file: "./songs/Rubia-Mi_Amor.mp3",
    duration: "05:16",
    img: "url(./img/img-2.jpg)",
  },
  {
    name: "Gipsy Kings - Moorea",
    file: "./songs/Gipsy_Kings-Moorea.mp3",
    duration: "04:02",
    img: "url(./img/img-3.jpg)",
  }
]

for (let i = 0; i < listAudio.length; i++) {
  createTrackItem(i, listAudio[i].name, listAudio[i].duration);
}

const player = document.querySelector('#source-audio');
var currentAudio = document.getElementById('current-audio');
var indexAudio = 0;

function loadNewTrack(index) {
  player.src = listAudio[index].file;
  document.querySelector('.title').innerHTML = listAudio[index].name;
  document.querySelector('.thumbnail').style.backgroundImage = listAudio[index].img;
  document.querySelector('body').style.backgroundImage = listAudio[index].img;
  this.currentAudio = document.getElementById("current-audio");
  this.currentAudio.load();
  this.toggleAudio();
  this.updatesStylePlylist(this.indexAudio, index);
  this.indexAudio = index;
}

const playListItems = document.querySelectorAll('.playlist-track');

for (let i = 0; i < playListItems.length; i++) {
  playListItems[i].addEventListener('click', getClickedElement.bind(this));
}

function getClickedElement(event) {
  for (let i = 0; i < playListItems.length; i++) {
    if (playListItems[i] == event.target) {
      let clickedIndex = event.target.getAttribute('data-index');
      if (clickedIndex == this.indexAudio) {
        this.toggleAudio();
      } else {
        loadNewTrack(clickedIndex);
      }
    }
  }
}

document.querySelector('#source-audio').src = listAudio[indexAudio].file;
document.querySelector('.title').innerHTML = listAudio[indexAudio].name;
document.querySelector('.thumbnail').style.backgroundImage = listAudio[indexAudio].img;
document.querySelector('body').style.backgroundImage = listAudio[indexAudio].img;
document.querySelector('#ptc-' + this.indexAudio).classList.add('active-track');

currentAudio.load();

currentAudio.onloadedmetadata = function () {
  document.getElementsByClassName('duration')[0].innerHTML = this.getMinutes(this.currentAudio.duration);
}.bind(this);

function toggleAudio() {
  if (this.currentAudio.paused) {
    document.querySelector('#icon-play').style.display = 'none';
    document.querySelector('#icon-pause').style.display = 'block';
    document.querySelector('#ptc-' + this.indexAudio).classList.add('active-track');
    this.playToPause(this.indexAudio);
    this.currentAudio.play();
    document.querySelector('.thumbnail').style.transform = 'scale(1.1)';
  } else {
    document.querySelector('#icon-play').style.display = 'block';
    document.querySelector('#icon-pause').style.display = 'none';
    this.pauseToPlay(this.indexAudio);
    this.currentAudio.pause();
    document.querySelector('.thumbnail').style.transform = 'scale(1)';
  }
}

function stopPlay() {
  document.querySelector('#icon-play').style.display = 'block';
  document.querySelector('#icon-pause').style.display = 'none';
  this.pauseToPlay(this.indexAudio);
  this.currentAudio.currentTime = 0;
  this.currentAudio.pause();
}

const timer = document.getElementsByClassName('timer')[0];
const songProgressBar = document.getElementById('song-progress-bar');

function onTimeUpdate() {
  let t = this.currentAudio.currentTime;
  timer.innerHTML = this.getMinutes(t);
  if (this.currentAudio.ended) {
    document.querySelector('#icon-play').style.display = 'block';
    document.querySelector('#icon-pause').style.display = 'none';
    this.pauseToPlay(this.indexAudio)
    if (this.indexAudio < listAudio.length - 1) {
      let index = parseInt(this.indexAudio) + 1;
      this.loadNewTrack(index);
    } else {
      this.loadNewTrack(0);
    }
  }
}

const volumeBar = document.querySelector('#volume-progress-bar');

volumeBar.addEventListener('input', function () {
  let volumeUp = document.querySelector('#icon-volume-up');
  let volumeMute = document.querySelector('#icon-volume-mute');
  currentAudio.volume = parseInt(this.value) / 10;
  if (this.value == '0') {
    volumeUp.style.display = 'none';
    volumeMute.style.display = 'block';
  } else {
    volumeUp.style.display = 'block';
    volumeMute.style.display = 'none';
  }
}, false);

function setBarProgress() {
  songProgressBar.max = this.currentAudio.duration;
  songProgressBar.value = this.currentAudio.currentTime;
}

setInterval(setBarProgress, 500);

function getMinutes(t) {
  let min = parseInt(parseInt(t) / 60);
  let sec = parseInt(t % 60);
  if (sec < 10) {
    sec = '0' + sec;
  }
  if (min < 10) {
    min = '0' + min;
  }
  return min + ':' + sec;
}

const progressbar = document.querySelector('#song-progress-bar');
songProgressBar.addEventListener('click', seek.bind(this));

function seek(event) {
  let percent = event.offsetX / songProgressBar.offsetWidth;
  this.currentAudio.currentTime = percent * this.currentAudio.duration;
}

function previous() {
  let oldIndex = this.indexAudio;
  this.indexAudio--;
  if (this.indexAudio < 0) {
    this.indexAudio = listAudio.length - 1;
    oldIndex = 0;
  }
  updatesStylePlylist(oldIndex, this.indexAudio);
  this.loadNewTrack(this.indexAudio);
}

function next() {
  let oldIndex = this.indexAudio;
  this.indexAudio++;
  if (this.indexAudio > listAudio.length - 1) {
    indexAudio = 0;
  }
  updatesStylePlylist(oldIndex, this.indexAudio);
  this.loadNewTrack(this.indexAudio);
}

function updatesStylePlylist(oldIndex, newIndex) {
  document.querySelector('#ptc-' + oldIndex).classList.remove('active-track');
  this.pauseToPlay(oldIndex);
  document.querySelector('#ptc-' + newIndex).classList.add('active-track');
  this.playToPause(newIndex);
}

function playToPause(index) {
  let element = document.querySelector('#p-img-' + index);
  element.classList.remove('fa-play');
  element.classList.add('fa-pause');
}

function pauseToPlay(index) {
  let element = document.querySelector('#p-img-' + index);
  element.classList.remove('fa-pause');
  element.classList.add('fa-play');
}

function toggleMute() {
  let btnMute = document.querySelector('toggle-mute');
  let volumeUp = document.querySelector('#icon-volume-up');
  let volumeMute = document.querySelector('#icon-volume-mute');
  if (this.currentAudio.muted == false) {
    this.currentAudio.muted = true;
    volumeUp.style.display = 'none';
    volumeMute.style.display = 'block';
  } else {
    this.currentAudio.muted = false;
    volumeUp.style.display = 'block';
    volumeMute.style.display = 'none';
  }
}

console.log(`
Score: 60 / 60
[x] 1. Вёрстка +10
[x] - вёрстка аудиоплеера: есть кнопка Play/Pause, кнопки "Вперёд" и "Назад" для пролистывания аудиотреков, прогресс-бар, отображается название и автор трека +5
[x] - в футере приложения есть ссылка на гитхаб автора приложения, год создания приложения, логотип курса со ссылкой на курс +5
[x] 2. Кнопка Play/Pause +10
[x] - есть кнопка Play/Pause, при клике по которой можно запустить или остановить проигрывание аудиотрека +5
[x] - внешний вид и функционал кнопки Play/Pause изменяется в зависимости от того, проигрывается ли в данный момент аудиотрек +5
[x] 3. При кликах по кнопкам "Вперёд" и "Назад" переключается проигрываемый аудиотрек. Аудиотреки пролистываются по кругу - после последнего идёт первый +10
[x] 4. При смене аудиотрека меняется изображение - обложка аудиотрека +10
[x] 5. Прогресс-бар отображает прогресс проигрывания текущего аудиотрека. При перемещении ползунка вручную меняется текущее время проигрывания аудиотрека +10
[x] 6. Отображается продолжительность аудиотрека и его текущее время проигрывания +10
[x] 7. Очень высокое качество оформления приложения и/или дополнительный не предусмотренный в задании функционал, улучшающий качество приложения +10

  - высокое качество оформления приложения предполагает собственное оригинальное оформление равное или отличающееся в лучшую сторону по сравнению с демо

`);
