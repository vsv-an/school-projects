const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".header-navigation");

menuToggle.onclick = function () {
  document.body.classList.toggle('_lock');
  navigation.classList.toggle("active");
  menuToggle.classList.toggle("active");
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