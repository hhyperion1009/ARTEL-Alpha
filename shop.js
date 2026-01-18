const params = new URLSearchParams(window.location.search);
const id = params.get("id");

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

function t(value) {
    return translate[value] || value;
}

function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart() {
    if (!product) return;
    
    const cart = getCart();
    const existing = cart.find(item => item.id === product.id);

    if (existing) {
        alert("Tranh có trong giỏ rồi!");
        return;
    } else {
        cart.push({
            id: product.id,
            title: product.title,
            price: product.price,
            image: "./assets/images/" + product.id + ".webp"
        });
    }

    saveCart(cart);
    alert("Đã thêm vào giỏ 🛒");
}

let product = null;

fetch("./photos.json")
    .then(res => res.json())
    .then(data => {
        product = data.items.find(item => item.id === id);
        
        if (!product) {
            document.body.innerHTML = "❌ Product not found";
            throw new Error("Invalid Product ID!");
        }
        
        document.getElementById("art-img").src = "./assets/images/" + id + ".webp";
        document.getElementById("art-img").alt = product.title;
        document.getElementById("art-title").textContent = product.title;
        document.getElementById("art-author").innerHTML = "<em>" + product.author + "</em>";
        document.getElementById("art-price").innerHTML = "<strong><em>£" + product.price.toLocaleString() + "</em></strong>";
    
        const ul = document.getElementById("details");
    
        const rows = [
            ["Tên tác phẩm", product.title],
            ["Tác giả", product.author],
            [
                "Kích thước",
                `${product.size.width} × ${product.size.height} × ${product.size.depth} ${product.size.unit}`
            ],
            ["Chất liệu", t(product.material)],
            ["Phong cách", product.style.map(i => t(i)).join(", ")],
            ["Chủ thể", product.subject.map(i => t(i)).join(", ")]
            
        ];

        rows.forEach(([label, value]) => {
            const li = document.createElement("li");
            li.innerHTML = `<strong>${label}:</strong> ${value}`;
            ul.appendChild(li);
        });
    });
