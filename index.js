document.addEventListener("DOMContentLoaded", () => {
    const newsContainer = document.getElementById("news-container");
    const searchInput = document.getElementById("search-input");
    const searchBtn = document.getElementById("search-btn");
    const categorySelect = document.getElementById("category-select");
    const darkModeBtn = document.getElementById("dark-mode-btn");

    const API_BASE_URL = "https://my-app-backend-2lma.onrender.com/api/news"; 

    
    async function fetchNews(query = "aviation") {
        try {
            const response = await fetch(`${API_BASE_URL}?q=${query}`);
            const data = await response.json();
            displayNews(data.articles);
        } catch (error) {
            console.error("Error fetching news:", error);
        }
    }

    
    function displayNews(articles) {
        newsContainer.innerHTML = "";

        if (!articles || articles.length === 0) {
            newsContainer.innerHTML = "<p>No articles found.</p>";
            return;
        }

        articles.forEach(article => {
            const newsCard = document.createElement("div");
            newsCard.classList.add("news-card");

            newsCard.innerHTML = `
                <img src="${article.urlToImage || 'default.jpg'}" alt="News Image">
                <h3>${article.title}</h3>
                <p>${article.description || "No description available."}</p>
                <a href="${article.url}" target="_blank">Read More</a>
                <button class="save-btn">Save</button>
            `;

            newsCard.querySelector(".save-btn").addEventListener("click", () => saveArticle(article));

            newsContainer.appendChild(newsCard);
        });
    }

    
    function saveArticle(article) {
        let savedArticles = JSON.parse(localStorage.getItem("savedArticles")) || [];

        
        if (!savedArticles.some(saved => saved.url === article.url)) {
            savedArticles.push(article);
            localStorage.setItem("savedArticles", JSON.stringify(savedArticles));
            alert("Article saved!");
        } else {
            alert("Article already saved.");
        }
    }

    
    searchBtn.addEventListener("click", () => {
        const query = searchInput.value.trim();
        if (query) fetchNews(query);
    });

    
    categorySelect.addEventListener("change", () => {
        const query = categorySelect.value;
        fetchNews(query);
    });

    darkModeBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        document.querySelectorAll(".news-card").forEach(card => {
            card.classList.toggle("dark-mode");
        });

    
        localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
    });

    
    if (localStorage.getItem("darkMode") === "true") {
        document.body.classList.add("dark-mode");
    }


    fetchNews();
});
