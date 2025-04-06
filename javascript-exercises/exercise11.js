/**
 * Returns an array of book titles from an array of book objects
 * @param {Object[]} books - Array of book objects
 * @returns {string[]} Array of book titles
 */
function getTheTitles(books) {
    return books.map(book => book.title);
}

module.exports = getTheTitles; 