import { getStoredUsername, setupLogoutButton } from "./utils.js";

const username = getStoredUsername();

if (!username) {
	window.location.href = "../../index.html";
} else {
	document.querySelector("#player-name").textContent = `Jugador: ${username}`;
	document.querySelector("#player-greeting").textContent = username;
}

setupLogoutButton();
