const params = new URLSearchParams(window.location.search);
const slug = params.get("slug");

if (!slug) {
  document.body.innerHTML = "❌ Không có slug";
  throw new Error("No slug");
}

fetch("./blog/" + slug + ".md")
  .then(res => res.text())
  .then(md => {
    const match = md.match(/^---([\s\S]*?)---([\s\S]*)$/);

    let meta = {};
    let contentMd = md;

    if (match) {
      const metaRaw = match[1].trim();
      contentMd = match[2].trim();

      metaRaw.split("\n").forEach(line => {
        const [key, ...rest] = line.split(":");
        meta[key.trim()] = rest.join(":").trim();
      });
    }

    document.getElementById("post-title").textContent =
      meta.title || "No title";

    document.getElementById("post-content").innerHTML =
      marked.parse(contentMd);

    document.title = meta.title || "Post";
  })
  .catch(() => {
    document.body.innerHTML = "❌ Không load được bài viết";
  });
