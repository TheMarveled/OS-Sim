const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let snake = [{ x: 10, y: 10 }];
let direction = { x: 0, y: 0 };
let food = { x: 0, y: 0 };
let score = 0;
let gameInterval;

// Function to create food at a random location
function createFood() {
    food.x = Math.floor(Math.random() * (canvas.width / 10)) * 10;
    food.y = Math.floor(Math.random() * (canvas.height / 10)) * 10;
}

// Function to start the game
function startGame() {
    score = 0;
    snake = [{ x: 10, y: 10 }];
    direction = { x: 0, y: 0 };
    createFood();
    if (gameInterval) clearInterval(gameInterval);
    gameInterval = setInterval(updateGame, 100);
    document.getElementById('startBtn').style.display = 'none';
    document.getElementById('restartBtn').style.display = 'block';
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
    } else {
        snake.pop();
    }
}

// Function to draw the snake
function drawSnake() {
    snake.forEach(segment => {
        ctx.fillStyle = 'green';
        ctx.fillRect(segment.x, segment.y, 10, 10);
    });
}

// Function to draw the food
function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, 10, 10);
}

// Function to check for collisions
function checkCollision() {
    const head = snake[0];
    
    // Check wall collisions
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
    alert(`Game Over! Your score: ${score}`);
    document.getElementById('startBtn').style.display = 'block';
    document.getElementById('restartBtn').style.display = 'none';
}

// Event listener for keyboard controls
document.addEventListener('keydown', (event) => {
    switch(event.key) {
        case 'ArrowUp':
            if (direction.y === 0) direction = { x: 0, y: -10 };
            break;
        case 'ArrowDown':
            if (direction.y === 0) direction = { x: 0, y: 10 };
            break;
        case 'ArrowLeft':
            if (direction.x === 0) direction = { x: -10, y: 0 };
            break;
        case 'ArrowRight':
            if (direction.x === 0) direction = { x: 10, y: 0 };
            break;
    }
});

// Start the game when the button is clicked
document.getElementById('startBtn').addEventListener('click', startGame);

// Restart the game
document.getElementById('restartBtn').addEventListener('click', startGame);
