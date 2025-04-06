const fibonacci = require('./exercise10');

describe('Fibonacci', () => {
    test('returns correct Fibonacci numbers', () => {
        expect(fibonacci(1)).toBe(1);
        expect(fibonacci(2)).toBe(1);
        expect(fibonacci(3)).toBe(2);
        expect(fibonacci(4)).toBe(3);
        expect(fibonacci(5)).toBe(5);
        expect(fibonacci(6)).toBe(8);
        expect(fibonacci(7)).toBe(13);
        expect(fibonacci(8)).toBe(21);
    });

    test('handles edge cases', () => {
        expect(fibonacci(0)).toBe(0);
        expect(fibonacci(-1)).toBe(0);
    });

    test('returns correct large Fibonacci numbers', () => {
        expect(fibonacci(10)).toBe(55);
        expect(fibonacci(15)).toBe(610);
    });
}); 