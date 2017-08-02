
var $square;

function HtmlSquare(top,left,i,name) {
  var self = this;

  this.col = 'rgb(250,250,250)';
  // this.id = i;
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


  this.clicked = function() {

    if (self.active){
      self.active = false;

      $('#' + self.name ).css({
      border:'blue 1px solid'
      });

    } else {

      self.active = true;



      $('#' + self.name ).css({
        border:'lightblue 1px solid'
      
      });

    }

  }

}
