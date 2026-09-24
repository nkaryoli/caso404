const username = localStorage.getItem("username");
const stats = JSON.parse(sessionStorage.getItem("gameStats") || "null");

if (!username || !stats) {
  window.location.href = "./src/pages/menu.html";
} else {
  document.querySelector("#player-name").textContent = `Jugador: ${username}`;
  document.querySelector("#total-questions").textContent = stats.total;
  document.querySelector("#correct-answers").textContent = stats.correct;
  document.querySelector("#wrong-answers").textContent = stats.wrong;
  document.querySelector("#accuracy").textContent = `${stats.accuracy}%`;
  document.querySelector("#results-title").textContent = stats.victory
    ? "CASO RESUELTO"
    : "CASO PERDIDO";
  document.querySelector("#results-subtitle").textContent = stats.victory
    ? "Has superado todas las pruebas. El servidor ha sido localizado."
    : "La investigación ha terminado antes de completar todas las pruebas.";

  if (stats.victory) {
    document.body.classList.add("victory");
    window.confetti?.({
      particleCount: 140,
      spread: 80,
      startVelocity: 32,
      colors: ["#1bd9c4", "#ffffff", "#ffdd00"],
    });
  }
}

document.querySelector("#logout-button").addEventListener("click", () => {
  localStorage.removeItem("username");
  sessionStorage.removeItem("gameStats");
  window.location.href = "./index.html";
});

document.querySelector("#restart-button").addEventListener("click", () => {
  sessionStorage.removeItem("gameStats");
  window.location.href = "./src/menu.html";
});