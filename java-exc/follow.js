// Exercise 4: Direction Follow
// This exercise demonstrates following directions and conditional logic

// Function to get direction from user
function getDirection() {
    let direction = prompt("Enter a direction (up, down, left, right):").toLowerCase();
    
    // Validate input
    if (direction !== 'up' && direction !== 'down' && direction !== 'left' && direction !== 'right') {
        console.log("Invalid direction. Please enter up, down, left, or right.");
        return getDirection(); // Ask again if invalid
    }
    
    return direction;
}

// Function to move based on direction
function move(direction) {
    switch(direction) {
        case 'up':
            console.log("Moving up!");
            break;
        case 'down':
            console.log("Moving down!");
            break;
        case 'left':
            console.log("Moving left!");
            break;
        case 'right':
            console.log("Moving right!");
            break;
    }
}

// Main program
console.log("Welcome to the Direction Game!");
console.log("You can move up, down, left, or right.");

let direction = getDirection();
move(direction);

// Additional challenge: Keep moving until user says 'stop'
let keepMoving = true;
while (keepMoving) {
    let response = prompt("Would you like to move again? (yes/no)").toLowerCase();
    if (response === 'no') {
        keepMoving = false;
        console.log("Game over!");
    } else if (response === 'yes') {
        direction = getDirection();
        move(direction);
    } else {
        console.log("Please answer with 'yes' or 'no'.");
    }
} 