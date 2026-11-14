// JS doesn't have enums, but this fakes it since it looks the same,
// Use as gameState.SHELL and you are secretly storing an int of 0
const gameStates = { SHELL: 0, PLAYING: 1, GAMEOVER: 2 };
let gameState = gameStates.ShELL;

const inputModes = { THRUST: 0, STRAFEONLY: 1 };
let inputMode = inputModes.STRAFEONLY;

const fireModes = { CLICK: 0, HOLD: 1 };
let fireMode = fireModes.CLICK;

// In a programming class this would be done with Inheritance and interfaces.  This way is very 1999.
const objectTypes = {
  GENERIC: 0,
  PLAYER: 1,
  ENEMY: 2,
  PLAYERBULLET: 3,
  ENEMYBULLET: 4,
};

horiDivsSize = 10;
vertDivsSize = 30;
class Game {
  score = 0;

  frameDuration = 1 / 60.0; // Drawing
  tickDuration = 1 / 10.0; // Thinking

  lastFrameTime = 0;
  lastTickTime = 0;

  timeBetweenCentipedesBase = 10.0;
  timeBetweenCentipedes = 3.0;

  CreateObjectAndDrawable() {
    let newGuy = mainModel.CreateObject();
    mainView.CreateDrawable(newGuy);
    return newGuy;
  }
  createCentipedeAndDrawable() {
    let newGuy = mainModel.createCentipede();
    mainView.CreateDrawable(newGuy);
    return newGuy;
  }
  DestroyObjectAndDrawable(index) {
    mainModel.DestroyObject(index);
    mainView.DestroyDrawable(index);
  }

  SetupGame() {
    console.log("SetupGame");
    gameState = gameStates.PLAYING;
    this.score = 0;
    this.gameTimeLimit = 100000.0;

    let now = millis() / 1000.0;
    this.lastTickTime = now;
    this.lastFrameTime = now;

    this.player = this.CreateObjectAndDrawable();

    this.player.objectType = objectTypes.PLAYER;

    this.player.position.x = width / 2.0;
    this.player.position.y = height - 15;
    this.player.rotation = -90;
    this.player.previousPosition = this.player.position;

    this.player.size = 20;

    if (inputMode == inputModes.THRUST) {
      this.player.thrustPower = 50;
      this.player.maxVelocity = 200;
      this.player.rotationRate = 100;
    } else if (inputMode == inputModes.STRAFEONLY) {
      this.player.thrustPower = 4000;
      this.player.maxVelocity = 180;
      this.player.rotationRate = 0;
      this.player.brakes = true;
    }
  }

  DoGame() {
    let now = millis() / 1000.0; // Built in time since start of sketch

    while (now - this.lastTickTime >= this.tickDuration) {
      this.timeBetweenCentipedes -= now - this.lastTickTime;
      if (this.timeBetweenCentipedes <= 0) {
        this.createCentipedeAndDrawable();
        this.timeBetweenCentipedes =
          this.timeBetweenCentipedesBase + random(0, 5);
        this.timeBetweenCentipedesBase -= 0.1;
      }
      mainModel.Update(now - this.lastTickTime);
      this.gameTimeLimit -= now - this.lastTickTime;
      this.lastTickTime += this.tickDuration; // not "=now" so we can catch up if we need to
    }

    if (now - this.lastFrameTime >= this.frameDuration) {
      // When a tick has just happened, this comes out 0.
      // When the tick has waited as long as possible, this is 1.
      let interp = (now - this.lastTickTime) / this.tickDuration;
      mainView.Draw(interp);
      this.lastFrameTime = now;
    }

    for (let i = mainModel.allObjects.length - 1; i >= 0; i--) {
      let check = mainModel.allObjects[i];
      if (check?.markedForDeletion == true) {
        // Can't change a foreach while it is running.  And don't want to delete someone another object is about to think about.
        this.DestroyObjectAndDrawable(i);
      }
    }

    if (this.gameTimeLimit <= 0) {
      this.TransmitScore();
      gameState = gameStates.GAMEOVER;
      console.log("Game over.");
    }
  }
  TransmitScore() {}
}
