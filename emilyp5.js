
let circles = [];
let growingCircle = null;
let spinningCircle = null;
let hoveredCircle = null;
let growthFactor = 0;
let growthSpeed = 0.05;
let angle = 0;
let bouncing = false;

function setup() {
  createCanvas(500, 500);
  textFont('Georgia');
  background(255); 
  noStroke();
  textAlign(CENTER, CENTER);

  // Define circles with position, color, word, and velocity
  circles = [
    { x: width / 2 + 36, y: height / 2 - 75, color: "rgba(50, 125, 156, 0.5)", word: "Digital Humanities", vx: random(-4, 4), vy: random(-4, 4) },
    { x: width / 2 - 36, y: height / 2 - 75, color: "rgba(169, 55, 159, 0.5)", word: "Technology", vx: random(-4, 4), vy: random(-4, 4) },
    { x: width / 2 + 75, y: height / 2, color: "rgba(125, 68, 144, 0.5)", word: "Making", vx: random(-4, 4), vy: random(-4, 4) },
    { x: width / 2 + 37.5, y: height / 2 + 75, color: "rgba(81, 199, 247, 0.5)", word: "Play", vx: random(-8, -8), vy: random(-8, 8) },
    { x: width / 2 - 37.5, y: height / 2 + 75, color: "rgba(190, 98, 166, 0.5)", word: "Pedagogy", vx: random(-3, 3), vy: random(-3, 3) },
    { x: width / 2 - 75, y: height / 2, color: "rgba(138, 201, 208, 0.5)", word: "Technical Communication", vx: random(-3, 3), vy: random(-3, 3) }
  ];
}

function draw() {
  background(255); // Redraw background

  hoveredCircle = null;

  for (let circle of circles) {
    let circleSize = 165;
    let textSizeFactor = 1;

    if (dist(mouseX, mouseY, circle.x, circle.y) < 75) {
      hoveredCircle = circle;
    }

    if (circle === growingCircle) {
      circleSize = 150 * (1 + growthFactor);
      textSizeFactor = 1 + growthFactor;
    }

    if (bouncing) {
      circle.x += circle.vx;
      circle.y += circle.vy;

      // Bounce off walls
      if (circle.x > width - 75 || circle.x < 75) {
        circle.vx *= -1;
      }
      if (circle.y > height - 75 || circle.y < 75) {
        circle.vy *= -1;
      }
    }

    drawCircle(circle, circleSize, textSizeFactor);
  }

  if (hoveredCircle) {
    drawCircle(hoveredCircle, 250, 2); // Draw hovered circle on top
  }

  if (growingCircle) {
    growthFactor += growthSpeed;
    if (growthFactor > 3 || growthFactor < 0) {
      growthSpeed *= -1;
    }
    if (growthFactor < 0) {
      growingCircle = null;
      growthFactor = 0;
      growthSpeed = 0.05;
    }
  }

  if (spinningCircle) {
    angle += 0.1; // Control spin speed
  }
}

function drawCircle(circle, circleSize, textSizeFactor) {
  push();
  translate(circle.x, circle.y);
  if (circle === spinningCircle) {
    rotate(angle);
  }
  fill(circle.color);
  ellipse(0, 0, circleSize);
  fill("#000035");
  textSize(circleSize * 0.12);

  // Split text for specific words
  if (circle.word === "Digital Humanities") {
    text("Digital", 0, -10 * textSizeFactor);
    text("Humanities", 0, 10 * textSizeFactor);
  } else if (circle.word === "Technical Communication") {
    text("Technical", 0, -10 * textSizeFactor);
    text("Communication", 0, 10 * textSizeFactor);
  } else {
    text(circle.word, 0, 0);
  }

  pop();
}

function mousePressed() {
  for (let i = circles.length - 1; i >= 0; i--) {
    let circle = circles[i];
    let d = dist(mouseX, mouseY, circle.x, circle.y);
    if (d < 75) { // Check if mouse is inside the circle
      growingCircle = circle;
      spinningCircle = circle;
      growthFactor = 0;
      growthSpeed = 0.05;
      break;
    }
  }
}

function doubleClicked() {
  bouncing = !bouncing; // Toggle bouncing state
}