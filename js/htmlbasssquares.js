
var $square;

function HtmlBass(top,left,i,name) {
  var self = this;
  this.counter = 0;
  this.id = i;
  this.name = name + i.toString();
  this.active = false;

  this.display = function() {

    $(document).ready(function(){
      $square = $('<div class="basspad"></div>').css({
      top: top + 'px', left: left.toString() + 'px'
      });

      $square.attr('id', self.name);
      $('#kicktable').append($square);
      $square.click(function(){ self.clicked() });

    });
  }


  this.clicked = function() {

    if (self.counter >= synthskey.length - 1 ){
      self.active = false;
      self.counter = 0;
      $('#' + self.name ).css({
      backgroundColor: 'black'
      });

    } else {

      self.active = true;
      self.counter++;
      bassmelody[self.id] = basskey[self.counter];
      console.log(bassmelody);
      // this.counter = this.counter % synths.length;
      $('#' + self.name ).css({
      backgroundColor: bluecolors[this.counter]
      });

    }

  }

}
