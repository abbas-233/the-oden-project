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
    let currentPlayer = 'roger';
    let player1Sign = 'roger';
    let gameActive = false;
    let scores = { roger: 0, whitebeard: 0, ties: 0 };
    let winningCells = [];

    const startGame = () => {
        gameActive = true;
        GameBoard.clearBoard();
        currentPlayer = player1Sign;
        DisplayController.updateDisplay();
        DisplayController.updateCurrentPlayer(currentPlayer);
    };

    const switchPlayer = () => {
        currentPlayer = currentPlayer === 'roger' ? 'whitebeard' : 'roger';
    };

    const makeMove = (index) => {
        if (!gameActive) return false;
        
        if (GameBoard.setCell(index, currentPlayer)) {
            DisplayController.updateDisplay();
            
            const result = GameBoard.checkWinner();
            if (result) {
                gameActive = false;
                scores[result.winner]++;
                winningCells = result.winningCells;
                const winnerName = result.winner === 'roger' ? 'Gol D. Roger' : 'Whitebeard';
                DisplayController.showResult(`${winnerName} Takes the Round`);
                DisplayController.updateScores(scores);
                DisplayController.highlightWinningCells(winningCells);
            } else if (GameBoard.isBoardFull()) {
                gameActive = false;
                scores.ties++;
                DisplayController.showResult("It's a Draw!");
                DisplayController.updateScores(scores);
            } else {
                switchPlayer();
                DisplayController.updateCurrentPlayer(currentPlayer);
            }
            return true;
        }
        return false;
    };

    const restartGame = () => {
        gameActive = true;
        GameBoard.clearBoard();
        DisplayController.updateDisplay();
        DisplayController.updateCurrentPlayer(currentPlayer);
        DisplayController.clearWinningCells();
    };

    const newRound = () => {
        scores = { roger: 0, whitebeard: 0, ties: 0 };
        DisplayController.updateScores(scores);
        restartGame();
    };

    const setPlayer1Sign = (sign) => {
        player1Sign = sign;
        currentPlayer = sign;
    };

    return {
        startGame,
        makeMove,
        restartGame,
        newRound,
        setPlayer1Sign
    };
})();

// Display Controller Module
const DisplayController = (() => {
    const gameBoard = document.querySelector('.game-board');
    const currentPlayerDisplay = document.querySelector('#current-player');
    const playerXScoreDisplay = document.querySelector('#player-x-score');
    const playerOScoreDisplay = document.querySelector('#player-o-score');
    const tiesDisplay = document.querySelector('#ties');
    const startBtn = document.querySelector('.start-btn');
    const restartBtn = document.querySelector('#restart-btn');
    const newRoundBtn = document.querySelector('#new-round-btn');
    const signButtons = document.querySelectorAll('.sign-btn');
    const resultModal = document.querySelector('#result-modal');
    const resultMessage = document.querySelector('#result-message');
    const quitBtn = document.querySelector('#quit-btn');
    const nextRoundBtn = document.querySelector('#next-round-btn');

    const updateDisplay = () => {
        const board = GameBoard.getBoard();
        const cells = gameBoard.querySelectorAll('.cell');
        cells.forEach((cell, index) => {
            cell.className = 'cell'; 
            if (board[index]) {
                cell.classList.add(board[index]); 
            }
            cell.classList.remove('win'); 
        });
    };

    const updateCurrentPlayer = (player) => {
        currentPlayerDisplay.textContent = player === 'roger' ? 'Roger' : 'Whitebeard';
    };

    const updateScores = (scores) => {
        playerXScoreDisplay.textContent = scores.roger; 
        playerOScoreDisplay.textContent = scores.whitebeard;
        tiesDisplay.textContent = scores.ties;
    };

    const highlightWinningCells = (cells) => {
        cells.forEach(index => {
            const cell = gameBoard.querySelector(`[data-index="${index}"]`);
            cell.classList.add('win');
        });
    };

    const clearWinningCells = () => {
        const cells = gameBoard.querySelectorAll('.cell');
        cells.forEach(cell => cell.classList.remove('win'));
    };

    const showResult = (message) => {
        resultMessage.textContent = message;
        resultModal.classList.add('show'); 
    };

    const hideResult = () => {
        resultModal.classList.remove('show'); 
    };

    gameBoard.addEventListener('click', (e) => {
        const cell = e.target.closest('.cell');
        if (cell) {
            const index = parseInt(cell.dataset.index);
            GameController.makeMove(index);
        }
    });

    startBtn.addEventListener('click', () => {
        GameController.startGame();
    });

    restartBtn.addEventListener('click', () => {
        GameController.restartGame();
    });

    newRoundBtn.addEventListener('click', () => {
        GameController.newRound();
    });

    signButtons.forEach(button => {
        button.addEventListener('click', () => {
            signButtons.forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');
            GameController.setPlayer1Sign(button.dataset.sign);
        });
    });

    quitBtn.addEventListener('click', () => {
        hideResult();
        GameController.newRound();
    });

    nextRoundBtn.addEventListener('click', () => {
        hideResult();
        GameController.restartGame();
    });

    updateScores({ roger: 0, whitebeard: 0, ties: 0 }); 
    updateCurrentPlayer(GameController.setPlayer1Sign ? GameController.setPlayer1Sign('roger') : 'roger'); 

    return {
        updateDisplay,
        updateCurrentPlayer,
        updateScores,
        highlightWinningCells,
        clearWinningCells,
        showResult
    };
})();