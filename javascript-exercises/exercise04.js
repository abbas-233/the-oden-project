/**
 * Divides the first number by the second
 * @param {number} a - The dividend
 * @param {number} b - The divisor
 * @returns {number} The quotient of the division
 * @throws {Error} Throws an error if attempting to divide by zero
 */
function divide(a, b) {
    if (b === 0) {
        throw new Error('Division by zero is not allowed');
    }
    return a / b;
}

module.exports = divide; 