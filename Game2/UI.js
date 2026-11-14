class UI {
  highScores = [
    { score: 0, name: "none" },
    { score: 0, name: "none" },
    { score: 0, name: "none" },
    { score: 0, name: "none" },
    { score: 0, name: "none" },
  ];
  highScore = false;
  flashHighScore = true;
  flashHighScoreCounter = 0.0;
  highScoreUpdated = false;
  nameInput;
  SetupUI() {
    angleMode(DEGREES);
    rectMode(CENTER);
    this.nameInput = createInput("Name:");
    this.nameInput.position(width / 2.0 - 100, height / 4 + 30);
    this.nameInput.size(200, 20);
    this.nameInput.hide();
    fetch("highScores.php")
      .then((response) => response.json())
      .then((scores) => {
        this.highScores = scores;
      });
  }

  DoUI() {
    push();
    if (gameState == gameStates.SHELL) {
      this.DrawShell();
    } else if (gameState == gameStates.PLAYING) {
      this.DrawHUD();
    } else if (gameState == gameStates.GAMEOVER) {
      this.DrawScores();
    }
    pop();
  }
  StartGame() {
    gameState = gameStates.PLAYING;
    mainModel.SetupModel();
    mainView.SetupView();
    mainGame.SetupGame();
    this.nameInput.hide();
  }
  DrawShell() {
    background(220, 200, 180);
    fill(10, 10, 120);
    textAlign(CENTER, CENTER);
    textSize(50);
    text("Centipede", width / 2.0, height / 4);
    textSize(20);
    text("Click to Start Game", width / 2.0, height / 2.0);
  }
  DrawHUD() {
    fill(0);
    textSize(20);
    textAlign(LEFT, TOP);
    text("Score: " + mainGame.score.toString(), 10, 10);
  }
  DrawScores() {
    background(220, 200, 180);

    textSize(15);
    fill(0);
    textAlign(CENTER, CENTER);
    text("GAME OVER", width / 2.0, height / 6);
    if (this.highScore && this.flashHighScore) {
      text("New High Score", width / 2.0, height / 6 + 15);
      if (this.flashHighScoreCounter++ >= 30) {
        this.flashHighScore = false;
      }
    } else {
      if (this.highScore && this.flashHighScoreCounter-- <= 0) {
        this.flashHighScore = true;
      }
    }
    text("Score: " + mainGame.score.toString(), width / 2.0, height / 4 + 30);
    text("Press ESCAPE to Restart", width / 2.0, height / 4 + 60);
    for (let i = 0; i < this.highScores.length; i++) {
      text(
        (i + 1).toString() +
          ". " +
          this.highScores[i].name +
          ": " +
          this.highScores[i].score.toString(),
        width / 6,
        height / 4 + 90 + i * 20,
      );
    }
  }
  checkHighScore() {
    if (mainGame.score >= this.highScores[4].score) {
      this.nameInput.show();
      this.highScore = true;
    }
    fetch("highScores.php")
      .then((response) => response.json())
      .then((scores) => {
        this.highScores = scores;
      });
  }
  UpdateScores(name) {
    if (name.startsWith("Name:")) {
      name = name.substring(5);
    }
    this.highScores[4] = { score: mainGame.score, name: name || "Anonymous" };
    this.highScores.sort((a, b) => b.score - a.score);
    fetch("highScores.php", {
      method: "POST",
      body: new URLSearchParams({ scores: JSON.stringify(this.highScores) }),
    });
    fetch("highScores.php")
      .then((response) => response.json())
      .then((scores) => {
        this.highScores = scores;
      });
  }
}

// I like having the controller separate because it reinforces that input can't directly do logic.
// Input must be as fast as possible because input lag is the worst.
function keyPressed(event) {
  if (gameState == gameStates.PLAYING) {
    if (inputMode == inputModes.THRUST) {
      if (key == "w") mainGame.player.thrustForward = true;
      if (key == "a") mainGame.player.thrustLeft = true;
      if (key == "s") mainGame.player.thrustBackwards = true;
      if (key == "d") mainGame.player.thrustRight = true;
      if (key == "q") mainGame.player.strafeLeft = true;
      if (key == "e") mainGame.player.strafeRight = true;
    } else if (inputMode == inputModes.STRAFEONLY) {
      if (key == "a") mainGame.player.strafeLeft = true;
      if (key == "d") mainGame.player.strafeRight = true;
    }
    return false;
  } else if (gameState == gameStates.GAMEOVER) {
    if (keyCode == ESCAPE) {
      mainUI.StartGame();
    } else if (keyCode == ENTER && mainUI.highScoreUpdated == false) {
      mainUI.UpdateScores(mainUI.nameInput.value());
      mainUI.highScoreUpdated = true;
      mainUI.nameInput.hide();
    }
  }
}

function keyReleased(event) {
  if (gameState == gameStates.PLAYING) {
    if (inputMode == inputModes.THRUST) {
      if (key == "w") mainGame.player.thrustForward = false;
      if (key == "a") mainGame.player.thrustLeft = false;
      if (key == "s") mainGame.player.thrustBackwards = false;
      if (key == "d") mainGame.player.thrustRight = false;
      if (key == "q") mainGame.player.strafeLeft = false;
      if (key == "e") mainGame.player.strafeRight = false;
    } else if (inputMode == inputModes.STRAFEONLY) {
      if (key == "a") mainGame.player.strafeLeft = false;
      if (key == "d") mainGame.player.strafeRight = false;
    }
  }
  return false;
}

function mousePressed(event) {
  if (gameState == gameStates.SHELL) mainUI.StartGame();
  else if (gameState == gameStates.PLAYING) {
    if (fireMode == fireModes.CLICK) mainGame.player.fireSingle = true;
    if (fireMode == fireModes.HOLD) mainGame.player.fireAuto = true;
  }
}

function mouseReleased(event) {
  if (gameState == gameStates.PLAYING) {
    if (fireMode == fireModes.HOLD) mainGame.player.fireAuto = false;
  }
}
