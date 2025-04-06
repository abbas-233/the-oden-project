// Remove GUI elements and adapt the game for console-only play
console.log("Welcome to Rock Paper Scissors!");

let humanScore = 0;
let computerScore = 0;
let roundsPlayed = 0;

function updateScore() {
    console.log(`Score - You: ${humanScore}, Computer: ${computerScore}`);
}

function updateRoundResult(message) {
    console.log(message);
}

function updateFinalResult(message) {
    console.log(message);
}

function getComputerChoice() {
    const randomNum = Math.random();
    if (randomNum < 0.33) {
        return "rock";
    } else if (randomNum < 0.66) {
        return "paper";
    } else {
        return "scissors";
    }
}

function playRound(humanChoice) {
    const computerChoice = getComputerChoice();

    if (humanChoice === computerChoice) {
        updateRoundResult("It's a tie!");
    } else if (
        (humanChoice === "rock" && computerChoice === "scissors") ||
        (humanChoice === "paper" && computerChoice === "rock") ||
        (humanChoice === "scissors" && computerChoice === "paper")
    ) {
        humanScore++;
        updateRoundResult(`You win! ${humanChoice} beats ${computerChoice}`);
    } else {
        computerScore++;
        updateRoundResult(`You lose! ${computerChoice} beats ${humanChoice}`);
    }

    updateScore();
    roundsPlayed++;

    if (roundsPlayed === 5) {
        if (humanScore > computerScore) {
            updateFinalResult("Congratulations! You win the game!");
        } else if (computerScore > humanScore) {
            updateFinalResult("Computer wins the game!");
        } else {
            updateFinalResult("It's a tie game!");
        }
    }
}

function startGame() {
    while (roundsPlayed < 5) {
        const humanChoice = prompt("Enter your choice (rock, paper, or scissors):").toLowerCase();
        if (humanChoice !== "rock" && humanChoice !== "paper" && humanChoice !== "scissors") {
            console.log("Invalid choice. Please enter rock, paper, or scissors.");
            continue;
        }
        playRound(humanChoice);
    }
}

startGame();

