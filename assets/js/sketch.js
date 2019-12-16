
//color
var myRed = [228,85,83];
var myBlue = [0,110,171];
var myYellow = [249,241,92];
var myPink = [247,197,183];
var myGreen = [138,196,196];

var x = 0;
var y = 0;
var xDirection = 1;
var yDirection = 1;


function setup() {
    createCanvas(windowWidth, windowHeight);
    
}
  
function draw() {
    clear();
    move();  
    eye(x, y, 200);
    // eye(windowWidth/2, windowHeight-100, 125, 5);
    eye(windowWidth-60, 60, 50);
    // eye(250, 250, 100, 4);

}

function move(){
    let speed = 2;
    x = x + speed * xDirection;
    y = y + speed * yDirection;

    if(x > windowWidth || x<= 0 ) {
        xDirection *= -1;
    }
    
    if(y > windowHeight || y <= 0) {
        yDirection *= -1;
    }

}

function eye(x, y, d) {
    weight=d/25;
    d0=d+weight+10;
    d1=d;
    d2=d/1.6;
    d3=d/4;    

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


