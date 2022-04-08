function toggleNav() {

  let navCloseBtn = document.querySelector("#nav-close-btn button");
  let nav = document.querySelector("#nav");
  let navShowBtn = document.querySelector("#nav-show-btn button");

  navCloseBtn.addEventListener("click", function() {
    nav.classList.add("nav--hided");
  });

  navShowBtn.addEventListener("click", function() {
    nav.classList.remove("nav--hided");
  });

}

function appClose() {

  let appCloseBtn = document.querySelector("#app-close-btn");

  appCloseBtn.addEventListener("click", function() {
    alert("Obrigado por testar o sistema");
  });

}

window.addEventListener("load", function() {
  toggleNav();
  appClose();
});