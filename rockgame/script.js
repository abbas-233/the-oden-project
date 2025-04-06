// Test if JavaScript is linked correctly
console.log("Hello World");

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

function getHumanChoice() {
    const choice = prompt("Enter your choice (rock/paper/scissors):");
    return choice.toLowerCase();
}

function playGame() {
    let humanScore = 0;
    let computerScore = 0;

    function playRound(humanChoice, computerChoice) {
        humanChoice = humanChoice.toLowerCase();
        
        if (humanChoice === computerChoice) {
            console.log("It's a tie!");
            return;
        }

        if (
            (humanChoice === "rock" && computerChoice === "scissors") ||
            (humanChoice === "paper" && computerChoice === "rock") ||
            (humanChoice === "scissors" && computerChoice === "paper")
        ) {
            humanScore++;
            console.log(`You win! ${humanChoice} beats ${computerChoice}`);
        } else {
            computerScore++;
            console.log(`You lose! ${computerChoice} beats ${humanChoice}`);
        }
    }

    // Play 5 rounds
    for (let i = 0; i < 5; i++) {
        console.log(`\nRound ${i + 1}:`);
        const humanSelection = getHumanChoice();
        const computerSelection = getComputerChoice();
        console.log(`Your choice: ${humanSelection}`);
        console.log(`Computer's choice: ${computerSelection}`);
        playRound(humanSelection, computerSelection);
        console.log(`Score - You: ${humanScore}, Computer: ${computerScore}`);
    }

    // Announce final winner
    console.log("\nGame Over!");
    if (humanScore > computerScore) {
        console.log("Congratulations! You win the game!");
    } else if (computerScore > humanScore) {
        console.log("Computer wins the game!");
    } else {
        console.log("It's a tie game!");
    }
}

// Call the playGame function to start the game
playGame();

