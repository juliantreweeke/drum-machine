
// recording variables

var mic, recorder, soundFile, soundFile2;
var state = 0; // mousePress will increment from Record, to Stop, to Play
var soundFiles = [];



var eq = false;
// var filtereq = false

var reverb;
var reverbSize;

var reverbDecay;
var settings;
var rSlider;
var controller = {
  Filter: 300,
  FilterHigh:10000,
  ReverbTime: 100,
  ReverbDecay:1,
};

var drawn = [];

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

var gui;




// drum stuff

var kicksamples = ['audio/defaultkick.wav','audio/dnbkick.wav','audio/druidkick.wav','audio/punchykick.wav'];
var kickname = ['KICK','DNB KICK','DRUID KICK','PUNCHY'];

var snaresamples = ['audio/snare.wav','audio/resasnare.wav','audio/dnbsnare.wav','audio/tightsnare.wav'];
var snarename = ['SNARE','RESA SNR','DNB SNR','TIGHT SNR'];




function preload() {
    sounds[1] = loadSound(kicksamples[0]);
    sounds[2] = loadSound(snaresamples[0]);
    sounds[3] = loadSound('audio/hat.wav');

}

var kicks = [];
var snares = [];
var hats = [];

// html synth stuff

wavetypes = ['square','triangle','sine','sawtooth'];

var wave;
wave = new p5.Oscillator();
wave.setType(wavetypes[0]);
wave.amp(0);
wave.freq(110);
wave.start();
var synths = [];
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
var bassmelody = [];
var basskey = [55,110,123,130,146,164,174,195];

// recording stuff

var recs = [];
var recs2 = [];
var recs3 = [];


  // generate each individual sound pad from object constructors

  var createGrid = function(){

    for (var i = 0, j=0 ; i < 16; i++, j+= 40 ) {
      // top left index
    kicks.push(new HtmlSquare('120',j,i,'kick'));
    snares.push(new HtmlSquare('160',j,i,'snare'));
    hats.push(new HtmlSquare('200',j,i,'hat'));
    synths.push(new HtmlSynth('280',j,i,'synth'));
    basses.push(new HtmlBass('340',j,i,'bass'));
    recs.push(new RecordSquare('400',j,i,'rec1',soundFile));
    recs2.push(new RecordSquare('440',j,i,'rec2',soundFile2));
    recs3.push(new RecordSquare('480',j,i,'rec3',soundFile3));
    }

    for (var i = 0; i < kicks.length; i++) {
      kicks[i].display();
      snares[i].display();
      hats[i].display();
      synths[i].display();
      basses[i].display();
      recs[i].display();
      recs2[i].display();
      recs3[i].display();
    };
  }







  // var gui = createGui('Label');
  // gui.addGlobals('reverbDecay');
















function setup() {

  var c = createCanvas(windowWidth, windowHeight);
  c.parent('p5Div');

  slider = document.getElementById("slider");







  filter = new p5.BandPass();
  noise = new p5.Noise();
  // disconnect unfiltered noise,
  // and connect to filter
  // fft = new p5.FFT();

  //Sequencer stuff

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
    gui.add(controller, 'Filter', 5, 300).onFinishChange(function(val){
      // update Revervb
      // reverb.set(2, parseInt(controller.reverbSize));
      // reverb.process(wave, val, 2);

      filter.freq(val);

    });

    gui.add(controller, 'FilterHigh', 300, 10000).onFinishChange(function(val){
      // update Revervb
      // reverb.set(2, parseInt(controller.reverbSize));
      // reverb.process(wave, val, 2);

      filterhigh.freq(val);

    });






    gui.add(controller, 'ReverbTime', 1, 99).onFinishChange(function(val){
      // update Revervb
      // reverb.set(2, parseInt(controller.reverbSize));

      reverb.set(val, 1 ,false);

    });

    gui.add(controller, 'ReverbDecay', 1, 99).onFinishChange(function(val){
      // update Revervb
      // reverb.set(2, parseInt(controller.reverbSize));

      reverb.set(1, val ,false);

    });








    filterFreq = 300;
    filterWidth = 5;
    //
    filter = new p5.LowPass(); // création d'un filtre de type lowpass
    // on déconnecte nos sources de la sortie principale
    filter.freq(filterFreq);
  // give the filter a narrow band (lower res = wider bandpass)
    filter.res(filterWidth);

    filterHighFreq = 4000;
    // filterWidthHigh = 1;

    filterHighStart = new p5.HighPass();
    filterHighStart.freq = 500;
    filterHighStart.res = 1;


    filterhigh = new p5.LowPass();
    filterhigh.freq(4000);
    filter.res = 5;

    // sounds[1].disconnect();
    // sounds[2].disconnect();
    // sounds[3].disconnect();
    // delay = new p5.Delay();
    //
    // wave.disconnect();
    // bass.disconnect();

    // delay.process(wave, 56/bpm, .7, 4000);
    // delay.disconnect();

    // filter.process(sounds[1]);
    // filter.process(sounds[2]);
    // filter.process(sounds[3]);
    // filter.process(wave);
    // filter.process(bass);
    //
    // filterHighStart.process(sounds[1]);
    // filterHighStart.process(sounds[2]);
    // filterHighStart.process(sounds[3]);
    // filterHighStart.process(wave);
    // filterHighStart.process(bass);
    // filterHighStart.disconnect();
    // filterhigh.process(filterHighStart);

    // eqband1 = new p5.BandPass();
    // eqband1.freq(125);
    // eqband1.res(5);
    // eqband1.process(sounds[1]);
    // eqband1.process(sounds[2]);
    // eqband1.process(sounds[3]);
    // eqband1.process(wave);
    // eqband1.process(bass);


    // reverb :

    reverbTime = 1;
    reverbDecay = 100;
    reverb = new p5.Reverb(); // création de la reverb
    // filter.disconnect(); // on déconnecte le filtre de la sortie principale
    // on connecte le filtre à la reverb
    reverb.process(wave, reverbTime, reverbDecay); // 3 second reverbTime, decayRate of 2%
    // // reverbSize = controller.reverbSize;
    // reverbSize = 50;
    // reverbDecay = 100;
    // reverb = new p5.Reverb(); // création de la reverb
    // // debugger;
    // // reverb.process(sounds[0], reverbTime, reverbDecay); //
    // reverb.process(wave, 2, 2); //


    //


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
    // synth analysis
    analyzer = new p5.Amplitude();
    analyzer.setInput(wave);

    bassanalyzer = new p5.FFT();
    bassanalyzer.setInput(bass);

    kickanalyzer = new p5.Amplitude();

    fftkick = new p5.FFT();
    fftkick.setInput(sounds[1]);

    fftsnare = new p5.FFT();
    fftsnare.setInput(sounds[2]);



    // ffthat = new p5.Amplitude();
    // ffthat.setInput(sounds[3]);

    // ffthat = new p5.FFT();
    // ffthat.setInput(sounds[3]);



    // recording stuff

    // create an audio in
    mic = new p5.AudioIn();

    // users must manually enable their browser microphone for recording to work properly!
    mic.start();

    // create a sound recorder
    recorder = new p5.SoundRecorder();

    // connect the mic to the recorder
    recorder.setInput(mic);

    // create an empty sound file that we will use to playback the recording
    soundFile = new p5.SoundFile();
    soundFile2 =new p5.SoundFile();
    soundFile3 =new p5.SoundFile();

    fftrec1 = new p5.FFT();
    fftrec1.setInput(soundFile);

    createGrid();

    // soundFiles.push(soundFile);
    // soundFiles.push(soundFile2);







} // setup


function draw() {

  background(0);

  var velocityScale = map(mouseY, 0, windowHeight, -2, 2) * 100;
  var sizeScale = map(mouseX, 0, windowWidth, 0.1, 10 );

  // Draw an ellipse with size based on volume

  var rms = analyzer.getLevel() * 10;
  var rmscol = analyzer.getLevel() * 1000;
  fill(0,0,250);
  stroke(rmscol);

  // console.log(rms);

  wavecolor = waveshape.analyze();

  for (var i = 0; i < wavecolor.length; i++) {
    noStroke();
    fill(0,0,wavecolor[i]);
    rect(random(windowWidth), random(mouseX), random(0,wavecolor[i]) + velocityScale,random(0,100));
  }

    var bassSpectrum = bassanalyzer.analyze();

    for (var i = 0; i < 10 ; i++) {
      stroke(0,0,100);
      fill(0,0,250);
      rect(random(bassSpectrum) + 800, bassSpectrum[i], random(0,bassSpectrum[i]),random(0,100));
    }

    var recSpectrum = fftrec1.analyze();

    for (var i = 0; i < 10 ; i++) {
      stroke(0,0,100);
      // fill(random(250));

      fill(random(250));
      ellipse(random(recSpectrum) + 500, recSpectrum[i], random(0,recSpectrum[i]));
    }





  var spectrum = fftkick.analyze();

  for (var i = 0; i < spectrum.length / 2; i++){
    noStroke();
    fill(0,0,spectrum[i]);
    ellipse(random(spectrum[i]) + velocityScale, random(500,1000), spectrum[i] * 100,spectrum[i]);
  }


  // kick effect filling screen
  // for (var i = 0; i < spectrum.length / 2; i++){
  //   noStroke();
  //   fill(0,0,spectrum[i]);
  //   ellipse(random(windowWidth) + velocityScale, windowHeight, spectrum[i],spectrum[i] * 100);
  // }






  var snareSpectrum = fftsnare.analyze();

  for (var i = 0; i < snareSpectrum.length; i++){
    noStroke();
    fill(0,0,random(250));
    triangle(random(snareSpectrum[i]),random(snareSpectrum[i]),random(snareSpectrum[i]),random(snareSpectrum[i]),random(snareSpectrum[i]),random(snareSpectrum[i]));
  }

  // var hatSpectrum = ffthat.analyze();
  //
  //
  // for (var i = 0; i < 10; i++){
  //
  //   noStroke();
  //   fill(random(250));
  //   triangle(hatSpectrum[i],random(50),random(hatSpectrum[i]),random(hatSpectrum[i]),random(hatSpectrum[i]),random(hatSpectrum[i]));
  //
  // }









  // var snareSpectrum = fftsnare.analyze();
  //
  // for (var i = 0; i < snareSpectrum.length; i++){
  //   // noStroke();
  //   stroke(0,0,255);
  //   fill(0,0,random(250));
  //   line(random(windowWidth), windowHeight , snareSpectrum[i], snareSpectrum[i]);
  //   // line(random(windowWidth), windowHeight , 50, snareSpectrum[i] / 2 );
  // }








  // console.log(wavecolor, "wavecolor");


  // console.log(velocityScale);

  // draw filtered spectrum

  if( drawn.length > 1 && eq === true ){
    console.log('drawing');
    for (var i = 0; i < drawn.length; i++) {
      var draw = drawn[i]
      fill(0,0,250);
      ellipse(draw.x, draw.y, random(draw.size), random(draw.size));
    }

  };






  if( mouseIsPressed ){



      if (eq === false ){




        // fill(0,0,250);
        // ellipse(mouseX, mouseY, 40, 40);
        // drawn.push({x: mouseX, y: mouseY, size: 40,col:"white" });
        //
        // for (var i = 0; i < drawn.length; i++) {
        //   var draw = drawn[i]
        //   fill(0,0,random(250));
        //   ellipse(draw.x, draw.y, random(draw.size), random(draw.size));
        // }

      } else {

        // console.log(eq);

        // turn on filter
        // make drawing turn black

        fill(0,0,0);

        // ellipse(mouseX, mouseY, 40, 40);
        // visuals
        drawn.push({x: mouseX, y: mouseY, size: 40,col:"white" });

        // for (var i = 0; i < drawn.length; i++) {
        //   var draw = drawn[i]
        //   fill(0,0,random(250));
        //   ellipse(draw.x, draw.y, random(draw.size), random(draw.size));
        // }

        // filter
        // reverse the mouse Y pos number
        var reverseMouse = Math.abs(mouseY - 600) ;
        console.log("rev ",reverseMouse);
        filter.freq(reverseMouse);



      // console.log(mouseY);
      // if(mouseY > 100){
      //   mouseY += 3000;
      // }

      // console.log(mouseY, "mouse Y");
      // console.log(mouseX, "mouse X");
    }

  }




} // function draw





function step() {
  if (beat > 8){
    drawn.pop();
  };

  var previousKick = $('#' + 'kick' + (beat - 1) );
  if (beat === 0){
    previousKick = $('#' + 'kick' + 15 );
  }
  previousKick.css({
  border: 'blue solid 2px'
  });

  if (synths[beat].active === true) {
      wave.amp(0.2);
      wave.freq(synthmelody[beat]);
  } else {
      wave.amp(0);
      $('#' + 'synth' + beat ).css({
      backgroundColor: 'black'
      });
  }

  if (basses[beat].active === true) {
      bass.amp(0.6);
      bass.freq(bassmelody[beat]);
  } else {
      bass.amp(0);
      $('#' + 'bass' + beat ).css({
      backgroundColor: 'black'
      });
  }

  if (kicks[beat].active === true) {
      sounds[1].play(0)
      $('#' + 'kick' + beat ).effect( "bounce", { times: 3 }, "slow" );
  } else {
    $('#' + 'kick' + beat ).css({
    border: 'white solid 2px'
    });
  }

  if (snares[beat].active === true) {
      sounds[2].play(0)
      $('#' + 'snare' + beat ).effect( "shake" );
  } else {
    $('#' + 'snare' + beat ).css({
    border:'blue 2px solid'
    });
  }

  if (hats[beat].active === true) {
      sounds[3].play(0)
      $('#' + 'hat' + beat ).effect( "bounce", { times: 6 }, "fast" );
  } else {
    $('#' + 'hat' + beat ).css({
    border:'blue 2px solid'
    });
  }

  var recChecker = function(array,id,filename){
    if (array[beat].active === true) {
        filename.play();
      $(id + beat).effect( "bounce", { times: 3 }, "slow" );
    } else {
      $(id + beat).css({
      border:'blue 2px solid'
      });
    }
  }

  recChecker(recs,'#rec1',soundFile);
  recChecker(recs2,'#rec2',soundFile2);
  recChecker(recs3,'#rec3',soundFile3);

  beat += 1;
  beat = beat % 16;
}
