const buttonContainer = document.getElementById("buttons-container");
const closeBtn = document.getElementById("close-btn");
const gameWindow = document.getElementById("game-window");
const myScore = document.getElementById("your-score");
const compScore = document.getElementById("computer-score");
const display = document.getElementById("display-output");
const resetBtn = document.getElementById("reset-btn");
const allBtns = document.querySelectorAll("button");

function computerChoice() {
  const gameInfo = ["🪨", "📃", "✂️"];
  const randomIndex = Math.floor(Math.random() * 3);
  return gameInfo[randomIndex];
}

let playerScore = 0;
let computerScore = 0;

function playGame(you, computer) {
  if (you === computer) {
    return `You: ${you} VS Enemy: ${computer}: Its a Tie`;
  } else if (
    (you === "🪨" && computer === "✂️") ||
    (you === "✂️" && computer === "📃") ||
    (you === "📃" && computer === "🪨")
  ) {
    playerScore++;
    myScore.textContent = playerScore;
    return `You: ${you} VS Enemy: ${computer}: You Won`;
  } else {
    computerScore++;
    compScore.textContent = computerScore;
    return `You: ${you} VS Enemy: ${computer}: You Lose`;
  }
}

buttonContainer.addEventListener("click", (e) => {
  const playerSelection = e.target; // get the clicked button
  const computerSelection = computerChoice();
  new Audio("sfx.mp3").play();

  // Disable all buttons
  allBtns.forEach((button) => (button.disabled = true));

  display.textContent = "3";
  setTimeout(() => {
    display.textContent = "2";
  }, 1000);
  setTimeout(() => {
    display.textContent = "1";
  }, 2000);

  setTimeout(() => {
    display.textContent = playGame(playerSelection.id, computerSelection);

    // Re-enable all buttons after 3 seconds
    setTimeout(() => {
      allBtns.forEach((button) => (button.disabled = false));
    }, 500); // Re-enable after 3 seconds, not 500ms
  }, 3000);
});

resetBtn.addEventListener("click", () => {
  if (display.textContent) {
    playerScore = 0;
    computerScore = 0;
    myScore.textContent = 0;
    compScore.textContent = 0;
    display.textContent = "Game Reset!";

    setTimeout(() => {
      display.textContent = "";
    }, 1000);
  }
});
