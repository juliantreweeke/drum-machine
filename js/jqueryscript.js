

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

  var fadecounter = false;
  $('.fadebutton').click(function(){

    // if(fadecounter){
    //   $('#main').css("opacity","1")
    //   fadecounter = false;
    // } else {
    //   $('#main').css("opacity","0")
    //   fadecounter = true;
    // }


    $('#main').toggleClass( "noopacity");


  });

  $('.recordbutton').click(function(){

    // use the '.enabled' boolean to make sure user enabled the mic (otherwise we'd record silence)
  if (state === 0 && mic.enabled) {
    masterVolume(0);

    // setDeceleratingTimeout(function(){ alert('hi'); }, 10, 10);

    // $(this).text('1').delay( 800 );
    // $(this).text('2').delay( 1800 );

    // $( "#foo" ).slideUp( 300 )

    // $(this).text('2');
    // $(this).text('2');
    // $(this).text('3');
    // $(this).text('GO!');

    var recordCountDown = setInterval(function(){ myTimer() }, 1000);
    var countdown = 1;

    function myTimer() {
      if(countdown === 4 ){

        $('.recordbutton').text("GO!");

      }

      else if(countdown === 5 ){
        $('.recordbutton').text('RECORDING');
        recorder.record(soundFile);
        state++;
        clearInterval(recordCountDown);


      }

      else {
        $('.recordbutton').text(countdown);
      }

      countdown++;

    } // function myTimer









    // Tell recorder to record to a p5.SoundFile which we will use for playback



    // background(255,0,0);
    // text('Recording now! Click to stop.', 20, 20);

    // alert("about to record");
  }

  else if (state === 1) {
    recorder.stop(); // stop recorder, and send the result to soundFile

    $(this).text('PLAY');
    state++;
  }

  else if (state === 2) {
    // alert("about to play");
    masterVolume(1);
    soundFile.play(); // play the result!
    // saveSound(soundFile, 'mySound.wav'); // save file
    state = 0;
    $(this).text('REC');
  }

  });











});
