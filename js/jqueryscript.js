

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
      $(this).text(kickname[kickcounter]);
  })

  $('.snaretoggle').click(function(){
      snarecounter++;
      snarecounter = snarecounter % snaresamples.length;
      sounds[2] = loadSound(snaresamples[snarecounter]);
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
    reverb.process(sounds[1], 10, 10);

      if (fxkickcounter === 1){
        reverb.disconnect(sounds[1])
      } else {
        fxkickcounter++;
        reverb.process(sounds[1], 10, 10); //

      }
  })

  var fadecounter = false;
  $('.fadebutton').click(function(){
    if(fadecounter){
      $('#main').css("opacity","1")
      fadecounter = false;
    } else {
      $('#main').css("opacity","0")
      fadecounter = true;
    }
    //
    // $('#main').css("opacity","0")
    //
    // $('#main').toggleClass( "noopacity", "fullopacity" );


  });









});
