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
                return board[a];
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
    let currentPlayer;
    let player1;
    let player2;
    let gameActive = false;

    const startGame = (name1, name2) => {
        player1 = createPlayer(name1 || 'Player X', 'X');
        player2 = createPlayer(name2 || 'Player O', 'O');
        currentPlayer = player1;
        gameActive = true;
        GameBoard.clearBoard();
        DisplayController.updateDisplay();
        DisplayController.updateStatus(`${currentPlayer.name}'s turn`);
    };

    const switchPlayer = () => {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    };

    const makeMove = (index) => {
        if (!gameActive) return false;
        
        if (GameBoard.setCell(index, currentPlayer.marker)) {
            DisplayController.updateDisplay();
            
            const winner = GameBoard.checkWinner();
            if (winner) {
                gameActive = false;
                if (winner === player1.marker) {
                    player1.incrementScore();
                    DisplayController.updateStatus(`${player1.name} wins!`);
                } else {
                    player2.incrementScore();
                    DisplayController.updateStatus(`${player2.name} wins!`);
                }
                DisplayController.updateScores(player1.getScore(), player2.getScore());
            } else if (GameBoard.isBoardFull()) {
                gameActive = false;
                DisplayController.updateStatus("It's a draw!");
            } else {
                switchPlayer();
                DisplayController.updateStatus(`${currentPlayer.name}'s turn`);
            }
            return true;
        }
        return false;
    };

    const restartGame = () => {
        gameActive = true;
        GameBoard.clearBoard();
        DisplayController.updateDisplay();
        DisplayController.updateStatus(`${currentPlayer.name}'s turn`);
    };

    return {
        startGame,
        makeMove,
        restartGame
    };
})();

// Display Controller Module
const DisplayController = (() => {
    const gameBoard = document.querySelector('.game-board');
    const statusDisplay = document.querySelector('.status');
    const startBtn = document.querySelector('.start-btn');
    const restartBtn = document.querySelector('.restart-btn');
    const player1Input = document.querySelector('#player1');
    const player2Input = document.querySelector('#player2');
    const player1Score = document.querySelector('.score-card.x .score');
    const player2Score = document.querySelector('.score-card.o .score');

    const updateDisplay = () => {
        const board = GameBoard.getBoard();
        const cells = gameBoard.querySelectorAll('.cell');
        cells.forEach((cell, index) => {
            cell.textContent = board[index];
            cell.className = 'cell';
            if (board[index]) {
                cell.classList.add(board[index].toLowerCase());
            }
        });
    };

    const updateStatus = (message) => {
        statusDisplay.textContent = message;
    };

    const updateScores = (score1, score2) => {
        player1Score.textContent = score1;
        player2Score.textContent = score2;
    };

    // Event Listeners
    gameBoard.addEventListener('click', (e) => {
        const cell = e.target.closest('.cell');
        if (cell) {
            const index = parseInt(cell.dataset.index);
            GameController.makeMove(index);
        }
    });

    startBtn.addEventListener('click', () => {
        const name1 = player1Input.value.trim();
        const name2 = player2Input.value.trim();
        GameController.startGame(name1, name2);
    });

    restartBtn.addEventListener('click', () => {
        GameController.restartGame();
    });

    return {
        updateDisplay,
        updateStatus,
        updateScores
    };
})(); 