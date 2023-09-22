console.log(maps);

const canvas = document.querySelector("#game");
const game = canvas.getContext("2d");
const btnUp = document.querySelector("#up");
const btnLeft = document.querySelector("#left");
const btnRight = document.querySelector("#right");
const btnDown = document.querySelector("#down");

let canvaSize;
let elementSize;

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

  const map = maps[0];
  const mapRows = map.trim().split("\n");
  const mapRowCols = mapRows.map((row) => row.trim().split(""));

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
    console.log("Pasaste de nivel!!");
  }

  const enemyCollision = enemiesPositions.find((enemy) => {
    const enemyCollisionX = enemy.x.toFixed(2) == playerPosition.x.toFixed(2);
    const enemyCollisionY = enemy.y.toFixed(2) == playerPosition.y.toFixed(2);
    return enemyCollisionX && enemyCollisionY;
  });

  if (enemyCollision) {
    console.log("Chocaste contra una bomba! Kaboom!!");
  }
  game.fillText(emojis["PLAYER"], playerPosition.x, playerPosition.y);
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
