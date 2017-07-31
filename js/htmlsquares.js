function HtmlSquare(x, y, i) {
  this.x = x;
  this.y = y;
  this.col = color(0,0, 0);
  this.id = i;
  this.active = false;
  this.size = 40;

  this.display = function() {
    
    box(this.x, this.y, this.size, this.size);
  }

  // this.move = function() {
  //   this.x = this.x + random(-1, 1);
  //   this.y = this.y + random(-1, 1);
  //
  // }
  this.clicked = function() {
    var d = dist(mouseX, mouseY, this.x, this.y + 20);
    if (d < 20) {


      if (this.active){
        this.active = false;
        this.col = color(0,0, 0);
      } else {
        this.col = color(70,130,180);
        this.active = true;
      }

    }
  }

  // this.coloron = function(){
  //
  //   this.col = color(255, 0, 0);
  // }

  this.coloron = setInterval(myTimer, 1000);

   function myTimer() {
    this.col = color(255, 0, 0);

     }





  this.coloroff = function() {
    // this.col = color(0,0, 0);

  }









}
