class Drawable {
  Init(drawTarget) {
    this.myObject = drawTarget; // Expecting GameObject
  }
  Draw(interpolation) {
    //console.log("Drawable.draw");

    // Get info from object we need to draw
    // like color and position
    fill(255, 0, 0);

    let difference = p5.Vector.sub(
      this.myObject.position,
      this.myObject.previousPosition,
    );
    let drawPosition = p5.Vector.add(
      this.myObject.previousPosition,
      p5.Vector.mult(difference, interpolation),
    );
    translate(drawPosition.x, drawPosition.y);

    rotate(this.myObject.rotation);
    rect(0, 0, this.myObject.size, this.myObject.size);
  }
}

class View {
  allDrawables = [];

  SetupView() {
    angleMode(DEGREES);
    rectMode(CENTER);
  }

  CreateDrawable(newGuy) {
    let newLooks = new Drawable();
    newLooks.Init(newGuy);
    this.allDrawables.push(newLooks);
    return newLooks;
  }

  DestroyDrawable(index) {
    if (index > -1) this.allDrawables.splice(index, 1);
  }

  Draw(interpolation) {
    background(220);

    this.allDrawables.forEach((element) => {
      push();
      // ?. is like checking for an interface.
      element?.Draw(interpolation);
      pop(); // Let no item affect others
    });
  }
}
