/*

//

6.7 p5.js clicking on objects
Code for video https://vimeo.com/channels/learningp5js/141919520
*/

// var app = app || {};
var reverb;
var controller = {
  reverbSize: 13
};

var wave;
wave = new p5.Oscillator();
wave.setType('square');
wave.amp(0);
wave.freq(110);
wave.start();

var bass;
bass = new p5.Oscillator();
bass.setType('triangle');
bass.amp(0);
bass.freq(55);
bass.start();
var basses = [];
var bassmelody = [];
var basskey = [55,110,123,130,146,164,174,195];


var slider;

// trying to save freq of synth sound
var notes = [];

var sounds = [];

var bdboxes = [];
var snboxes = [];
var hhboxes = [];
// sequenceur
var myPart; // un metronome
var beat = 0; //
var bpm = 90; //
// effets
var filter, filterFreq, filterWidth //
var reverb, reverbTime, reverbDecay //
var settings //
var fft1, fft2, fft3, fft4;

var counter = 0;
var timer = 0;

var kicksamples = ['audio/defaultkick.wav','audio/dnbkick.wav','audio/druidkick.wav','audio/punchykick.wav'];




function preload() {
    sounds[0] = loadSound(kicksamples[0]);
    sounds[1] = loadSound('audio/snare.wav');
    sounds[2] = loadSound('audio/hat.wav');
}



// drum arrays

var kicks = [];
var snares = [];
var hats = [];

var kicks2 = [];


// synth stuff
var synths = [];
var synthskey = [110,440,493,523,587,659,698,783];
var synthmelody = [];
var bluecolors = ['#040420','#0101a5','#2121bf','#0650bf','#397ae8','#8bccec','#d1d1f0','#e9e9f4'];

// html squares

for (var i = 0; i < 16; i++) {

  kicks2.push(new HtmlSquare(i));


}









function setup() {

  // var c = createCanvas(windowWidth, windowHeight);
  // var c = createCanvas(700, windowHeight);
  var c = createCanvas(700, 500);
  c.parent('p5Div');
  // createCanvas(1000, 1000);

  // filter stuff

  filter = new p5.BandPass();
  noise = new p5.Noise();
  // disconnect unfiltered noise,
  // and connect to filter

  fft = new p5.FFT();


  // filto = new p5.BandPass();






  for (var i = 0, j=0 ; i < 16; i++, j+=40) {

    // var x = random(width);
    // var y = random(height);
    var x = j;
    var y = 0;

    // kicks2.push(new HtmlSquare(x, y, i));
    kicks.push(new Square(x, y, i));
    snares.push(new Square(x, 40, i));
    hats.push(new Square(x, 80, i));
    synths.push(new SynthSquare(x, 160, i));
    basses.push(new BassSquare(x, 240, i));


  }

  //Sequencer
    myPart = new p5.Part();
    var pulse = new p5.Phrase('pulse', step, [1, 1, 1, 1]);
    myPart.addPhrase(pulse);
    myPart.setBPM(bpm);
    myPart.start();
    myPart.loop();

    // my own effects
    // cant get working

    // ---------------------------------------------------
    // dat gui stuff



    var gui = new dat.GUI();
    gui.add(controller, 'reverbSize', 0, 100).onFinishChange(function(val){
      // update Revervb
      // reverb.set(2, parseInt(controller.reverbSize));
      reverb.process(wave, val, 2);
    });

    reverbSize = controller.reverbSize;
    reverbDecay = 100;
    reverb = new p5.Reverb(); // création de la reverb
    // debugger;
    // reverb.process(sounds[0], reverbTime, reverbDecay); //
    reverb.process(wave, 2, 2); //

    delay = new p5.Delay();

  // delay.process() accepts 4 parameters:
  // source, delayTime, feedback, filter frequency
  // play with these numbers!!
    delay.process(wave, .80, .7, 4000);



    // ---------------------------------------------------


    fft1 = new p5.FFT();
    fft1.setInput(sounds[0]);

    waveshape = new p5.FFT();
    waveshape.setInput(wave);

    fft2 = new p5.FFT();
    fft2.setInput(sounds[1]);
    // fft3 = new p5.FFT();
    // fft3.setInput(sounds[2]);
    fft4 = new p5.FFT();
    fft4.setInput(reverb);



    // Patch the input to an volume analyzer
    analyzer = new p5.Amplitude();
    analyzer.setInput(wave);




} // setup







function mousePressed() {
  notes[beat]=(mouseX);


  for (var i = 0; i < kicks.length; i++) {
    kicks[i].clicked();
    snares[i].clicked();
    hats[i].clicked();
    synths[i].clicked();
    basses[i].clicked();
  }

  if (mouseY > 500 ){

    wave.amp(0.2);

    wave.freq(mouseX);

  }

}

function mouseReleased() {




// console.log(notes[1]);
// console.log(beat);

// wave.freq(notes[0],notes[1]);

}














function draw() {


  console.log('reverbSize', controller.reverbSize, reverb);

  // Draw an ellipse with size based on volume

  var rms = analyzer.getLevel() * 10;
  var rmscol = analyzer.getLevel() * 1000;
  fill(0,0,250);
  stroke(rmscol);

  // console.log(rms);

  wavecolor = waveshape.analyze();


  for (var i = 0; i < wavecolor.length; i++) {
    stroke(wavecolor[i]);
    fill(0,0,wavecolor[i]);
    ellipse(540, 400, wavecolor[i],wavecolor[i]);
  }


  // console.log(wavecolor, "wavecolor");






  var velocityScale = map(mouseY, 0, windowHeight, -2, 2) * 100;
  // console.log(velocityScale);

  // draw filtered spectrum
  var spectrum = fft.analyze();
  noStroke();
  for (var i = 0; i < spectrum.length; i++) {
    var x = map(i, 0, spectrum.length, 0, width);
    var h = -height + map(spectrum[i], 0, 255, height, 0);
    rect(x, height, width/spectrum.length, h);
  }








  // background(0);
  for (var i = 0; i < kicks.length; i++) {
    // kicks[i].move();
    kicks[i].display();
    snares[i].display();
    hats[i].display();
    synths[i].display();
    basses[i].display();






    // alert($('#1')).;
    fill(255,255,255);
    rect(0 + beat * 40, 0, 40, 120);









  }








} // function draw

// frenchy

function drawWave(col, wav) {
    noFill();
    stroke(col);
    strokeWeight(1);

    beginShape();
    for (var i = 0; i < wav.length; i++) {
        var x = map(i, 0, wav.length, 0, width / 2);
        var y = map(wav[i], -1, 1, height * 1 / 4, height * 3 / 4);
        vertex(x, y);
    }
    endShape();
}



function step() {
  // debugger;

    if (kicks[beat].active === true) {
        sounds[0].play(0)
       kicks[beat].col = color(250,1,1);

    }



    if (snares[beat].active === true) {
        sounds[1].play(0)
    }

    if (hats[beat].active === true) {
        sounds[2].play(0)
    }

    if (synths[beat].active === true) {
        wave.amp(0.1);
        wave.freq(synthmelody[beat]);
    }

    if (synths[beat].active === false) {
        wave.amp(0);
    }

    if (basses[beat].active === true) {
        bass.amp(0.6);
        bass.freq(bassmelody[beat]);
    }

    if (basses[beat].active === false) {
        bass.amp(0);
    }







    beat += 1;
    beat = beat % 16;
}
