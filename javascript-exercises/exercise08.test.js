const calculator = require('./exercise08');

describe('Calculator', () => {
    test('adds two numbers', () => {
        expect(calculator.add(1, 2)).toBe(3);
        expect(calculator.add(-1, 1)).toBe(0);
        expect(calculator.add(0, 0)).toBe(0);
    });

    test('subtracts two numbers', () => {
        expect(calculator.subtract(3, 2)).toBe(1);
        expect(calculator.subtract(1, 1)).toBe(0);
        expect(calculator.subtract(0, 5)).toBe(-5);
    });

    test('sums an array of numbers', () => {
        expect(calculator.sum([1, 2, 3])).toBe(6);
        expect(calculator.sum([])).toBe(0);
        expect(calculator.sum([-1, 1])).toBe(0);
    });

    test('multiplies two numbers', () => {
        expect(calculator.multiply(2, 3)).toBe(6);
        expect(calculator.multiply(0, 5)).toBe(0);
        expect(calculator.multiply(-2, 3)).toBe(-6);
    });

    test('calculates power', () => {
        expect(calculator.power(2, 3)).toBe(8);
        expect(calculator.power(5, 0)).toBe(1);
        expect(calculator.power(2, -1)).toBe(0.5);
    });

    test('calculates factorial', () => {
        expect(calculator.factorial(0)).toBe(1);
        expect(calculator.factorial(1)).toBe(1);
        expect(calculator.factorial(5)).toBe(120);
    });
}); 