// Game Board Module
const GameBoard = (() => {
    let board = Array(9).fill('');
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    const getBoard = () => board;
    const setCell = (index, value) => {
        if (board[index] === '') {
            board[index] = value;
            return true;
        }
        return false;
    };
    const clearBoard = () => {
        board = Array(9).fill('');
    };
    const checkWinner = () => {
        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return {
                    winner: board[a],
                    winningCells: combination
                };
            }
        }
        return null;
    };
    const isBoardFull = () => board.every(cell => cell !== '');

    return {
        getBoard,
        setCell,
        clearBoard,
        checkWinner,
        isBoardFull
    };
})();

// Player Factory
const createPlayer = (name, marker) => {
    let score = 0;
    return {
        name,
        marker,
        getScore: () => score,
        incrementScore: () => score++
    };
};

// Game Controller Module
const GameController = (() => {
    let currentPlayerSign = 'roger'; // Roger always starts first
    let selectedPlayerSign = 'roger'; // Which sign the human player chose initially
    let humanSign = 'roger';
    let aiSign = 'whitebeard';
    let gameActive = false; // Game starts after first move
    let gameStarted = false; // Tracks if the first move has been made

    let scores = {
        roger: 0,
        whitebeard: 0,
        ties: 0
    };

    // --- Local Storage Functions ---
    const saveScoresToLocalStorage = () => {
        localStorage.setItem('ticTacToeScores', JSON.stringify(scores));
    };

    const loadScoresFromLocalStorage = () => {
        const savedScores = localStorage.getItem('ticTacToeScores');
        if (savedScores) {
            scores = JSON.parse(savedScores);
        } else {
            // Initialize if nothing is saved
            scores = { roger: 0, whitebeard: 0, ties: 0 };
        }
        DisplayController.updateScores(scores); // Update display with loaded/initial scores
    };
    // --- End Local Storage Functions ---

    const switchPlayer = () => {
        currentPlayerSign = currentPlayerSign === 'roger' ? 'whitebeard' : 'roger';
    };

    const updateScore = (winner) => {
        if (winner === 'roger') {
            scores.roger++;
        } else if (winner === 'whitebeard') {
            scores.whitebeard++;
        } else {
            scores.ties++;
        }
        DisplayController.updateScores(scores);
        saveScoresToLocalStorage(); // Save scores after updating
    };

    const handleCellClick = (event) => {
        if (!gameActive) return; // Ignore clicks if game isn't active (e.g., ended)

        // Start game on first click and disable player selection
        if (!gameStarted) {
            gameStarted = true;
            DisplayController.disablePlayerSelection(true);
        }

        const index = event.target.closest('.cell').dataset.index;
        if (GameBoard.setCell(index, currentPlayerSign)) {
            DisplayController.updateDisplay();
            const winnerInfo = GameBoard.checkWinner();
            if (winnerInfo) {
                gameActive = false;
                updateScore(winnerInfo.winner); 
                DisplayController.showResult(`${winnerInfo.winner === 'roger' ? 'Gold Roger' : 'Whitebeard'} wins!`, winnerInfo.winningCells);
            } else if (GameBoard.isBoardFull()) {
                gameActive = false;
                updateScore('tie'); // Update score for a tie
                DisplayController.showResult("It's a Draw!");
            } else {
                switchPlayer();
                DisplayController.updateCurrentPlayerDisplay(currentPlayerSign);

                // If it's now the AI's turn, trigger its move after a short delay
                if (gameActive && currentPlayerSign === aiSign) {
                    // Disable board during AI thinking time
                    DisplayController.setBoardActive(false);
                    setTimeout(() => {
                        aiMakeMove();
                        // Re-enable board after AI move (if game still active)
                        if (gameActive) {
                            DisplayController.setBoardActive(true);
                        }
                    }, 750); // 750ms delay
                }
            }
            return true;
        }
        return false;
    };

    const restartGame = () => {
        GameBoard.clearBoard();
        DisplayController.updateDisplay();
        currentPlayerSign = 'roger'; // Roger always starts
        gameStarted = false; // Reset game started flag
        gameActive = true;
        DisplayController.updateCurrentPlayerDisplay(currentPlayerSign);
        DisplayController.hideResult();
        DisplayController.disablePlayerSelection(false); // Re-enable player selection
    };

    const resetGame = () => {
        scores = { roger: 0, whitebeard: 0, ties: 0 };
        saveScoresToLocalStorage(); // Save reset scores
        restartGame(); // Directly start a fresh round after resetting scores
        // Selection remains enabled by newRound
    };

    const init = () => {
        loadScoresFromLocalStorage(); // Load scores on init
        const elements = DisplayController.getElements(); // Get elements once

        // Player Selection Listeners (now also starts the game)
        elements.signButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                if (gameStarted) return; // Don't allow change after game starts

                elements.signButtons.forEach(btn => btn.classList.remove('selected'));
                e.currentTarget.classList.add('selected');

                selectedPlayerSign = e.currentTarget.dataset.sign;
                humanSign = selectedPlayerSign;
                aiSign = (humanSign === 'roger') ? 'whitebeard' : 'roger';

                // Start the game
                gameStarted = true;
                gameActive = true;
                DisplayController.disablePlayerSelection(true);
                DisplayController.updateCurrentPlayerDisplay(currentPlayerSign); // Show initial turn (Roger)

                // If AI (Roger) starts first
                if (currentPlayerSign === aiSign) {
                     DisplayController.setBoardActive(false);
                     setTimeout(() => {
                         aiMakeMove();
                          if (gameActive) {
                             DisplayController.setBoardActive(true);
                          }
                     }, 500); // Shorter delay for first move
                } else {
                     // Human starts, enable board for their first click
                      DisplayController.setBoardActive(true);
                }
            });
        });

        // Add listeners for game board cells
        elements.cells.forEach(cell => {
            cell.addEventListener('click', handleCellClick);
        });

        // Add listeners for control buttons
        elements.restartBtn.addEventListener('click', restartGame);
        elements.newRoundBtn.addEventListener('click', resetGame);

        // Add listeners for modal buttons
        elements.quitBtn.addEventListener('click', () => {
            DisplayController.hideResult();
            resetGame(); // Quit resets score and starts over
        });

        elements.nextRoundBtn.addEventListener('click', () => {
            DisplayController.hideResult();
            restartGame(); // Next round keeps score
        });
    };

    // --- AI Logic --- 
    const aiMakeMove = () => {
        if (!gameActive) return;

        const board = GameBoard.getBoard();
        const availableCells = board.map((val, index) => val === '' ? index : null).filter(val => val !== null);

        let moveIndex = -1;

        // 1. Check if AI can win
        for (const index of availableCells) {
            board[index] = aiSign; // Temporarily make move
            if (GameBoard.checkWinner()?.winner === aiSign) {
                moveIndex = index;
                board[index] = ''; // Undo temporary move
                break;
            }
            board[index] = ''; // Undo temporary move
        }

        // 2. Check if human can win (and block)
        if (moveIndex === -1) {
            for (const index of availableCells) {
                board[index] = humanSign; // Temporarily make move for human
                if (GameBoard.checkWinner()?.winner === humanSign) {
                    moveIndex = index; // Block this spot
                    board[index] = ''; // Undo temporary move
                    break;
                }
                board[index] = ''; // Undo temporary move
            }
        }

        // 3. Try center
        if (moveIndex === -1 && availableCells.includes(4)) {
            moveIndex = 4;
        }

        // 4. Try corners
        if (moveIndex === -1) {
            const corners = [0, 2, 6, 8];
            const availableCorners = corners.filter(index => availableCells.includes(index));
            if (availableCorners.length > 0) {
                moveIndex = availableCorners[Math.floor(Math.random() * availableCorners.length)];
            }
        }

        // 5. Try sides
        if (moveIndex === -1) {
            const sides = [1, 3, 5, 7];
            const availableSides = sides.filter(index => availableCells.includes(index));
            if (availableSides.length > 0) {
                moveIndex = availableSides[Math.floor(Math.random() * availableSides.length)];
            }
        }

        // Make the move if a valid one was found
        if (moveIndex !== -1) {
            if (GameBoard.setCell(moveIndex, currentPlayerSign)) { // currentPlayerSign should be aiSign here
                DisplayController.updateDisplay();
                const winnerInfo = GameBoard.checkWinner();
                if (winnerInfo) {
                    gameActive = false;
                    updateScore(winnerInfo.winner);
                    DisplayController.showResult(`${winnerInfo.winner === 'roger' ? 'Gold Roger' : 'Whitebeard'} wins!`, winnerInfo.winningCells);
                } else if (GameBoard.isBoardFull()) {
                    gameActive = false;
                    updateScore('tie');
                    DisplayController.showResult("It's a Draw!");
                } else {
                    switchPlayer(); // Switch back to human
                    DisplayController.updateCurrentPlayerDisplay(currentPlayerSign);
                }
            }
        } 
        // Ensure board is re-enabled even if AI couldn't move (shouldn't happen with this logic)
        if (gameActive) {
            DisplayController.setBoardActive(true);
        }
    };
    // --- End AI Logic ---

    return {
        init,
        restartGame,
        resetGame
    };
})();

// Display Controller Module
const DisplayController = (() => {
    const gameBoard = document.querySelector('.game-board');
    const currentPlayerDisplay = document.querySelector('#current-player');
    const playerXScoreDisplay = document.getElementById('player-x-score');
    const playerOScoreDisplay = document.getElementById('player-o-score');
    const tiesDisplay = document.getElementById('ties'),
        signButtons = document.querySelectorAll('.sign-btn'),
        resultModal = document.querySelector('#result-modal'),
        resultMessage = document.querySelector('#result-message'),
        quitBtn = document.querySelector('#quit-btn'), // Added comma
        nextRoundBtn = document.querySelector('#next-round-btn'), // Added comma
        restartBtn = document.getElementById('restart-btn'), // Added selection
        newRoundBtn = document.getElementById('new-round-btn') // Added selection

    // Function to clear win highlights
    const clearHighlights = () => {
        const cells = gameBoard.querySelectorAll('.cell');
        cells.forEach(cell => cell.classList.remove('win-line'));
    };

    const updateDisplay = () => {
        clearHighlights(); // Clear highlights before updating
        const board = GameBoard.getBoard();
        const cells = gameBoard.querySelectorAll('.cell');
        cells.forEach((cell, index) => {
            cell.className = 'cell'; // Reset classes first
            if (board[index]) {
                cell.classList.add(board[index]); 
            }
            cell.classList.remove('win'); 
        });
    };

    const updateCurrentPlayerDisplay = (player) => {
        currentPlayerDisplay.textContent = player === 'roger' ? 'Roger' : 'Whitebeard';
    };

    const updateScores = (scores) => {
        playerXScoreDisplay.textContent = scores.roger;
        playerOScoreDisplay.textContent = scores.whitebeard;
        tiesDisplay.textContent = scores.ties;
    };

    const showResult = (message, winningCells = []) => { // Accept winningCells
        resultMessage.textContent = message; 
        resultModal.classList.add('show'); 

        // Add highlight class to winning cells
        if (winningCells && winningCells.length > 0) {
            const cells = gameBoard.querySelectorAll('.cell');
            winningCells.forEach(index => {
                cells[index].classList.add('win-line');
            });
        }
    };

    const hideResult = () => {
        resultModal.classList.remove('show'); 
        clearHighlights(); // Also clear highlights when modal is hidden
    };

    const getElements = () => {
        // Return all needed elements for init
        return {
            cells: gameBoard.querySelectorAll('.cell'),
            signButtons: document.querySelectorAll('.sign-btn'),
            restartBtn: document.getElementById('restart-btn'),
            newRoundBtn: document.getElementById('new-round-btn'),
            quitBtn: document.getElementById('quit-btn'),
            nextRoundBtn: document.getElementById('next-round-btn')
        };
    };

    const disablePlayerSelection = (disable) => { // Function to enable/disable sign buttons
        signButtons.forEach(button => button.disabled = disable);
    };

    const setBoardActive = (active) => { // Function to enable/disable board clicks
        if (active) {
            gameBoard.style.pointerEvents = 'auto';
            gameBoard.style.opacity = '1';
        } else {
            gameBoard.style.pointerEvents = 'none'; // Prevent clicks
            gameBoard.style.opacity = '0.7'; // Visual feedback
        }
    };

    return {
        updateDisplay,
        updateCurrentPlayerDisplay,
        updateScores,
        showResult,
        hideResult,
        getElements,
        disablePlayerSelection,
        setBoardActive
    };
})();

// Wait for the DOM to be fully loaded before initializing the game
document.addEventListener('DOMContentLoaded', GameController.init);