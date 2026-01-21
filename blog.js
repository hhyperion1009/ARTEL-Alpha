const ITEMS_PER_PAGE = 9;

const params = new URLSearchParams(window.location.search);
let currentPage = Number(params.get("page")) || 1;

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

function renderBlog(items) {
    const ul = document.getElementById("blog-ul");
    ul.innerHTML = "";

    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;

    items.slice(start, end).forEach(item => {
        fetch("./blog/" + item.file + ".md")
            .then(res => res.text())
            .then(md => {
                const meta = extractFM(md);
                
                const li = document.createElement("li");
                
                li.innerHTML =
                    '<a href="post.html?slug=' + item.file + '">' +
                        '<div class="thumb">' +
                            '<img src="./assets/images/' + meta.cover + '" class="blog-img">' +
                        '</div>' +
                        '<div class="blog-title">' +
                            '<strong>' + meta.title + '</strong>' +
                        '</div>' +
                    '</a>';
                
                ul.appendChild(li);
            });
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

        /* jshint loopfunc:true */
        btn.onclick = () => {
            currentPage = i;
            renderBlog(items);
            renderPagination(items);
            params.set("page", i);
            history.pushState({}, "", "?" + params);
        };

        pagination.appendChild(btn);
    }
}

fetch("./blog.json")
    .then(res => res.json())
    .then(data => {
        renderBlog(data.posts);
        renderPagination(data.posts);
    });