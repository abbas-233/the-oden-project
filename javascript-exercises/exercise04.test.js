const divide = require('./exercise04');

describe('divide', () => {
    test('divides 6 by 2 to equal 3', () => {
        expect(divide(6, 2)).toBe(3);
    });

    test('divides -6 by 2 to equal -3', () => {
        expect(divide(-6, 2)).toBe(-3);
    });

    test('divides 0 by any number to equal 0', () => {
        expect(divide(0, 5)).toBe(0);
    });

    test('divides decimal numbers correctly', () => {
        expect(divide(0.6, 0.2)).toBeCloseTo(3);
    });

    test('throws error when dividing by zero', () => {
        expect(() => divide(5, 0)).toThrow('Division by zero is not allowed');
    });
}); 