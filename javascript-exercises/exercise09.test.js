const palindromes = require('./exercise09');

describe('Palindromes', () => {
    test('simple palindromes', () => {
        expect(palindromes('racecar')).toBe(true);
        expect(palindromes('tacos')).toBe(false);
    });

    test('palindromes with punctuation', () => {
        expect(palindromes('A car, a man, a maraca.')).toBe(true);
        expect(palindromes('Rats live on no evil star.')).toBe(true);
    });

    test('palindromes with spaces', () => {
        expect(palindromes('Lid off a daffodil')).toBe(true);
        expect(palindromes('Animal loots foliated detail of stool lamina')).toBe(true);
    });

    test('case insensitive', () => {
        expect(palindromes('RaceCar')).toBe(true);
        expect(palindromes('A nut for a jar of tuna')).toBe(true);
    });

    test('empty string', () => {
        expect(palindromes('')).toBe(true);
    });

    test('single character', () => {
        expect(palindromes('a')).toBe(true);
        expect(palindromes('b')).toBe(true);
    });
}); 