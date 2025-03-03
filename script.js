// Tab Switching Logic
const tabButtons = document.querySelectorAll(".tab-button");
const tabContents = document.querySelectorAll(".tab-content");

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const tabId = button.getAttribute("data-tab");

    // Remove active class from all buttons and contents
    tabButtons.forEach((btn) => btn.classList.remove("active"));
    tabContents.forEach((content) => content.classList.remove("active"));

    // Add active class to the clicked button and corresponding content
    button.classList.add("active");
    document.getElementById(tabId).classList.add("active");
  });
});

// Favorites Logic
const favoriteButtons = document.querySelectorAll(".favorite-btn");
const favoritesGrid = document.getElementById("favorites-grid");

// Load favorites from localStorage
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

function updateFavoritesGrid() {
  favoritesGrid.innerHTML = "";
  favorites.forEach((gameId) => {
    const gameCard = document.querySelector(`.game-card[data-id="${gameId}"]`);
    if (gameCard) {
      const clonedCard = gameCard.cloneNode(true);
      const removeButton = document.createElement("button");
      removeButton.textContent = "❌ Remove";
      removeButton.classList.add("remove-btn");
      clonedCard.appendChild(removeButton);

      // Add remove functionality
      removeButton.addEventListener("click", () => {
        favorites = favorites.filter((id) => id !== gameId);
        localStorage.setItem("favorites", JSON.stringify(favorites));
        updateFavoritesGrid();
      });

      favoritesGrid.appendChild(clonedCard);
    }
  });
}

favoriteButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const gameCard = button.closest(".game-card");
    const gameId = gameCard.getAttribute("data-id");

    if (!favorites.includes(gameId)) {
      favorites.push(gameId);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      updateFavoritesGrid();
    }
  });
});

// Load favorites on page load
updateFavoritesGrid();

// Redirect to Game Page
const gameCards = document.querySelectorAll(".game-card");
gameCards.forEach((card) => {
  card.addEventListener("click", (e) => {
    // Prevent redirect if the favorite button is clicked
    if (e.target.classList.contains("favorite-btn")) return;

    const folder = card.getAttribute("data-folder");
    if (folder) {
      window.location.href = `${folder}/index.html`;
    }
  });
});

// Light/Dark Mode Toggle
const themeToggle = document.getElementById("theme-toggle");
const currentTheme = localStorage.getItem("theme") || "dark";

// Set initial theme
document.documentElement.setAttribute("data-theme", currentTheme);
themeToggle.checked = currentTheme === "light";

themeToggle.addEventListener("change", () => {
  const newTheme = themeToggle.checked ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
});

// Font Size Selector
const fontSizeSelect = document.getElementById("font-size");
const savedFontSize = localStorage.getItem("fontSize") || "medium";

fontSizeSelect.value = savedFontSize;
document.body.style.fontSize = savedFontSize === "small" ? "14px" : savedFontSize === "medium" ? "16px" : "18px";

fontSizeSelect.addEventListener("change", () => {
  const newSize = fontSizeSelect.value;
  document.body.style.fontSize = newSize === "small" ? "14px" : newSize === "medium" ? "16px" : "18px";
  localStorage.setItem("fontSize", newSize);
});