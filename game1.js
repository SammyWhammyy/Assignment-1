let gameStarted = false;
function createBoard() {
  const board = document.getElementById("board");
  let indexOfSpot = 0;
  //create the buttons
  for (let i = 0; i < 5; i++) {
    const row = document.createElement("div");
    for (let j = 0; j < i; j++) {
      const btn = document.createElement("button");
      if (j == 0 || j == i - 1) {
        btn.classList.add("dot");
        btn.classList.add("outer");
        btn.classList.add("top-slot");
      } else {
        btn.classList.add("dot");
        btn.classList.add("slot");
      }
      btn.innerHTML = indexOfSpot;
      btn.dataset.position = `${indexOfSpot}`;
      row.appendChild(btn);
      indexOfSpot++;
    }
    board.appendChild(row);
  }
  const row = document.createElement("div");
  for (let i = 0; i < 5; i++) {
    const btn = document.createElement("button");
    if (i == 0 || i == 4) {
      btn.classList.add("dot");
      btn.classList.add("outer");
      btn.classList.add("corner");
    } else {
      btn.classList.add("dot");
      btn.classList.add("slot");
    }
    btn.innerHTML = indexOfSpot;
    btn.dataset.position = `${indexOfSpot}`;
    row.appendChild(btn);
    indexOfSpot++;
  }
  board.appendChild(row);
  for (let i = 0; i < 4; i++) {
    const row4 = document.createElement("div");
    for (let j = 0; j < 4; j++) {
      {
        const btn = document.createElement("button");
        btn.classList.add("dot");
        btn.classList.add("slot");
        btn.innerHTML = indexOfSpot;
        btn.dataset.position = `${indexOfSpot}`;
        row4.appendChild(btn);
      }
      indexOfSpot++;
    }
    board.appendChild(row4);
    const row5 = document.createElement("div");
    for (let j = 0; j < 5; j++) {
      const btn = document.createElement("button");
      if ((j == 0 && i == 3) || (j == 4 && i == 3)) {
        btn.classList.add("dot");
        btn.classList.add("outer");
        btn.classList.add("corner");
      } else if (j == 0) {
        btn.classList.add("dot");
        btn.classList.add("outer");
        btn.classList.add("left-slot");
      } else if (j == 4 && i != 3) {
        btn.classList.add("dot");
        btn.classList.add("outer");
        btn.classList.add("right-slot");
      } else {
        btn.classList.add("dot");
        btn.classList.add("slot");
      }
      btn.innerHTML = indexOfSpot;
      btn.dataset.position = `${indexOfSpot}`;
      row5.appendChild(btn);
      indexOfSpot++;
    }
    board.appendChild(row5);
  }
  for (let i = 4; i >= 0; i--) {
    const row = document.createElement("div");
    for (let j = 0; j < i; j++) {
      const btn = document.createElement("button");
      if (j == 0 || j == i - 1) {
        btn.classList.add("dot");
        btn.classList.add("outer");
        btn.classList.add("bottom-slot");
      } else {
        btn.classList.add("dot");
        btn.classList.add("slot");
      }
      btn.innerHTML = indexOfSpot;
      btn.dataset.position = `${indexOfSpot}`;
      row.appendChild(btn);
      indexOfSpot++;
    }
    board.appendChild(row);
  }

  // DRAW LINES

  const topBtns = document.getElementsByClassName("top-slot");
  const bottomBtns = document.getElementsByClassName("bottom-slot");
  const leftBtns = document.getElementsByClassName("left-slot");
  const rightBtns = document.getElementsByClassName("right-slot");
  const corners = document.getElementsByClassName("corner");
  for (let i = 0; i < topBtns.length; i++) {
    let lineLoc = "";
    if (i >= 5) {
      lineLoc = findLoc(topBtns[i], bottomBtns[i - 5]);
    } else if (i >= 3) {
      lineLoc = findLoc(topBtns[i], bottomBtns[i - 1]);
    } else if (i >= 1) {
      lineLoc = findLoc(topBtns[i], bottomBtns[i + 3]);
    } else lineLoc = findLoc(topBtns[i], bottomBtns[i + 6]);
    drawLine(lineLoc[0], lineLoc[1], lineLoc[2], lineLoc[3]);
  }

  for (let i = 0; i < 3; i++) {
    let lineLoc = "";
    if (i == 0) {
      lineLoc = findLoc(corners[i], corners[3]);
    } else lineLoc = findLoc(corners[i], corners[2]);
    drawLine(lineLoc[0], lineLoc[1], lineLoc[2], lineLoc[3]);
  }
  let j = 2;
  for (let i = 0; i < leftBtns.length; i++) {
    let lineLoc = "";
    lineLoc = findLoc(leftBtns[i], topBtns[j]);
    j += 2;
    drawLine(lineLoc[0], lineLoc[1], lineLoc[2], lineLoc[3]);
  }
  let k = 0;
  for (let i = 0; i < rightBtns.length; i++) {
    let lineLoc = "";
    lineLoc = findLoc(rightBtns[i], bottomBtns[k]);
    k += 2;
    drawLine(lineLoc[0], lineLoc[1], lineLoc[2], lineLoc[3]);
  }
}
function findLoc(a, b) {
  const aDiv = a.getBoundingClientRect();
  const bDiv = b.getBoundingClientRect();
  const board = document.getElementById("board");
  const boardDiv = board.getBoundingClientRect();
  let x1 = aDiv.left + aDiv.width - boardDiv.left;
  let y1 = aDiv.top + aDiv.height - boardDiv.top;

  let x2 = bDiv.left + bDiv.width - boardDiv.left;
  let y2 = bDiv.top + bDiv.height - boardDiv.top;
  const vector = [x1, y1, x2, y2];
  return vector;
}
function drawLine(x1, y1, x2, y2) {
  const lines = document.getElementById("lines");
  const newLine = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "line",
  );

  newLine.setAttribute("x1", x1 + 5);
  newLine.setAttribute("y1", y1 + 2);
  newLine.setAttribute("x2", x2 + 5);
  newLine.setAttribute("y2", y2 + 2);
  newLine.setAttribute("stroke", "black");
  newLine.setAttribute("stroke-width", 3);
  lines.appendChild(newLine);
}
createBoard();
document.getElementById("start-game").addEventListener("click", setUpGame);
let player1Pieces = 15;
let player2Pieces = 15;

function setUpGame() {
  if (!gameStarted) {
    document.querySelector(`[data-position="${56}"]`).classList.add("red");
    document.querySelector(`[data-position="${15}"]`).classList.add("red");
    document.querySelector(`[data-position="${18}"]`).classList.add("red");
    document.querySelector(`[data-position="${42}"]`).classList.add("purple");
    document.querySelector(`[data-position="${4}"]`).classList.add("purple");
    document.querySelector(`[data-position="${45}"]`).classList.add("purple");
    const outerSlots = document.getElementsByClassName("outer");
    for (let i = 0; i < outerSlots.length; i++) {
      outerSlots[i].addEventListener("click", handleClick);
    }
    console.log("hello");
  }
  gameStarted = true;
}
const linesData = {
  line0: [0, 4, 12, 21, 30, 39, 48, 56, 60],
  line1: [1, 7, 16, 25, 34, 43, 52, 58],
  line2: [2, 8, 17, 26, 35, 44, 53, 59],
  line3: [3, 11, 20, 29, 38, 47, 55],
  line5: [5, 13, 22, 31, 40, 49, 54],
  line6: [6, 15, 24, 33, 42, 51],
  line9: [9, 18, 27, 36, 45, 54],
  line10: [10, 15, 20, 25, 30, 35, 40, 45, 50],
  line14: [14, 18, 22, 26, 30, 34, 38, 42, 46],
  line2a: [2, 4, 7, 11, 15, 19],
  line23: [23, 27, 31, 35, 39, 43, 47, 51],
  line5a: [5, 8, 12, 16, 20, 24, 28],
  line32: [32, 36, 40, 44, 48, 52, 55],
  line9a: [9, 13, 17, 21, 25, 29, 33, 37],
  line41: [41, 45, 49, 53, 56, 58],
};
const connections = {
  0: [4],
  1: [7],
  2: [4, 8],
  3: [11],
  5: [8, 13],
  6: [15],
  9: [13, 18],
  10: [15],
  14: [18],
  19: [15],
  23: [27],
  28: [24],
  32: [36],
  37: [33],
  41: [45],
  46: [42],
  50: [45],
  51: [47, 42],
  54: [45],
  55: [47, 52],
  57: [49],
  58: [52, 56],
  59: [53],
  60: [56],
};
function clearOptions() {
  const options = document.querySelectorAll(".possible");
  for (let i = 0; i < options.length; i++) {
    options[i].removeEventListener("click", handleClick);
    options[i].classList.remove("possible");
    options[i].removeEventListener("click", movePiece);
    delete options[i].dataset.start;
  }
}
function handleClick(event) {
  clearOptions();
  addOptions(event.currentTarget);
}
function addOptions(start) {
  const options = getMoveOptions(start);
  for (let i = 0; i < options.length; i++) {
    const option = document.querySelector(`[data-position="${options[i]}"]`);
    option.classList.add("possible");
    option.removeEventListener("click", handleClick);
    option.dataset.start = start.dataset.position;
    option.addEventListener("click", movePiece);
  }
}
function getMoveOptions(start) {
  const position = start.dataset.position;
  console.log(connections[position]);
  return connections[position];
}
function movePiece(event) {
  const goal = event.currentTarget;
  const start = document.querySelector(
    `[data-position="${goal.dataset.start}"]`,
  );
  console.log(start.dataset.position + " -> " + goal.dataset.position);
  if (goal.classList.contains("red") || goal.classList.contains("purple")) {
    console.log("CONTAINS");
    if (!slideRow(start, goal)) {
      return;
    }
  }
  if (redTurn) {
    goal.classList.add("red");
  } else goal.classList.add("purple");
  clearOptions();
  swapTurn();
  checkWin();
}
let redTurn = true;
function swapTurn() {
  if (redTurn) {
    redTurn = false;
    document.getElementById("turn-text").innerText = "PURPLE TURN";
  } else {
    redTurn = true;
    document.getElementById("turn-text").innerText = "RED TURN";
  }
}
function slideRow(start, goal) {
  if (goal.classList.contains("outer")) return false;

  const newPosition = getDir(start, goal);

  const nextSpot = document.querySelector(`[data-position="${newPosition}"]`);

  if (nextSpot.classList.contains("outer")) return false;
  if (
    nextSpot.classList.contains("red") ||
    nextSpot.classList.contains("purple")
  ) {
    if (!slideRow(goal, nextSpot)) return false;
  }
  if (goal.classList.contains("red")) {
    nextSpot.classList.add("red");
    goal.classList.remove("red");
  } else {
    nextSpot.classList.add("purple");
    goal.classList.remove("purple");
  }
  return true;
}
function getDir(start, goal) {
  const startIndex = Number(start.dataset.position);
  const goalIndex = Number(goal.dataset.position);

  const linesObjects = Object.values(linesData);
  for (let i = 0; i < linesObjects.length; i++) {
    if (
      linesObjects[i].includes(startIndex) &&
      linesObjects[i].includes(goalIndex)
    ) {
      if (goalIndex > startIndex) {
        for (let l = 0; l < linesObjects[i].length; l++) {
          if (linesObjects[i][l] == goalIndex) {
            return linesObjects[i][l + 1];
          }
        }
      } else {
        for (let l = 0; l < linesObjects[i].length; l++) {
          if (linesObjects[i][l] == goalIndex) {
            return linesObjects[i][l - 1];
          }
        }
      }
    }
  }
}
function checkWin() {
  if (haveWon()) {
    document.getElementById("turn-text").innerText = `${haveWon()} WINS`;
    document.getElementById("turn-text").classList.add(haveWon());
  }
}

function haveWon() {
  const linesObjects = Object.values(linesData);
  for (let i = 0; i < linesObjects.length; i++) {
    let redCount = 0;
    let purpleCount = 0;
    for (let l = 0; l < linesObjects[i].length; l++) {
      const spot = document.querySelector(
        `[data-position="${linesObjects[i][l]}"]`,
      );
      if (spot.classList.contains("red")) {
        redCount++;
        if (redCount >= 4) return "red";
      } else redCount = 0;
      if (spot.classList.contains("purple")) {
        purpleCount++;
        if (purpleCount >= 4) return "purple";
      } else purpleCount = 0;
    }
  }
  return null;
}
