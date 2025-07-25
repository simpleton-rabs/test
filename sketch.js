  // Variables for buttons
let buttonS, buttonR, buttonM, buttonO;
//varliables for sliders
let mixSlider, speedSlider1, speedSlider2;

//variables and preload for sounds default on load
let sound1, sound2, sound1Amp, sound2Amp, level1, level2;
function preload() {
  soundFormats("mp3");
  // sound1 = loadSound("./../sound/sitarm.mp3");
  // sound2 = loadSound("./../sound/sitarr.mp3");
  sound1 = loadSound("/sound/sitarm.mp3");
  sound2 = loadSound("/sound/sitarr.mp3");

}

function setup() {
  createCanvas(windowWidth, windowHeight);
  //create buttons
  // Start stop
  buttonS = createButton("Start");
  buttonS.size(100, 50);
  buttonS.position(width / 2, 150);
  buttonS.mouseClicked(startPause);
  //Button reflective sounds
  buttonR = createButton("Reflective");
  buttonR.size(100, 50);
  buttonR.position(width / 4, 60);
  buttonR.mouseClicked(loadReflective);
  //Button Mysterious sounds
  buttonM = createButton("Mysterious");
  buttonM.size(100, 50);
  buttonM.position(width / 2, 60);
  buttonM.mouseClicked(loadMysterious);
  //Button out there sounds
  buttonO = createButton("Out There");
  buttonO.size(100, 50);
  buttonO.position(width / 2 + width / 4, 60);
  buttonO.mouseClicked(loadOutThere);

  //sliders
  //Slider to mix sounds
  mixSlider = createSlider(0, 1, 0.5, 0.1);
  mixSlider.position(width / 2.5, 250);
  mixSlider.size(width / 4);
  //slider for sound 1 speed
  speedSlider1 = createSlider(0, 2, 1, 0.1);
  speedSlider1.position(width / 4 - 40, 300);
  speedSlider1.size(width / 8);
  //slider for sound 2 speed
  speedSlider2 = createSlider(0, 2, 1, 0.1);
  speedSlider2.position(width / 2 + width / 4 - 40, 300);
  speedSlider2.size(width / 8);

  //varibles for amplitudes of sound 1 and sound 2
  sound1Amp = new p5.Amplitude();
  sound2Amp = new p5.Amplitude();
  sound1Amp.setInput(sound1);
  sound2Amp.setInput(sound2);
  
  console.log("setting up fine");
}

//function plays or stops sound if button pressed
function startPause() {
  if (sound1.isPlaying() == true) {
    sound1.pause();
    sound2.pause();
    buttonS.html("Start");
  } else {
    sound1.play();
    sound2.play();
    buttonS.html("Pause");
  }
}

//function loads reflective sounds
function loadReflective() {
  reset();
  // sound1 = loadSound("./../sound/sitarm.mp3");
  // sound2 = loadSound("./../sound/sitarr.mp3");
  sound1 = loadSound("/sound/sitarm.mp3");
  sound2 = loadSound("/sound/sitarr.mp3");

  soundLevels();
}

//functions loads mysterious sounds
function loadMysterious() {
  reset();
  // sound1 = loadSound("./../sound/acoustic.mp3");
  // sound2 = loadSound("./../sound/ohandah.mp3");
  sound1 = loadSound("/sound/acoustic.mp3");
  sound2 = loadSound("/sound/ohandah.mp3");
  soundLevels();
}

//functions loads out there sounds
function loadOutThere() {
  reset();
  // sound1 = loadSound("./../sound/rhythm.mp3");
  // sound2 = loadSound("./../sound/slide.mp3");
  sound1 = loadSound("/sound/rhythm.mp3");
  sound2 = loadSound("/sound/slide.mp3");
  soundLevels();
}

//function to reset start stop button sliders and stop sounds
function reset() {
  sound1.stop();
  sound2.stop();
  buttonS.html("Start");
  mixSlider.value(0.5);
  speedSlider1.value(1);
  speedSlider2.value(1);
}

//function to set up amplitude levels after changing sounds
function soundLevels() {
  sound1Amp.setInput(sound1);
  sound2Amp.setInput(sound2);
  level1 = sound1Amp.getLevel();
  level2 = sound2Amp.getLevel();
}

function draw() {
  background(255);
  // background(255, 0, 255);
  fill(255, 0, 255);
  textFont("Verdana", 16);
  //title
  text("Mood Engine Prototype - choose a mood and press start", width / 2.5, 25);

  //label for mixer slider
  text("balance the two sounds", width / 2 - 25, 300);

  // variables for volumes for each sound - sound 1 will be inverse of sound 2 to allow balancing with one slider
  let sound2Volume = mixSlider.value();
  let sound1Volume = 1 - sound2Volume;
  // set sound amplitudes
  sound1.amp(sound1Volume);
  sound2.amp(sound2Volume);

  //variables for speed of each sound
  let sound1Rate = speedSlider1.value();
  let sound2Rate = speedSlider2.value();
  // set sound rates
  sound1.rate(sound1Rate);
  sound2.rate(sound2Rate);

  //call function to set live volume levels - level1 level2
  soundLevels();

  //circle for sound1 vibrations
  let diameter1 = map(level1, 0, 0.5, 100, 500);
  fill("blue");
  circle(width / 4 + 50, 200, diameter1);
  // label for sound 1 speed
  text("Sound 1 speed", width / 4 + 50, 350);

  //circle for sound2 vibrations
  let diameter2 = map(level2, 0, 0.5, 100, 500);
  fill("red");
  circle(width / 2 + width / 4 + 50, 200, diameter2);
  //label for sound 2 speed
  text("Sound 2 speed", width / 2 + width / 4 + 50, 350);

  text("All sounds Rabi Syed 2024", 10, height - 10);
  //the end
  console.log("drawingfine");
}
