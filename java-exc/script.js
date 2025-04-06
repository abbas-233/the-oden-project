// Exercise 2: Number Input and Validation
// This exercise demonstrates robust number input handling and validation

/**
 * Gets a valid number from the user
 * @param {string} promptMessage - The message to display to the user
 * @returns {number} A valid number
 */
function getValidNumber(promptMessage = 'Please enter a number:') {
    while (true) {
        const input = prompt(promptMessage);
        
        // Handle cancel button
        if (input === null) {
            console.log('Operation cancelled by user');
            return null;
        }
        
        // Trim whitespace
        const trimmedInput = input.trim();
        
        // Check if input is empty
        if (trimmedInput === '') {
            console.log('Please enter a value');
            continue;
        }
        
        // Convert to number
        const number = Number(trimmedInput);
        
        // Validate number
        if (isNaN(number)) {
            console.log('Invalid input. Please enter a valid number.');
            continue;
        }
        
        return number;
    }
}

/**
 * Performs arithmetic operations on two numbers
 * @param {number} num1 - First number
 * @param {number} num2 - Second number
 */
function performOperations(num1, num2) {
    console.log('\nArithmetic Operations:');
    console.log(`${num1} + ${num2} = ${num1 + num2}`);
    console.log(`${num1} - ${num2} = ${num1 - num2}`);
    console.log(`${num1} * ${num2} = ${num1 * num2}`);
    
    // Handle division by zero
    if (num2 !== 0) {
        console.log(`${num1} / ${num2} = ${num1 / num2}`);
    } else {
        console.log('Cannot divide by zero');
    }
    
    console.log(`${num1} % ${num2} = ${num1 % num2}`);
    console.log(`${num1} ** ${num2} = ${num1 ** num2}`);
}

// Main program
console.log('Welcome to the Number Operations Program!');
console.log('You will be asked to enter two numbers.');

const firstNumber = getValidNumber('Enter the first number:');
if (firstNumber === null) {
    console.log('Program terminated');
} else {
    const secondNumber = getValidNumber('Enter the second number:');
    if (secondNumber === null) {
        console.log('Program terminated');
    } else {
        performOperations(firstNumber, secondNumber);
    }
} 