function BassSquare(x, y, i) {
  this.x = x;
  this.y = y;
  this.col = color(0,0, 0);
  this.id = i;
  this.active = false;
  this.size = 40;
  this.counter = 0;

  this.display = function() {
    stroke(135,206,250);
    fill(this.col);
    rect(this.x, this.y, this.size, this.size);
  }

  this.clicked = function() {
    var d = dist(mouseX, mouseY, this.x, this.y + 20);
    if (d < 20) {

        if (this.counter >= synthskey.length - 1 ){
          this.active = false;
          this.col = color(0,0,0);
          this.counter = 0;
        } else {

          this.active = true;
          this.counter++;
          console.log(this.counter);
          this.counter = this.counter % basses.length;
          this.col = bluecolors[this.counter];
          bassmelody[this.id] = basskey[this.counter];
          console.log(bassmelody);

        }





      };



    }


  this.coloron = function() {


  }

  this.coloroff = function() {
    this.col = color(255, 100);

  }









}
