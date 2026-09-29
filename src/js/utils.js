export const shuffleArray = (array) => {
	return [...array].sort(() => Math.random() - 0.5);
};

export const getStoredUsername = () => localStorage.getItem("username");

export const getCompletedCategories = (username) => {
	const data = localStorage.getItem(`completed_${username}`);
	return data ? JSON.parse(data) : [];
};

export const addCompletedCategory = (username, category) => {
	const completed = getCompletedCategories(username);
	if (!completed.includes(category)) {
		completed.push(category);
		localStorage.setItem(`completed_${username}`, JSON.stringify(completed));
	}
};

export const clearUserSession = () => {
	localStorage.removeItem("username");
	sessionStorage.removeItem("gameStats");
};

export const setupLogoutButton = (redirectPath = "../../index.html") => {
	const logoutButton = document.querySelector("#logout-button");

	if (!logoutButton) {
		return;
	}

	logoutButton.addEventListener("click", () => {
		clearUserSession();
		window.location.href = redirectPath;
	});
};

export const launchConfetti = () => {
	if (typeof window.confetti !== "function") {
		console.warn("Confetti library is not available.");
		return;
	}

	const confettiOptions = {
		spread: 80,
		startVelocity: 32,
		ticks: 260,
		gravity: 0.95,
		colors: ["#1bd9c4", "#ffffff", "#ffdd00"],
		zIndex: 1100,
	};

	window.confetti({
		...confettiOptions,
		particleCount: 140,
		origin: { y: 0.72 },
	});

	window.confetti({
		...confettiOptions,
		particleCount: 70,
		spread: 55,
		startVelocity: 22,
		origin: { y: 0.6 },
	});
};
