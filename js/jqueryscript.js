

$(document).ready(function(){

  // $(document).on('click', '.pad', function(){
  // });


  var kickcounter = 0;
  console.log(kicksamples.length);

  $('#toggle').click(function(){

      kickcounter++;
      kickcounter = kickcounter % kicksamples.length;
      sounds[0] = loadSound(kicksamples[kickcounter]);
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
