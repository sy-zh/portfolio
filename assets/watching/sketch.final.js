//all (x, y) for curve
var positionX = new Array(); //all X
var positionY = new Array(); //all y
var lineNum = 100; //how many lines
var pointNum = 25; //how many points on a line
var d = 0; // distance between two points
var l = 0; //distance between two lines

//(x, y)for eyes
var arrL = new Array();
var arrP = new Array();
var arrPoint = new Array();
var arrPointL = new Array();
var arrPointP = new Array();
var gapX = 3; //how many points between two eyes
var gapY = 10; //how many lines between two eyes
var openTimes = 0;
var closeTimes = 0;

//Animation for eyes-move
var moveX = new Array();
var moveY = new Array();
var moveD;
var moveL;
var moveN = 6; //how many points around the eye(x, y) move
var pointL = lineNum/2-1;
var pointP = pointNum/2-1;
var delay = 8000;

var mic;
var micLevel = 0;
var ellipses = [];

let video;
let poseNet;
let positionNose = 320;
let moveXWithNose;
let speed = 30;

var beat;



function preload() {
    beat = loadSound('mus/03.wav');
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    mic = new p5.AudioIn()
    mic.start();
    frameRate(30);

    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelReady);
    poseNet.on('pose', gotPoses);

    positionXArray();
    positionYArray();
    eyesArray();
} 

function draw() {

    display(); 
    follow();

    micLevel = mic.getLevel();

    if (micLevel > 0.02){ 
        eyesSelect(); 
        beat.play(); 
        print(micLevel);
    }
    showEllipse();
    information();
}

function information() {
    fill(255);
    rect(30, 30.5, 145, 80);
    fill(0);
    textFont("menlo");
    text(":", 42, 56);
    text("make some noise\n& move the head", 45, 78);
}

function gotPoses(poses){

    if (poses.length > 0) {
        positionNose = poses[0].pose.keypoints[0].position.x;
        if(positionNose > 320){
            moveXWithNose = -speed;
        } else if(positionNose < 320) {
            moveXWithNose = speed;
            } else{
            moveXWithNose = 0;
        } 
        // print(width, positionNose, moveXWithNose);
    }
}

function modelReady() {
    console.log('Model Loaded!');
}

function drawEllipse(){
    let x = positionX[pointL][pointP];
    let y = positionY[pointL][pointP]+l/2;
    let r = l*2.5;
    let e = new Ellipse(x, y, r);
    // xprint('The value of mic is ' + micLevel); 
    ellipses.push(e);
    setTimeout(disappear,delay);
}

function showEllipse(){
    for(let i = 0; i<ellipses.length; i++){
        ellipses[i].show();
        ellipses[i].move();
        // print(eyes);
    }
}

function disappear(){
    ellipses.shift();
}

function positionXArray() {

    d = width/(pointNum-1);

    for (var i=0; i<lineNum; i++){
        positionX[i] = new Array();
    }
    for (var i=0; i<lineNum; i++){
        for(var j=0; j<pointNum; j++){
            positionX[i][j]=j*d;
        }
    }
}

function positionYArray() {

    l = height/(lineNum-1);

    for (var i=0; i<lineNum; i++){
        positionY[i] = new Array();
    }
    for (var i=0; i<lineNum; i++){
        for(var j=0; j<pointNum; j++){
            positionY[i][j]=i*l;
        }
    }
    // print(positionX, positionY);

}

function eyesArray(){

    for (var i=0; i<int(pointNum/gapX)-1; i++){
        arrP.push(i*gapX+2);
    }
    for (var i=0; i<int(lineNum/gapY)-1; i++){
        arrL.push(i*gapY+moveN)
    }   

    for (var i=0; i<int(pointNum/gapX)*(int(lineNum/gapY)-1); i++){
            arrPoint[i] = new Array();
    }
    for (var i=0; i<int(pointNum/gapX); i++) {
        for (var j=0; j<int(lineNum/gapY)-1; j++){
            arrPoint[i*(int(lineNum/gapY)-1)+j].push(arrP[i]);
            arrPoint[i*(int(lineNum/gapY)-1)+j].push(arrL[j]);
        }   
    }

    shuffleArray(arrPoint);
}

function eyesSelect() {

    if(openTimes<arrPoint.length){
        pointL = arrPoint[openTimes][1];
        pointP = arrPoint[openTimes][0];
        drawEllipse();  
        open();
        arrPointL.push(pointL);
        arrPointP.push(pointP);
        openTimes++;  
    }else{
        openTimes = 0;
    }
}

function open() {

    moveL = 2*l; 
        
    for (var i=0; i<moveN; i++){
        moveY[i] = moveL*((moveN-1)-i)/(moveN-1) ;
    }
    
    for (var i=0; i<moveN; i++){
        positionY[pointL-i][pointP] -= moveY[i];
    }
    for (var i=0; i<moveN; i++){
        positionY[pointL+i+1][pointP] += moveY[i];
    }   

    setTimeout(close,delay);

}

function close() {

    moveL = -2*l;

    for (var i=0; i<moveN; i++){
        moveY[i] = moveL*((moveN-1)-i)/(moveN-1) ;
    }
    
    for (var i=0; i<moveN; i++){
        positionY[arrPointL[closeTimes]-i][arrPointP[closeTimes]] -= moveY[i];
    }
    for (var i=0; i<moveN; i++){
        positionY[arrPointL[closeTimes]+i+1][arrPointP[closeTimes]] += moveY[i];
    }  

    closeTimes++;
}

function follow() {

    positionXArray();

    if(positionNose > 320+20){
        moveD = -d/2;
    } else if(positionNose < 320-20) {
        moveD = d/2;
    } else{
        moveD = map(positionNose, 340,280, -d/2, d/2);;
    } 

    // moveD = map(positionNose, 640, 0, -d/2, d/2);

    for (var i=0; i<moveN; i++){
        moveX[i] = moveD*((moveN-1)-i)/(moveN-1) ;
    }

    for(var j=0; j<arrPointL.length; j++){
        for (var i=0; i<moveN; i++){
            positionX[arrPointL[j]-i][arrPointP[j]] += moveX[i];
        }
        for (var i=0; i<moveN; i++){
            positionX[arrPointL[j]+i+1][arrPointP[j]] += moveX[i];
        }
    }

}

function display() {

    clear();
    noFill();
    strokeWeight(1.5);

    for (var i=0; i<lineNum; i++){
        beginShape();
        line(positionX[i][0], positionY[i][0],positionX[i][1], positionY[i][1]);
        for(var j=0; j<pointNum; j++){
            curveVertex(positionX[i][j], positionY[i][j]);
        }
        line(positionX[i][pointNum-2], positionY[i][pointNum-2],positionX[i][pointNum-1], positionY[i][pointNum-1]);
        endShape();    
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

var shuffleArray = function (array) {

	var currentIndex = array.length;
	var temporaryValue, randomIndex;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}

class Ellipse{
    
    constructor(x, y, r){
        this.x = x;
        this.y = y;
        this.r = r;
        this.distance = 0
    }

    show(){
        ellipseMode(CENTER);
        fill(0);
        ellipse(this.x, this.y, this.r, this.r);
    }

    move(){
        if(this.distance > -d/2 && this.distance < d/2){
            this.x = this.x + moveXWithNose;
            this.distance = this.distance + moveXWithNose;
        } else if(this.distance > d/2){
            if(moveXWithNose < 0){
                this.x = this.x + moveXWithNose;
                this.distance = this.distance + moveXWithNose;
            }
        } else if(this.distance < -d/2){
            if(moveXWithNose > 0){
                this.x = this.x + moveXWithNose;
                this.distance = this.distance + moveXWithNose;
            }
        }
        // this.y = this.y + moveY;
    }
}

