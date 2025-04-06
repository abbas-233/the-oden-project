// Exercise 3: Advanced Mathematical Operations
// This exercise demonstrates various mathematical operations and the Math object

/**
 * Demonstrates basic arithmetic operations
 * @param {number} a - First number
 * @param {number} b - Second number
 */
function basicArithmetic(a, b) {
    console.log('\nBasic Arithmetic Operations:');
    console.log(`${a} + ${b} = ${a + b}`);
    console.log(`${a} - ${b} = ${a - b}`);
    console.log(`${a} * ${b} = ${a * b}`);
    console.log(`${a} / ${b} = ${a / b}`);
    console.log(`${a} % ${b} = ${a % b}`);
}

/**
 * Demonstrates advanced mathematical operations
 * @param {number} x - First number
 * @param {number} y - Second number
 */
function advancedMath(x, y) {
    console.log('\nAdvanced Mathematical Operations:');
    console.log(`Exponentiation: ${x}^${y} = ${x ** y}`);
    console.log(`Square root of (${x}^2 + ${y}^2): ${Math.sqrt(x * x + y * y)}`);
    console.log(`Absolute value of -${x}: ${Math.abs(-x)}`);
    console.log(`Rounding ${x}.7: ${Math.round(x + 0.7)}`);
    console.log(`Floor of ${x}.7: ${Math.floor(x + 0.7)}`);
    console.log(`Ceiling of ${x}.7: ${Math.ceil(x + 0.7)}`);
}

/**
 * Demonstrates Math object constants and functions
 */
function mathObjectDemo() {
    console.log('\nMath Object Constants and Functions:');
    console.log(`PI: ${Math.PI}`);
    console.log(`E: ${Math.E}`);
    console.log(`Random number: ${Math.random()}`);
    console.log(`Random integer between 1 and 10: ${Math.floor(Math.random() * 10) + 1}`);
    console.log(`Maximum of 1, 2, 3, 4: ${Math.max(1, 2, 3, 4)}`);
    console.log(`Minimum of 1, 2, 3, 4: ${Math.min(1, 2, 3, 4)}`);
    console.log(`Natural logarithm of 10: ${Math.log(10)}`);
    console.log(`Base 10 logarithm of 100: ${Math.log10(100)}`);
}

/**
 * Demonstrates trigonometric functions
 * @param {number} angle - Angle in degrees
 */
function trigonometry(angle) {
    const radians = angle * (Math.PI / 180);
    console.log('\nTrigonometric Functions:');
    console.log(`Sine of ${angle}°: ${Math.sin(radians)}`);
    console.log(`Cosine of ${angle}°: ${Math.cos(radians)}`);
    console.log(`Tangent of ${angle}°: ${Math.tan(radians)}`);
}

// Main program
console.log('Welcome to the Mathematical Operations Program!');

// Example values
const a = 10;
const b = 5;
const x = 3;
const y = 4;
const angle = 45;

// Run demonstrations
basicArithmetic(a, b);
advancedMath(x, y);
mathObjectDemo();
trigonometry(angle); 