/**
 * Checks if a string is a palindrome
 * @param {string} str - The string to check
 * @returns {boolean} True if the string is a palindrome, false otherwise
 */
function palindromes(str) {
    // Remove all non-alphanumeric characters and convert to lowercase
    const cleanStr = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    // Compare the string with its reverse
    return cleanStr === cleanStr.split('').reverse().join('');
}

module.exports = palindromes; 