const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

const CELL = 20;
const ROWS = 10;
const COLS = 14;

canvas.width = COLS * CELL;
canvas.height = ROWS * CELL;

const AIR = 0;
const BLOCK = 1;
const LAVA = 2;
const FLAG = 3;

let grid;
let player;
let memory = {};
let levelTimer = 0;
const LEVEL_TIMEOUT = 50;

function stateKey(px, py) {
  return px + "," + py;
}

function isBeatable(px, py) {
  const visited = Array.from({ length: ROWS }, () => Array(COLS).fill(false));
  const queue = [{ x: px, y: py }];
  visited[py][px] = true;

  while (queue.length > 0) {
    const { x, y } = queue.shift();
    if (grid[y][x] === FLAG) return true;

    const moves = [
      { dx: 1, dy: 0 },
      { dx: -1, dy: 0 },
      { dx: 0, dy: 1 },
      { dx: 0, dy: -1 },
    ];

    for (let m of moves) {
      const nx = x + m.dx;
      const ny = y + m.dy;
      if (
        nx >= 0 && nx < COLS &&
        ny >= 0 && ny < ROWS &&
        !visited[ny][nx] &&
        grid[ny][nx] !== BLOCK &&
        grid[ny][nx] !== LAVA
      ) {
        visited[ny][nx] = true;
        queue.push({ x: nx, y: ny });
      }
    }
  }

  return false;
}

function generateLevel() {
  let beatable = false;

  while (!beatable) {
    grid = Array.from({ length: ROWS }, () =>
      Array.from({ length: COLS }, () => AIR)
    );

    for (let y = 0; y < ROWS; y++) {
      for (let x = 0; x < COLS; x++) {
        if (Math.random() < 0.15) grid[y][x] = BLOCK;
        else if (Math.random() < 0.05) grid[y][x] = LAVA;
      }
    }

    player = { x: 0, y: ROWS - 1 };
    grid[player.y][player.x] = AIR;

    const fx = COLS - 1;
    const fy = Math.floor(Math.random() * ROWS);
    grid[fy][fx] = FLAG;

    beatable = isBeatable(player.x, player.y);
  }

  levelTimer = 0;
}

function step() {
  levelTimer++;

  if (levelTimer > LEVEL_TIMEOUT) {
    console.log("Level timeout! Resetting level.");
    generateLevel();
    return;
  }

  const moves = [
    { dx: 1, dy: 0 },
    { dx: -1, dy: 0 },
    { dx: 0, dy: -1 },
    { dx: 0, dy: 1 },
  ];

  let validMoves = moves.filter(m => {
    const nx = player.x + m.dx;
    const ny = player.y + m.dy;
    return nx >= 0 && nx < COLS && ny >= 0 && ny < ROWS;
  });

  const key = stateKey(player.x, player.y);

  if (memory[key]) {
    validMoves = validMoves.filter(m => !memory[key].bad?.[m.dx + "," + m.dy]);
  }

  if (validMoves.length === 0) validMoves = moves;

  let goodMoves = validMoves.filter(m => memory[key]?.good?.[m.dx + "," + m.dy]);
  const move = goodMoves.length > 0
    ? goodMoves[Math.floor(Math.random() * goodMoves.length)]
    : validMoves[Math.floor(Math.random() * validMoves.length)];

  const nx = player.x + move.dx;
  const ny = player.y + move.dy;

  if (grid[ny][nx] === BLOCK) return;

  if (grid[ny][nx] === LAVA) {
    if (!memory[key]) memory[key] = {};
    if (!memory[key].bad) memory[key].bad = {};
    memory[key].bad[move.dx + "," + move.dy] = true;
    generateLevel();
    return;
  }

  if (grid[ny][nx] === FLAG) {
    if (!memory[key]) memory[key] = {};
    if (!memory[key].good) memory[key].good = {};
    memory[key].good[move.dx + "," + move.dy] = true;
    generateLevel();
    return;
  }

  player.x = nx;
  player.y = ny;
}

function draw() {
  ctx.fillStyle = "orange";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      if (grid[y][x] === BLOCK) ctx.fillStyle = "black";
      else if (grid[y][x] === LAVA) ctx.fillStyle = "red";
      else if (grid[y][x] === FLAG) ctx.fillStyle = "lime";
      else continue;

      ctx.fillRect(x * CELL, y * CELL, CELL, CELL);
    }
  }

  ctx.fillStyle = "white";
  ctx.fillRect(player.x * CELL, player.y * CELL, CELL, CELL);
}

function gameLoop() {
  step();
  draw();
}

generateLevel();
setInterval(gameLoop, 8);
