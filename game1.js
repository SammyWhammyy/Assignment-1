function createBoard() {
  const board = document.getElementById("board");
  for (let i = 0; i < 5; i++) {
    const row = document.createElement("div");
    for (let j = 0; j < i; j++) {
      if (j == 0 || j == i - 1) {
        row.innerHTML += `<button class='slot top-slot' >${j}</button>`;
      } else row.innerHTML += `<button class='slot' >${j}</button>`;
    }
    board.appendChild(row);
  }
  const row = document.createElement("div");
  for (let i = 0; i < 5; i++) {
    if (i == 0) {
      row.innerHTML += `<button class="slot left-corner">${i}</button>`;
    } else row.innerHTML += `<button class='slot'>${i}</button>`;
  }
  board.appendChild(row);
  for (let i = 0; i < 4; i++) {
    const row4 = document.createElement("div");
    for (let j = 0; j < 4; j++) {
      row4.innerHTML += `<button class='slot' >${j}</button>`;
    }
    board.appendChild(row4);
    const row5 = document.createElement("div");
    for (let j = 0; j < 5; j++) {
      if (j == 0 && i == 3) {
        row5.innerHTML += `<button class='slot left-corner' >${j}</button>`;
      } else if (j == 0) {
        row5.innerHTML += `<button class='slot left-slot' >${j}</button>`;
      } else if (j == 4 && i != 3) {
        row5.innerHTML += `<button class='slot right-slot' >${j}</button>`;
      } else row5.innerHTML += `<button class='slot' >${j}</button>`;
    }
    board.appendChild(row5);
  }
  for (let i = 4; i >= 0; i--) {
    const row = document.createElement("div");
    for (let j = 0; j < i; j++) {
      if (j == 0 || j == i - 1) {
        row.innerHTML += `<button class='slot bottom-slot' >${j}</button>`;
      } else row.innerHTML += `<button class='slot' >${j}</button>`;
    }
    board.appendChild(row);
  }
  const topBtns = document.getElementsByClassName("top-slot");
  const bottomBtns = document.getElementsByClassName("bottom-slot");
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
}
function findLoc(a, b) {
  const aDiv = a.getBoundingClientRect();
  const bDiv = b.getBoundingClientRect();
  const board = document.getElementById("board");
  const boardDiv = board.getBoundingClientRect();
  let x1 = aDiv.left + aDiv.width / 2 - boardDiv.left;
  let y1 = aDiv.top + aDiv.height / 2 - boardDiv.top;

  let x2 = bDiv.left + bDiv.width / 2 - boardDiv.left;
  let y2 = bDiv.top + bDiv.height / 2 - boardDiv.top;
  const vector = [x1, y1, x2, y2];
  return vector;
}
function drawLine(x1, y1, x2, y2) {
  const lines = document.getElementById("lines");
  const newLine = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "line",
  );

  newLine.setAttribute("x1", x1);
  newLine.setAttribute("y1", y1);
  newLine.setAttribute("x2", x2);
  newLine.setAttribute("y2", y2);
  newLine.setAttribute("stroke", "black");
  newLine.setAttribute("stroke-width", 3);
  lines.appendChild(newLine);
}
createBoard();
