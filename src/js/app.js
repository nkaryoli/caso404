import {
  loadQuestions,
  showQuestion,
  initGame,
  restartGame,
  checkCurrentAnswer,
} from "./juego.js";

const usernameInput = document.querySelector("#username");
const logoutButton = document.querySelector("#logout-button");
const startButton = document.querySelector("#start-button");
const errorMessage = document.querySelector("#error-message");
const playerInfo = document.querySelector("#player-info");
const playerName = document.querySelector("#player-name");

const homeScreen = document.querySelector("#home");
const gameScreen = document.querySelector("#game");
const navbar = document.querySelector("#navbar");

// Game DOM
const questionsList = document.querySelector("#questions-list");
const resultsModal = document.querySelector("#results-modal");
const resultsTitle = document.querySelector("#results-title");
const resultsSubtitle = document.querySelector("#results-subtitle");
const totalQuestions = document.querySelector("#total-questions");
const correctAnswers = document.querySelector("#correct-answers");
const wrongAnswers = document.querySelector("#wrong-answers");
const accuracy = document.querySelector("#accuracy");
const restartButton = document.querySelector("#restart-button");
const progressFill = document.querySelector("#progress-fill");
const progressText = document.querySelector("#progress-text");

const globalCheckButton = document.querySelector("#global-check-button");
const globalGameMessage = document.querySelector("#global-game-message");

const launchConfetti = () => {
  if (typeof window.confetti !== "function") {
    return;
  }

  window.confetti({
    particleCount: 140,
    spread: 80,
    startVelocity: 32,
    ticks: 260,
    gravity: 0.95,
    origin: { y: 0.72 },
    colors: ["#1bd9c4", "#ffffff", "#0393a3", "#7cf7e9", "#ffcf5a"],
    scalar: 1.05,
    zIndex: 1100,
  });

  window.confetti({
    particleCount: 70,
    spread: 55,
    startVelocity: 22,
    ticks: 220,
    gravity: 0.85,
    origin: { y: 0.6 },
    colors: ["#1bd9c4", "#ffffff"],
    scalar: 0.9,
    zIndex: 1100,
  });
};

const updateProgress = ({ current, total, percent }) => {
  if (progressFill) {
    progressFill.style.width = `${percent}%`;
  }

  if (progressText) {
    progressText.textContent = `PROGRESO ${current} / ${total}`;
  }
};

const handleShowQuestion = (card, progress) => {
  questionsList.appendChild(card);
  if (progress) {
    updateProgress(progress);
  }
  if (globalCheckButton) {
    globalCheckButton.disabled = false;
    globalGameMessage.textContent = "";
    globalCheckButton.classList.remove("hidden");
    globalCheckButton.classList.remove("pulse-glow");
  }
};

const handleGameOver = (stats) => {
  totalQuestions.textContent = stats.total;
  correctAnswers.textContent = stats.correct;
  wrongAnswers.textContent = stats.wrong;
  accuracy.textContent = `${stats.accuracy}%`;

  if (stats.victory) {
    resultsTitle.textContent = "CASO RESUELTO";
    resultsSubtitle.textContent =
      "Has superado todas las pruebas. El servidor ha sido localizado.";
    resultsModal.classList.add("victory");
    launchConfetti();
  } else {
    resultsTitle.textContent = "CASO PERDIDO";
    resultsSubtitle.textContent =
      "La investigación ha terminado antes de completar todas las pruebas.";
    resultsModal.classList.remove("victory");
  }

  resultsModal.classList.remove("hidden");
  globalCheckButton.classList.add("hidden");
};

const login = (username) => {
  localStorage.setItem("username", username);
  playerName.innerHTML = ` Jugador: ${username}`;
  errorMessage.textContent = "";

  logoutButton.classList.remove("hidden");
  homeScreen.classList.add("hidden");
  gameScreen.classList.remove("hidden");
  navbar.classList.remove("hidden");
};

export const logout = () => {
  localStorage.removeItem("username");

  gameScreen.classList.add("hidden");
  homeScreen.classList.remove("hidden");
  logoutButton.classList.add("hidden");
  navbar.classList.add("hidden");

  usernameInput.value = "";
  // playerInfo.innerHTML = "";

  questionsList.innerHTML = "";
  globalGameMessage.textContent = "";
  globalCheckButton.classList.add("hidden");
  resultsModal.classList.remove("victory");
  resultsModal.classList.add("hidden");
  updateProgress({ current: 0, total: 0, percent: 0 });
};

const startInvestigation = () => {
  const username = usernameInput.value.trim();

  if (username === "") {
    errorMessage.textContent = "Debes introducir un nombre de investigador.";
    return;
  }

  login(username);
  restartGame();
};

const handleAnswerSelected = () => {
  globalCheckButton.classList.add("pulse-glow");
};

initGame({
  onShowQuestion: handleShowQuestion,
  onGameOver: handleGameOver,
  onAnswerSelected: handleAnswerSelected,
});

startButton.disabled = true;

loadQuestions().then(() => {
  startButton.disabled = false;

  const username = localStorage.getItem("username");
  if (username) {
    login(username);
    showQuestion(); // loadQuestions prepares the game by default
  }
});

startButton.addEventListener("click", startInvestigation);

logoutButton.addEventListener("click", logout);

restartButton.addEventListener("click", () => {
  resultsModal.classList.add("hidden");
  resultsModal.classList.remove("victory");
  questionsList.innerHTML = "";
  globalGameMessage.textContent = "";
  globalCheckButton.classList.remove("hidden");
  restartGame();
});

globalCheckButton.addEventListener("click", () => {
  globalCheckButton.classList.remove("pulse-glow");

  const result = checkCurrentAnswer();
  if (result) {
    globalGameMessage.textContent = result.message;
    if (result.success) {
      globalCheckButton.disabled = true;
    }
  }
});
