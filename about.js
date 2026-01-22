const intro = document.getElementById("intro-img");
const vision = document.getElementById("vision-img");

const introImg = Math.floor(Math.random() * 30) + 1 + ".webp";
const visionImg = Math.floor(Math.random() * 30) + 1 + ".webp";

intro.innerHTML = '<img src="./assets/images/' + introImg + '" />';
vision.innerHTML = '<img src="./assets/images/' + visionImg + '" />';