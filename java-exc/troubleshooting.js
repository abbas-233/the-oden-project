// Exercise 1: Troubleshooting
// Fix the following code

let x = '5';
x = x + 1; // This will concatenate '5' and 1 to make '51'

// Fix: Convert x to a number before adding
let y = '5';
y = Number(y) + 1; // Now it will add 5 + 1 to make 6

console.log("Original x:", x); // Should log '51'
console.log("Fixed y:", y); // Should log 6

// Another example of type conversion
let a = '10';
let b = '20';
console.log("String concatenation:", a + b); // Logs '1020'
console.log("Number addition:", Number(a) + Number(b)); // Logs 30 