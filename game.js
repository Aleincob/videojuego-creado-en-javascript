console.log(maps);

const canvas = document.querySelector("#game");
const game = canvas.getContext("2d");

let canvaSize;
let elementSize;

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

  for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 10; col++) {
      game.fillText(emojis["X"], elementSize * col, elementSize * row);
    }
  }
}
