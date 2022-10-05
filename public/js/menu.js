let menu = (function () {
  let menu = document.getElementById("menu");
  for (let i = 0; i < menu.childNodes.length; i++) {
    if (menu.childNodes[i].childNodes[0].href === window.location.href) {
      menu.childNodes[i].childNodes[0].classList.add("active");
    }
  }
});