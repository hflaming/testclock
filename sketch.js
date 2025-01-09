var minx = 0;
var maxx = 800;
var miny = 0;
var maxy = 600;
var ydiff = maxy-miny;
var halfamp = ydiff/5;
var houramp = ydiff/8;
var minamp = ydiff/16;
var secamp = minamp;
var t = 0;
var catchUpParm = 0.1;


function setup() {
  createCanvas(800, 600);
  angleMode(DEGREES);
  t = (hour()+(minute()+(second())/60)/60)/24;
}

function draw() {
  background(255);
  
  var h = hour();
  var m = minute();
  var s = second();
  var hm = map(h, 0, 24, 0, 1); 
  var mm = map(m, 0, 60, 0, 1); 
  var sm = map(s, 0, 60, 0, 1); 
  
  var texact = (h+(m+(s)/60)/60)/24;
  t += (texact-t)*catchUpParm;
  var xpos = map(texact, 0, 1, minx, maxx); 
  
  //draw min  sine wave addition
  noFill();
  stroke('#C9C9C9');
  beginShape();
  for (let t = 0; t <= 5*360; t++) {
    let x = map(t, 0, 5*360, minx, maxx);
    let y = ydiff/2 - halfamp * sin(t/5) - houramp * sin(12*t/5) - secamp * sin(60*12*t/5);
    vertex(x, y);
  }
  endShape();
  
  
  //draw hour sine wave addition
  noFill();
  stroke('#7E7E7E');
  beginShape();
  for (let t = 0; t <= 360; t++) {
    let x = map(t, 0, 360, minx, maxx);
    let y = ydiff/2 - halfamp * sin(t) - houramp * sin(12*t);
    vertex(x, y);
  }
  endShape();
  
  //draw half day sin curve
  noFill();
  stroke('#7E7E7E');
  beginShape();
  for (let t = 0; t <= 360; t++) {
    let x = map(t, 0, 360, minx, maxx);
    let y = ydiff/2 - halfamp * sin(t);
    vertex(x, y);
  }
  endShape();
  
  //draw line
  stroke('#242424');
  line(minx,ydiff/2,maxx,ydiff/2)
  
  fill('black');
  circle(xpos, ydiff/2 - halfamp * sin(t*360) - houramp * sin(12*t*360) - secamp * sin(60*12*t*360), 3);
  
  
  

  
}
