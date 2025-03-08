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

// Redirect to Game Page (Wrapper Logic)
const gameCards = document.querySelectorAll(".game-card");
gameCards.forEach((card) => {
  card.addEventListener("click", (e) => {
    // Prevent redirect if the favorite button is clicked
    if (e.target.classList.contains("favorite-btn")) return;

    const folder = card.getAttribute("data-folder");
    if (folder) {
      window.location.href = folder;
    }
  });
});

// Light/Dark Mode Toggle Logic
const themeToggle = document.getElementById("theme-toggle");
const savedTheme = localStorage.getItem("theme") || "dark";

// Set the initial theme
document.documentElement.setAttribute("data-theme", savedTheme);
themeToggle.checked = savedTheme === "dark";

// Toggle theme on switch change
themeToggle.addEventListener("change", () => {
  const newTheme = themeToggle.checked ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
});

// Panic Button Logic
const panicUrlInput = document.getElementById("panic-url");
const panicKeyInput = document.getElementById("panic-key");
const savePanicButton = document.getElementById("save-panic-button");

let panicUrl = localStorage.getItem("panicUrl") || "https://youtube.com";
let panicKey = localStorage.getItem("panicKey") || "m";

// Load saved panic button settings
panicUrlInput.value = panicUrl;
panicKeyInput.value = panicKey;

// Listen for keypress to bind panic key
panicKeyInput.addEventListener("click", () => {
  panicKeyInput.placeholder = "Press any key...";
  document.addEventListener("keydown", (e) => {
    panicKey = e.key;
    panicKeyInput.value = panicKey;
    document.removeEventListener("keydown", this);
  });
});

// Save panic button settings
savePanicButton.addEventListener("click", () => {
  panicUrl = panicUrlInput.value.trim();
  localStorage.setItem("panicUrl", panicUrl);
  localStorage.setItem("panicKey", panicKey);
  alert("Panic button settings saved!");
});

// Trigger panic button
document.addEventListener("keydown", (e) => {
  if (e.key === panicKey && panicUrl) {
    window.location.href = panicUrl;
  }
});

// King Von Mode Toggle Logic
const kingVonModeToggle = document.getElementById("king-von-mode");
const savedKingVonMode = localStorage.getItem("kingVonMode") === "true";

// Set the initial King Von Mode
document.body.classList.toggle("king-von-mode", savedKingVonMode);
kingVonModeToggle.checked = savedKingVonMode;

// Toggle King Von Mode on switch change
kingVonModeToggle.addEventListener("change", () => {
  const isKingVonMode = kingVonModeToggle.checked;
  document.body.classList.toggle("king-von-mode", isKingVonMode);
  localStorage.setItem("kingVonMode", isKingVonMode);
});