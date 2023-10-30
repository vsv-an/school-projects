const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".header-navigation");
const modal = document.querySelector('.modal--1');
const modal2 = document.querySelector('.modal--2');
// const modalOverlay = document.querySelector('.modal-overlay');

menuToggle.onclick = function () {
  document.body.classList.toggle('_lock');
  navigation.classList.toggle("active");
  menuToggle.classList.toggle("active");
  modal.classList.remove('modal--visible');
  modal2.classList.remove('modal--visible');
  modalOverlay.classList.remove('modal-overlay--visible');
};

document.addEventListener("click", (e) => {
  if (!e.target.classList.contains("menu-toggle")
    && !e.target.closest('.header-navigation')
    || e.target.classList.contains("nav-link")) {
    document.body.classList.remove('_lock');
    navigation.classList.remove("active");
    menuToggle.classList.remove("active");
  }
})