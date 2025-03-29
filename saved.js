document.addEventListener("DOMContentLoaded", () => {
    const savedNewsContainer = document.getElementById("saved-news-container");

    function loadSavedArticles() {
        let savedArticles = JSON.parse(localStorage.getItem("savedArticles")) || [];

        if (savedArticles.length === 0) {
            savedNewsContainer.innerHTML = "<p>No saved articles yet.</p>";
            return;
        }

        savedNewsContainer.innerHTML = "";
        savedArticles.forEach(article => {
            const newsCard = document.createElement("div");
            newsCard.classList.add("news-card");

            newsCard.innerHTML = `
                <img src="${article.urlToImage || 'default.jpg'}" alt="News Image">
                <h3>${article.title}</h3>
                <p>${article.description || "No description available."}</p>
                <a href="${article.url}" target="_blank">Read More</a>
                <button class="remove-btn">Remove</button>
            `;

            newsCard.querySelector(".remove-btn").addEventListener("click", () => removeArticle(article));

            savedNewsContainer.appendChild(newsCard);
        });
    }

    function removeArticle(articleToRemove) {
        let savedArticles = JSON.parse(localStorage.getItem("savedArticles")) || [];
        savedArticles = savedArticles.filter(article => article.url !== articleToRemove.url);
        localStorage.setItem("savedArticles", JSON.stringify(savedArticles));
        loadSavedArticles();
    }

    loadSavedArticles();
});
