// Exercise 1: Troubleshooting and Type Conversion
// This exercise demonstrates common JavaScript type conversion issues and their solutions

// Example 1: String and Number concatenation
const originalValue = '5';
const concatenated = originalValue + 1; // Results in '51' (string concatenation)
const fixedValue = Number(originalValue) + 1; // Results in 6 (numeric addition)

console.log('Example 1: String and Number Operations');
console.log('Original concatenation:', concatenated);
console.log('Fixed numeric addition:', fixedValue);

// Example 2: Multiple string numbers
const num1 = '10';
const num2 = '20';
console.log('\nExample 2: Multiple String Numbers');
console.log('String concatenation:', num1 + num2); // '1020'
console.log('Numeric addition:', Number(num1) + Number(num2)); // 30

// Example 3: Modern type conversion methods
const stringNumber = '42.5';
console.log('\nExample 3: Modern Type Conversion');
console.log('parseInt:', parseInt(stringNumber)); // 42
console.log('parseFloat:', parseFloat(stringNumber)); // 42.5
console.log('Unary plus:', +stringNumber); // 42.5
console.log('Number constructor:', Number(stringNumber)); // 42.5

// Example 4: Type checking
const value = '123';
console.log('\nExample 4: Type Checking');
console.log('typeof value:', typeof value); // 'string'
console.log('isNaN check:', isNaN(value)); // false
console.log('isNaN check with Number:', isNaN(Number(value))); // false 