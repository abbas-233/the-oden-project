// Get the container element
const container = document.getElementById('container');

// Create a red paragraph
const redParagraph = document.createElement('p');
redParagraph.textContent = "Hey I'm red!";
redParagraph.style.color = 'red';
container.appendChild(redParagraph);

// Create a blue h3
const blueH3 = document.createElement('h3');
blueH3.textContent = "I'm a blue h3!";
blueH3.style.color = 'blue';
container.appendChild(blueH3);

// Create a div with black border and pink background
const div = document.createElement('div');
div.style.border = '2px solid black';
div.style.backgroundColor = 'pink';
div.style.padding = '20px';
div.style.margin = '10px 0';

// Create h1 inside the div
const divH1 = document.createElement('h1');
divH1.textContent = "I'm in a div";
div.appendChild(divH1);

// Create paragraph inside the div
const divParagraph = document.createElement('p');
divParagraph.textContent = "ME TOO!";
div.appendChild(divParagraph);

// Add the div to the container
container.appendChild(div); 