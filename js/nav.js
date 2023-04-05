let mobiNavToggle = document.getElementById("mobileNavToggle");
let mobiNav = document.getElementById("mobiNav");
let mobiNavClose = document.getElementById("close__menu");

mobiNavToggle.addEventListener("click", () => {
  mobiNav.style.display = "block";
});

mobiNavClose.addEventListener("click", () => {
  mobiNav.style.display = "none";
});
