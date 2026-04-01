const GRID_SIZE = 30;
const board = document.getElementById('gameBoard');
let snake, direction, nextDirection, food, score, speed, gameInterval, isRunning;

// ------------------------------
// Utility Functions
// ------------------------------

// Randomly generate food position
function randomFood() {
  return {
    x: Math.floor(Math.random() * GRID_SIZE),
    y: Math.floor(Math.random() * GRID_SIZE),
  };
}

// Handle edge wrapping
function wrapPosition({ x, y }) {
  if (x < 0) x = GRID_SIZE - 1;
  if (x >= GRID_SIZE) x = 0;
  if (y < 0) y = GRID_SIZE - 1;
  if (y >= GRID_SIZE) y = 0;
  return { x, y };
}

// Check if collided with self
function isCollision({ x, y }) {
  return snake.some(seg => seg.x === x && seg.y === y);
}

// Calculate new snake head position
function moveSnake() {
  direction = { ...nextDirection };
  const head = snake[0];
  return wrapPosition({ x: head.x + direction.x, y: head.y + direction.y });
}

// ------------------------------
// Game Mechanics
// ------------------------------

// Initialize the board
function initBoard() {
  board.innerHTML = '';
  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.x = x;
      cell.dataset.y = y;
      board.appendChild(cell);
    }
  }
}

// Handle food eating logic, return if eaten
function handleFood(head) {
  if (head.x === food.x && head.y === food.y) {
    score++;
    document.getElementById('score').textContent = `Score: ${score}`;
    food = randomFood();
    speed = Math.max(10, speed - 2);
    clearInterval(gameInterval);
    gameInterval = setInterval(gameLoop, speed);
    return true;
  }
  return false;
}

// ------------------------------
// Update & Draw
// ------------------------------

// update
function update() {
  const newHead = moveSnake();
  if (isCollision(newHead)) {
    clearInterval(gameInterval);
    isRunning = false;
    alert('Game Over');
    return;
  }
  snake.unshift(newHead);
  if (!handleFood(newHead)) snake.pop();
}

// Get cell by coordinates
function getCell(x, y) {
  return document.querySelector(`.cell[data-x="${x}"][data-y="${y}"]`);
}

// Clear snake and food from the board
function clearBoard() {
  document.querySelectorAll('.cell').forEach(c => c.classList.remove('snake', 'food'));
}

// Draw food
function drawFood() {
  const cell = getCell(food.x, food.y);
  if (cell) {
    cell.classList.add('food');
  }
}

// Draw snake
function drawSnake() {
  for (const segment of snake) {
    const cell = getCell(segment.x, segment.y);
    if (cell) {
      cell.classList.add('snake');
    }
  }
}

// draw
function draw() {
  clearBoard();
  drawFood();
  drawSnake();
}

// ------------------------------
// Control Loop
// ------------------------------

// Main game loop
function gameLoop() {
  if (!isRunning) return;
  update();
  draw();
}

// Start the game
function startGame() {
  clearInterval(gameInterval);
  initBoard();
  snake = [{ x: 2, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 0 }];
  direction = { x: 1, y: 0 };
  nextDirection = { ...direction };
  food = randomFood();
  score = 0;
  speed = 200;
  isRunning = true;
  document.getElementById('score').textContent = `Score: ${score}`;
  gameInterval = setInterval(gameLoop, speed);
}

// Pause / Resume
function togglePause() {
  if (!isRunning) return;
  if (gameInterval) {
    clearInterval(gameInterval);
    gameInterval = null;
  } else {
    gameInterval = setInterval(gameLoop, speed);
  }
}

// Keyboard controls
function handleKey(e) {
  const dirs = {
    ArrowUp:    { x: 0, y: -1 },
    ArrowDown:  { x: 0, y: 1 },
    ArrowLeft:  { x: -1, y: 0 },
    ArrowRight: { x: 1, y: 0 },
  };
  const newDir = dirs[e.code];
  if (newDir && (newDir.x + direction.x !== 0 || newDir.y + direction.y !== 0)) {
    nextDirection = newDir;
  }
}

// ------------------------------
// UI Binding & Init
// ------------------------------

document.getElementById('startBtn').addEventListener('click', startGame);
document.getElementById('pauseBtn').addEventListener('click', togglePause);
window.addEventListener('keydown', handleKey);

initBoard();