console.log(maps);

const canvas = document.querySelector("#game");
const game = canvas.getContext("2d");
const btnUp = document.querySelector("#up");
const btnLeft = document.querySelector("#left");
const btnRight = document.querySelector("#right");
const btnDown = document.querySelector("#down");
const spanLives = document.querySelector("#lives");
const spanTime = document.querySelector("#time");
const spanRecord = document.querySelector("#record");
const pResult = document.querySelector("#result");

let canvaSize;
let elementSize;
let level = 0;
let lives = 4;

let timeStart;
let timePLayer;
let timeInterval;

const playerPosition = {
  x: undefined,
  y: undefined,
};
const giftPosition = {
  x: undefined,
  y: undefined,
};
let enemiesPositions = [];

window.addEventListener("load", setCanvasSize);
window.addEventListener("resize", setCanvasSize);

function setCanvasSize() {
  if (window.innerHeight > window.innerWidth) {
    canvaSize = window.innerWidth * 0.8;
  } else {
    canvaSize = window.innerHeight * 0.8;
  }

  canvas.setAttribute("width", canvaSize);
  canvas.setAttribute("height", canvaSize);

  elementSize = canvaSize / 10 - 1;

  startGame();
}

function startGame() {
  game.font = elementSize + "px Verdana";
  game.textAlign = "";

  const map = maps[level];

  if (!map) {
    gameWin();
    return;
  }

  if (!timeStart) {
    timeStart = Date.now();
    timeInterval = setInterval(showTime, 100);
    showRecord();
  }

  const mapRows = map.trim().split("\n");
  const mapRowCols = mapRows.map((row) => row.trim().split(""));

  showLives();

  enemiesPositions = [];
  game.clearRect(0, 0, canvaSize, canvaSize);

  mapRowCols.forEach((row, rowI) => {
    row.forEach((col, colI) => {
      const emoji = emojis[col];
      const posX = elementSize * colI - 1;
      const posY = elementSize * (rowI + 1);

      if (col == "O") {
        if (!playerPosition.x && !playerPosition.y) {
          playerPosition.x = posX;
          playerPosition.y = posY;
          console.log({ playerPosition });
        }
      } else if (col == "I") {
        giftPosition.x = posX;
        giftPosition.y = posY;
      } else if (col == "X") {
        enemiesPositions.push({
          x: posX,
          y: posY,
        });
      }

      game.fillText(emoji, posX, posY);
    });
  });
  movePlayer();
  console.log(playerPosition);
}

function movePlayer() {
  const giftCollisionX =
    playerPosition.x.toFixed(1) == giftPosition.x.toFixed(1);
  const giftCollisionY =
    playerPosition.y.toFixed(1) == giftPosition.y.toFixed(1);
  const giftCollision = giftCollisionX && giftCollisionY;

  if (giftCollision) {
    levelWin();
    console.log("Pasaste de nivel!!");
  }

  const enemyCollision = enemiesPositions.find((enemy) => {
    const enemyCollisionX = enemy.x.toFixed(2) == playerPosition.x.toFixed(2);
    const enemyCollisionY = enemy.y.toFixed(2) == playerPosition.y.toFixed(2);
    return enemyCollisionX && enemyCollisionY;
  });

  if (enemyCollision) {
    levelFail();
  }
  game.fillText(emojis["PLAYER"], playerPosition.x, playerPosition.y);
}

function levelWin() {
  level++;
  startGame();
}

function levelFail() {
  console.log("KABOOM!!");
  lives--;

  console.log("Perdiste :(");
  if (lives <= 0) {
    level = 0;
    lives = 4;
    timeStart = undefined;
  }
  playerPosition.x = undefined;
  playerPosition.y = undefined;
  startGame();
}

function gameWin() {
  console.log("Terminaste el juego!!");
  clearInterval(timeInterval);

  const recordTime = localStorage.getItem("record_time");
  const playerTime = Date.now() - timeStart;

  if (recordTime) {
    if (recordTime >= playerTime) {
      localStorage.setItem("record_time", playerTime);
      pResult.innerHTML = "SUPERASTE EL RECORD";
    } else {
      pResult.innerHTML = "No superaste el record :(";
    }
  } else {
    localStorage.setItem("record_time", playerTime);
    pResult.innerHTML = "Primera vez eh.";
  }

  console.log({ recordTime, playerTime });
}

function showLives() {
  Array;

  spanLives.innerHTML = emojis["HEART"].repeat(lives);
}

function showTime() {
  spanTime.innerHTML = Date.now() - timeStart;
}
function showRecord() {
  spanRecord.innerHTML = localStorage.getItem("record_time");
}

window.addEventListener("keydown", moveByKeys);
btnUp.addEventListener("click", moveUp);
btnLeft.addEventListener("click", moveLeft);
btnRight.addEventListener("click", moveRight);
btnDown.addEventListener("click", moveDown);

function moveByKeys(e) {
  if (e.key == "ArrowUp") moveUp();
  else if (e.key == "ArrowLeft") moveLeft();
  else if (e.key == "ArrowRight") moveRight();
  else if (e.key == "ArrowDown") moveDown();
}

function moveUp() {
  console.log("Me movi hacia arriba");

  if (playerPosition.y - elementSize < elementSize) {
    console.log("OUT");
  } else {
    playerPosition.y -= elementSize;
    startGame();
  }
}
function moveLeft() {
  console.log("Me quiero mover hacia izquierda");

  if (playerPosition.x + elementSize < elementSize) {
    console.log("OUT");
  } else {
    playerPosition.x -= elementSize;
    startGame();
  }
}
function moveRight() {
  console.log("Me movi hacia la derecha");
  if (playerPosition.x + elementSize > canvaSize) {
    console.log("OUT");
  } else {
    playerPosition.x += elementSize;
    startGame();
  }
}
function moveDown() {
  console.log("Me movi hacia abajo");
  if (playerPosition.y + elementSize > canvaSize) {
    console.log("OUT");
  } else {
    playerPosition.y += elementSize;
    startGame();
  }
}
