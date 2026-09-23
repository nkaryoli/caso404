import { shuffleArray } from "./utils.js";

let qNumber = 5;

let onShowQuestionCallback = null;
let onGameOverCallback = null;
let onAnswerSelectedCallback = null;

export const initGame = ({ onShowQuestion, onGameOver, onAnswerSelected }) => {
  onShowQuestionCallback = onShowQuestion;
  onGameOverCallback = onGameOver;
  onAnswerSelectedCallback = onAnswerSelected;
};

const state = {
  allQuestions: [],
  gameQuestions: [],
  currentQuestionIndex: 0,
  correctAnswersCount: 0,
  selectedAnswerIndex: null,
  currentCardElement: null,
};

// ------------------- Preparation ---------------------------------------
export const loadQuestions = async () => {
  try {
    const questionsUrl = new URL("../data/preguntas.json", import.meta.url);
    const response = await fetch(questionsUrl);

    if (!response.ok) {
      throw new Error("No se han podido cargar las preguntas");
    }

    state.allQuestions = await response.json();

    console.log("Preguntas cargadas:", state.allQuestions);
    console.log("Número de preguntas:", state.allQuestions.length);

    prepareGame();
  } catch (error) {
    console.log(error.message);
  }
};

const prepareGame = () => {
  state.gameQuestions = shuffleArray(state.allQuestions)
    .slice(0, qNumber)
    .map((question) => {
      return {
        ...question,
        answers: shuffleArray(question.answers),
      };
    });

  state.currentQuestionIndex = 0;
  state.correctAnswersCount = 0;

  console.log("Preguntas de esta partida:");
  console.log(state.gameQuestions);
};

// -------------  Game Start --------------------------------
export const showQuestion = () => {
  const question = state.gameQuestions[state.currentQuestionIndex];
  state.selectedAnswerIndex = null;
  const progressPercent = Math.round(
    ((state.currentQuestionIndex + 1) / state.gameQuestions.length) * 100,
  );

  const questionCard = document.createElement("div");

  questionCard.classList.add("question-card");

  questionCard.innerHTML = `
        <div class="question-counter">
          <span class="question-number">${state.currentQuestionIndex + 1} </span>
          / 
          <span>${state.gameQuestions.length}</span>
        </div>
        <!--<p class="question-category"> ${question.category} </p>-->
        <h2 class="question-text"> ${question.question} </h2>
        <div class="answers-container"></div>
    `;

  state.currentCardElement = questionCard;

  if (onShowQuestionCallback) {
    onShowQuestionCallback(questionCard, {
      current: state.currentQuestionIndex + 1,
      total: state.gameQuestions.length,
      percent: progressPercent,
    });
  }

  const answersContainer = questionCard.querySelector(".answers-container");

  question.answers.forEach((answer, index) => {
    const answerButton = document.createElement("button");
    const options = ["a", "b", "c", "d"];

    answerButton.innerHTML = `<span class="option-icon">${options[index]}</span> <p class="optcion">${answer.text}</p>`;
    answerButton.classList.add("answer");
    answerButton.dataset.index = index;
    answerButton.addEventListener("click", () =>
      selectAnswer(answerButton, answersContainer),
    );

    answersContainer.appendChild(answerButton);
  });
};

const selectAnswer = (button, answersContainer) => {
  const buttons = answersContainer.querySelectorAll(".answer");

  buttons.forEach((btn) => {
    btn.classList.remove("selected");
  });

  button.classList.add("selected");

  state.selectedAnswerIndex = Number(button.dataset.index);

  if (onAnswerSelectedCallback) {
    onAnswerSelectedCallback();
  }
};

export const checkCurrentAnswer = () => {
  if (state.selectedAnswerIndex === null) {
    return { success: false, message: "Debes seleccionar una respuesta." };
  }

  const question = state.gameQuestions[state.currentQuestionIndex];
  const answer = question.answers[state.selectedAnswerIndex];

  // Find the selected button element
  const buttons = state.currentCardElement.querySelectorAll(".answer");
  let selectedBtn = null;
  buttons.forEach((btn) => {
    if (Number(btn.dataset.index) === state.selectedAnswerIndex) {
      selectedBtn = btn;
    }
  });

  let resultMessage = "";

  if (answer.correct) {
    state.correctAnswersCount++;
    resultMessage = "✓ CORRECTO. Has superado esta prueba.";
    state.currentCardElement.classList.add("correct");
    if (selectedBtn) selectedBtn.classList.add("correct");
  } else {
    resultMessage = "✕ INCORRECTO.";
    state.currentCardElement.classList.add("wrong");
    if (selectedBtn) selectedBtn.classList.add("wrong");
  }

  buttons.forEach((button) => {
    button.disabled = true;
  });
  state.currentCardElement.classList.add("completed");

  state.currentQuestionIndex++;

  if (state.currentQuestionIndex < state.gameQuestions.length) {
    setTimeout(() => {
      showQuestion();
    }, 800);
  } else {
    console.log("Partida terminada.");
    setTimeout(() => {
      if (onGameOverCallback) {
        onGameOverCallback({
          total: state.gameQuestions.length,
          correct: state.correctAnswersCount,
          wrong: state.gameQuestions.length - state.correctAnswersCount,
          accuracy: Math.round(
            (state.correctAnswersCount / state.gameQuestions.length) * 100,
          ),
          victory: state.correctAnswersCount === state.gameQuestions.length,
        });
      }
    }, 800);
  }

  return { success: true, isCorrect: answer.correct, message: resultMessage };
};

export const restartGame = () => {
  prepareGame();
  showQuestion();
};
