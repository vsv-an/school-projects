function createTrackItem(index, name, duration) {
  var trackItem = document.createElement('div');
  trackItem.setAttribute("class", "playlist-track");
  trackItem.setAttribute("id", "ptc-" + index);
  trackItem.setAttribute("data-index", index);
  document.querySelector(".playlist").appendChild(trackItem);

  var playBtnItem = document.createElement('div');
  playBtnItem.setAttribute('class', 'playlist-btn-play');
  playBtnItem.setAttribute('id', 'pbp-' + index);
  document.querySelector('#ptc-' + index).appendChild(playBtnItem);

  var btnImg = document.createElement('i');
  btnImg.setAttribute('class', 'fas fa-play');
  btnImg.setAttribute('height', '40');
  btnImg.setAttribute('width', '40');
  btnImg.setAttribute('id', 'p-img-' + index);
  document.querySelector('#pbp-' + index).appendChild(btnImg);

  var trackInfoItem = document.createElement('div');
  trackInfoItem.setAttribute('class', 'playlist-info-track');
  trackInfoItem.innerHTML = name;
  document.querySelector('#ptc-' + index).appendChild(trackInfoItem);

  var trackDurationItem = document.createElement('div');
  trackDurationItem.setAttribute('class', 'playlist-duration');
  trackDurationItem.innerHTML = duration;
  document.querySelector('#ptc-' + index).appendChild(trackDurationItem);
}

var listAudio = [
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

var indexAudio = 0;

function loadNewTrack(index) {
  var player = document.querySelector('#source-audio');
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

var playListItems = document.querySelectorAll('.playlist-track');

for (let i = 0; i < playListItems.length; i++) {
  playListItems[i].addEventListener('click', getClickedElement.bind(this));
}

function getClickedElement(event) {
  for (let i = 0; i < playListItems.length; i++) {
    if (playListItems[i] == event.target) {
      var clickedIndex = event.target.getAttribute('data-index');
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

var currentAudio = document.getElementById('current-audio');

currentAudio.load();

currentAudio.onloadedmetadata = function () {
  document.getElementsByClassName('duration')[0].innerHTML = this.getMinutes(this.currentAudio.duration);
}.bind(this);

var interval1;

function toggleAudio() {
  if (this.currentAudio.paused) {
    document.querySelector('#icon-play').style.display = 'none';
    document.querySelector('#icon-pause').style.display = 'block';
    document.querySelector('#ptc-' + this.indexAudio).classList.add('active-track');
    this.playToPause(this.indexAudio);
    this.currentAudio.play();
  } else {
    document.querySelector('#icon-play').style.display = 'block';
    document.querySelector('#icon-pause').style.display = 'none';
    this.pauseToPlay(this.indexAudio);
    this.currentAudio.pause();
  }
}

function pauseAudio() {
  this.currentAudio.pause();
  clearInterval(interval1);
}

var timer = document.getElementsByClassName('timer')[0];
var barProgress = document.getElementById('song-progress-bar');
var width = 0;

function onTimeUpdate() {
  let t = this.currentAudio.currentTime;
  timer.innerHTML = this.getMinutes(t);
  this.setBarProgress();
  if (this.currentAudio.ended) {
    document.querySelector('#icon-play').style.display = 'block';
    document.querySelector('#icon-pause').style.display = 'none';
    this.pauseToPlay(this.indexAudio)
    if (this.indexAudio < listAudio.length - 1) {
      let index = parseInt(this.indexAudio) + 1;
      this.loadNewTrack(index);
    }
  }
}

function setBarProgress() {
  let progress = (this.currentAudio.currentTime / this.currentAudio.duration) * 100;
  document.getElementById('song-progress-bar').style.width = progress + '%';
}

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

var progressbar = document.querySelector('#progress-bar');
progressbar.addEventListener('click', seek.bind(this));

function seek(event) {
  var percent = event.offsetX / progressbar.offsetWidth;
  this.currentAudio.currentTime = percent * this.currentAudio.duration;
  barProgress.style.width = percent * 100 + '%';
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
  var element = document.querySelector('#p-img-' + index);
  element.classList.remove('fa-play');
  element.classList.add('fa-pause');
}

function pauseToPlay(index) {
  var element = document.querySelector('#p-img-' + index);
  element.classList.remove('fa-pause');
  element.classList.add('fa-play');
}
