// loader window
let loaderContainer = document.querySelector(".loader");
window.addEventListener("load", () => {
  loaderContainer.style.visibility = "visible";
  setTimeout(() => {
    loaderContainer.remove();
  }, 3200);
});

// random images
let arrayOfImages = [
  "autumn.webp",
  "spring.webp",
  "summer.webp",
  "winter.webp",
];

setInterval(() => {
  // get random number
  let randomNumber = Math.floor(arrayOfImages.length * Math.random());
  // change background url
  let imageEx = arrayOfImages[randomNumber];
  document.body.style.backgroundImage = `url(images/${imageEx})`;
}, 4000);
