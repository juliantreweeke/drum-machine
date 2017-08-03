$(document).ready(function(){

  var kickcounter = 0;
  var snarecounter = 0;
  var hatcounter = 0;
  var synthcounter = 0;
  var basscounter = 0;
  var playing = true;

  ////////////////////////////////////////////////////////////////////////////////
  // KEYBOARD EVENT HANDLERS
  $(document).on('keydown', function (e) {

    if( e.key === ' '){
        $( '.playbutton' ).toggleClass('pauseimg');
        if (playing){
          myPart.stop();
          playing = false;
        } else {
          myPart.start();
          playing = true;
        }
    } else if( !isNaN(e.key) ){
      console.log('Number', e.key);
      beatJump = parseInt(e.key);
    } else if(e.which === 38){
      tempoup();
    } else if(e.which === 40){
      tempodown();
    } else if(e.which === 37){
      beatJump = beat - 2;
    } else if(e.which === 39){
      beatJump = beat + 1;
    }

  });

  ////////////////////////////////////////////////////////////////////////////////

  $('.kicktoggle').click(function(){
      kickcounter++;
      drumToggle(kickcounter,kicksamples,1,kickname,this);
      fftkick.setInput(sounds[1]);
  })

  $('.snaretoggle').click(function(){
      snarecounter++;
      drumToggle(snarecounter,snaresamples,2,snarename,this);
      fftsnare.setInput(sounds[2]);
  })

  var drumToggle = function(counter,array,num,name,target){
    counter = counter % array.length;
    sounds[num] = loadSound(array[counter]);
    $(target).text(name[counter]);
  }

  $('.hattoggle').click(function(){
    hatcounter++
    drumToggle(hatcounter,hatsamples,3,hatname,this);
  });

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
    tempoup();
  })

  $('.tempodown').click(function(){
    tempodown();
  })

  var tempoup = function(){
    bpm++;
    myPart.setBPM(bpm);
    $('.tempo').text(bpm.toString());
  }

  var tempodown = function(){
    bpm--;
    myPart.setBPM(bpm);
    $('.tempo').text(bpm.toString());
  }








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
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Clear all sounds and event handlers;
  var clearAll = function(array){
    return array = array.map(function (n) { n.active = false });
  };

  $('.clearbutton').click(function(){
    clearAll(kicks);
    clearAll(snares);
    clearAll(hats);
    clearAll(synths);
    clearAll(basses);
    clearAll(recs);
    clearAll(recs2);
    clearAll(recs3);
  });

  $('.clearkick').click(function(){
    clearAll(kicks);
  })
  $('.clearsnare').click(function(){
    clearAll(snares);
  })
  $('.clearhat').click(function(){
    clearAll(hats);
  })
  $('.clearsynth').click(function(){
    clearAll(synths);
  })
  $('.clearbass').click(function(){
    clearAll(basses);
  })
  $('.clearrec').click(function(){
    clearAll(recs);
  })
  $('.clearrec2').click(function(){
    clearAll(recs2);
  })
  $('.clearrec3').click(function(){
    clearAll(recs3);
  })

////////////////////////////

  $('.playbutton').click(function(){
    $( this ).toggleClass('pauseimg');
    if (playing){
      myPart.stop();
      playing = false;
      // $(this).css('background-image', "url('/images/play.png')";
    } else {
      myPart.start();
      playing = true;
    }
  });

  $('.eqbutton').click(function(){
    $('#main').toggleClass( "noopacity");

    if (fxdraw === false){

      // turn on eq draw
      fxdraw = true;
      alert(fxdraw);
    } else {
      // turn off eq draw

      fxdraw = false;
      filter.freq(12000);
    }
  });

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // MIC RECORDING JQUERY STUFF

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
          $(node).text('RECORDING');
          $(node).css('color','red');
          recorder.record(filename);
          state++;
          clearInterval(recordCountDown);
        }
        else {

          $(node).text(countdown);

        }
        countdown++;
      } // function myTimer
    }
    else if (state === 1) {
      recorder.stop();
      $(node).css('color','rgb(0,156,255)');
      $(node).text('PLAY');
      state++;
    }
    else if (state === 2) {
      masterVolume(1);
      filename.play();
      state = 0;
      $(node).text('REC');
    }
  };
    $('.recordbutton').click(function(){
      recordsound(soundFile,'.recordbutton')
    });

    $('.recordbutton2').click(function(){
      recordsound(soundFile2,'.recordbutton2')
    });

    $('.recordbutton3').click(function(){
      recordsound(soundFile3,'.recordbutton3')
    });

    var recordAll = function(){

    }

    var recording = false;
    $('.masterbutton').click(function(){
      if (recording === false){
        if (mic.enabled){
          recorder2.record(masterFile);
          recording = true;
        }
      } else {
        recorder2.stop();
        saveSound(masterFile,'boxsonic_export.wav');
        recording = false;
      }
    });

});
