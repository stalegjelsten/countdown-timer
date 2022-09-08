let timer;
let gong;
let bg;
let FR = 1
let params = {
  clock: false
}


function setup() {
  canv = createCanvas(windowWidth, windowHeight);
  frameRate(FR);
  colorMode(HSB);
  textSize(width / 5)
  gong = loadSound("assets/gong.wav");
  bg = loadImage("assets/bg.jpg")
  timer = new Timer(5, 0, (0, 0, 0));
  let gui = new dat.GUI();
  gui.add(timer, "seconds", 0, 3600, 5);
  gui.add(timer, "start").name("Start / pause");
  gui.add(params, "clock").name("Vis klokke")
}

class Timer {
  constructor(minutes, seconds, color) {
    this.seconds = seconds + minutes * 60
    this.color = color
    this.secondsRun = 0
    this.started = false
  }

  start() {
    this.started = !this.started;
    loop();
  }
}

function draw() {
  // background(frameCount % 360, max(frameCount % 100, 100 - frameCount % 100), 90);
  let scale = 1;
  background(39, 4, 93)
  imageMode(CENTER);
  image(bg, 0.5 * width, 0.5 * height, scale * width, scale * bg.height * width / bg.width); // to fit 
  textAlign(CENTER, CENTER);

  if (frameCount % FR == 0 && timer.started) {
    timer.secondsRun++
    timer.seconds--
  }
  if (timer.seconds == 0) {
    timer.started = false;
    gong.play()
    noLoop()
  }
  let secs = floor(timer.seconds % 60);
  if (str(secs).length == 1) {
    secs = str("0" + secs);
  } else {
    secs = str(secs)
  }
  let mins = floor(timer.seconds / 60);
  if (str(mins).length == 1) {
    mins = str("0" + mins);
  } else {
    mins = str(mins)
  }


  if (params.clock) {
    text(mins + ":" + secs, width / 2, height / 4);
    text(String(hour()).padStart(2, "0") + ":" + String(minute()).padStart(2, "0") + ":" + String(second()).padStart(2, "0"), width / 2, 3 * height / 4);
  } else {
    text(mins + ":" + secs, width / 2, height / 2);
  }



}


function keyPressed() {
  if (key == " ") {
    timer.started = !timer.started;
  }
}