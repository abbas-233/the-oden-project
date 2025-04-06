// Exercise 2: Enter a Number
// This exercise demonstrates user input and number validation

// Function to get and validate user input
function getNumber() {
    let userInput = prompt("Please enter a number:");
    
    // Convert input to number
    let number = Number(userInput);
    
    // Check if the input is a valid number
    if (isNaN(number)) {
        console.log("Invalid input. Please enter a valid number.");
        return getNumber(); // Ask again if invalid
    }
    
    return number;
}

// Example usage
console.log("Let's add two numbers together!");
let firstNumber = getNumber();
let secondNumber = getNumber();

let sum = firstNumber + secondNumber;
console.log(`The sum of ${firstNumber} and ${secondNumber} is: ${sum}`); 