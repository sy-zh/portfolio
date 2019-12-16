//color
var myRed = [228,85,83];
var myBlue = [0,110,171];
var myYellow = [249,241,92];
var myPink = [247,197,183];
var myGreen = [138,196,196];

function setup() {
  createCanvas(710, 400);


}

function draw() {
  background(200);
  drawEye(200,200,150,6); 


}   

function drawEye(x,y, d, weight) {
    d0=d+weight+10;
    d1=d
    d2=d/1.6
    d3=d/4

    r = (d1-d2)/2;

    dx = mouseX - x;
    dy = mouseY - y;
    
    angle = atan2(dy, dx);

    x = x + cos(angle) * r;
    y = y + sin(angle) * r;

    push();
    translate(x, y);
    rotate(angle);

    noStroke();
    fill(255);
    circle(0,0,d+weight+10);

    stroke(0);
    strokeWeight(weight);
    fill(myRed);
    circle(0, 0, d1);

    fill(myGreen);
    circle(r-weight/2, 0, d2);
    
    fill(0);
    circle(r+((d2-d3)/2)-weight, 0, d3);
    pop();
}

