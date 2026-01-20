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
const ITEMS_PER_PAGE = 12;

const params = new URLSearchParams(window.location.search);
const filter = params.get("filter") ?? "none";

let currentPage = Number(params.get("page")) || 1;

function t(value) {
    return translate[value] || value;
}

function renderGallery(items) {
    const gallery = document.getElementById("gallery");
    gallery.innerHTML = "";

    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;

    items.slice(start, end).forEach(item => {
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
            window.location.href = `shop.html?id=${item.id}`;
        };
        
        gallery.appendChild(card);
    });
}

function renderPagination(items) {
    const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);
    const pagination = document.getElementById("pagination");
    pagination.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement("button");
        btn.textContent = i;

        if (i === currentPage) btn.classList.add("active");

        btn.onclick = () => {
            currentPage = i;
            renderGallery(items);
            renderPagination(items);
            params.set("page", i);
            history.pushState({}, "", "?" + params);
        };

        pagination.appendChild(btn);
    }
}


fetch("./photos.json")
    .then(res => res.json())
    .then(photos => {
        let hasPhoto = false;
    
        photos.items.forEach(photo => {
            if (filter !== "none" && photo.type !== filter) return;
            hasPhoto = true;
        });
    
        if (!hasPhoto) {
            const card = document.createElement("div");
            card.className = "card";

            card.innerHTML = 
                '<img src="./assets/artel-logo.png" />' +
                '<div class="card-body">' +
                    '<div class="painting-title">' +
                        '<p><strong>Không có tác phẩm!!!</strong></p>' +
                    '</div>' +
                    '<div class="painting-material">' +
                        '<p><em>Not Found!!!</em></p>' +
                    '</div>' +
                    '<div class="painting-size">' +
                        '<p><em>inf x inf km</em></p>' +
                    '</div>' +
                    '<div class="painting-price">' +
                        '<p><strong><em>null</em></strong></p>' +
                    '</div>' +
                '</div>';
            
            gallery.appendChild(card);
        } else {
            renderGallery(photos.items);
            renderPagination(photos.items);
        }    
    });
