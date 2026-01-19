function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

const cart = getCart();
const ul = document.getElementById("cart-list");
const totalEl = document.getElementById("cart-total");
const vndEl = document.getElementById("vnd-exchange");

ul.innerHTML = "";

let total = 0;

if (cart.length === 0) {
    ul.innerHTML = "<li><a href='gallery.html?filter=none'><strong>Your Cart is emtpy! Go buy something?</strong></a></li>";
    totalEl.innerHTML = '';
    vndEl.innerHTML = '';
} else {
    cart.forEach(item => {
        total += item.price;
    
        const li = document.createElement("li");
        li.innerHTML =
            '<img src="' + item.image + '">' +
            '<div class="info">' +
                '<strong>' + item.title + '</strong><br>' +
                '<em>Giá: £' + item.price.toLocaleString() + '</em>' +
            '</div>' +
            '<button data-id="' + item.id + '" class="remove">✕</button>';
        
        ul.appendChild(li);
    });
}

totalEl.innerHTML = "<strong>Tổng: £" + total.toLocaleString() + "</strong>";
vndEl.innerHTML = "<em>≈ " + (total * 35145.56).toLocaleString() + "VNĐ</em>";

ul.addEventListener("click", e => {
    if (!e.target.classList.contains("remove")) return;

    const id = e.target.dataset.id;
    let cart = getCart();

    cart = cart.filter(item => item.id !== id);
    saveCart(cart);

    location.reload();
});
