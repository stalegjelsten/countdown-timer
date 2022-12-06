let timer;
let alarmSound;
let bg;
let alarmImg;
let FR = 10
let params = {
  clock: false,
  alarmFile: "assets/sleigh_bells.mp3",
  backgroundFile: "assets/christmas.jpg",
  alarmImage: "assets/nisse.png",
}


function setup() {
  canv = createCanvas(windowWidth, windowHeight);
  frameRate(FR);
  colorMode(HSB);
  textSize(width / 5)
  alarmSound = loadSound(params.alarmFile);
  bg = loadImage(params.backgroundFile)
  if (params.alarmImage) {
    alarmImg = loadImage(params.alarmImage)
  }
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
    this.alarmStarted = false
    this.alarmImageRot = false
  }

  start() {
    this.started = !this.started;
    this.alarmStarted = false
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
    if (!timer.alarmStarted) {
      alarmSound.play();
      timer.alarmStarted = true
    }

    if (params.alarmImage) {
      push()
      let alarmImgSize = 0.2
      translate(0.5 * width, 0.5 * height)
      if (frameCount % 2 == 0) {
        timer.alarmImageRot = !timer.alarmImageRot;
      }
      if (timer.alarmImageRot) {
        rotate(PI/5);
        alarmImgSize = 0.25
      }
      image(alarmImg, 0, 0, alarmImgSize * width, alarmImgSize*width*alarmImg.height/alarmImg.width)
      pop()

    }
  }
  let secs = floor(timer.seconds % 60);
  if (str(secs).length == 1) {
    secs = str("0" + secs);
  } else {
    secs = str(secs);
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
    if (timer.seconds != 0) {
      text(mins + ":" + secs, width / 2, height / 2);
    }
  }



}


function keyPressed() {
  if (key == " ") {
    timer.started = !timer.started;
  }
}