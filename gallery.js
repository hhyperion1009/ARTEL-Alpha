const params = new URLSearchParams(window.location.search);
const filter = params.get("filter");

fetch("./photos.json")
    .then(res => res.json())
    .then(photos => {
        const gallery = document.getElementById("gallery");
        gallery.innerHTML = '';
    
        let hasPhoto = false;
    
        photos.items.forEach(photo => {
            if (filter !== "none" && photo.type !== filter) return;
        
            hasPhoto = true;
            
            const card = document.createElement("div");
            card.className = "card";

            card.innerHTML = 
                '<img src="./assets/images/' + photo.id + '.webp" alt="' + photo.title + '">' +
                '<div class="card-body">' +
                    '<div class="card-title">' +
                        '<p><strong>"' + photo.title + '"</strong></p>' +
                    '</div>' +
                    '<div class="card-author">' +
                        '<p><em>' + photo.author + '</em></p>' +
                    '</div>' +
                    '<div class="card-price">' +
                        '<p><strong><em>£' + photo.price + '</em></strong></p>' +
                    '</div>' +
                '</div>';

            card.onclick = () => {
                window.location.href = `shop.html?id=${photo.id}`;
            };

            gallery.appendChild(card);
        });
    
        if (!hasPhoto) {
            gallery.innerHTML = '<p class="empty"><strong>Không có tác phẩm phù hợp</strong></p>';
        }
    
    });
