function setup() {
  createCanvas(500, 500);
  background(32);
}

function draw() {
	//try changing the words
	var words = ["make","code","craft","break","hack","try","sustain","frustrate","exhaust","function","shape","twist"]
	//want different colored text? try adapting the code in the simple bar chart
  if(mouseIsPressed) {
		fill("red")
    text(random(words), mouseX, mouseY);
  }
}