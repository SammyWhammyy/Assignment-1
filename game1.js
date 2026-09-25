import game1React from "ExpoProj/node_modules/game";

function createBoard() {
  const board = document.getElementById("board");
  for (let i = 1; i <= 5; i++) {
    const row = document.createElement("div");
    for (let j = 0; j < i; j++) {
      row.innerHTML += "<button class='slot' >hello</button>";
    }
    board.appendChild(row);
  }
  for (let i = 0; i < 4; i++) {
    const row4 = document.createElement("div");
    for (let j = 0; j < 4; j++) {
      row4.innerHTML += "<button class='slot' >hello</button>";
    }
    board.appendChild(row4);
    const row5 = document.createElement("div");
    for (let j = 0; j < 5; j++) {
      row5.innerHTML += "<button class='slot' >hello</button>";
    }
    board.appendChild(row5);
  }
  for (let i = 4; i >= 0; i--) {
    const row = document.createElement("div");
    for (let j = 0; j < i; j++) {
      row.innerHTML += "<button class='slot' >hello</button>";
    }
    board.appendChild(row);
  }
}
createBoard();
