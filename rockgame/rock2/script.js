// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Get DOM elements
    const rockBtn = document.getElementById('rock');
    const paperBtn = document.getElementById('paper');
    const scissorsBtn = document.getElementById('scissors');
    const resetBtn = document.getElementById('reset');
    const resultDiv = document.getElementById('result');
    const playerScoreSpan = document.getElementById('player-score');
    const computerScoreSpan = document.getElementById('computer-score');
    const winnerDiv = document.getElementById('winner');
    const gameLogDiv = document.getElementById('game-log');
    const playerMoveDiv = document.getElementById('player-move');
    const computerMoveDiv = document.getElementById('computer-move');

    // Game state
    let playerScore = 0;
    let computerScore = 0;
    const winningScore = 5;

    // Function to get computer's choice
    function getComputerChoice() {
        const choices = ['rock', 'paper', 'scissors'];
        const randomIndex = Math.floor(Math.random() * 3);
        return choices[randomIndex];
    }

    // Function to update move icons
    function updateMoveIcons(playerSelection, computerSelection) {
        const playerIcon = playerMoveDiv.previousElementSibling;
        const computerIcon = computerMoveDiv.previousElementSibling;

        // Update player icon
        playerIcon.className = `fas fa-hand-${playerSelection}`;
        playerMoveDiv.textContent = 'Your Move';

        // Update computer icon
        computerIcon.className = `fas fa-hand-${computerSelection}`;
        computerMoveDiv.textContent = "Computer's Move";

        // Add pulse animation
        playerIcon.classList.add('pulse');
        computerIcon.classList.add('pulse');

        // Remove pulse animation after 1 second
        setTimeout(() => {
            playerIcon.classList.remove('pulse');
            computerIcon.classList.remove('pulse');
        }, 1000);
    }

    // Function to play a single round
    function playRound(playerSelection, computerSelection) {
        // Convert to lowercase for case-insensitive comparison
        playerSelection = playerSelection.toLowerCase();
        
        // Update move icons
        updateMoveIcons(playerSelection, computerSelection);
        
        // Add game log entry
        const logEntry = document.createElement('div');
        logEntry.className = 'log-entry';
        logEntry.textContent = `Player: ${playerSelection} | Computer: ${computerSelection}`;
        gameLogDiv.appendChild(logEntry);
        gameLogDiv.scrollTop = gameLogDiv.scrollHeight;

        // Determine the winner
        if (playerSelection === computerSelection) {
            return "It's a tie!";
        }

        if (
            (playerSelection === 'rock' && computerSelection === 'scissors') ||
            (playerSelection === 'paper' && computerSelection === 'rock') ||
            (playerSelection === 'scissors' && computerSelection === 'paper')
        ) {
            playerScore++;
            return `You Win! ${playerSelection} beats ${computerSelection}`;
        } else {
            computerScore++;
            return `You Lose! ${computerSelection} beats ${playerSelection}`;
        }
    }

    // Function to update the score display
    function updateScore() {
        playerScoreSpan.textContent = playerScore;
        computerScoreSpan.textContent = computerScore;
    }

    // Function to check for game winner
    function checkWinner() {
        if (playerScore >= winningScore) {
            winnerDiv.textContent = 'Congratulations! You won the game!';
            disableButtons();
            showResetButton();
        } else if (computerScore >= winningScore) {
            winnerDiv.textContent = 'Game Over! Computer won the game!';
            disableButtons();
            showResetButton();
        }
    }

    // Function to disable buttons when game is over
    function disableButtons() {
        rockBtn.disabled = true;
        paperBtn.disabled = true;
        scissorsBtn.disabled = true;
    }

    // Function to enable buttons
    function enableButtons() {
        rockBtn.disabled = false;
        paperBtn.disabled = false;
        scissorsBtn.disabled = false;
    }

    // Function to show reset button
    function showResetButton() {
        resetBtn.style.display = 'block';
    }

    // Function to hide reset button
    function hideResetButton() {
        resetBtn.style.display = 'none';
    }

    // Function to reset the game
    function resetGame() {
        playerScore = 0;
        computerScore = 0;
        updateScore();
        resultDiv.textContent = 'Choose your move to start the game!';
        winnerDiv.textContent = '';
        gameLogDiv.innerHTML = '';
        enableButtons();
        hideResetButton();
        
        // Reset move displays
        playerMoveDiv.textContent = 'Your Move';
        computerMoveDiv.textContent = "Computer's Move";
        const playerIcon = playerMoveDiv.previousElementSibling;
        const computerIcon = computerMoveDiv.previousElementSibling;
        playerIcon.className = 'fas fa-hand-rock';
        computerIcon.className = 'fas fa-hand-scissors';
    }

    // Function to handle button clicks
    function handleClick(playerSelection) {
        const computerSelection = getComputerChoice();
        const result = playRound(playerSelection, computerSelection);
        
        resultDiv.textContent = result;
        updateScore();
        checkWinner();
    }

    // Add event listeners to buttons
    rockBtn.addEventListener('click', () => handleClick('rock'));
    paperBtn.addEventListener('click', () => handleClick('paper'));
    scissorsBtn.addEventListener('click', () => handleClick('scissors'));
    resetBtn.addEventListener('click', resetGame);

    // Hide reset button initially
    hideResetButton();
}); 