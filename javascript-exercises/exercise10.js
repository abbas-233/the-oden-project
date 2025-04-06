/**
 * Returns the nth member of the Fibonacci sequence
 * @param {number} n - The position in the sequence (1-based index)
 * @returns {number} The nth Fibonacci number
 */
function fibonacci(n) {
    if (n <= 0) return 0;
    if (n === 1 || n === 2) return 1;

    let prev = 1;
    let curr = 1;

    for (let i = 3; i <= n; i++) {
        const next = prev + curr;
        prev = curr;
        curr = next;
    }

    return curr;
}

module.exports = fibonacci; 