const grid = document.querySelector('.grid');
const flagsAmountField = document.querySelector('.flags-amount-field');
const bombAmountField = document.querySelector('.bomb-amount-field');
const result = document.querySelector('.result');
const newGameButton = document.querySelector('.new-game-button');
const stopWatchField = document.querySelector('.stopwatch');
const pauseButton = document.querySelector('.pause-button');
const clearButton = document.querySelector('.clear-button');
let width = 10;
let bombAmount = 10;
let flags = 0;
let matches = 0;
let squares = [];
let isGameOver = false;

let isTimerActive = false;
let time = 0;
let pauseTime = 0;

let checkedItem = 0;

let userData = [];

// if (localStorage.getItem('userData')) {
//   userData = JSON.parse(localStorage.getItem('userData'));
//   userData.forEach((time) => renderTimeTable(time));
// }

newGameButton.addEventListener('click', () => {
  // location.reload();
  new Audio("./sounds/start.mp3").play();
  setTimeout(() => {
    location.reload();
  }, 1000);

  // grid.innerHTML = '';
  // pauseButton.classList.add('disabled');
  // grid.classList.remove('disabled');
  // flags = 0;
  // matches = 0;
  // squares = [];
  // isGameOver = false;
  // isTimerActive = false;
  // time = 0;
  // checkedItem = 0;
  // stopWatchField.innerHTML = '00:00';
  // result.innerHTML = '';
  // createBoard();
});

pauseButton.addEventListener('click', () => {
  if (isTimerActive == false && stopWatchField.innerHTML != '00:00') {
    isTimerActive = true;
    pauseButton.innerHTML = 'Pause';
    grid.classList.remove('disabled');
    stopWatch();
  } else {
    isTimerActive = false;
    pauseButton.innerHTML = 'Resume';
    grid.classList.add('disabled');
  }
});

clearButton.addEventListener('click', () => {
  localStorage.clear();
  location.reload();
})

//Stop-watch
function stopWatch() {
  isTimerActive = true;
  const x = setInterval(function () {
    if (isTimerActive) {
      time += 1;

      let minutes = Math.floor(time / 60);
      let seconds = time % 60;
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      if (seconds < 10) {
        seconds = "0" + seconds;
      }
      stopWatchField.innerHTML = minutes + ":" + seconds;
    } else {
      clearInterval(x);
    }
  }, 1000);
}


//create Board
function createBoard() {
  flagsAmountField.innerHTML = 0;
  bombAmountField.innerHTML = bombAmount;

  // new Audio("./sounds/start.mp3").play();

  //get shuffled game array with random bombs
  const bombsArray = Array(bombAmount).fill('bomb');
  const emptyArray = Array(width * width - bombAmount).fill('valid');
  const gameArray = emptyArray.concat(bombsArray);
  const shuffledArray = gameArray.sort(() => Math.random() - 0.5);

  for (let i = 0; i < width * width; i++) {
    const square = document.createElement('div');
    square.setAttribute('id', i);
    square.classList.add(shuffledArray[i]);
    grid.appendChild(square);
    squares.push(square);

    //left mouse button click
    square.addEventListener('click', function (e) {
      click(square);
      checkForWin();
      new Audio("./sounds/click.mp3").play();
      if (stopWatchField.innerHTML == '00:00') {
        pauseButton.classList.remove('disabled');
        stopWatch();
      }
    });

    //right mouse button click
    square.oncontextmenu = function (e) {
      e.preventDefault();
      addFlag(square);
      new Audio("./sounds/click.mp3").play();
    }
  }

  //add numbers
  for (let i = 0; i < squares.length; i++) {
    let total = 0;
    const isLeftEdge = (i % width === 0);
    const isRightEdge = (i % width === width - 1);

    if (squares[i].classList.contains('valid')) {
      if (i > 0 && !isLeftEdge && squares[i - 1].classList.contains('bomb')) total++;
      if (i > 9 && !isRightEdge && squares[i + 1 - width].classList.contains('bomb')) total++;
      if (i > 10 && squares[i - width].classList.contains('bomb')) total++;
      if (i > 11 && !isLeftEdge && squares[i - 1 - width].classList.contains('bomb')) total++;
      if (i < 98 && !isRightEdge && squares[i + 1].classList.contains('bomb')) total++;
      if (i < 90 && !isLeftEdge && squares[i - 1 + width].classList.contains('bomb')) total++;
      if (i < 88 && !isRightEdge && squares[i + 1 + width].classList.contains('bomb')) total++;
      if (i < 89 && squares[i + width].classList.contains('bomb')) total++;
      squares[i].setAttribute('data', total);
    }
  }
}
createBoard();

//add Flag with right click
function addFlag(square) {
  if (isGameOver) return;
  if (!square.classList.contains('checked')) {
    if (!square.classList.contains('flag')) {
      square.classList.add('flag');
      square.innerHTML = '🚩';
      flags++;
      flagsAmountField.innerHTML = flags;
      checkForWin();
    } else {
      square.classList.remove('flag');
      square.innerHTML = '';
      flags--;
      flagsAmountField.innerHTML = flags;
      checkForWin();
    }
  }
}

//click on square actions
function click(square) {
  let currentId = square.id;
  if (isGameOver) return;
  if (square.classList.contains('checked') || square.classList.contains('flag')) return;
  if (square.classList.contains('bomb')) {
    gameOver(square);
  } else {
    let total = square.getAttribute('data');
    if (total == 0) {
      checkedItem++;
    }
    if (total != 0) {
      square.classList.add('checked');
      if (total == 1) {
        square.classList.add('one');
        checkedItem++;
      }
      if (total == 2) {
        square.classList.add('two');
        checkedItem++;
      }
      if (total == 3) {
        square.classList.add('three');
        checkedItem++;
      }
      if (total == 4) {
        square.classList.add('four');
        checkedItem++;
      }
      square.innerHTML = total;
      return;
    }
    checkSquare(square, currentId);
  }
  square.classList.add('checked');
}

//check neighboring square once square is clicked
function checkSquare(square, currentId) {
  const isLeftEdge = (currentId % width === 0);
  const isRightEdge = (currentId % width === width - 1);

  setTimeout(() => {
    if (currentId > 0 && !isLeftEdge) {
      const newId = squares[parseInt(currentId) - 1].id;
      const newSquare = document.getElementById(newId);
      click(newSquare);
    }
    if (currentId > 9 && !isRightEdge) {
      const newId = squares[parseInt(currentId) + 1 - width].id;
      const newSquare = document.getElementById(newId);
      click(newSquare);
    }
    if (currentId > 10) {
      const newId = squares[parseInt(currentId) - width].id;
      const newSquare = document.getElementById(newId);
      click(newSquare);
    }
    if (currentId > 11 && !isLeftEdge) {
      const newId = squares[parseInt(currentId) - 1 - width].id;
      const newSquare = document.getElementById(newId);
      click(newSquare);
    }
    if (currentId < 98 && !isRightEdge) {
      const newId = squares[parseInt(currentId) + 1].id;
      const newSquare = document.getElementById(newId);
      click(newSquare);
    }
    if (currentId < 90 && !isLeftEdge) {
      const newId = squares[parseInt(currentId) - 1 + width].id;
      const newSquare = document.getElementById(newId);
      click(newSquare);
    }
    if (currentId < 88 && !isRightEdge) {
      const newId = squares[parseInt(currentId) + 1 + width].id;
      const newSquare = document.getElementById(newId);
      click(newSquare);
    }
    if (currentId < 89) {
      const newId = squares[parseInt(currentId) + width].id;
      const newSquare = document.getElementById(newId);
      click(newSquare);
    }
  }, 10);
};

//game over
function gameOver(square) {
  result.innerHTML = 'BOOM! Game Over!';
  isGameOver = true;

  //show ALL the bombs
  squares.forEach(square => {
    if (square.classList.contains('bomb')) {
      square.innerHTML = '💣';
      square.classList.remove('bomb');
      square.classList.add('checked');
    }
  });
  setTimeout(() => {
    new Audio("./sounds/lose_minesweeper.mp3").play();
    isTimerActive = false;
    pauseButton.classList.add('disabled');
    grid.classList.add('disabled');
    const timeTableItem = document.createElement('div');
    timeTableItem.innerHTML = stopWatchField.innerHTML;
    timeTable.append(timeTableItem);
    saveToLocalStorage();
  }, 10);
}

//check for win
function checkForWin() {
  //simplified win argument
  let matches = 0;

  if (checkedItem == width * width - bombAmount) {
    squares.forEach(square => {
      if (square.classList.contains('bomb')) {
        square.innerHTML = '🚩'
      }
    });
    result.innerHTML = 'YOU WIN!';
  } else {
    for (let i = 0; i < squares.length; i++) {
      if (squares[i].classList.contains('flag') && squares[i].classList.contains('bomb')) {
        matches++;
      }
      if (matches === bombAmount && flags === bombAmount) {
        result.innerHTML = 'YOU WIN!';
      }
    }
  }
  if (result.innerHTML == 'YOU WIN!') {
    isGameOver = true;
    isTimerActive = false;
    pauseButton.classList.add('disabled');
    flagsAmountField.innerHTML = '10';
    new Audio("./sounds/click.mp3").play();
    grid.classList.add('disabled');
    const timeTableItem = document.createElement('div');
    timeTableItem.innerHTML = stopWatchField.innerHTML;
    timeTable.append(timeTableItem);
    saveToLocalStorage();
  }
}

function saveToLocalStorage() {
  if (userData.length < 10) {
    userData.push(stopWatchField.innerHTML);
    localStorage.setItem('userData', JSON.stringify(userData));
  } else {
    userData.shift();
    userData.push(stopWatchField.innerHTML);
    localStorage.setItem('userData', JSON.stringify(userData));
  }
}

const timeTable = document.querySelector('.time-table');

if (localStorage.getItem('userData')) {
  userData = JSON.parse(localStorage.getItem('userData'));
  renderTimeTable();
}

function renderTimeTable(t) {
  for (let i = 0; i < userData.length; i++) {
    // const timeTableIndex = document.createElement('div');
    // timeTableIndex.innerHTML = i + 1;
    // timeTable.append(timeTableIndex);
    const timeTableItem = document.createElement('div');
    timeTableItem.innerHTML = userData[i];
    timeTable.append(timeTableItem);
  }
}

console.log(`
Score: 60 / 60
1. [x] Вёрстка 10/10
 -[x] реализован интерфейс игры +5
 -[x] в футере приложения есть ссылка на гитхаб автора приложения, год создания приложения, логотип курса со ссылкой на курс +5
 2. [x] Логика игры. Ходы, перемещения фигур, другие действия игрока подчиняются определённым свойственным игре правилам +10
 3. [x] Реализовано завершение игры при достижении игровой цели +10
 4. [x] По окончанию игры выводится её результат, например, количество ходов, время игры, набранные баллы, выигрыш или поражение и т.д +10
 5. [x] Есть таблица результатов, в которой сохраняются результаты 10 игр с наибольшим счетом (лучшим временем и т.п.) или просто 10 последних игр (хранится в local storage) +10
 6. [x] Анимации или звуки, или настройки игры. Баллы начисляются за любой из перечисленных пунктов +10
`);