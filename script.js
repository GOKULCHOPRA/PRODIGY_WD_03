const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const restartBtn = document.getElementById('restart');

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;

const winningCombinations = [
  [0, 1, 2], // Row 1
  [3, 4, 5], // Row 2
  [6, 7, 8], // Row 3
  [0, 3, 6], // Column 1
  [1, 4, 7], // Column 2
  [2, 5, 8], // Column 3
  [0, 4, 8], // Diagonal 1
  [2, 4, 6]  // Diagonal 2
];

// Handle cell click
function handleCellClick(event) {
  const index = event.target.dataset.index;

  // If cell is already filled or game is over
  if (board[index] !== '' || !gameActive) {
    return;
  }

  // Update board and UI
  board[index] = currentPlayer;
  event.target.textContent = currentPlayer;

  // Check if current player wins
  if (checkWinner()) {
    statusText.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
    return;
  }

  // Check for draw
  if (!board.includes('')) {
    statusText.textContent = "It's a draw!";
    gameActive = false;
    return;
  }

  // Switch player
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}

// Check winning condition
function checkWinner() {
  return winningCombinations.some(combination => {
    const [a, b, c] = combination;

    return (
      board[a] !== '' &&
      board[a] === board[b] &&
      board[a] === board[c]
    );
  });
}

// Restart the game
function restartGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameActive = true;

  statusText.textContent = "Player X's turn";

  cells.forEach(cell => {
    cell.textContent = '';
  });
}

// Add click event to each cell
cells.forEach(cell => {
  cell.addEventListener('click', handleCellClick);
});

// Restart button event
restartBtn.addEventListener('click', restartGame);