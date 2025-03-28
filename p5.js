
let circles = [];
let growingCircle = null;
let spinningCircle = null;
let hoveredCircle = null;
let selectedCircle = null;
let growthFactor = 0;
let growthSpeed = 0.05;
let angle = 0;
let bouncing = false;

// Add your research projects array
let projects = [
  {
    name: "Playful Pedagogy in the Pandemic: Pivoting to Game-Based Learning with A. Salter (Routledge)",
    connections: ["Pedagogy", "Technology", "Digital Humanities", "Play"]
  },
  {
    name: "Critical Making in the Age of AI with A. Salter (Amherst College Press)",
    connections: ["Making", "Digital Humanities", "Technology"]
  },
  {
    name: "\"The Aural-Visual Rhetoric in Video Game Tutorials\" in Technical Communication Quarterly",
    connections: ["Technical Communication", "Play", "Technology"]
  },
  {
    name: "\"Embracing Discord? The Rhetorical Consequences of Gaming Platforms as Classrooms\" with A. Salter in Computers and Composition",
    connections: ["Technology", "Pedagogy", "Play"]
  },
  {
    name: "\"Assessing the Impact of Game Modalities in Second Language Acquisition: ELLE the EndLess LEarner\" with A. Giroux, D. Merritt, G. Vitanova, and S. Sousa in Journal of Universal Computer Science",
    connections: ["Technology", "Pedagogy", "Making"]
  },
  {
    name: "\"Teaching Liberatory Design\" in Communication Design Quarterly",
    connections: ["Technical Communication", "Pedagogy", "Making", "Technology"]
  },
  {
    name: "US Department of Education Grant ($295,582)",
    connections: ["Digital Humanities", "Technology", "Play"]
  },
  {
    name: "\"BeadED Adventures\" with A. Sullivan",
    connections: ["Making", "Technology", "Play", "Pedagogy"]
  },
  {
    name: "\"emPower through Play\" Project (UCF Seed Grant)",
    connections: ["Play", "Technology", "Pedagogy"]
  },
  {
    name: "Digital Tools in the Age of AI Workshop (DHSI 2023)",
    connections: ["Making", "Technology", "Digital Humanities", "Pedagogy"]
  },
  {
    name: "\"Miro, Miro: Student Perceptions of a Visual Discussion Board\" (SIGDOC 2022)",
    connections: ["Technical Communication", "Technology", "Pedagogy"]
  },
  {
    name: "\"Supporting Self-Regulated Learning in a User-Centered Design Course\" (SIGDOC 2023)",
    connections: ["Technical Communication", "Technology", "Pedagogy"]
  },
  {
    name: "\"Just @Me: Digitally-Mediated Team Communication in a Pandemic\" (SIGDOC 2021)",
    connections: ["Technical Communication", "Technology", "Pedagogy"]
  },
  {
    name: "\"ELLE-ments of Learning: A Framework for Analyzing Multimodal Technical Communication Strategies in an Educational VR Game\" (iLRN 2021)",
    connections: ["Technology", "Technical Communication", "Pedagogy"]
  },
  {
    name: "\"Work-in-Progress: Context is Key in Immersive Learning Environments\" with A. Giroux and Y. Piñeda (iLRN 2020)",
    connections: ["Technology", "Pedagogy"]
  },
  {
    name: "\"Work-in-Progress—Cozy Games for Learning: Vocabulary Practice with Anim-ELLE Crossing\" with Y. Kong (iLRN 2024)",
    connections: ["Technology", "Play", "Pedagogy"]
  }
];
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
  background(255);
  hoveredCircle = null;

  if (selectedCircle) {
    drawConnections(selectedCircle.word);
    displayProjects(selectedCircle.word);
  }

  for (let circle of circles) {
    let circleSize = 100;
    let textSizeFactor = 1;

    if (dist(mouseX, mouseY, circle.x, circle.y) < 75) {
      hoveredCircle = circle;
    }

    if (circle === growingCircle) {
      circleSize = 50 * (1 + growthFactor);
      textSizeFactor = 1 + growthFactor;
    }

    if (bouncing) {
      circle.x += circle.vx;
      circle.y += circle.vy;

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
    drawCircle(hoveredCircle, 250, 2);
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

function drawConnections(selectedWord) {
  let relatedProjects = projects.filter(p => 
    p.connections.includes(selectedWord)
  );
	
   let relatedTopics = new Set();
  relatedTopics.add(selectedWord);
  for (let project of relatedProjects) {
    project.connections.forEach(topic => relatedTopics.add(topic));
  }
  
  // Highlight related circles
  noStroke();
  for (let circle of circles) {
    if (relatedTopics.has(circle.word)) {
      fill(circle.color.replace('0.5', '0.8')); // Make related circles more opaque
    } else {
      fill(circle.color.replace('0.5', '0.2')); // Make unrelated circles more transparent
    }
    ellipse(circle.x, circle.y, 100);
  }
  stroke(100, 100, 100, 100);
  strokeWeight(3);
  
  for (let project of relatedProjects) {
    for (let i = 0; i < project.connections.length - 1; i++) {
      for (let j = i + 1; j < project.connections.length; j++) {
        let circle1 = circles.find(c => c.word === project.connections[i]);
        let circle2 = circles.find(c => c.word === project.connections[j]);
        if (circle1 && circle2) {
          line(circle1.x, circle1.y, circle2.x, circle2.y);
					
        }
      }
    }
  }
}

function displayProjects(selectedWord) {
  let relatedProjects = projects.filter(p => 
    p.connections.includes(selectedWord)
  );
  
  fill(0);
  noStroke();
  textAlign(LEFT);
  textSize(14);
  
  let x = 20;
  let y = 20;

  
  for (let project of relatedProjects) {
    text("• " + project.name, x, y);
    y += 20;
  }
}

function mousePressed() {
  for (let i = circles.length - 1; i >= 0; i--) {
    let circle = circles[i];
    let d = dist(mouseX, mouseY, circle.x, circle.y);
    if (d < 75) {
      selectedCircle = circle;
      growingCircle = circle;
      spinningCircle = null;
      growthFactor = 0;
      growthSpeed = 0.05;
      break;
    }
  }
}

function doubleClicked() {
  bouncing = !bouncing;
}