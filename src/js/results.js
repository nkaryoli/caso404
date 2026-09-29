import { getStoredUsername, launchConfetti, setupLogoutButton } from "./utils.js";

const username = getStoredUsername();
const stats = JSON.parse(sessionStorage.getItem("gameStats") || "null");

if (!username || !stats) {
  window.location.href = "../pages/menu.html";
} else {
  document.querySelector("#player-name").textContent = `Jugador: ${username}`;
  document.querySelector("#total-questions").textContent = stats.total;
  document.querySelector("#correct-answers").textContent = stats.correct;
  document.querySelector("#wrong-answers").textContent = stats.wrong;
  document.querySelector("#accuracy").textContent = `${stats.accuracy}%`;
  document.querySelector("#results-title").textContent = stats.victory
    ? "¡VICTORIA!"
    : "DERROTA";
  document.querySelector("#results-subtitle").textContent = stats.victory
    ? "Has superado la categoría con éxito. ¡Eres un maestro de la Arena!"
    : "Has fallado. Tu participación en esta ronda ha terminado.";

  if (stats.victory) {
    document.body.classList.add("victory");
    launchConfetti();
  }
}

setupLogoutButton();

document.querySelector("#restart-button").addEventListener("click", () => {
  sessionStorage.removeItem("gameStats");
  window.location.href = "../pages/menu.html";
});