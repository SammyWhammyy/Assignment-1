function setup() {
  createCanvas(800, 600);
  background(151, 172, 167);
  noStroke();
  //cart
  fill(44, 52, 50);
  quad(800, 0, 300, 115, 50, 600, 800, 600);
  //clothes bg
  fill(1, 1, 1);
  rect(250, 350, 200, 100);
  //pants
  fill(95, 93, 80);
  quad(300, 445, 475, 445, 575, 600, 275, 600);
  //hair
  fill(124, 115, 94);
  arc(330, 250, 150, 450, PI, 0);
  //face
  fill(178, 166, 159);
  arc(330, 250, 100, 350, PI, 0);
  //stash
  noFill();
  stroke(124, 115, 94);
  strokeWeight(7);
  arc(330, 200, 50, 30, PI, 0);
  noStroke();
  //shirt
  fill(25, 44, 48);
  triangle(200, 250, 450, 225, 375, 445);
  //arms
  fill(134, 129, 123);
  quad(300, 350, 210, 370, 250, 450, 325, 450);
  quad(250, 450, 325, 450, 470, 570, 450, 600);
  quad(475, 335, 400, 335, 400, 450, 475, 455);
  quad(400, 445, 475, 455, 400, 600, 350, 600);
  //rope
  fill(71, 65, 53);
  quad(380, 490, 435, 540, 415, 580, 365, 535);
  //chain arm things
  fill(108, 118, 117);
  triangle(200, 250, 300, 350, 210, 370);
  triangle(450, 225, 475, 335, 400, 335);
}

function draw() {}
