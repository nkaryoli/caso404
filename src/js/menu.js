import { getStoredUsername, setupLogoutButton, getCompletedCategories } from "./utils.js";

const username = getStoredUsername();

if (!username) {
	window.location.href = "../../index.html";
} else {
	document.querySelector("#player-name").textContent = `Jugador: ${username}`;
	document.querySelector("#player-greeting").textContent = username;

	const completedCategories = getCompletedCategories(username);
	const categoryCards = document.querySelectorAll(".category-card");

	categoryCards.forEach(card => {
		const url = new URL(card.href);
		const category = url.searchParams.get("category");
		if (completedCategories.includes(category)) {
			card.classList.add("completed");
		}
	});
}

setupLogoutButton();
