// const userDataJson = localStorage.getItem('user');
const userData = JSON.parse(localStorage.getItem('user'));


const profileIconButton = document.querySelector('.profile-svg-btn');
const profileIconHiddenButton = document.querySelector('.profile-svg-hidden-btn');
const btns = document.querySelectorAll('.modal-btn');
const modalOverlay = document.querySelector('.modal-overlay ');
const modalProfileOverlay = document.querySelector('.modal-profile-overlay');
const modals = document.querySelectorAll('.modal');
const hamburger = document.querySelector('.menu-toggle');

const closeBtn = document.querySelectorAll('.close-btn');

const listRentedBooks = document.querySelector('.my-profile-list-books');

profileIconButton.addEventListener('click', () => {
  document.querySelector('.modal--1').classList.toggle('modal--visible');
  // modalOverlay.style.background = 'none';
  modalOverlay.classList.add('modal-overlay--visible');
});

profileIconHiddenButton.addEventListener('click', (event) => {
  document.querySelector('.modal--2').classList.toggle('modal--visible');
  // modalOverlay.style.background = 'none';
  modalOverlay.classList.toggle('modal-overlay--visible');
})

closeBtn.forEach((el) => {
  el.addEventListener('click', (el) => {
    modalOverlay.classList.remove('modal-overlay--visible');
    modalOverlay.style.background = 'none';
    document.body.style.overflow = '';
    modals.forEach((el) => {
      el.classList.remove('modal--visible');
    });
  })
})

btns.forEach((el) => {
  el.addEventListener('click', (e) => {
    let path = e.currentTarget.getAttribute('data-path');
    console.log(path);

    modals.forEach((el) => {
      el.classList.remove('modal--visible');
    });

    // window.scrollTo({ top: 0, behavior: 'smooth' });

    document.querySelector(`[data-target="${path}"]`).classList.add('modal--visible');
    modalOverlay.classList.add('modal-overlay--visible');
    modalOverlay.style.background = 'rgba(0, 0, 0, 0.7)';
    document.body.style.overflow = 'hidden';
  });
});

modalOverlay.addEventListener('click', (e) => {
  console.log(e.target);

  if (e.target == modalOverlay || e.target == hamburger) {
    modalOverlay.classList.remove('modal-overlay--visible');
    modalOverlay.style.background = 'none';
    document.body.style.overflow = '';
    modals.forEach((el) => {
      el.classList.remove('modal--visible');
    });
  }
});

// Регистрация нового пользователя
const registerNewUser = document.querySelector('.register-form-btn-submit');
const registerFirstName = document.querySelector('.register-form-input-firstname');
const registerSurname = document.querySelector('.register-form-input-surname');
const registerEmail = document.querySelector('.register-form-input-email');
const registerPassword = document.querySelector('.register-form-input-password');

const RegisterFormData = {};

registerNewUser.addEventListener('click', () => {
  if (registerFirstName.value.length > 0 && registerSurname.value.length > 0 && registerEmail.value.length > 0 && registerPassword.value.length >= 8) {

    localStorage.setItem('cardNumber', getRandomNumber());
    localStorage.setItem('userName', registerFirstName.value);
    localStorage.setItem('userSurname', registerSurname.value);
    localStorage.setItem('userEmail', registerEmail.value);
    localStorage.setItem('userPassword', registerPassword.value);
    localStorage.setItem('registered', true);
    localStorage.setItem('active', true);
    localStorage.setItem('visits', 1);
    localStorage.setItem('buyCard', false);
    localStorage.setItem('booksCount', 0);
    modalOverlay.classList.remove('modal-overlay--visible');
    modalOverlay.style.background = 'none';
    modals.forEach((el) => {
      el.classList.remove('modal--visible');
    });

    RegisterFormData['books'] = [];
    RegisterFormData['buttons'] = [];

    localStorage.setItem('user', JSON.stringify(RegisterFormData));
    event.preventDefault();
    location.reload();
  }
});
// } else {
// window.alert('Please, fill all fields');




// Сгенерировать случайное число
function getRandomNumber() {
  let hexNumber = (Math.floor(Math.random() * 68719476735) + 1).toString(16).toUpperCase();

  return hexNumber.padStart(9, '0');
}

// Страница после успешного входа в аккаунт
const activeStatus = localStorage.getItem('active');
const userEmail = localStorage.getItem('userEmail');
const userPassword = localStorage.getItem('userPassword');
const cardNumber = localStorage.getItem('cardNumber');

const myProfileUserName = document.querySelector('.my-profile-user-name');
const myProfileInitials = document.querySelector('.my-profile-initials');
const visitsCount = document.querySelector('.my-profile-list-visits-count');
const cardNumberField = document.querySelector('.span-my-pofile-card-number');
const booksCountText = document.querySelector('.my-profile-list-books-count');

const readerName = document.querySelector('.check-the-card-form-input-reader-name');
const readerCardNumber = document.querySelector('.check-the-card-form-input-card-number');
const buttonCheckTheCard = document.querySelector('.btn-check-the-card');
const infoBlockCheckTheCard = document.querySelector('.check-the-card-info-block');


if (localStorage.getItem('active') == 'true') {
  document.querySelector('.profile-btn').classList.add('profile-btn-hidden');
  document.querySelector('.initials').classList.remove('profile-btn-hidden');
  document.querySelector('.initials').textContent = localStorage.getItem('userName').slice(0, 1).toUpperCase() + localStorage.getItem('userSurname').slice(0, 1).toLocaleUpperCase();
  document.querySelector('.initials').title = localStorage.getItem('userName') + ' ' + localStorage.getItem('userSurname');
  document.querySelector('.h4-modal--2').textContent = localStorage.getItem('cardNumber');
  document.querySelector('.h3-library-card-left-column').innerHTML = 'Your Library card';
  document.querySelector('.h3-library-card-right-column').innerHTML = 'Visit your profile';
  document.querySelector('.p-library-card-box-right-column').innerHTML = 'With a digital library card you get free access to the Library’s wide array of digital resources including e-books, databases, educational resources, and more.';

  document.querySelectorAll('.btn-buy').forEach((el) => {
    if (localStorage.getItem('buyCard') == 'false') {
      el.setAttribute('data-path', 'buy-card');
    } else {
      el.setAttribute('data-path', 'buy-book');
    }
  });

  readerName.value = localStorage.getItem('userName') + ' ' + localStorage.getItem('userSurname');
  readerName.disabled = true;
  readerCardNumber.value = localStorage.getItem('cardNumber');
  readerCardNumber.disabled = true;
  buttonCheckTheCard.style.display = 'none';
  infoBlockCheckTheCard.innerHTML = `<ul class="check-the-card-list">
    <li class="check-the-card-list-item">
      <span class="check-the-card-list-item-name">Visits</span>
      <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd"
          d="M10.5 10C13.2614 10 15.5 7.76142 15.5 5C15.5 2.23858 13.2614 0 10.5 0C7.73858 0 5.5 2.23858 5.5 5C5.5 7.76142 7.73858 10 10.5 10ZM17.5711 13.9289C19.4464 15.8043 20.5 18.3478 20.5 21H10.5L0.5 21C0.5 18.3478 1.55357 15.8043 3.42893 13.9289C5.3043 12.0536 7.84784 11 10.5 11C13.1522 11 15.6957 12.0536 17.5711 13.9289Z"
          fill="#BB945F" />
      </svg>
      <span class="check-the-card-list-count check-the-card-list-visits-count">${localStorage.getItem('visits')}</span>
    </li>
    <li class="check-the-card-list-item">
      <span class="check-the-card-list-item-name">Bonuses</span>
      <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 0L12.2249 3.31001L15.8779 2.00532L15.8249 6.05634L19.5106 7.25532L17.2 10.5L19.5106 13.7447L15.8249 14.9437L15.8779 18.9947L12.2249 17.69L10 21L7.77508 17.69L4.12215 18.9947L4.17508 14.9437L0.489435 13.7447L2.8 10.5L0.489435 7.25532L4.17508 6.05634L4.12215 2.00532L7.77508 3.31001L10 0Z" fill="#BB945F"/>
        </svg>
      <span class="check-the-card-list-count check-the-card-list-bonuses-count">1240</span>
    </li>
    <li class="check-the-card-list-item">
      <span class="check-the-card-list-item-name">Books</span>
      <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="20" height="21" fill="#BB945F"/>
        <rect x="2" width="1" height="19" fill="#826844"/>
        <rect x="1" width="1" height="21" fill="white"/>
        </svg>
      <span class="check-the-card-list-count check-the-card-list-books-count">${localStorage.getItem('booksCount')}</span>
    </li>
  </ul>`;

  document.querySelector('.btn-sign-up').style.display = 'none';
  document.querySelector('.btn-log-in').innerHTML = 'Profile';
  document.querySelector('.btn-log-in').setAttribute('data-path', 'my-profile');

  myProfileUserName.textContent = localStorage.getItem('userName') + ' ' + localStorage.getItem('userSurname');
  myProfileInitials.textContent = localStorage.getItem('userName').slice(0, 1).toUpperCase() + localStorage.getItem('userSurname').slice(0, 1).toUpperCase();
  visitsCount.textContent = localStorage.getItem('visits');
  booksCountText.textContent = localStorage.getItem('booksCount');
  cardNumberField.textContent = localStorage.getItem('cardNumber');

  // const listRentedBooks = document.querySelector('.my-profile-list-books');
  const author = [];
  const bookName = [];

  userData['books'].forEach((el) => {
    for (let i = 0; i < el.length; i++) {
      i % 2 != 0 ? bookName.push(el[i]) : author.push(el[i]);
    }
  })

  if (bookName.length < 1 && author.length < 1) {

  } else {
    for (let i = 0; i < bookName.length; i++) {
      let li = document.createElement('li');
      let span = document.createElement('span');

      li.textContent = bookName[i] + ', ' + author[i];
      li.classList.add('my-profile-list-books-item');

      listRentedBooks.prepend(li);
    }
  }

  document.querySelectorAll('.btn-buy').forEach((el) => {
    userData['buttons'].forEach((element) => {
      if (el.dataset.btn == element) {
        el.innerHTML = 'Own';
        el.setAttribute = 'disabled';
        el.classList.add('btn-own');
        el.classList.remove('btn-buy');
      }
    })
  })
}

// Вход в учетную запись
const loginUser = document.querySelector('.login-form-btn-submit');
const loginEmail = document.querySelector('.login-form-input-email');
const loginPassword = document.querySelector('.login-form-input-password');

loginUser.addEventListener('click', (event) => {
  if ((loginEmail.value.length > 0 && loginEmail.value == userEmail && loginPassword.value == userPassword)
    || (loginEmail.value.length > 0 && loginEmail.value == cardNumber && loginPassword.value == userPassword)) {
    localStorage.setItem('active', true);
    localStorage.setItem('visits', +localStorage.getItem('visits') + 1);
    modalOverlay.classList.remove('modal-overlay--visible');
    modalOverlay.style.background = 'none';
    modals.forEach((el) => {
      el.classList.remove('modal--visible');
    });
    event.preventDefault();
    location.reload();
  } else {
    window.alert('User not found!');
  }
  location.reload();
})


// Выход из учетной записи
const logOut = document.querySelector('.log-out-btn');

logOut.addEventListener('click', () => {
  localStorage.setItem('active', false);
  location.reload();
})

// Карточка My Profile

// Скопировать Card Number
const copy = document.querySelector('.my-profile-card-number-copy');
// const cardNumberField = document.querySelector('.span-my-pofile-card-number');

copy.addEventListener('click', () => {
  navigator.clipboard.writeText(cardNumberField.textContent);
});

// Купить Library Card
const buyLibraryCardFieldCardNumber = document.querySelector('#bank-card-number');
const expirationCodeMonth = document.querySelector('#expiration-code-month');
const expirationCodeYear = document.querySelector('#expiration-code-year');
const cvc = document.querySelector('#cvc');
const cardHolderName = document.querySelector('#cardholder-name');
const postalCode = document.querySelector('#postal-code');
const city = document.querySelector('#city-name');

const buyCardButton = document.querySelector('.buy-card-btn')

buyLibraryCardFieldCardNumber.addEventListener('input', function () {
  if (buyLibraryCardFieldCardNumber.value.length === 16
    && expirationCodeMonth.value.length === 2
    && expirationCodeYear.value.length === 2
    && cvc.value.length === 3
    && cardHolderName.value.length > 0
    && postalCode.value.length > 0
    && city.value.length > 0) {
    buyCardButton.classList.remove('buy-card-btn-disabled');
  } else {
    buyCardButton.classList.add('buy-card-btn-disabled');
  }
});

expirationCodeMonth.addEventListener('input', () => {
  if (buyLibraryCardFieldCardNumber.value.length === 16
    && expirationCodeMonth.value.length === 2
    && expirationCodeYear.value.length === 2
    && cvc.value.length === 3
    && cardHolderName.value.length > 0
    && postalCode.value.length > 0
    && city.value.length > 0) {
    buyCardButton.classList.remove('buy-card-btn-disabled');
  } else {
    buyCardButton.classList.add('buy-card-btn-disabled');
  }
});

expirationCodeYear.addEventListener('input', () => {
  if (buyLibraryCardFieldCardNumber.value.length === 16
    && expirationCodeMonth.value.length === 2
    && expirationCodeYear.value.length === 2
    && cvc.value.length === 3
    && cardHolderName.value.length > 0
    && postalCode.value.length > 0
    && city.value.length > 0) {
    buyCardButton.classList.remove('buy-card-btn-disabled');
  } else {
    buyCardButton.classList.add('buy-card-btn-disabled');
  }
});

cvc.addEventListener('input', () => {
  if (buyLibraryCardFieldCardNumber.value.length === 16
    && expirationCodeMonth.value.length === 2
    && expirationCodeYear.value.length === 2
    && cvc.value.length === 3
    && cardHolderName.value.length > 0
    && postalCode.value.length > 0
    && city.value.length > 0) {
    buyCardButton.classList.remove('buy-card-btn-disabled');
  } else {
    buyCardButton.classList.add('buy-card-btn-disabled');
  }
});

cardHolderName.addEventListener('input', () => {
  if (buyLibraryCardFieldCardNumber.value.length === 16
    && expirationCodeMonth.value.length === 2
    && expirationCodeYear.value.length === 2
    && cvc.value.length === 3
    && cardHolderName.value.length > 0
    && postalCode.value.length > 0
    && city.value.length > 0) {
    buyCardButton.classList.remove('buy-card-btn-disabled');
  } else {
    buyCardButton.classList.add('buy-card-btn-disabled');
  }
});

postalCode.addEventListener('input', () => {
  if (buyLibraryCardFieldCardNumber.value.length === 16
    && expirationCodeMonth.value.length === 2
    && expirationCodeYear.value.length === 2
    && cvc.value.length === 3
    && cardHolderName.value.length > 0
    && postalCode.value.length > 0
    && city.value.length > 0) {
    buyCardButton.classList.remove('buy-card-btn-disabled');
  } else {
    buyCardButton.classList.add('buy-card-btn-disabled');
  }
});

city.addEventListener('input', () => {
  if (buyLibraryCardFieldCardNumber.value.length === 16
    && expirationCodeMonth.value.length === 2
    && expirationCodeYear.value.length === 2
    && cvc.value.length === 3
    && cardHolderName.value.length > 0
    && postalCode.value.length > 0
    && city.value.length > 0) {
    buyCardButton.classList.remove('buy-card-btn-disabled');
  } else {
    buyCardButton.classList.add('buy-card-btn-disabled');
  }
});

document.querySelector('.buy-card-btn').addEventListener('click', () => {
  if (buyLibraryCardFieldCardNumber.value.length === 16 && typeof (+buyLibraryCardFieldCardNumber.value) == 'number'
    && expirationCodeMonth.value.length === 2
    && expirationCodeYear.value.length === 2) {
    localStorage.setItem('buyCard', true);
    localStorage.setItem('booksCount', +localStorage.getItem('booksCount') + 0);
    modalOverlay.classList.remove('modal-overlay--visible');
    modalOverlay.style.background = 'none';
    modals.forEach((el) => {
      el.classList.remove('modal--visible');
    });
    event.preventDefault();
    location.reload();
  } else {
    // window.alert('Please, fill all fields');
  }

});

// Купить книгу
if (localStorage.getItem('active') == 'false' || localStorage.getItem('buyCard') == 'false') {
  document.querySelectorAll('.btn-buy').forEach((el) => {
    el.addEventListener('click', (e) => {
      let path = e.currentTarget.getAttribute('data-path');

      modals.forEach((el) => {
        el.classList.remove('modal--visible');
      });

      // window.scrollTo({ top: 0, behavior: 'smooth' });

      document.querySelector(`[data-target="${path}"]`).classList.add('modal--visible');
      modalOverlay.classList.add('modal-overlay--visible');
      modalOverlay.style.background = 'rgba(0, 0, 0, 0.7)';
      document.body.style.overflow = 'hidden';
    });
  });
} else {
  document.querySelectorAll('.btn-buy').forEach((el) => {
    el.addEventListener('click', (event) => {
      if (!userData['buttons'].includes(event.target.dataset.btn)) {
        localStorage.setItem('booksCount', +localStorage.getItem('booksCount') + 1);
        booksCountText.textContent = +booksCountText.textContent + 1;
        document.querySelector('.check-the-card-list-books-count').innerHTML = booksCountText.textContent;
        el.innerHTML = 'Own';
        el.setAttribute = 'disabled';
        el.classList.add('btn-own');
        el.classList.remove('btn-buy');
        userData['buttons'].push(event.target.dataset.btn);
        localStorage.setItem('user', JSON.stringify(userData));
      }

      const authorInArray = [];
      const bookInArray = [];

      for (let arr of userData['books']) {
        arr.forEach((element, index) => {
          index % 2 === 0 ? authorInArray.push(element) : bookInArray.push(element);
        })
      }

      const author = event.target.closest('.favorites-box-item').dataset.author;
      const bookName = event.target.closest('.favorites-box-item').dataset.book;

      if (!authorInArray.includes(author) && !bookInArray.includes(bookName)) {
        userData['books'].push([author, bookName]);
        localStorage.setItem('user', JSON.stringify(userData));
      }

      let li = document.createElement('li');
      let span = document.createElement('span');

      li.textContent = bookName + ', ' + author;
      li.classList.add('my-profile-list-books-item');

      listRentedBooks.prepend(li);
    });
  });
};

// Проверка Library card

buttonCheckTheCard.addEventListener('click', (event) => {
  event.preventDefault();
  if ((readerName.value.trim().toLowerCase() === localStorage.getItem('userName').toLowerCase() && readerCardNumber.value === localStorage.getItem('cardNumber'))
    || (readerName.value.trim().toLowerCase() === localStorage.getItem('userSurname').toLowerCase() && readerCardNumber.value === localStorage.getItem('cardNumber'))
    || (readerName.value.replace(/\s+/g, ' ').trim().toLowerCase() === localStorage.getItem('userName').toLowerCase() + " " + localStorage.getItem('userSurname').toLowerCase() && readerCardNumber.value === localStorage.getItem('cardNumber'))) {
    readerName.value = localStorage.getItem('userName') + ' ' + localStorage.getItem('userSurname');
    readerName.disabled = true;
    readerCardNumber.value = localStorage.getItem('cardNumber');
    readerCardNumber.disabled = true;
    buttonCheckTheCard.style.display = 'none';
    infoBlockCheckTheCard.innerHTML = `<ul class="check-the-card-list">
        <li class="check-the-card-list-item">
          <span class="check-the-card-list-item-name">Visits</span>
          <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M10.5 10C13.2614 10 15.5 7.76142 15.5 5C15.5 2.23858 13.2614 0 10.5 0C7.73858 0 5.5 2.23858 5.5 5C5.5 7.76142 7.73858 10 10.5 10ZM17.5711 13.9289C19.4464 15.8043 20.5 18.3478 20.5 21H10.5L0.5 21C0.5 18.3478 1.55357 15.8043 3.42893 13.9289C5.3043 12.0536 7.84784 11 10.5 11C13.1522 11 15.6957 12.0536 17.5711 13.9289Z"
              fill="#BB945F" />
          </svg>
          <span class="check-the-card-list-count check-the-card-list-visits-count">${localStorage.getItem('visits')}</span>
        </li>
        <li class="check-the-card-list-item">
          <span class="check-the-card-list-item-name">Bonuses</span>
          <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 0L12.2249 3.31001L15.8779 2.00532L15.8249 6.05634L19.5106 7.25532L17.2 10.5L19.5106 13.7447L15.8249 14.9437L15.8779 18.9947L12.2249 17.69L10 21L7.77508 17.69L4.12215 18.9947L4.17508 14.9437L0.489435 13.7447L2.8 10.5L0.489435 7.25532L4.17508 6.05634L4.12215 2.00532L7.77508 3.31001L10 0Z" fill="#BB945F"/>
            </svg>
          <span class="check-the-card-list-count check-the-card-list-bonuses-count">1240</span>
        </li>
        <li class="check-the-card-list-item">
          <span class="check-the-card-list-item-name">Books</span>
          <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="20" height="21" fill="#BB945F"/>
            <rect x="2" width="1" height="19" fill="#826844"/>
            <rect x="1" width="1" height="21" fill="white"/>
            </svg>
          <span class="check-the-card-list-count check-the-card-list-books-count">${localStorage.getItem('booksCount')}</span>
        </li>
      </ul>`;
    setTimeout(() => {
      readerName.value = '';
      readerName.disabled = false;
      readerCardNumber.value = '';
      readerCardNumber.disabled = false;
      document.querySelector('.check-the-card-list').style.display = 'none';
      buttonCheckTheCard.style.display = 'block';
    }, 10000);
  } else {
    readerName.value = '';
    readerCardNumber.value = '';
  }
})