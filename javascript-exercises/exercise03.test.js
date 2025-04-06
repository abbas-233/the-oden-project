const multiply = require('./exercise03');

describe('multiply', () => {
    test('multiplies 2 by 3 to equal 6', () => {
        expect(multiply(2, 3)).toBe(6);
    });

    test('multiplies -2 by 3 to equal -6', () => {
        expect(multiply(-2, 3)).toBe(-6);
    });

    test('multiplies 0 by any number to equal 0', () => {
        expect(multiply(0, 5)).toBe(0);
    });

    test('multiplies decimal numbers correctly', () => {
        expect(multiply(0.1, 0.2)).toBeCloseTo(0.02);
    });
}); 