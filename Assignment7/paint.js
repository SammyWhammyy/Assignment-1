const board = document.getElementById("board");
const context = board.getContext("2d");

const pastDraws = [];

let isDrawing = false;
let eraser = false;
let rectMode = false;
let circleMode = false;
let MMMode = false;
const colorPicker = document.getElementById("color-wheel");
const brushSize = document.getElementById("brush-size");
const clearButton = document.getElementById("clear-btn");
const fillButton = document.getElementById("fill-btn");
const rectButton = document.getElementById("rect-btn");
const circleButton = document.getElementById("circle-btn");
const mmButton = document.getElementById("mm-btn");
const eraserButton = document.getElementById("eraser-btn");
const shapeSize = document.getElementById("shape-size");

document.addEventListener("keydown", keyPressed);

board.addEventListener("mousedown", () => {
  isDrawing = true;
});
board.addEventListener("mouseup", () => {
  isDrawing = false;
  context.beginPath();
});
board.addEventListener("mousemove", draw);
board.addEventListener("click", shapeDraw);

clearButton.addEventListener("click", clearCanvas);
fillButton.addEventListener("click", fillCanvas);
eraserButton.addEventListener("click", setEraserMode);
rectButton.addEventListener("click", setRectMode);
circleButton.addEventListener("click", setCircleMode);
mmButton.addEventListener("click", setMMMode);

function keyPressed(e) {
  switch (e.key) {
    case "c":
      colorPicker.click();
      break;
    case "e":
      setEraserMode();
      break;
    case "q":
      clearCanvas();
      break;
    case "f":
      fillCanvas();
      break;
    case "r":
      setRectMode();
      break;
    case "t":
      setCircleMode();
      break;
    default:
      return;
  }
}

function draw(e) {
  if (!isDrawing || rectMode || circleMode || MMMode) return;

  context.lineWidth = brushSize.value;
  context.lineCap = "round";
  if (!eraser) context.strokeStyle = colorPicker.value;
  else context.strokeStyle = "#ffffff";

  context.lineTo(e.offsetX, e.offsetY);
  context.stroke();
  context.beginPath();
  context.moveTo(e.offsetX, e.offsetY);
}
function clearCanvas() {
  context.clearRect(0, 0, board.width, board.height);
}
function fillCanvas() {
  context.fillStyle = colorPicker.value;
  context.fillRect(0, 0, board.width, board.height);
}
function shapeDraw(e) {
  context.lineWidth = brushSize.value;
  context.lineCap = "round";

  if (!eraser) context.strokeStyle = colorPicker.value;
  else context.strokeStyle = "#ffffff";

  if (rectMode)
    context.strokeRect(e.offsetX, e.offsetY, shapeSize.value, shapeSize.value);
  else if (circleMode) {
    context.beginPath();
    context.arc(e.offsetX, e.offsetY, shapeSize.value, 0, 2 * Math.PI);
    context.stroke();
  } else if (MMMode) {
    const size = Number(shapeSize.value);
    context.beginPath();

    context.arc(
      e.offsetX - size * 1.25,
      e.offsetY - size * 1.25,
      size / 1.4,
      0,
      2 * Math.PI,
    );
    context.stroke();

    context.beginPath();
    context.arc(e.offsetX, e.offsetY, size, 0, 2 * Math.PI);
    context.stroke();

    context.beginPath();
    context.arc(
      e.offsetX + size * 1.25,
      e.offsetY - size * 1.25,
      size / 1.4,
      0,
      2 * Math.PI,
    );
    context.stroke();
  }
}
function setEraserMode() {
  if (!eraser) eraser = true;
  else eraser = false;
}

function setCircleMode() {
  if (!circleMode) {
    circleMode = true;
    rectMode = false;
    MMMode = false;
  } else circleMode = false;
}

function setRectMode() {
  if (!rectMode) {
    rectMode = true;
    circleMode = false;
    MMMode = false;
  } else rectMode = false;
}
function setMMMode() {
  if (!MMMode) {
    MMMode = true;
    rectMode = false;
    circleMode = false;
  } else MMMode = false;
  console.log(MMMode);
}
