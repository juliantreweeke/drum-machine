
// recording variables

var mic, recorder, soundFile, soundFile2;
var state = 0; // mousePress will increment from Record, to Stop, to Play
var soundFiles = [];

var fxdraw = false;
// var filtereq = false

// var reverb;
// var reverbSize;
var settings;
// var rSlider;

var controller = {
  filter:12000,
  synthdelay:100,
  delaytime:100,
  reverbTime: 100,
  reverbDecay:1
};

var drawn = [];

var slider;

// trying to save freq of synth sound
var notes = [];

var sounds = [];

var myPart; //
var beat = 0; //
var bpm = 90; //

var filter, filterFreq, filterWidth; //
var reverb, reverbTime, reverbDecay; //
var settings; //
var fft1, fft2, fft3, fft4;

var counter = 0;
var timer = 0;

var gui;




// drum stuff

var kicksamples = ['audio/defaultkick.mp3','audio/dnbkick.mp3','audio/druidkick.mp3','audio/punchykick.mp3','audio/WDI22kick.mp3'];
var kickname = ['KICK','DNB KICK','DRUID KICK','PUNCHY','WDI22 KICK'];

var snaresamples = ['audio/snare.mp3','audio/resasnare.mp3','audio/dnbsnare.mp3','audio/tightsnare.mp3','audio/ninjasnare.mp3','audio/WDI22clap.mp3'];
var snarename = ['SNARE','RESA SNR','DNB SNR','TIGHT SNR','NINJA SNR','WDI22 CLP'];

var hatsamples = ['audio/hat.mp3','audio/hat2.mp3','audio/hat3.mp3','audio/cowbell.mp3'];
var hatname = ['HAT','HAT 2','HAT 3','COWBELL'];

function preload() {
    sounds[1] = loadSound(kicksamples[0]);
    sounds[2] = loadSound(snaresamples[0]);
    sounds[3] = loadSound(hatsamples[0]);
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


function setup() {

  var c = createCanvas(windowWidth, windowHeight);
  c.parent('p5Div');

  slider = document.getElementById("slider");

  // filter = new p5.BandPass();
  noise = new p5.Noise();

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

    // var gui = new dat.GUI();
    var gui = new dat.GUI( { height: 500 } );
    gui.closed = false;



    gui.add(controller, 'filter', 1, 10000).onFinishChange(function(val){
      filter.freq(val);
    });
    //
    gui.add(controller, 'synthdelay', 1, 6000).onFinishChange(function(val){
      delay.process(wave, 56/bpm, .7,val );
    });

    gui.add(controller, 'delaytime', 1, 56/bpm).onFinishChange(function(val){
      delay.process(wave, val, .7);
    });

    gui.add(controller, 'reverbTime', 1, 10).onFinishChange(function(val){
      // update Revervb
      // reverb.set(2, parseInt(controller.reverbSize));
      reverb.set(val, 1 ,false);
    });

    gui.add(controller, 'reverbDecay', 1, 99).onFinishChange(function(val){
      // update Revervb
      // reverb.set(2, parseInt(controller.reverbSize));
      reverb.set(1, val ,false);
    });

    filter = new p5.LowPass();
    filter.freq(10000);
    filter.res = 5;

    sounds[1].disconnect();
    sounds[2].disconnect();
    sounds[3].disconnect();
    wave.disconnect();
    bass.disconnect();

    delay = new p5.Delay();
    delay.process(wave, 56/bpm, .7, 1);
    delay.disconnect();

    reverbTime = 1;
    reverbDecay = 100;
    reverb = new p5.Reverb();

    reverb.process(wave, reverbTime, reverbDecay);
    reverb.process(bass, reverbTime, reverbDecay);
    reverb.process(sounds[1], reverbTime, reverbDecay);
    reverb.process(sounds[2], reverbTime, reverbDecay);
    reverb.process(sounds[3], reverbTime, reverbDecay);
    reverb.disconnect();


    filter.process(sounds[1]);
    filter.process(sounds[2]);
    filter.process(sounds[3]);
    filter.process(wave);
    filter.process(bass);
    filter.process(delay);
    filter.process(reverb);

    // reverb :




     // création de la reverb
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

    // fft1 = new p5.FFT();
    // fft1.setInput(sounds[0]);

    waveshape = new p5.FFT();
    waveshape.setInput(wave);

    // fft2 = new p5.FFT();
    // fft2.setInput(sounds[1]);
    // fft3 = new p5.FFT();
    // fft3.setInput(sounds[2]);
    // fft4 = new p5.FFT();
    // fft4.setInput(reverb);

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

    fftrec2 = new p5.FFT();
    fftrec2.setInput(soundFile2);

    fftrec3 = new p5.FFT();
    fftrec3.setInput(soundFile3);

    createGrid();

    // soundFiles.push(soundFile);
    // soundFiles.push(soundFile2);







} // setup


function draw() {

  background(0);

  var velocityScale = map(mouseY, 0, windowHeight, -2, 2) * 100;
  var sizeScale = map(mouseX, 0, windowWidth, 0.1, 10 );

  // Draw an ellipse with size based on volume

  // var rms = analyzer.getLevel() * 10;
  // var rmscol = analyzer.getLevel() * 1000;
  // fill(0,0,250);
  // stroke(rmscol);

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
    // visuals for recorded audio;

    // var recSpectrum = fftrec1.analyze();
    // for (var i = 0; i < 10 ; i++) {
    //   stroke(0,0,250);
    //   fill(random(250));
    //   ellipse(random(recSpectrum) + 500, recSpectrum[i] + 0, random(0,recSpectrum[i]));
    // }

    // var recSpectrum2 = fftrec2.analyze();
    // for (var i = 0; i < 20 ; i++) {
    //   stroke(0,0,250);
    //   fill(random(250));
    //   ellipse(random(recSpectrum2) + 1200, recSpectrum2[i] + 300, random(0,recSpectrum2[i]));
    //   // rotate(1);
    // };

    // var recSpectrum3 = fftrec3.analyze();
    // for (var i = 0; i < 20 ; i++) {
    //   stroke(0,0,250);
    //   fill(random(250));
    //   ellipse(random(recSpectrum3) + 0, recSpectrum3[i] + 300, random(0,recSpectrum3[i]));
    //   // rotate(1);
    // };



    var recordingSpectrum = function(x,y,name,target,loops){

      for (var i = 0; i < loops ; i++) {
        stroke(0,0,250);
        fill(random(250));
        ellipse(random(name) + x, name[i] + y, random(0,name[i]));
      };
    }; // recordingSpectrum function

    var recSpectrum = fftrec1.analyze();
    recordingSpectrum(500,0,recSpectrum,fftrec1,10);

    var recSpectrum2 = fftrec2.analyze();
    recordingSpectrum(1200,300,recSpectrum2,fftrec2,20);

    var recSpectrum3 = fftrec3.analyze();
    recordingSpectrum(0,300,recSpectrum3,fftrec3,30);





  var spectrum = fftkick.analyze();

  for (var i = 0; i < spectrum.length / 2; i++){
    noStroke();
    fill(0,0,spectrum[i]);
    ellipse(random(spectrum[i]) + velocityScale, random(500,1000), spectrum[i] * 100,spectrum[i]);
  };

  var snareSpectrum = fftsnare.analyze();

 for (var i = 0; i < snareSpectrum.length; i++){
   noStroke();
   fill(0,0,random(250));
   triangle(random(snareSpectrum[i] ),random(snareSpectrum[i]),random(snareSpectrum[i]),random(snareSpectrum[i]),random(snareSpectrum[i]),random(snareSpectrum[i]));
 }

  if( drawn.length > 1 && fxdraw === true ){
    console.log('drawing');
    for (var i = 0; i < drawn.length; i++) {
      var draw = drawn[i]
      fill(0,0,random(250));
      ellipse(draw.x, draw.y, random(draw.size), random(draw.size));
    }
  };


  if( mouseIsPressed ){

      // if mouse is pressed and draw is on then push shapes to the drawn array
      // and change fx parameters with mouse x and y
      if (fxdraw ){

        drawn.push({x: mouseX, y: mouseY, size: 40,col:"white" });

        var reverseMouseY = Math.abs(mouseY - 600) ;

        filter.freq(reverseMouseY + 100);
        // reverb.process(sounds[2], 5, reverseMouseY / 2);
        // var reverbMouseY = reverseMouseY /2 ;
        // if (reverseMouseY > 99){
        //   reverbMouseY = 99;
        // }
        // reverb.process(sounds[2], 5, reverbMouseY);



        // console.log(reverseMouseY / 2);




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
