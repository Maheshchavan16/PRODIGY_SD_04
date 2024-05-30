function solveSudoku() {
    const grid = [];
    for (let i = 0; i < 9; i++) {
        grid.push([]);
        for (let j = 0; j < 9; j++) {
            const cell = document.getElementById(`cell-${i}-${j}`).value;
            grid[i].push(cell === '' ? 0 : parseInt(cell));
        }
    }

    // Send the grid to the Java backend for solving
    fetch('http://localhost:8080/solve', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(grid),
    })
    .then(response => response.json())
    .then(solution => displaySolution(solution))
    .catch(error => console.error('Error:', error));
}

function displaySolution(grid) {
    const solutionContainer = document.getElementById('solution');
    solutionContainer.innerHTML = ''; // Clear previous solution

    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.innerText = grid[i][j];
            solutionContainer.appendChild(cell);
        }
    }
}

// Generate the input grid
document.addEventListener('DOMContentLoaded', () => {
    const gridContainer = document.getElementById('sudoku-grid');
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const input = document.createElement('input');
            input.type = 'number';
            input.min = '1';
            input.max = '9';
            input.classList.add('cell');
            input.id = `cell-${i}-${j}`;
            gridContainer.appendChild(input);
        }
    }
});
