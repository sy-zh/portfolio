
var img;
var mask;
var mouseA;
var mouseB;

//16 rects 
var rectX;
var rectY;
var rectL = 20;
var rectP = 60;
var rectLongL = rectL*1.2
var xArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var yArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var rectArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

// color from Mondrian
var C;
var blackM = [31, 31, 31];
var whiteM = [246, 246, 238];
var redM = [210, 0, 25];
var yellowM = [255, 211, 2];
var blueM = [52, 72, 122];
// color for rect
var blackR = [40, 40, 40];
var whiteR = [249, 249, 242];
var redR = [239, 27, 63];
var yellowR = [255, 224, 92];
var blueR = [69, 91, 137];
var colorArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

//über music
var env;
var triOsc;
var beat;
var noteI = 0;
var beatI = 0;
var rectI = 0;
var noteArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var beatArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var doo = 261.6255653005986 //blackM
var ree = 293.6647679174076 //redM
var mii = 329.6275569128699 //yellowM
var faa = 349.2282314330039 //blueM



function preload() {
  img = loadImage('assets/media/mondrian/background.jpg');
  mask = loadImage("assets/media/mondrian/mask2.png");
  mouseA = loadImage("assets/media/mondrian/mouseA.png");
  mouseB = loadImage("assets/media/mondrian/mouseB.png");
  finger = loadImage("assets/media/mondrian/clapping.png");
  soundFormats('wav', 'ogg');
  beat = loadSound('assets/media/mondrian/beat2.wav');
}

function setup() {
  var cnv = createCanvas(windowWidth-150, windowHeight-150);

  env = new p5.Envelope();
  env.setADSR(0.001, 0.2, 0.2, 0.5);
  env.setRange(1.0, 0);

  triOsc = new p5.Oscillator();
  triOsc.setType('triangle');
  triOsc.amp(0);
  triOsc.start();
}

function mouseDragged() {
    rectX = mouseX - 98;
    rectY = mouseY - 98;  
}

function draw() {
  // scale(0.75);
  image(img, 0, 0, img.width/2, img.height/2);
  noStroke();
 
  if (mouseIsPressed == true) {
    image(mask, pmouseX-2500, pmouseY-1500, mask.width, mask.height);
    image(mouseB, pmouseX-115, pmouseY-175, mouseB.width/1.8, mouseB.height/1.8);
    musicValue();
    backgroundRect();
    drawRect(); 
    newNoterect();
    playEnv();
  } else{
    image(mouseA, pmouseX-115, pmouseY-185, mouseA.width/1.8, mouseA.height/1.8);
    stopEnv();
  }
}

function musicValue(){
  for (var i = 0; i < 4; i++){
    for ( var j = 0; j < 4;j++) {
      //getcolor from image
      c = img.get((rectX-i*(rectL + rectP))*2, (rectY-j*(rectL + rectP))*2);
      //noteArray
      if(green(c) == 246){
        append(noteArray, 0);
        noteArray.shift();
        append(colorArray, [249, 249, 242]);
        colorArray.shift();
      }else if(green(c) == 0){
        append(noteArray, ree);
        noteArray.shift();
        append(colorArray, [239, 27, 63]);
        colorArray.shift();
      }else if(green(c) > 208 && green(c) < 212){
        append(noteArray, mii);
        noteArray.shift();
        append(colorArray, [255, 224, 92]);
        colorArray.shift();
      }else if(green(c) == 72){
        append(noteArray, faa);
        noteArray.shift();
        append(colorArray, [69, 91, 137]);
        colorArray.shift();
      }else{
        append(noteArray, doo);
        noteArray.shift();
        append(colorArray, [40, 40, 40]);
        colorArray.shift();
      }
      //beatArray
      if(blue(c) < 200){
        append(beatArray, true);
        beatArray.shift();
      }else{
        append(beatArray, false);
        beatArray.shift();
      }
    }
  }
  // reverse(beatArray);
}

// draw original rect
function backgroundRect(){
  for (var i = 0; i < 4; i++){
    for ( var j = 0; j < 4;j++) {
      fill(50, 50, 50);
      rect(rectX-rectL/2-i*(rectL + rectP), rectY-rectL/2-j*(rectL + rectP), rectLongL, rectLongL);
    }
  }  
}
function drawRect(){
  for (var i = 0; i < 4; i++){
    for ( var j = 0; j < 4;j++) {
      c = img.get((rectX-i*(rectL + rectP))*2, (rectY-j*(rectL + rectP))*2);
      if(green(c) == 246){
        fill(whiteR);
        rect(rectX-rectL/2-i*(rectL + rectP), rectY-rectL/2-j*(rectL + rectP), rectL, rectL);
      }else if(green(c) == 0){
        fill(redR);
        rect(rectX-rectL/2-i*(rectL + rectP), rectY-rectL/2-j*(rectL + rectP), rectL, rectL);
      }else if(green(c) > 208 && green(c) < 212){
        fill(yellowR);
        rect(rectX-rectL/2-i*(rectL + rectP), rectY-rectL/2-j*(rectL + rectP), rectL, rectL);
      }else if(green(c) == 72){
        fill(blueR);
        rect(rectX-rectL/2-i*(rectL + rectP), rectY-rectL/2-j*(rectL + rectP), rectL, rectL);
      }else{
        fill(blackR);
        rect(rectX-rectL/2-i*(rectL + rectP), rectY-rectL/2-j*(rectL + rectP), rectL, rectL);
      }    
    }
  } 
}

//draw rect for animation
function newNoterect(){
  for (var i = 0; i < 4; i++){
    for ( var j = 0; j < 4;j++) {
      append(xArray, rectX-rectL/2-i*(rectL + rectP));
      xArray.shift();
      append(yArray, rectY-rectL/2-j*(rectL + rectP));
      yArray.shift();
    }
  } 
  for (var i = 0; i < 16; i++){
    let x = xArray[i]-rectL/3;
    let y = yArray[i]-rectL/3;
    let l = rectL*1.5;
    let c = colorArray[i];
    let r = new noterect(x, y, l, c);
    rectArray.push(r);
    rectArray.shift();
  } 
  for (var i = 0; i < 16; i++){
  } 
}

//music and animation
function playEnv(){
  triOsc.amp(env);
  //play note
  if (frameCount % 15 == 0 || frameCount == 1) {
    triOsc.freq(noteArray[noteI]);
    env.play(triOsc, 0, 0.1);
    noteI = (noteI + 1) % noteArray.length;
    rectI = (rectI + 1) % rectArray.length;

  }
  //play beats
 if (frameCount % 15 == 0 || frameCount == 1) {
   if(beatArray[beatI]){
    beat.play();
    beatI = (beatI + 1) % beatArray.length;
   }else{
    beatI = (beatI + 1) % beatArray.length;
   }
  }
  //animation
  if (frameCount % 15 < 7 || frameCount % 15 > 12 || frameCount == 1) {
    rectArray[rectI].background();
    rectArray[rectI].show();
  }
}
function stopEnv(){
  triOsc.amp(0);
}

//rect for animation
class noterect {
  constructor(x, y, l, c) {
    this.x = x;
    this.y = y;
    this.l = l;
    this.c = c;
  }
  background(){
    fill(50, 50, 50);
    rect(this.x, this.y, this.l*1.2, this.l*1.2);
  }
  show(){
    fill(this.c);
    rect(this.x, this.y, this.l, this.l);
  }

}
