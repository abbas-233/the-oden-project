/**
 * Returns the oldest person from an array of people
 * @param {Object[]} people - Array of people objects with birth and death years
 * @returns {Object} The oldest person object
 */
function findTheOldest(people) {
    return people.reduce((oldest, current) => {
        const getAge = (person) => {
            const deathYear = person.yearOfDeath || new Date().getFullYear();
            return deathYear - person.yearOfBirth;
        };

        const oldestAge = getAge(oldest);
        const currentAge = getAge(current);

        return currentAge > oldestAge ? current : oldest;
    });
}

module.exports = findTheOldest; 