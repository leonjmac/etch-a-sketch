let grid = document.querySelector('#grid');


function createGrid(size) {
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            addSquareToGrid();
        }
        // create new row
        
        // Add square to grid
    }
}

function addSquareToGrid() {
    let square = document.createElement('div');
    let text = document.createElement('p');
    text.textContent = 'testing';
    square.appendChild(text);
    square.setAttribute('class', 'square');
    square.setAttribute('style', 'background-color:red; width:20px; height:20px;');
    grid.appendChild(square);
}

function clearGrid() {
    Array.from(grid.children).forEach(child => grid.removeChild(child));
}