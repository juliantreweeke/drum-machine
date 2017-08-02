
var $square;

function RecordSquare(top,left,i,name,filename) {
  var self = this;
  // debugger;
  console.log('soundFile (filename): ', filename);

  this.name = name + i.toString();
  this.active = false;

  this.display = function() {

    $(document).ready(function(){
      $square = $('<div class="pad"></div>').css({
      top: top + 'px', left: left.toString() + 'px'
      });

      $square.attr('id', self.name);
      $('#kicktable').append($square);
      $square.click(function(){ self.clicked() });

    });
  }


  self.clicked = function() {


    if (filename.buffer === null){

      return;

    }

    if (self.active){
      self.active = false;
      // $('#' + self.name ).addClass("off");

      $('#' + self.name ).css({
      border:'blue 1px solid'
      });

    } else {

      self.active = true;

      // $('#' + self.name ).addClass("on");

      $('#' + self.name ).css({
        border:'lightblue 1px solid'
      // backgroundColor: 'blue'
      });

    }

  }

}
