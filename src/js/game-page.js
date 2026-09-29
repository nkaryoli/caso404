import { checkCurrentAnswer, initGame, loadQuestions, showQuestion } from "./game.js";
import { getStoredUsername, launchConfetti, setupLogoutButton, addCompletedCategory } from "./utils.js";

const username = getStoredUsername();
const questionsList = document.querySelector("#questions-list");
const checkButton = document.querySelector("#global-check-button");
const resultsModal = document.querySelector("#results-modal");
const category = new URLSearchParams(window.location.search).get("category") || "all";

if (!username) {
  window.location.href = "../../index.html";
}

document.querySelector("#player-name").textContent = `Jugador: ${username}`;

setupLogoutButton();

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
    ? "¡VICTORIA!"
    : "DERROTA";
  document.querySelector("#results-subtitle").textContent = stats.victory
    ? "Has superado la categoría con éxito. ¡Eres un maestro de la Arena!"
    : "Has fallado. Tu participación en esta ronda ha terminado.";

  resultsModal.classList.toggle("victory", stats.victory);
  resultsModal.classList.remove("hidden");
  checkButton.classList.add("hidden");

  if (stats.victory) {
    addCompletedCategory(username, category);
    launchConfetti();
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



loadQuestions(category).then((hasQuestions) => {
  if (!hasQuestions) {
    window.location.href = "./menu.html";
    return;
  }
  showQuestion();
});

document.querySelector("#restart-button").addEventListener("click", () => {
  window.location.href = "./menu.html";
});