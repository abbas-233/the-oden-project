// Exercise 4: Direction Game
// This exercise demonstrates direction handling and game mechanics

/**
 * Valid directions in the game
 * @type {string[]}
 */
const VALID_DIRECTIONS = ['up', 'down', 'left', 'right'];

/**
 * Game state tracking
 * @type {Object}
 */
const gameState = {
    position: { x: 0, y: 0 },
    moves: 0,
    isPlaying: true
};

/**
 * Gets a valid direction from the user
 * @returns {string|null} The valid direction or null if cancelled
 */
function getDirection() {
    while (true) {
        const direction = prompt(
            'Enter a direction (up, down, left, right) or "stop" to end:'
        )?.toLowerCase().trim();

        // Handle cancellation
        if (direction === null) {
            return null;
        }

        // Handle stop command
        if (direction === 'stop') {
            return 'stop';
        }

        // Validate direction
        if (VALID_DIRECTIONS.includes(direction)) {
            return direction;
        }

        console.log('Invalid direction. Please enter up, down, left, or right.');
    }
}

/**
 * Moves the player in the specified direction
 * @param {string} direction - The direction to move
 */
function move(direction) {
    switch (direction) {
        case 'up':
            gameState.position.y++;
            console.log('Moving up!');
            break;
        case 'down':
            gameState.position.y--;
            console.log('Moving down!');
            break;
        case 'left':
            gameState.position.x--;
            console.log('Moving left!');
            break;
        case 'right':
            gameState.position.x++;
            console.log('Moving right!');
            break;
    }
    gameState.moves++;
}

/**
 * Displays the current game state
 */
function displayGameState() {
    console.log('\nCurrent Game State:');
    console.log(`Position: (${gameState.position.x}, ${gameState.position.y})`);
    console.log(`Total moves: ${gameState.moves}`);
}

/**
 * Main game loop
 */
function playGame() {
    console.log('Welcome to the Direction Game!');
    console.log('You can move up, down, left, or right.');
    console.log('Enter "stop" to end the game.');

    while (gameState.isPlaying) {
        const direction = getDirection();

        if (direction === null) {
            console.log('Game cancelled by user.');
            break;
        }

        if (direction === 'stop') {
            console.log('Game ended by user.');
            break;
        }

        move(direction);
        displayGameState();
    }

    console.log('\nFinal Game Summary:');
    console.log(`Final position: (${gameState.position.x}, ${gameState.position.y})`);
    console.log(`Total moves made: ${gameState.moves}`);
    console.log('Thanks for playing!');
}

// Start the game
playGame(); 