const getTheTitles = require('./exercise11');

describe('getTheTitles', () => {
    test('returns array of titles', () => {
        const books = [
            {
                title: 'Book',
                author: 'Name'
            },
            {
                title: 'Book2',
                author: 'Name2'
            }
        ];
        expect(getTheTitles(books)).toEqual(['Book', 'Book2']);
    });

    test('handles empty array', () => {
        expect(getTheTitles([])).toEqual([]);
    });

    test('handles single book', () => {
        const books = [
            {
                title: 'Single Book',
                author: 'Single Author'
            }
        ];
        expect(getTheTitles(books)).toEqual(['Single Book']);
    });

    test('handles books with additional properties', () => {
        const books = [
            {
                title: 'Book1',
                author: 'Author1',
                year: 2000
            },
            {
                title: 'Book2',
                author: 'Author2',
                year: 2001
            }
        ];
        expect(getTheTitles(books)).toEqual(['Book1', 'Book2']);
    });
}); 