const username = localStorage.getItem("username");

if (!username) {
	window.location.href = "./index.html";
} else {
	document.querySelector("#player-name").textContent = `Jugador: ${username}`;
	document.querySelector("#nombre-jugador").textContent = username;
}

document.querySelector("#logout-button").addEventListener("click", () => {
	localStorage.removeItem("username");
	sessionStorage.removeItem("gameStats");
	window.location.href = "../../index.html";
});
