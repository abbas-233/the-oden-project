const calculator = require('./exercise07');

describe('calculator', () => {
    describe('add', () => {
        test('adds two numbers', () => {
            expect(calculator.add(1, 2)).toBe(3);
        });

        test('adds negative numbers', () => {
            expect(calculator.add(-1, -2)).toBe(-3);
        });
    });

    describe('subtract', () => {
        test('subtracts two numbers', () => {
            expect(calculator.subtract(3, 2)).toBe(1);
        });

        test('subtracts negative numbers', () => {
            expect(calculator.subtract(-1, -2)).toBe(1);
        });
    });

    describe('multiply', () => {
        test('multiplies two numbers', () => {
            expect(calculator.multiply(2, 3)).toBe(6);
        });

        test('multiplies by zero', () => {
            expect(calculator.multiply(5, 0)).toBe(0);
        });
    });

    describe('divide', () => {
        test('divides two numbers', () => {
            expect(calculator.divide(6, 2)).toBe(3);
        });

        test('throws error when dividing by zero', () => {
            expect(() => calculator.divide(5, 0)).toThrow('Division by zero is not allowed');
        });
    });
}); 