


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




var slider;

// trying to save freq of synth sound
var notes = [];

var sounds = [];

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

    sounds[3] = loadSound(kicksamples[0]);
    sounds[4] = loadSound('audio/snare.wav');
    sounds[5] = loadSound('audio/hat.wav');
}




// html drum array

var kicks2 = [];
var snares2 = [];
var hats2 = [];

// html synth stuff
var synths2 = [];
var synthskey = [110,440,493,523,587,659,698,783];
var synthmelody = [];
var bluecolors = ['#040420','#0101a5','#2121bf','#0650bf','#397ae8','#8bccec','#d1d1f0','#e9e9f4'];

// bass stuff

var bass;
bass = new p5.Oscillator();
bass.setType('triangle');
bass.amp(0);
bass.freq(55);
bass.start();

var basses = [];

var basses2 = [];

var bassmelody = [];
var basskey = [55,110,123,130,146,164,174,195];


  // generate each individual sound pad from object constructors

  for (var i = 0, j=0 ; i < 16; i++, j+= 40 ) {
    // top left index
  kicks2.push(new HtmlSquare('320',j,i,'kick'));
  snares2.push(new HtmlSquare('360',j,i,'snare'));
  hats2.push(new HtmlSquare('400',j,i,'hat'));
  synths2.push(new HtmlSynth('480',j,i,'synth'));
  basses2.push(new HtmlBass('540',j,i,'bass'));
  }

  for (var i = 0; i < kicks2.length; i++) {
    kicks2[i].display();
    snares2[i].display();
    hats2[i].display();
    synths2[i].display();
    basses2[i].display();
  };
















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



  for (var i = 0; i < 16; i++) {

    basses[i].clicked();
  }


}


function draw() {


  // console.log('reverbSize', controller.reverbSize, reverb);

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








  // background(0);
  for (var i = 0; i < 16; i++) {
    // kicks[i].move();


    basses[i].display();






    // alert($('#1')).;
    // fill(255,255,255);
    // rect(0 + beat * 40, 0, 40, 120);









  }








} // function draw




function step() {
  // debugger;

    if (synths2[beat].active === true) {
        wave.amp(0.1);
        wave.freq(synthmelody[beat]);
    }

    if (synths2[beat].active === false) {
        wave.amp(0);
    };

    if (basses2[beat].active === true) {

        bass.amp(0.6);
        bass.freq(bassmelody[beat]);
    }

    if (basses2[beat].active === false) {
        // wave.amp(0);
        bass.amp(0);
    }






    // if (basses[beat].active === true) {
    //     bass.amp(0.6);
    //     bass.freq(bassmelody[beat]);
    // }
    //
    // if (basses[beat].active === false) {
    //     bass.amp(0);
    // }

    if (kicks2[beat].active === true) {
        sounds[3].play(0)
    }

    if (snares2[beat].active === true) {
        sounds[4].play(0)
    }

    if (hats2[beat].active === true) {
        sounds[5].play(0)
    }







    beat += 1;
    beat = beat % 16;
}
