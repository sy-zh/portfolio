
//color
var myRed = [228,85,83];
var myBlue = [0,110,171];
var myYellow = [249,241,92];
var myPink = [247,197,183];
var myGreen = [138,196,196];

function setup() {
    createCanvas(windowWidth, windowHeight);
    
}
  
function draw() {
    background(255);
    grid();   
    eye(windowWidth-200, 2*windowHeight/3, 10, 250);
    eye(250, 250, 6, 150);
    eye(windowWidth/2, windowHeight-100, 5, 125);
    eye(windowWidth-60, 60, 2, 50);
}

function grid(){
    let gap = 18;
    let maxVertical = ceil(windowWidth/gap)-1;
    let maxHorizontal = ceil(windowHeight/gap)-1;
    stroke(myBlue);
    strokeWeight(1.2);
    for(let i=0; i<maxVertical; i++){
        line(gap*(i+1), 0, gap*(i+1), windowHeight);
        line(0,gap*(i+1), windowWidth, gap*(i+1));
    }
}

function eye(x, y, weight,radius){
    noStroke();
    fill(255);
    circle(x,y,radius+10);
    stroke(0);
    strokeWeight(weight);
    fill(myRed);
    circle(x,y,radius);
    fill(myGreen);
    circle(x,y,radius/2);
    fill(0);
    circle(x,y,radius/6);
}

