const radioButtons = document.querySelectorAll('.favorites-label input[type="radio"]');
radioButtons.forEach((item) => {
  item.addEventListener('click', (e) => {
    let path = e.currentTarget.getAttribute('data-path');
    document.querySelectorAll('.favorites-box').forEach((item) => {
      // item.classList.add('hidden');
      // item.classList.remove('season-animation');
      item.classList.add('season-hide-animation');
    });
    setTimeout(() => {
      document.querySelectorAll(`.favorites-box`).forEach((el) => el.classList.add('hidden'));
      document.querySelectorAll(`[data-target="${path}"]`).forEach((el) => el.classList.remove('season-hide-animation'));
      document.querySelectorAll(`[data-target="${path}"]`).forEach((el) => el.classList.remove('hidden'));
      document.querySelectorAll(`[data-target="${path}"]`).forEach((el) => el.classList.add('season-animation'));
    }, 1000);
    // setTimeout(() => {
    //   document.querySelectorAll(`[data-target="${path}"]`).forEach((el) => el.classList.remove('hidden'));
    //   document.querySelectorAll(`[data-target="${path}"]`).forEach((el) => el.classList.add('season-animation'));
    // }, 1000);
    // document.querySelector(`.favorites-box-wrapper [data-visible="${e.currentTarget.dataset.visible}"]`).classList.remove('hidden');
    // document.querySelector(`.favorites-box-wrapper [data-visible="${e.currentTarget.dataset.visible}"]`).classList.add('season-animation');
    // document.querySelector(`.favorites-box-wrapper [data-visible="${e.currentTarget.dataset.visible}"]`).classList.remove('season-hide-animation');
   })
  });