function createBoard() {
  const board = document.getElementById("board");
  let indexOfSpot = 0;
  //create the buttons
  for (let i = 0; i < 5; i++) {
    const row = document.createElement("div");
    for (let j = 0; j < i; j++) {
      if (j == 0 || j == i - 1) {
        row.innerHTML += `<text class='dot outer top-slot' >${j}</text>`;
      } else {
        const btn = document.createElement("button");
        btn.classList.add("dot");
        btn.classList.add("slot");
        btn.innerHTML = indexOfSpot;
        btn.dataset.position = `${indexOfSpot}`;
        row.appendChild(btn);
      }
      indexOfSpot++;
    }
    board.appendChild(row);
  }
  const row = document.createElement("div");
  for (let i = 0; i < 5; i++) {
    if (i == 0) {
      row.innerHTML += `<text class="dot outer corner">${i}</text>`;
    } else if (i == 4) {
      row.innerHTML += `<text class="dot outer corner">${i}</text>`;
    } else {
      const btn = document.createElement("button");
      btn.classList.add("dot");
      btn.classList.add("slot");
      btn.innerHTML = indexOfSpot;
      btn.dataset.position = `${indexOfSpot}`;
      row.appendChild(btn);
    }
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
      if (j == 0 && i == 3) {
        row5.innerHTML += `<text class='dot outer corner' >${j}</text>`;
      } else if (j == 4 && i == 3) {
        row5.innerHTML += `<text class='dot outer  corner' >${j}</text>`;
      } else if (j == 0) {
        row5.innerHTML += `<text class='dot outer left-slot' >${j}</text>`;
      } else if (j == 4 && i != 3) {
        row5.innerHTML += `<text class='dot outer right-slot' >${j}</text>`;
      } else {
        const btn = document.createElement("button");
        btn.classList.add("dot");
        btn.classList.add("slot");
        btn.innerHTML = indexOfSpot;
        btn.dataset.position = `${indexOfSpot}`;
        row5.appendChild(btn);
      }
      indexOfSpot++;
    }
    board.appendChild(row5);
  }
  for (let i = 4; i >= 0; i--) {
    const row = document.createElement("div");
    for (let j = 0; j < i; j++) {
      if (j == 0 || j == i - 1) {
        row.innerHTML += `<text class='dot outer  bottom-slot' >${j}</text>`;
      } else {
        const btn = document.createElement("button");
        btn.classList.add("dot");
        btn.classList.add("slot");
        btn.innerHTML = indexOfSpot;
        btn.dataset.position = `${indexOfSpot}`;
        row.appendChild(btn);
        indexOfSpot++;
      }
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
document.getElementById("start-game").addEventListener("click", setUpGame());
let player1Pieces = 15;
let player2Pieces = 15;

function setUpGame() {
  const slots = document.getElementsByClassName("slot");
  for (let i = 0; i < slots.length; i++) {
    slots[i].addEventListener("click", handleClick);
  }
  console.log("hello");
}

const connections = {
  4: [7, 12],
  7: [16, 11, 4],
  8: [12, 17],
  11: [7, 15, 20],
  12: [16, 4, 8, 21],
  13: [17, 22],
  15: [11, 20],
  16: [20, 12, 7, 25],
  17: [8, 26, 21, 13],
  18: [22, 27],
  20: [11, 16, 25, 29, 24, 15],
  21: [16, 12, 17, 26, 30, 25],
  22: [13, 18, 27, 31, 26, 17],
  24: [20, 33],
  25: [16, 21, 30, 34, 29, 20],
  26: [17, 22, 31, 35, 30, 21],
  27: [18, 31, 36],
  29: [33, 20, 25, 28],
  30: [21, 26, 35, 39, 34, 25],
  31: [22, 27, 40, 35],
  33: [24, 42, 29],
  34: [25, 30, 38, 43],
  35: [26, 31, 40, 44, 39, 30],
  36: [27, 40, 45],
  38: [29, 34, 42, 47],
  39: [30, 35, 43, 48],
  40: [31, 36, 45, 49, 44, 35],
  42: [33, 38],
  43: [34, 39, 47, 51],
  44: [35, 40, 48, 52],
  45: [36, 40, 49],
  47: [38, 43],
  48: [39, 44, 51, 53],
  49: [44, 40, 45, 52],
  51: [48, 43],
  52: [53, 48, 44, 49],
  53: [48, 52],
};
function clearOptions() {
  const options = document.querySelectorAll(".possible");
  for (let i = 0; i < options.length; i++) {
    options[i].removeEventListener("click", handleClick);
    options[i].classList.remove("possible");
    options[i].removeEventListener("click", movePiece);
    delete options[i].dataset.start;
    options[i].addEventListener("click", handleClick);
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
  clearOptions();
}
