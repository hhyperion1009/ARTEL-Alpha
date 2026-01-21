const translate = {
    "expressive": "Biểu cảm",
    "gestural": "Cử chỉ",
    "flowers": "Hoa",
    "plants": "Cây",
    "still-life": "Tĩnh vật",
    "surrealism": "Siêu thực",
    "framed": "Đã đóng khung",
    "unframed": "Chưa đóng khung",
    "figurative": "Con người",
    "portrait": "Chân dung",
    "photorealism": "Hiện thực ảnh",
    "organic": "Hữu cơ",
    "Oil": "Sơn dầu",
    "abstract": "Trừu tượng",
    "non-figurative": "Phi hình tượng",
    "acrylic": "Acrylic",
    "impressionistic": "Ấn tượng",
    "landscape": "Phong cảnh",
    "seascape": "Biển",
    "sky": "Bầu trời"
};

const track = document.querySelector(".track");
const slides = document.querySelectorAll(".slide");

function goToGallery() {
    window.location.href = "gallery.html";
}

function t(value) {
    return translate[value] || value;
}

function randomPainting(items, num) {
    return [...items].sort(() => 0.5 - Math.random()).slice(0, num);
}

function getRandomArtist(artists, num) {
    const shuffled = [...artists].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, num);
}

function renderArtists(artists) {
    const container = document.getElementById("random-artist");
    container.innerHTML = "";

    artists.forEach(artist => {
        const card = document.createElement("div");
        card.className = "artist-card";
        
        card.innerHTML = 
            '<div class="artist-images">' +
                artist.artworks.map(id => '<img src="./assets/images/' + id + '.webp" alt="' + artist.name + '"/>').join("") +
            '</div>' +
            '<h2>' + artist.name + '</h2>';
        
        card.onclick = () => {
            window.location.href = "gallery.html?author=" + encodeURIComponent(artist.name);
        };
        
        container.appendChild(card);
    });
}

function extractFM(md) {
    const match = md.match(/---([\s\S]*?)---/);
    if (!match) return {};
    
    const lines = match[1].trim().split("\n");
    const data = {};

    lines.forEach(line => {
        const [key, ...rest] = line.split(":");
        data[key.trim()] = rest.join(":").trim();
    });

    return data;
}

function getRandomBlogs(blogs, num) {
    return [...blogs].sort(() => 0.5 - Math.random()).slice(0, num);
}

function renderFeaturedBlogs(blogs) {
    const container = document.getElementById("random-blog");
    container.innerHTML = "";

    blogs.forEach(blog => {
        fetch("./blog/" + blog.file + ".md")
            .then(res => res.text())
            .then(data => {
                const meta = extractFM(data);
        
                const card = document.createElement("div");
                card.className = "blog-card";
        
                card.innerHTML = 
                    '<a href="post.html?slug=' + blog.file + '">' +
                        '<div class="thumb">' +
                            '<img src="./assets/images/' + meta.cover + '" class="blog-img">' +
                        '</div>' +
                        '<div class="blog-title">' +
                            '<strong>' + meta.title + '</strong>' +
                        '</div>' +
                    '</a>';
        
                container.appendChild(card);
            });
    });
}

function renderSummary(summary) {
    const div = document.getElementById("rating-summary");
    
    const sum = document.createElement("div");
    sum.className = "summary";

    sum.innerHTML = 
        '<div class="stars">' +
            '<i class="fa-solid fa-star"></i>'.repeat(4) +
            '<i class="fa-solid fa-star-half-stroke"></i>' +
        '</div>' +
        '<p class="rating-count">Dựa trên ' + summary.count + ' đánh giá</p>';
    
    div.appendChild(sum);
}

function renderReviews(reviews) {
    const div = document.getElementById("rating-list");

    reviews.forEach(r => {
        const card = document.createElement("div");
        card.className = "review-card";

        card.innerHTML = 
            '<div class="stars">' +
                '<i class="fa-solid fa-star"></i>'.repeat(r.stars) +
            '</div>' +
            '<p class="rating-text">' + r.text + '</p>' +
            '<p class="rating-author"><strong><em>' + r.author + '</em></strong></p>';

        div.appendChild(card);
  });
}

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
        const paintings = randomPainting(data.items, 4);
        const div = document.getElementById("random-painting");
        
        paintings.forEach(item => {
            const card = document.createElement("div");
            card.className = "card";

            card.innerHTML = 
                '<img src="./assets/images/' + item.id + '.webp" />' +
                '<div class="card-body">' +
                    '<div class="painting-title">' +
                        '<p><strong>"' + item.title + '"</strong></p>' +
                    '</div>' +
                    '<div class="painting-material">' +
                        '<p><em>Tranh ' + t(item.material) + '</em></p>' +
                    '</div>' +
                    '<div class="painting-size">' +
                        '<p><em>' + item.size.width + ' x ' + item.size.height + ' ' + item.size.unit + '</em></p>' +
                    '</div>' +
                    '<div class="painting-price">' +
                        '<p><strong><em>£' + item.price + '</em></strong></p>' +
                    '</div>' +
                '</div>';

            card.onclick = () => {
                window.location.href = 'shop.html?id=' + item.id;
            };
        
            div.appendChild(card);
        });
    });

fetch("./photos.json")
    .then(res => res.json())
    .then(data => {
        const artistMap = new Map();

        data.items.forEach(item => {
            if (!artistMap.has(item.author)) {
                artistMap.set(item.author, {
                    name: item.author,
                    artworks: []
                });
            }
        
        artistMap.get(item.author).artworks.push(item.id);
    });

        const artists = Array.from(artistMap.values());
    
        const selectedArtists = getRandomArtist(artists, 4);
        renderArtists(selectedArtists);
    });

fetch("./blog.json")
    .then(res => res.json())
    .then(data => {
        const blogs = data.posts;
    
        const selectedBlogs = getRandomBlogs(blogs, 4);
        renderFeaturedBlogs(selectedBlogs);
    });

fetch("./rating.json")
    .then(res => res.json())
    .then(data => {
        renderSummary(data.summary);
        renderReviews(data.reviews);
    });
