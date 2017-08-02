

$(document).ready(function(){

  // $(document).on('click', '.pad', function(){
  // });


  var kickcounter = 0;
  var snarecounter = 0;
  var synthcounter = 0;
  var basscounter = 0;
  console.log(kicksamples.length);


  $('.kicktoggle').click(function(){
      kickcounter++;
      kickcounter = kickcounter % kicksamples.length;
      sounds[1] = loadSound(kicksamples[kickcounter]);
      fftkick.setInput(sounds[1]);
      $(this).text(kickname[kickcounter]);
  })

  $('.snaretoggle').click(function(){
      snarecounter++;
      snarecounter = snarecounter % snaresamples.length;
      sounds[2] = loadSound(snaresamples[snarecounter]);
      fftsnare.setInput(sounds[2]);
      $(this).text(snarename[snarecounter]);
  })

  $('.synthtoggle').click(function(){
      synthcounter++;
      synthcounter = synthcounter % wavetypes.length;
      wave.setType(wavetypes[synthcounter]);
      $(this).text(wavetypes[synthcounter]);
  })

  $('.basstoggle').click(function(){
      basscounter++;
      basscounter = basscounter % wavetypes.length;
      bass.setType(wavetypes[basscounter]);
      $(this).text(wavetypes[basscounter]);
  })


  $('.tempoup').click(function(){
      bpm++;
      myPart.setBPM(bpm);
      $('.tempo').text(bpm.toString());
  })

  $('.tempodown').click(function(){
      bpm--;
      myPart.setBPM(bpm);
      $('.tempo').text(bpm.toString());
  })

  var fxkickcounter = 0;
  $('.fxkick').click(function(){
    // reverb.process(sounds[1], 10, 10);

      if (fxkickcounter === 1){
        // reverb.process(sounds[1], 0, 0);
        reverb.disconnect;
      } else {
        fxkickcounter++;
        reverb.connect(sounds[1]);
        reverb.process(sounds[1], slider.value, 10); //
        fxkickcounter = 0;

      }
  })

  // double the values in the synthskey array to change octaves
  $('.octave').click(function(){
      synthmelody = octaveUp(synthmelody);
  });

  $('.octave2').click(function(){
    synthmelody = octaveDown(synthmelody);
  });

  $('.bassoctave').click(function(){
      bassmelody = octaveUp(bassmelody);
  });

  $('.bassoctave2').click(function(){
    bassmelody = octaveDown(bassmelody);
  });

  var octaveUp = function(array){
    return array.map(function (n) { return n * 2; });
  };

  var octaveDown = function(array){
    return array = array.map(function (n) { return n / 2; });
  };


  var clear = function(){


    kicks = [];
    snares = [];
    hats = [];
    synths = [];
    basses = [];
    recs = [];
    recs2 = [];
    beat = 0;
    createGrid();

  };

  var clearAll = function(array){

    return array = array.map(function (n) { n.active = false });

  };

  $('.clearbutton').click(function(){

    clearAll = clearAll(kicks);

  });











  $('.fadebutton').click(function(){
    $('#main').toggleClass( "noopacity");
  });



  $('.eqbutton').click(function(){


    $('#main').toggleClass( "noopacity");

    if (eq === false){
      // turn on eq draw
      eq = true;





    } else {
      // turn off eq draw
      eq = false;
      filter.freq(4000);





    }


  });



  // $('recordbutton').click(function(){
  //
  //
  //
  // })

  var recordsound = function(filename,node){

    if (state === 0 && mic.enabled) {
      masterVolume(0);

      var recordCountDown = setInterval(function(){ myTimer() }, 1000);
      var countdown = 1;

      function myTimer() {
        if(countdown === 4 ){

          $(node).text("GO!");

        }

        else if(countdown === 5 ){
          $(node).text('RECORDING').addClass('red');
          recorder.record(filename);
          state++;
          clearInterval(recordCountDown);
        }
        else {
          $('.recordbutton').text(countdown);
        }
        countdown++;
      } // function myTimer
    }

    else if (state === 1) {
      recorder.stop();
      $(node).text('PLAY');
      state++;
    }

    else if (state === 2) {

      masterVolume(1);
      filename.play();
      state = 0;
      $(node).text('REC');
    }

    });


    $('.recordbutton').click(function(){
      recordsound(,'.recordbutton')

    });







  $('.recordbuttonbackup').click(function(){
    // use the '.enabled' boolean to make sure user enabled the mic (otherwise we'd record silence)
  if (state === 0 && mic.enabled) {
    masterVolume(0);

    var recordCountDown = setInterval(function(){ myTimer() }, 1000);
    var countdown = 1;

    function myTimer() {
      if(countdown === 4 ){

        $('.recordbutton').text("GO!");

      }

      else if(countdown === 5 ){
        $('.recordbutton').text('RECORDING').addClass('red');
        recorder.record(soundFile);
        state++;
        clearInterval(recordCountDown);
      }
      else {
        $('.recordbutton').text(countdown);
      }
      countdown++;
    } // function myTimer
  }

  else if (state === 1) {
    recorder.stop();
    $(this).text('PLAY');
    state++;
  }

  else if (state === 2) {

    masterVolume(1);
    soundFile.play();
    state = 0;
    $(this).text('REC');
  }

  });











});
