/**
 * Calculator object with basic arithmetic operations
 */
const calculator = {
    /**
     * Adds two numbers
     * @param {number} a - First number
     * @param {number} b - Second number
     * @returns {number} Sum of the numbers
     */
    add: function(a, b) {
        return a + b;
    },

    /**
     * Subtracts the second number from the first
     * @param {number} a - First number
     * @param {number} b - Second number
     * @returns {number} Difference of the numbers
     */
    subtract: function(a, b) {
        return a - b;
    },

    /**
     * Multiplies two numbers
     * @param {number} a - First number
     * @param {number} b - Second number
     * @returns {number} Product of the numbers
     */
    multiply: function(a, b) {
        return a * b;
    },

    /**
     * Divides the first number by the second
     * @param {number} a - First number
     * @param {number} b - Second number
     * @returns {number} Quotient of the division
     * @throws {Error} Throws an error if attempting to divide by zero
     */
    divide: function(a, b) {
        if (b === 0) {
            throw new Error('Division by zero is not allowed');
        }
        return a / b;
    }
};

module.exports = calculator; 