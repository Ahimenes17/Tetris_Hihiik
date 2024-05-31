var btn1 = document.getElementById("theme-button");
var link = document.getElementById("theme-link");
var btn2 = document.getElementById("restart-button");
var btn3 = document.getElementById("btn2Back")

btn1.addEventListener("click", function () { ChangeTheme(); });

btn2.addEventListener("click", function () { Restart();});

btn3.addEventListener("click", function () {BackMenu ()})

function BackMenu(){
    window.location.href = "file:///home/ahimenes17/%D0%94%D0%BE%D0%BA%D1%83%D0%BC%D0%B5%D0%BD%D1%82%D1%8B/GitHub/Tetris_Hihiik/menu/menu.html"; 
}

function Restart(){
	location.reload();
}

function ChangeTheme()
{
    let lightTheme = "LightTheme.css";
    let darkTheme = "DarkTheme.css";

    var currTheme = link.getAttribute("href");
    var theme = "";

    if(currTheme == lightTheme)
    {
   	 currTheme = darkTheme;
   	 theme = "dark";
    }
    else
    {    
   	 currTheme = lightTheme;
   	 theme = "light";
    }

    link.setAttribute("href", currTheme);

    Save(theme);
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// generate a new tetromino sequence

function generateSequence() {
  const sequence = ['I', 'J', 'L', 'O', 'S', 'T', 'Z'];

  while (sequence.length) {
    const rand = getRandomInt(0, sequence.length - 1);
    const name = sequence.splice(rand, 1)[0];
    tetrominoSequence.push(name);
  }
}

// get the next tetromino in the sequence
function getNextTetromino() {
  if (tetrominoSequence.length === 0) {
    generateSequence();
  }

  const name = tetrominoSequence.pop();

  return getTetromino(name);
}

function getTetromino(name) {

  const matrix = tetrominos[name];

  // I and O start centered, all others start in left-middle
  const col = playfield[0].length / 2 - Math.ceil(matrix[0].length / 2);

  // I starts on row 21 (-1), all others start on row 22 (-2)
  const row = name === 'I' ? -1 : -2;

  return {
    name: name,      // name of the piece (L, O, etc.)
    matrix: matrix,  // the current rotation matrix
    row: row,        // current row (starts offscreen)
    col: col         // current col
  };
}
// rotate an NxN matrix 90deg

function rotate(matrix) {
  const N = matrix.length - 1;
  const result = matrix.map((row, i) =>
    row.map((val, j) => matrix[N - j][i])
  );

  return result;
}

// check to see if the new matrix/row/col is valid
function isValidMove(matrix, cellRow, cellCol) {
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      if (matrix[row][col] && (
          // outside the game bounds
          cellCol + col < 0 ||
          cellCol + col >= playfield[0].length ||
          cellRow + row >= playfield.length ||
          // collides with another piece
          playfield[cellRow + row][cellCol + col])
        ) {
        return false;
      }
    }
  }

  return true;
}

function clearLines() {
  let linesCleared = 0;
  // check for line clears starting from the bottom and working our way up
  for (let row = playfield.length - 1; row >= 0; ) {
    if (playfield[row].every(cell => !!cell)) {
      linesCleared++;
      // drop every row above this one
      for (let r = row; r >= 0; r--) {
        for (let c = 0; c < playfield[r].length; c++) {
          playfield[r][c] = playfield[r-1][c];
        }
      }
    }
    else {
      row--;
    }
  }
  updateScore(calculatePoints(linesCleared));
  updateLevel(linesCleared);
}

function calculatePoints(linesCleared) {
  let points = 0;
  switch (linesCleared) {
    case 1:
      points = POINTS.SINGLE;
      break;
    case 2:
      points = POINTS.DOUBLE;
      break;
    case 3:
      points = POINTS.TRIPLE;
      break;
    case 4:
      points = POINTS.TETRIS;
      break;
    default:
      points = 0;
      break;
  }
  result = points * (1 + (accountValues.level - 1 / 10 * 2))
  return result;
}

// place the tetromino on the playfield
function placeTetromino() {
  for (let row = 0; row < tetromino.matrix.length; row++) {
    for (let col = 0; col < tetromino.matrix[row].length; col++) {
      if (tetromino.matrix[row][col]) {

        // game over if piece has any part offscreen
        if (tetromino.row + row < 0) {
          return showGameOver();
        }

        playfield[tetromino.row + row][tetromino.col + col] = tetromino.name;
      }
    }
  }

  clearLines();

  tetromino = getNextTetromino();

  memoryCooldown = false;
}

function updateScore(points) {
  accountValues.score += points;

  const scoreElement = document.getElementById('score');
  scoreElement.textContent = `${accountValues.score}`;
}

function updateLevel(lines) {
  accountValues.linesCleared += lines;
  accountValues.level = (accountValues.linesCleared - accountValues.linesCleared % 10) / 10 + 1
  const levelElement = document.getElementById('level');
  levelElement.textContent = `${accountValues.level}`
}

// show the game over screen
function showGameOver() {
  cancelAnimationFrame(rAF);
  gameOver = true;

  context.fillStyle = 'black';
  context.globalAlpha = 0.75;
  context.fillRect(0, canvas.height / 2 - 30, canvas.width, 60);

  context.globalAlpha = 1;
  context.fillStyle = 'white';
  context.font = '36px monospace';
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillText('GAME OVER!', canvas.width / 2, canvas.height / 2);
}

const canvasMemory = document.getElementById('memory');
const canvasNext = document.getElementById('next');

const cMemory = canvasMemory.getContext('2d');
const cNext = canvasNext.getContext('2d');

const canvas = document.getElementById('game');
const context = canvas.getContext('2d');
const grid = 32;
const tetrominoSequence = [];

// keep track of what is in every cell of the game using a 2d array
// tetris playfield is 10x20, with a few rows offscreen
const playfield = [];

// populate the empty state
for (let row = -2; row < 20; row++) {
  playfield[row] = [];

  for (let col = 0; col < 10; col++) {
    playfield[row][col] = 0;
  }
}

// how to draw each tetromino
// @see https://tetris.fandom.com/wiki/SRS
const tetrominos = {
  'I': [
    [0,0,0,0],
    [1,1,1,1],
    [0,0,0,0],
    [0,0,0,0]
  ],
  'J': [
    [1,0,0],
    [1,1,1],
    [0,0,0],
  ],
  'L': [
    [0,0,1],
    [1,1,1],
    [0,0,0],
  ],
  'O': [
    [1,1],
    [1,1],
  ],
  'S': [
    [0,1,1],
    [1,1,0],
    [0,0,0],
  ],
  'Z': [
    [1,1,0],
    [0,1,1],
    [0,0,0],
  ],
  'T': [
    [0,1,0],
    [1,1,1],
    [0,0,0],
  ]
};

// color of each tetromino
const colors = {
  'I': 'DeepSkyBlue',
  'O': '#e3aa13',
  'T': 'purple',
  'S': 'green',
  'Z': 'FireBrick',
  'J': '#1560BD',
  'L': 'Chocolate'
};

const POINTS = {
  SINGLE: 100,
  DOUBLE: 300,
  TRIPLE: 500,
  TETRIS: 800,
  SOFT_DROP: 1,
  HARD_DROP: 2
}

let count = 0;
let tetromino = getNextTetromino();
let rAF = null;  // keep track of the animation frame so we can cancel it
let gameOver = false;


let accountValues = {
  score: 0,
  linesCleared: 0,
  level: 1,
}

var isPaused = false;

const nextField = [];
const memoryField = [];

// populate the empty state
for (let row = 0; row < 3; row++) {
  nextField[row] = [];
  memoryField[row] = [];
  for (let col = 0; col < 3; col++) {
    nextField[row][col] = 0;
    memoryField[row][col] = 0
  }
}

let memory = ''; 
let memoryCooldown = false;

function setMemory() {
  if (memoryCooldown == false) {
    let memoryTemp = tetromino.name;
    if (memory == '') {
      memory = memoryTemp;
      tetromino = getNextTetromino();
    }
    else {
      tetromino = getTetromino(memory);
      memory = memoryTemp;
    }
    delete memoryTemp;
    memoryCooldown = true;
  }
}

// game loop
function loop() {
  rAF = requestAnimationFrame(loop);
  context.clearRect(0,0,canvas.width,canvas.height);
  cNext.clearRect(0,0,canvasNext.width,canvasNext.height);
  cMemory.clearRect(0,0,canvasMemory.width,canvasMemory.height)
  if (!isPaused) {
    // draw the playfield
    for (let row = 0; row < 20; row++) {
      for (let col = 0; col < 10; col++) {
        if (playfield[row][col]) {
          const name = playfield[row][col];
          context.fillStyle = colors[name];

          // drawing 1 px smaller than the grid creates a grid effect
          context.fillRect(col * grid, row * grid, grid-1, grid-1);
        }
      }
    }

    // draw the next tetromino
    if (tetrominoSequence.length === 0) {
      generateSequence();
    }
    nextName = tetrominoSequence[tetrominoSequence.length-1];
    nextMatrix = tetrominos[nextName];
    for (let row = 0; row < nextMatrix.length; row++) {
      for (let col = 0; col < nextMatrix.length; col++) {
        if (nextMatrix[row][col]) {
          cNext.fillStyle = colors[nextName];

          // drawing 1 px smaller than the grid creates a grid effect
          cNext.fillRect(col * grid, row * grid, grid-1, grid-1);
        }
      }
    }

    // draw the memory tetromino
    if (memory != '') {
      memoryMatrix = tetrominos[memory];
      for (let row = 0; row < memoryMatrix.length; row++) {
        for (let col = 0; col < memoryMatrix.length; col++) {
          if (memoryMatrix[row][col]) {
            cMemory.fillStyle = colors[memory];

            // drawing 1 px smaller than the grid creates a grid effect
            cMemory.fillRect(col * grid, row * grid, grid-1, grid-1);
          }
        }
      }
    }
    // draw the active tetromino
    if (tetromino) {
      let levelFrameChange = accountValues.level * 7; 
      if (++count > (40 - Math.min(levelFrameChange, 37))) {
        tetromino.row++;
        count = 0;

        // place piece if it runs into anything
        if (!isValidMove(tetromino.matrix, tetromino.row, tetromino.col)) {
          tetromino.row--;
          placeTetromino();
        }
      }
      
      context.fillStyle = colors[tetromino.name];

      for (let row = 0; row < tetromino.matrix.length; row++) {
        for (let col = 0; col < tetromino.matrix[row].length; col++) {
          if (tetromino.matrix[row][col]) {

            // drawing 1 px smaller than the grid creates a grid effect
            context.fillRect((tetromino.col + col) * grid, (tetromino.row + row) * grid, grid-1, grid-1);
          }
        }
      }
    }
  } else {
    context.fillStyle = 'red';
    context.font = '36px monospace';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText('PAUSED', canvas.width / 2, canvas.height / 2);
  }
}

// listen to keyboard events to move the active tetromino
document.addEventListener('keydown', function(e) {
  if (gameOver) return;

  if (e.code == 'Escape') isPaused = !isPaused;

  if (e.code == 'ShiftLeft' || e.code == 'ShiftRight') { 
    setMemory();
  }

  if (!isPaused) {
    // left and right arrow keys (move)
    if (e.code == 'ArrowLeft' || e.code == 'ArrowRight') {
      const col = e.code == 'ArrowLeft'
        ? tetromino.col - 1
        : tetromino.col + 1;

      if (isValidMove(tetromino.matrix, tetromino.row, col)) {
        tetromino.col = col;
      }
    }

    // up arrow key (rotate)
    if (e.code == 'ArrowUp') {
      const matrix = rotate(tetromino.matrix);
      if (isValidMove(matrix, tetromino.row, tetromino.col)) {
        tetromino.matrix = matrix;
      }
    }

    // down arrow key (drop)
    if (e.code == 'ArrowDown') {
      const row = tetromino.row + 1;
      if (!isValidMove(tetromino.matrix, row, tetromino.col)) {
        tetromino.row = row - 1;

        placeTetromino();
        return;
      }

      tetromino.row = row;
      updateScore(POINTS.SOFT_DROP);
    }

    if (e.code == 'Space') {
      const row = tetromino.row;
      dropCount = 0;
      while (isValidMove(tetromino.matrix, row + dropCount + 1, tetromino.col)) {
        dropCount += 1;
      }

      updateScore(dropCount * POINTS.HARD_DROP);
      tetromino.row = row + dropCount;
      placeTetromino();
    }
  }
});

// start the game
rAF = requestAnimationFrame(loop);

