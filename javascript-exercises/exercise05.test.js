const capitalize = require('./exercise05');

describe('capitalize', () => {
    test('capitalizes the first letter of a string', () => {
        expect(capitalize('hello')).toBe('Hello');
    });

    test('works with single character strings', () => {
        expect(capitalize('a')).toBe('A');
    });

    test('works with already capitalized strings', () => {
        expect(capitalize('Hello')).toBe('Hello');
    });

    test('works with mixed case strings', () => {
        expect(capitalize('hElLo')).toBe('Hello');
    });

    test('returns empty string for empty input', () => {
        expect(capitalize('')).toBe('');
    });
}); 