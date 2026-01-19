const track = document.querySelector(".track");
const slides = document.querySelectorAll(".slide");

let index = 0;

document.getElementById("next-btn").onclick = () => {
    index++;
    if (index >= slides.length) index = 0;
    track.style.transform = "translateX(-" + index * 100 + "%)";
};

document.getElementById("prev-btn").onclick = () => {
    index--;
    if (index < 0) index = slides.length - 1;
    track.style.transform = "translateX(-" + index * 100 + "%)";
};

fetch("./photos.json")
    .then(res => res.json())
    .then(data => {
        const photos = data.items;
    
        const authors = [...new Set(
            photos.map(p => p.author)
        )];
    });
