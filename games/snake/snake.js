const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let snake = [{ x: 190, y: 190 }];
let direction = { x: 0, y: 0 };
let food = { x: 0, y: 0 };
let score = 0;
let gameInterval;
const snakeSize = 10; // Size of the snake
const appleSize = 15; // Adjusted size of the apple

const crunchSound = new Audio('crunch.mp3'); // Crunch sound
const appleImage = new Image();
appleImage.src = 'apple.png'; // Load the apple image

// Function to create food at a random location
function createFood() {
    food.x = Math.floor(Math.random() * (canvas.width / snakeSize)) * snakeSize;
    food.y = Math.floor(Math.random() * (canvas.height / snakeSize)) * snakeSize;
}

// Function to start the game
function startGame() {
    score = 0;
    snake = [{ x: 190, y: 190 }]; // Start in the middle of the canvas
    direction = { x: 0, y: 0 };
    createFood();
    if (gameInterval) clearInterval(gameInterval);
    gameInterval = setInterval(updateGame, 100);
    document.getElementById('startBtn').style.display = 'none';
    document.getElementById('restartBtn').style.display = 'block';
    document.getElementById('gameOverModal').style.display = 'none'; // Hide game over modal
    updateScoreDisplay(); // Update score display on game start
}

// Function to update the score display
function updateScoreDisplay() {
    document.getElementById('scoreDisplay').innerText = `Score: ${score}`;
}

// Function to update the game state
function updateGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    moveSnake();
    drawSnake();
    drawFood();
    checkCollision();
}

// Function to move the snake
function moveSnake() {
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score++;
        createFood();
        crunchSound.play(); // Play crunch sound
        updateScoreDisplay(); // Update score display after eating food
    } else {
        snake.pop();
    }
}

// Function to draw the snake
function drawSnake() {
    snake.forEach(segment => {
        ctx.fillStyle = 'green';
        ctx.fillRect(segment.x, segment.y, snakeSize, snakeSize);
    });
}

// Function to draw the food (apple image)
function drawFood() {
    ctx.drawImage(appleImage, food.x, food.y, appleSize, appleSize); // Draw the apple image with adjusted size
}

// Function to check for collisions
function checkCollision() {
    const head = snake[0];

    // Check wall collisions (adjust for snake size)
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
        endGame();
    }

    // Check self collisions
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            endGame();
        }
    }
}

// Function to end the game
function endGame() {
    clearInterval(gameInterval);
    document.getElementById('gameOverModal').style.display = 'block'; // Show the Game Over modal
    document.getElementById('finalScore').innerText = `Your score: ${score}`;
    document.getElementById('startBtn').style.display = 'block';
    document.getElementById('restartBtn').style.display = 'none';
}

// Event listener for keyboard controls
document.addEventListener('keydown', (event) => {
    switch(event.key) {
        case 'ArrowUp':
        case 'w':
            if (direction.y === 0) direction = { x: 0, y: -snakeSize };
            break;
        case 'ArrowDown':
        case 's':
            if (direction.y === 0) direction = { x: 0, y: snakeSize };
            break;
        case 'ArrowLeft':
        case 'a':
            if (direction.x === 0) direction = { x: -snakeSize, y: 0 };
            break;
        case 'ArrowRight':
        case 'd':
            if (direction.x === 0) direction = { x: snakeSize, y: 0 };
            break;
    }
    event.preventDefault(); // Prevent page scroll on arrow key press
});

// Start the game when the button is clicked
document.getElementById('startBtn').addEventListener('click', startGame);

// Restart the game when the button is clicked
document.getElementById('restartBtn').addEventListener('click', () => {
    document.getElementById('gameOverModal').style.display = 'none'; // Hide the Game Over Modal
    startGame(); // Restart the game
});

// Back button functionality to go to desktop.html
document.getElementById('backBtn').addEventListener('click', () => {
    window.location.href = '/Users/kyledring/Library/Mobile Documents/com~apple~CloudDocs/OS Sim/OS-Sim/desktop/desktop.html'; // Navigate to desktop.html
});

// Restart game via modal
document.getElementById('restartModalBtn').addEventListener('click', () => {
    document.getElementById('gameOverModal').style.display = 'none';
    startGame();
});
