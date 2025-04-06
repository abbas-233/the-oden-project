document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const gridContainer = document.getElementById('grid-container');
    const sizeBtn = document.getElementById('size-btn');
    const clearBtn = document.getElementById('clear-btn');
    const classicModeBtn = document.getElementById('classic-mode');
    const rainbowModeBtn = document.getElementById('rainbow-mode');
    const shadingModeBtn = document.getElementById('shading-mode');

    // Game state
    let currentMode = 'classic';
    let gridSize = 16;
    let isMouseDown = false;

    // Initialize the grid
    createGrid(gridSize);

    // Event Listeners
    sizeBtn.addEventListener('click', changeGridSize);
    clearBtn.addEventListener('click', clearGrid);
    classicModeBtn.addEventListener('click', () => setMode('classic'));
    rainbowModeBtn.addEventListener('click', () => setMode('rainbow'));
    shadingModeBtn.addEventListener('click', () => setMode('shading'));

    // Mouse event listeners for drawing
    document.addEventListener('mousedown', () => isMouseDown = true);
    document.addEventListener('mouseup', () => isMouseDown = false);

    // Functions
    function createGrid(size) {
        // Clear existing grid
        gridContainer.innerHTML = '';
        
        // Calculate square size
        const squareSize = 100 / size;
        
        // Create grid squares
        for (let i = 0; i < size * size; i++) {
            const square = document.createElement('div');
            square.classList.add('grid-square');
            square.style.width = `${squareSize}%`;
            square.style.height = `${squareSize}%`;
            
            // Add event listeners for drawing
            square.addEventListener('mouseover', () => {
                if (isMouseDown) {
                    draw(square);
                }
            });
            
            square.addEventListener('mousedown', () => {
                draw(square);
            });
            
            gridContainer.appendChild(square);
        }
    }

    function draw(square) {
        switch (currentMode) {
            case 'classic':
                square.style.backgroundColor = '#34495e';
                break;
            case 'rainbow':
                square.style.backgroundColor = getRandomColor();
                break;
            case 'shading':
                shadeSquare(square);
                break;
        }
    }

    function getRandomColor() {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return `rgb(${r}, ${g}, ${b})`;
    }

    function shadeSquare(square) {
        const currentOpacity = parseFloat(square.style.opacity) || 0;
        const newOpacity = Math.min(currentOpacity + 0.1, 1);
        square.style.opacity = newOpacity;
        square.style.backgroundColor = '#34495e';
    }

    function changeGridSize() {
        let newSize = prompt('Enter the number of squares per side (max 100):', gridSize);
        newSize = parseInt(newSize);
        
        if (newSize && newSize > 0 && newSize <= 100) {
            gridSize = newSize;
            createGrid(gridSize);
        } else {
            alert('Please enter a valid number between 1 and 100');
        }
    }

    function clearGrid() {
        const squares = document.querySelectorAll('.grid-square');
        squares.forEach(square => {
            square.style.backgroundColor = 'white';
            square.style.opacity = '0';
        });
    }

    function setMode(mode) {
        currentMode = mode;
        
        // Update active button
        classicModeBtn.classList.remove('active');
        rainbowModeBtn.classList.remove('active');
        shadingModeBtn.classList.remove('active');
        
        document.getElementById(`${mode}-mode`).classList.add('active');
    }
}); 