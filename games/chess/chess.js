const boardElement = document.getElementById('board');
const resetButton = document.getElementById('reset-button');
const undoButton = document.getElementById('undo-button'); // Undo button
let moveHistory = []; // Array to store move history

// Variable to store the last move information
let lastMove = null;

// Map to store the piece images
const pieceImages = {
    'r': 'pieces/black/rook.png',
    'n': 'pieces/black/knight.png',
    'b': 'pieces/black/bishop.png',
    'q': 'pieces/black/queen.png',
    'k': 'pieces/black/king.png',
    'p': 'pieces/black/pawn.png',
    'R': 'pieces/white/rook.png',
    'N': 'pieces/white/knight.png',
    'B': 'pieces/white/bishop.png',
    'Q': 'pieces/white/queen.png',
    'K': 'pieces/white/king.png',
    'P': 'pieces/white/pawn.png',
};

const initialBoard = [
    ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
    ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
    ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
];

let selectedPiece = null;
let selectedSquare = null;

let whiteTime = 600; // 10 minutes in seconds
let blackTime = 600; // 10 minutes in seconds
let activeTimer = 'white'; // Track whose turn it is
let timerInterval;

// Load the audio file
const moveAudio = new Audio('audio/move.mp3');

// Function to start the timer
function startTimer() {
    timerInterval = setInterval(() => {
        if (activeTimer === 'white') {
            whiteTime--;
            document.getElementById('white-timer').innerText = formatTime(whiteTime);
        } else {
            blackTime--;
            document.getElementById('black-timer').innerText = formatTime(blackTime);
        }
        // Check for time expiration logic here
        if (whiteTime <= 0 || blackTime <= 0) {
            clearInterval(timerInterval);
            alert(`${activeTimer.charAt(0).toUpperCase() + activeTimer.slice(1)} time is up!`);
        }
    }, 1000);
}

// Function to format time in mm:ss
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

// Function to switch turns
function switchTurn() {
    activeTimer = activeTimer === 'white' ? 'black' : 'white';
}

// Create the chessboard
function createBoard() {
    boardElement.innerHTML = ''; // Clear the board before creating
    initialBoard.forEach((row, rowIndex) => {
        row.forEach((piece, colIndex) => {
            const square = document.createElement('div');
            square.classList.add('square');
            square.setAttribute('data-row', rowIndex);
            square.setAttribute('data-col', colIndex);

            if (piece) {
                square.style.backgroundImage = `url(${pieceImages[piece]})`;
                square.style.backgroundSize = 'contain';
                square.style.backgroundRepeat = 'no-repeat';
                square.style.backgroundPosition = 'center';
            }

            square.addEventListener('click', onSquareClick);
            boardElement.appendChild(square);
        });
    });
}

// Handle square click events
function onSquareClick(event) {
    const square = event.currentTarget;
    const row = square.getAttribute('data-row');
    const col = square.getAttribute('data-col');

    if (selectedPiece) {
        // Save current board state before moving
        moveHistory.push({ piece: selectedPiece, from: { row: selectedSquare.getAttribute('data-row'), col: selectedSquare.getAttribute('data-col') }, to: { row: row, col: col } });

        // Move the piece to the clicked square
        square.style.backgroundImage = `url(${pieceImages[selectedPiece]})`;
        square.style.backgroundSize = 'contain';
        square.style.backgroundRepeat = 'no-repeat';
        square.style.backgroundPosition = 'center';
        selectedSquare.style.backgroundImage = '';
        selectedPiece = null;
        selectedSquare.classList.remove('selected');

        // Play the move audio
        moveAudio.currentTime = 0; // Reset audio to start
        moveAudio.play();

        // Switch turns after a move
        switchTurn();
    } else {
        // Select the piece
        if (square.style.backgroundImage) {
            selectedPiece = Object.keys(pieceImages).find(key => pieceImages[key] === square.style.backgroundImage.replace('url("', '').replace('")', ''));
            selectedSquare = square;
            square.classList.add('selected');
        }
    }
}

// Function to undo the last move
function undoMove() {
    if (moveHistory.length === 0) return; // No moves to undo

    const lastMove = moveHistory.pop(); // Get the last move
    const fromRow = lastMove.from.row;
    const fromCol = lastMove.from.col;
    const toRow = lastMove.to.row;
    const toCol = lastMove.to.col;

    // Restore the piece to the original square
    const fromSquare = boardElement.querySelector(`.square[data-row="${fromRow}"][data-col="${fromCol}"]`);
    const toSquare = boardElement.querySelector(`.square[data-row="${toRow}"][data-col="${toCol}"]`);

    fromSquare.style.backgroundImage = `url(${pieceImages[lastMove.piece]})`;
    fromSquare.style.backgroundSize = 'contain';
    fromSquare.style.backgroundRepeat = 'no-repeat';
    fromSquare.style.backgroundPosition = 'center';
    toSquare.style.backgroundImage = ''; // Clear the target square
    selectedPiece = null;
    selectedSquare.classList.remove('selected');

    // Switch turns back
    activeTimer = activeTimer === 'white' ? 'black' : 'white';
}

// Attach the undo function to the undo button
undoButton.addEventListener('click', undoMove);

// Function to reset the game
function resetGame() {
    clearInterval(timerInterval); // Stop the timer
    whiteTime = 600; // Reset white time
    blackTime = 600; // Reset black time
    activeTimer = 'white'; // Reset active timer
    document.getElementById('white-timer').innerText = formatTime(whiteTime);
    document.getElementById('black-timer').innerText = formatTime(blackTime);
    selectedPiece = null;
    selectedSquare = null;
    moveHistory = []; // Clear move history
    createBoard(); // Recreate the board
}

// Start the timer when the game begins
startTimer();
createBoard();

// Attach reset function to the reset button
resetButton.addEventListener('click', resetGame);

const backButton = document.getElementById('back-button');

// Attach event listener to the back button
backButton.addEventListener('click', () => {
    window.location.href = '/Users/kyledring/Library/Mobile Documents/com~apple~CloudDocs/OS Sim/OS-Sim/desktop/desktop.html'; // Adjust the path as necessary
});
