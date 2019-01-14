let grid = document.querySelector('.grid');
let reset_btn = document.querySelector('#reset');
let toggle_mode_btn = document.querySelector('#mode');
let toggle_mode_lbl = document.querySelector('#mode-label');
let grid_height = 450;
let grayscale_mode = true;

function randomColour() {
    return Math.floor(Math.random()*16777215).toString(16);
}

function clearGrid() {
    Array.from(grid.children).forEach(child => grid.removeChild(child));
}

function generateGrid(size) {
    clearGrid();
    for (let i = 0; i < size; i++) {
        let row = document.createElement('div');
        row.setAttribute('class', 'grid-row');
        
        for (let j = 0; j < size; j++) {
            let cell = generateCell(i, j, grid_height/size, 0);
            row.appendChild(cell);
        }
        
        grid.appendChild(row);
        grid.appendChild(generateClearfix());
    }
}

function shakeFrame() {
    // Shake the frame to simulate reset
    let frame = document.querySelector('.frame');
    frame.classList.add('shake-frame');
    frame.addEventListener('animationend', e => {
        frame.classList.remove('shake-frame');
    }, { once : true });
}

function resetGrid() {
    let size = prompt("Please enter the size of the grid you would like to draw on with a whole number between 1 and 400:");
    
    if (size === null) {
        // Disregard as request was cancelled
        return;
    }
    
    shakeFrame();
    
    if ((+size > 0) && (+size < 401)) {
        generateGrid(Number(size));
    } else {
        // Set to default of 20
        alert('Invalid value supplied - resetting grid with value of \"20\"');
        generateGrid(20);
    }
}

function generateCell(row, column, height, width) {
    let cell = document.createElement('div');
    cell.setAttribute('class', 'grid-cell');
    cell.setAttribute('data-row', `${row}`);
    cell.setAttribute('data-col', `${column}`);
    cell.setAttribute('data-painted', 1);
    cell.style.height = `${height}`;
    cell.addEventListener('mouseover', paintCell);
    return cell;
}

function generateClearfix() {
    let cell = document.createElement('div');
    cell.setAttribute('class', 'clear-fix');
    return cell;
}

function paintCell(e) {
    let cell = e.target;
    if (grayscale_mode) {
        let paintedVal = +(cell.getAttribute('data-painted'));
        if (paintedVal > 10) { return }
        cell.style.backgroundColor = `rgba(0,0,0,${paintedVal / 10})`;
        cell.setAttribute('data-painted', ++paintedVal);
    } else {
        cell.style.backgroundColor = `#${randomColour()}`;
        cell.setAttribute('data-painted', 1);
    }
}

window.addEventListener("DOMContentLoaded", generateGrid(20));
reset_btn.addEventListener("click", resetGrid);

toggle_mode_btn.addEventListener('click', switchMode => {
    grayscale_mode = !grayscale_mode;
    toggle_mode_lbl.textContent = grayscale_mode ? "Gray" : "Colour";
})
toggle_mode_btn.addEventListener('touchend', switchMode => {
    grayscale_mode = !grayscale_mode;
    toggle_mode_lbl.textContent = grayscale_mode ? "Gray" : "Colour";
})