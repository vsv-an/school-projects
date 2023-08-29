// const btns = document.querySelectorAll('.btn');
// const modalOverlay = document.querySelector('.modal-overlay');
// const modals = document.querySelectorAll('.modal');

// btns.forEach((el) => {
//   el.addEventListener('click', (e) => {
//     let path = e.currentTarget.getAttribute('data-path');
//     modals.forEach((el) => {
//       el.classList.remove('modal--visible');
//     });

//     document.querySelector(`[data-target="${path}"]`).classList.add('modal--visible');
//     modalOverlay.classList.add('modal-overlay--visible');
//   })

// })

// modalOverlay.addEventListener('click', (e) => {
//   console.log(e.target);
//   if (e.target == modalOverlay) {
//     modalOverlay.classList.remove('modal-overlay--visible');
//     modals.forEach((el) => {
//       el.classList.remove('modal--visible');
//     });
//   }
// });

const btns = document.querySelectorAll('.modal-btn');
const modalOverlay = document.querySelector('.modal-overlay ');
const modals = document.querySelectorAll('.modal');
const hamburger = document.querySelector('.menu-toggle');

const closeBtn = document.querySelectorAll('.close-btn');

closeBtn.forEach((el) => {
  el.addEventListener('click', (el) => {
    modalOverlay.classList.remove('modal-overlay--visible');
    modals.forEach((el) => {
      el.classList.remove('modal--visible');
    });
  })
})

btns.forEach((el) => {
  el.addEventListener('click', (e) => {
    let path = e.currentTarget.getAttribute('data-path');

    modals.forEach((el) => {
      el.classList.remove('modal--visible');
    });

    // window.scrollTo({ top: 0, behavior: 'smooth' });

    document.querySelector(`[data-target="${path}"]`).classList.add('modal--visible');
    modalOverlay.classList.add('modal-overlay--visible');
  });
});

modalOverlay.addEventListener('click', (e) => {
  console.log(e.target);

  if (e.target == modalOverlay || e.target == hamburger) {
    modalOverlay.classList.remove('modal-overlay--visible');
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

registerNewUser.addEventListener('click', () => {

  localStorage.setItem('cardNumber', getRandomNumber());
  localStorage.setItem('userName', registerFirstName.value);
  localStorage.setItem('userSurname', registerSurname.value);
  localStorage.setItem('userEmail', registerEmail.value);
  localStorage.setItem('userPassword', registerPassword.value);
  localStorage.setItem('registered', true);
  localStorage.setItem('active', true);
  localStorage.setItem('visits', 1);
  modalOverlay.classList.remove('modal-overlay--visible');
    modals.forEach((el) => {
      el.classList.remove('modal--visible');
    });
    event.preventDefault();
    location.reload();
});

 // Сгенерировать случайное число
function getRandomNumber() {
  let hexNumber = (Math.floor(Math.random() * (999_999_999 - 100_000_000) + 100_000_000)).toString(16).toUpperCase();
  while (hexNumber.length < 9) {
    hexNumber += '0';
  }
  return hexNumber;
 }

 // Страница после успешного входа в аккаунт
const activeStatus = localStorage.getItem('active');
const userEmail = localStorage.getItem('userEmail');
const userPassword = localStorage.getItem('userPassword');

const myProfileUserName = document.querySelector('.my-profile-user-name');
const myProfileInitials = document.querySelector('.my-profile-initials');
const visitsCount = document.querySelector('.my-profile-list-visits-count');
const cardNumberField = document.querySelector('.span-my-pofile-card-number');


  if (localStorage.getItem('active') == 'true') {
    document.querySelector('.profile-btn').classList.add('profile-btn-hidden');
    document.querySelector('.initials').classList.remove('profile-btn-hidden');
    document.querySelector('.initials').textContent = localStorage.getItem('userName').slice(0, 1).toUpperCase() + localStorage.getItem('userSurname').slice(0, 1).toLocaleUpperCase();
    document.querySelector('.initials').title = localStorage.getItem('userName') + ' ' + localStorage.getItem('userSurname');
    document.querySelector('.h4-modal--2').textContent = localStorage.getItem('cardNumber');

    myProfileUserName.textContent = localStorage.getItem('userName') + ' ' + localStorage.getItem('userSurname');
    myProfileInitials.textContent = localStorage.getItem('userName').slice(0, 1).toUpperCase() + localStorage.getItem('userSurname').slice(0, 1).toLocaleUpperCase();
    visitsCount.textContent = localStorage.getItem('visits');
    cardNumberField.textContent = localStorage.getItem('cardNumber');
  }

 // Вход в учетную запись
 const loginUser = document.querySelector('.login-form-btn-submit');
 const loginEmail = document.querySelector('.login-form-input-email');
 const loginPassword = document.querySelector('.login-form-input-password');

 loginUser.addEventListener('click', () => {
  if (loginEmail.value == userEmail && loginPassword.value == userPassword) {
    localStorage.setItem('active', true);
    localStorage.setItem('visits', +localStorage.getItem('visits') + 1);
    modalOverlay.classList.remove('modal-overlay--visible');
    modals.forEach((el) => {
      el.classList.remove('modal--visible');
    });
    event.preventDefault();
    location.reload();
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
})
