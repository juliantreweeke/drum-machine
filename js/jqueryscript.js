

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









  var createBoard = function () {
    var $board = $('<table></table>');
    $('#main').append($board);
    for (var i = 0; i < 1 ; i++) {
      var $row = $('<tr></tr>');
      $('table').append($row);
      for (var j = 0; j < 16; j++) {
        var $square = $('<td class="boxo"></td>');
        $row.append($square)
      } // j loop
    } // i loop
  }

  // var createBox = function (top,left,target) {
  //
  //   var $square = $('<td class="test"></td>');
  //   $('#kicktable').append($square);
  //   // $('#kicktable').append($square).css({
  //   // width: this.size, height: this.size, backgroundColor:'white', display:'absolute',
  //   // top: this.top, left: this.left
  //   // });
  // } // j loop
  //    // i loop


  $('.pad').click(function(){
    alert('clicked');
  })






  // createBoard();








});
