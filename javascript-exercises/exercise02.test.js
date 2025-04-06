const subtract = require('./exercise02');

describe('subtract', () => {
    test('subtracts 2 from 3 to equal 1', () => {
        expect(subtract(3, 2)).toBe(1);
    });

    test('subtracts -1 from -1 to equal 0', () => {
        expect(subtract(-1, -1)).toBe(0);
    });

    test('subtracts 0 from 0 to equal 0', () => {
        expect(subtract(0, 0)).toBe(0);
    });

    test('subtracts decimal numbers correctly', () => {
        expect(subtract(0.3, 0.1)).toBeCloseTo(0.2);
    });
}); 