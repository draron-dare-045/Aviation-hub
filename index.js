const API_URL = "https://aviation-news-backend-tocr-git-main-draron-dare-045s-projects.vercel.app/"; // Your backend URL
const defaultQuery = "aviation";
const newsContainer = document.getElementById("news-container");
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const categorySelect = document.getElementById("category-select");
const darkModeBtn = document.getElementById("dark-mode-btn");

// Fetch news from your backend
async function fetchNews(query = defaultQuery) {
    try {
        console.log("Fetching news for:", query);
        const response = await fetch(`${API_URL}?q=${encodeURIComponent(query)}`);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("API Response:", data); // Add this line for debugging

        if (!data || !data.articles || !Array.isArray(data.articles)) {
            throw new Error("Invalid API response format");
        }

        displayNews(data.articles);
    } catch (error) {
        console.error("Error fetching news:", error);
        newsContainer.innerHTML = "<p>Failed to load news. Try again later.</p>";
    }
}

// Display news articles on the page
function displayNews(articles) {
    newsContainer.innerHTML = ""; // Clear previous results

    if (articles.length === 0) {
        newsContainer.innerHTML = "<p>No news articles found.</p>";
        return;
    }

    articles.forEach(article => {
        const newsCard = document.createElement("div");
        newsCard.classList.add("news-card");

        // Safely extract image URL or fallback to default image
        const imageUrl = article.urlToImage || 'default.jpg';

        // Build the HTML for each article
        newsCard.innerHTML = `
            <img src="${imageUrl}" alt="News Image" onerror="this.src='default.jpg'">
            <h3>${article.title || "Untitled"}</h3>
            <p>${article.description || "No description available."}</p>
            <a href="${article.url || '#'}" target="_blank">Read more</a>
        `;

        // Append the news card to the container
        newsContainer.appendChild(newsCard);
    });
}

// Toggle dark mode
darkModeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    document.querySelectorAll(".news-card").forEach(card => card.classList.toggle("dark-mode"));
});

// Event listener for search button
searchBtn.addEventListener("click", () => {
    const query = searchInput.value.trim();
    fetchNews(query || defaultQuery);
});

// Event listener for category selection
categorySelect.addEventListener("change", (event) => {
    const category = event.target.value;
    fetchNews(category);
});

// Fetch default news on page load
document.addEventListener("DOMContentLoaded", () => {
    fetchNews();
});

