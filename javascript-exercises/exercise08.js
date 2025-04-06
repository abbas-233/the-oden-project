/**
 * Calculator object with various mathematical operations
 */
const calculator = {
    /**
     * Adds two numbers
     * @param {number} a - First number
     * @param {number} b - Second number
     * @returns {number} Sum of a and b
     */
    add: function(a, b) {
        return a + b;
    },

    /**
     * Subtracts second number from first
     * @param {number} a - First number
     * @param {number} b - Second number
     * @returns {number} Difference of a and b
     */
    subtract: function(a, b) {
        return a - b;
    },

    /**
     * Calculates the sum of an array of numbers
     * @param {number[]} numbers - Array of numbers to sum
     * @returns {number} Sum of all numbers
     */
    sum: function(numbers) {
        return numbers.reduce((total, num) => total + num, 0);
    },

    /**
     * Multiplies two numbers
     * @param {number} a - First number
     * @param {number} b - Second number
     * @returns {number} Product of a and b
     */
    multiply: function(a, b) {
        return a * b;
    },

    /**
     * Calculates the power of a number
     * @param {number} base - Base number
     * @param {number} exponent - Exponent
     * @returns {number} Base raised to the power of exponent
     */
    power: function(base, exponent) {
        return Math.pow(base, exponent);
    },

    /**
     * Calculates the factorial of a number
     * @param {number} n - Number to calculate factorial of
     * @returns {number} Factorial of n
     */
    factorial: function(n) {
        if (n === 0 || n === 1) return 1;
        let result = 1;
        for (let i = 2; i <= n; i++) {
            result *= i;
        }
        return result;
    }
};

module.exports = calculator; 