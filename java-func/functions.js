// Function Basics Exercise
// The Odin Project - Foundations Course

/**
 * Adds 7 to a number
 * @param {number} num - The number to add 7 to
 * @returns {number} The result of adding 7 to the input number
 */
function add7(num) {
    return num + 7;
}

/**
 * Multiplies two numbers
 * @param {number} num1 - First number
 * @param {number} num2 - Second number
 * @returns {number} The product of the two numbers
 */
function multiply(num1, num2) {
    return num1 * num2;
}

/**
 * Capitalizes the first letter of a string
 * @param {string} str - The string to capitalize
 * @returns {string} The string with first letter capitalized
 */
function capitalize(str) {
    if (str.length === 0) return str;
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Returns the last letter of a string
 * @param {string} str - The input string
 * @returns {string} The last letter of the string
 */
function lastLetter(str) {
    if (str.length === 0) return '';
    return str[str.length - 1];
}

// Test cases
console.log('Testing add7:');
console.log('add7(3) =', add7(3)); // Should return 10
console.log('add7(-7) =', add7(-7)); // Should return 0
console.log('add7(0) =', add7(0)); // Should return 7

console.log('\nTesting multiply:');
console.log('multiply(2, 3) =', multiply(2, 3)); // Should return 6
console.log('multiply(-2, 3) =', multiply(-2, 3)); // Should return -6
console.log('multiply(0, 5) =', multiply(0, 5)); // Should return 0

console.log('\nTesting capitalize:');
console.log('capitalize("hello") =', capitalize('hello')); // Should return "Hello"
console.log('capitalize("WORLD") =', capitalize('WORLD')); // Should return "World"
console.log('capitalize("bOtH") =', capitalize('bOtH')); // Should return "Both"
console.log('capitalize("") =', capitalize('')); // Should return ""

console.log('\nTesting lastLetter:');
console.log('lastLetter("abcd") =', lastLetter('abcd')); // Should return "d"
console.log('lastLetter("hello") =', lastLetter('hello')); // Should return "o"
console.log('lastLetter("") =', lastLetter('')); // Should return "" 