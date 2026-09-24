const usernameInput = document.querySelector("#username");
const errorMessage = document.querySelector("#error-message");

const startInvestigation = (event) => {
  event.preventDefault();
  const username = usernameInput.value.trim();

  if (username === "") {
    errorMessage.textContent = "Debes introducir un nombre de investigador.";
    return;
  }

  localStorage.setItem("username", username);
  window.location.href = "./src/pages/menu.html";
};

document.querySelector("#username-form").addEventListener("submit", startInvestigation);
