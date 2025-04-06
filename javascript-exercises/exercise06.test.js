const reverseString = require('./exercise06');

describe('reverseString', () => {
    test('reverses a string', () => {
        expect(reverseString('hello')).toBe('olleh');
    });

    test('works with single character strings', () => {
        expect(reverseString('a')).toBe('a');
    });

    test('works with empty strings', () => {
        expect(reverseString('')).toBe('');
    });

    test('works with strings containing spaces', () => {
        expect(reverseString('hello world')).toBe('dlrow olleh');
    });

    test('works with strings containing special characters', () => {
        expect(reverseString('!@#$%')).toBe('%$#@!');
    });
}); 