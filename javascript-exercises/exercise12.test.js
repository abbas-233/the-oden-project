const findTheOldest = require('./exercise12');

describe('findTheOldest', () => {
    test('finds the oldest person', () => {
        const people = [
            {
                name: "Carly",
                yearOfBirth: 1942,
                yearOfDeath: 1970,
            },
            {
                name: "Ray",
                yearOfBirth: 1962,
                yearOfDeath: 2011,
            },
            {
                name: "Jane",
                yearOfBirth: 1912,
                yearOfDeath: 1941,
            },
        ];
        expect(findTheOldest(people).name).toBe("Ray");
    });

    test('finds the oldest person if someone is still living', () => {
        const people = [
            {
                name: "Carly",
                yearOfBirth: 2018,
            },
            {
                name: "Ray",
                yearOfBirth: 1962,
                yearOfDeath: 2011,
            },
            {
                name: "Jane",
                yearOfBirth: 1912,
                yearOfDeath: 1941,
            },
        ];
        expect(findTheOldest(people).name).toBe("Ray");
    });

    test('finds the oldest person if the OLDEST is still living', () => {
        const people = [
            {
                name: "Carly",
                yearOfBirth: 2018,
            },
            {
                name: "Ray",
                yearOfBirth: 1962,
                yearOfDeath: 2011,
            },
            {
                name: "Jane",
                yearOfBirth: 1912,
            },
        ];
        expect(findTheOldest(people).name).toBe("Jane");
    });

    test('handles empty array', () => {
        expect(findTheOldest([])).toBeUndefined();
    });

    test('handles single person', () => {
        const people = [
            {
                name: "Single",
                yearOfBirth: 1900,
                yearOfDeath: 2000,
            }
        ];
        expect(findTheOldest(people).name).toBe("Single");
    });
}); 