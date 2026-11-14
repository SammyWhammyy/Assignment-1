let mainModel = new Model();
let mainView = new View();
let mainGame = new Game();
let mainUI = new UI();

function setup() {
  let myCanvas = createCanvas(400, 600);
  myCanvas.parent("sketchTarget");

  gameState = gameStates.SHELL;
  mainUI.SetupUI();
}

function draw() {
  // P5's name.  Think of it as "main".
  if (gameState == gameStates.PLAYING) mainGame.DoGame();

  mainUI.DoUI();
}

// As for the Controller, putting it in its own file isn't
// as important as Model and View.  Could put event handlers
// here, or even the bottom of view.js.  In fact, when I
// worked in Mac apps everything was "ViewController".
// So two parts instead of three.  You can't interact
// with what you can't see so it kinda makes sense.

// I put mine in Game, but then the UI shell couldn't see it, so I'm kinda calling the UI the Controller
