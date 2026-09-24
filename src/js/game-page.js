import {
  checkCurrentAnswer,
  initGame,
  loadQuestions,
  restartGame,
  showQuestion,
} from "./juego.js";

const username = localStorage.getItem("username");
const questionsList = document.querySelector("#questions-list");
const checkButton = document.querySelector("#global-check-button");
const resultsModal = document.querySelector("#results-modal");

if (!username) {
  window.location.href = "./index.html";
}

document.querySelector("#player-name").textContent = `Jugador: ${username}`;

document.querySelector("#logout-button").addEventListener("click", () => {
  localStorage.removeItem("username");
  window.location.href = "../../index.html";
});

const handleShowQuestion = (card, progress) => {
  questionsList.classList.toggle("single-question", progress.current === 1);
  questionsList.appendChild(card);
  checkButton.disabled = false;
  checkButton.classList.remove("hidden", "pulse-glow");
};

const handleGameOver = (stats) => {
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

  resultsModal.classList.toggle("victory", stats.victory);
  resultsModal.classList.remove("hidden");
  checkButton.classList.add("hidden");

  if (stats.victory) {
    window.confetti?.({
      particleCount: 140,
      spread: 80,
      startVelocity: 32,
      colors: ["#1bd9c4", "#ffffff", "#ffdd00"],
    });
  }
};

initGame({
  onShowQuestion: handleShowQuestion,
  onGameOver: handleGameOver,
  onAnswerSelected: () => checkButton.classList.add("pulse-glow"),
});

checkButton.addEventListener("click", () => {
  checkButton.classList.remove("pulse-glow");
  const result = checkCurrentAnswer();

  if (result.success) {
    checkButton.disabled = true;
  }
});

const category = new URLSearchParams(window.location.search).get("category") || "all";

loadQuestions(category).then((hasQuestions) => {
  if (!hasQuestions) {
    window.location.href = "./src/pages/menu.html";
    return;
  }
  showQuestion();
});

document.querySelector("#restart-button").addEventListener("click", () => {
  resultsModal.classList.add("hidden");
  resultsModal.classList.remove("victory");
  questionsList.innerHTML = "";
  questionsList.classList.add("single-question");
  checkButton.classList.remove("hidden");
  restartGame();
});