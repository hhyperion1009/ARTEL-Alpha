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

fetch("./blog.json")
    .then(res => res.json())
    .then(data => {
        const ul = document.getElementById("blog-ul");

        data.posts.forEach(p => {
            fetch("./blog/" + p.file + ".md")
                .then(res => res.text())
                .then(md => {
                    const meta = extractFM(md);
                
                    const li = document.createElement("li");
                
                    li.innerHTML =
                        '<a href="post.html?slug=' + p.file + '">' +
                            '<img src="./assets/images/' + meta.cover + '" class="blog-img">' +
                            '<div class="blog-title">' +
                                '<strong>' + meta.title + '</strong>' +
                            '</div>' +
                        '</a>';
                
                    ul.appendChild(li);
                });
        });
    });