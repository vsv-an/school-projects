const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".header-navigation");

menuToggle.onclick = function () {
  document.body.classList.toggle('_lock');
  navigation.classList.toggle("active");
  menuToggle.classList.toggle("active");
};

document.addEventListener("click", (el) => {
  if (!el.target.classList.contains("menu-toggle")) {
    document.body.classList.remove('_lock');
    navigation.classList.remove("active");
    menuToggle.classList.remove("active");
  }
})