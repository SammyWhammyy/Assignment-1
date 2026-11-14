class GameObject {
  objectType = objectTypes.GENERIC;
  position = createVector(0, 0);
  previousPosition = createVector(0, 0);
  velocity = createVector(0, 0);
  acceleration = createVector(0, 0);
  rotation = 0;
  rotationRate = 0;
  thrustPower = 0;
  size = 0;
  thrustForward = false;
  thrustBackwards = false;
  thrustLeft = false;
  thrustRight = false;

  timesHit = 0;

  strafeLeft = false;
  strafeRight = false;
  maxVelocity = 1000;
  brakes = false;

  fireDelay = 0.3; // Time between shots
  fireCountdown = 0; // Can't shoot if over 0
  fireSingle = false;
  fireAuto = false;
  fireVelocity = 550;

  markedForDeletion = false;

  Update(deltaTime) {
    // Update game logic like speed
    this.previousPosition = this.position;
    this.acceleration = createVector(0, 0);

    if (this.strafeRight)
      this.acceleration.add(
        cos(this.rotation + 90) * this.thrustPower,
        sin(this.rotation + 90) * this.thrustPower,
      );
    if (this.strafeLeft)
      this.acceleration.add(
        cos(this.rotation - 90) * this.thrustPower,
        sin(this.rotation - 90) * this.thrustPower,
      );

    let change = p5.Vector.mult(this.acceleration, deltaTime);

    // Difference is add here is changing a vector.  The Vector-dot version takes two and doesn't change either.
    this.velocity.add(change);
    this.velocity.limit(this.maxVelocity);

    if (
      !this.thrustForward &&
      !this.thrustBackwards &&
      !this.thrustLeft &&
      !this.thrustRight &&
      !this.strafeRight &&
      !this.strafeLeft &&
      this.brakes
    ) {
      this.velocity.limit(0);
    }

    if (this.velocity.mag() != 0) {
      let potential = p5.Vector.add(
        this.position,
        p5.Vector.mult(this.velocity, deltaTime),
      );
      if (mainModel.TryMove(this, potential)) this.position = potential;
    }

    if (this.fireCountdown > 0) this.fireCountdown -= deltaTime;
    if ((this.fireSingle || this.fireAuto) && this.fireCountdown <= 0)
      this.Shoot();
  }

  Shoot() {
    this.fireSingle = false;
    this.fireCountdown = this.fireDelay;

    let bullet = mainGame.CreateObjectAndDrawable();
    bullet.position = this.position;
    bullet.previousPosition = this.position;
    bullet.velocity.set(
      cos(this.rotation) * this.fireVelocity,
      sin(this.rotation) * this.fireVelocity,
    );
    bullet.size = 10;
    bullet.objectType = objectTypes.PLAYERBULLET;
  }

  OnCollide(withWhom) {
    // Return if I should stop here.
    if (withWhom == null) {
      if (this.objectType == objectTypes.PLAYERBULLET)
        this.markedForDeletion = true;
      return true;
    }
    if (
      this.objectType == objectTypes.PLAYERBULLET &&
      withWhom.objectType == objectTypes.ENEMY
    ) {
      this.markedForDeletion = true;
      if (withWhom instanceof Centipede) {
        console.log("Centipede hit");
        withWhom.killed();
        withWhom.markedForDeletion = true;
      } else if (withWhom instanceof GameObject) {
        withWhom.timesHit++;
        if (withWhom.timesHit > 3) {
          withWhom.markedForDeletion = true;
        }
      }
      return true;
    }
    if (
      this.objectType == objectTypes.PLAYER &&
      withWhom.objectType == objectTypes.ENEMY
    ) {
      mainModel.allObjects.forEach((element) => {
        element.markedForDeletion = true;
      });
      mainUI.checkHighScore();
      gameState = gameStates.GAMEOVER;
    }
    if (this instanceof Centipede && withWhom instanceof Centipede) {
      return false;
    } else if (this instanceof Centipede && withWhom instanceof GameObject) {
      this.changeDirection();
      return true;
    }
  }
}

class Model {
  allObjects = [];

  SetupModel() {}

  CreateObject() {
    let newGuy = new GameObject();
    this.allObjects.push(newGuy);
    return newGuy;
  }
  createCentipede() {
    let newGuy = new Centipede();
    newGuy.setup();
    this.allObjects.push(newGuy);
    return newGuy;
  }

  DestroyObject(index) {
    if (index > -1) this.allObjects.splice(index, 1);
  }

  Update(deltaTime) {
    this.allObjects.forEach((element) => {
      // ?. is like checking for an interface.
      element?.Update(deltaTime);
    });
  }

  TryMove(whom, potentialPosition) {
    if (
      potentialPosition.x < whom.size / 2 ||
      potentialPosition.x > width - whom.size / 2 ||
      potentialPosition.y < whom.size / 2 ||
      potentialPosition.y > height - whom.size / 2
    ) {
      whom.velocity = createVector(0, 0);
      whom.OnCollide(null);
      return false;
    }

    for (const element of this.allObjects) {
      if (element != whom) {
        let distance = p5.Vector.dist(potentialPosition, element.position);
        if (
          (whom.objectType == objectTypes.PLAYER &&
            element.objectType == objectTypes.PLAYERBULLET) ||
          (whom.objectType == objectTypes.PLAYERBULLET &&
            element.objectType == objectTypes.PLAYER)
        ) {
          continue;
        }
        if (whom instanceof Centipede && element instanceof Centipede) {
          continue;
        }
        if (distance < whom.size + element.size) {
          let stopMe = whom.OnCollide(element);
          element.OnCollide(whom);

          if (stopMe == true) whom.velocity = createVector(0, 0);

          return false;
        }
      }
    }

    return true;
  }
}
class Centipede extends GameObject {
  objectType = objectTypes.ENEMY;
  size = 15;
  fireCountdown = 1;
  speedMult = 8;
  dir = 1;
  length = 5;
  timeBetweenSegments = 0.5;
  hasSpawnedSeg = false;
  setup() {
    this.position.y = this.size / 2.0;
    const startSide = random(0, 1);
    if (startSide < 0.5) {
      this.position.x = this.size / 2.0;
      this.dir = 1;
    } else {
      this.position.x = width - this.size / 2.0;
      this.dir = -1;
    }

    this.previousPosition = this.position;
  }

  Update(deltaTime) {
    this.previousPosition = this.position.copy();
    this.velocity.x = horiDivsSize * this.dir * this.speedMult;

    let potential = p5.Vector.add(
      this.position,
      p5.Vector.mult(this.velocity, deltaTime),
    );
    if (
      (potential.x <= this.size / 2.0 && this.dir < 0) ||
      (potential.x >= width - this.size / 2.0 && this.dir > 0)
    ) {
      this.changeDirection();

      potential.x = constrain(
        potential.x,
        this.size / 2,
        width - this.size / 2,
      );
    }
    if (mainModel.TryMove(this, potential)) {
      this.position.x = potential.x;
    }
    this.timeBetweenSegments -= deltaTime;
    if (
      this.timeBetweenSegments <= 0 &&
      this.length > 1 &&
      this.hasSpawnedSeg == false
    ) {
      let newSeg = mainGame.createCentipedeAndDrawable();
      newSeg.position = createVector(
        this.position.x - 35 * this.dir,
        this.position.y,
      );
      newSeg.previousPosition = createVector(
        this.position.x - 35 * this.dir,
        this.position.y,
      );
      newSeg.dir = this.dir;
      newSeg.length = this.length - 1;
      this.hasSpawnedSeg = true;
    }
  }
  changeDirection() {
    this.dir *= -1;
    this.position.y += vertDivsSize;
  }
  killed() {
    let shroom = mainGame.CreateObjectAndDrawable();
    shroom.objectType = objectTypes.ENEMY;
    shroom.size = 15;
    shroom.position.x = this.position.x;
    shroom.position.y = this.position.y;
    shroom.previousPosition = this.previousPosition;
    mainGame.score += 10;
  }
}
