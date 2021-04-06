


function setup() {
    createCanvas(windowWidth, windowHeight);

   
} 

function draw() {

    var space = 10;
    var h = mouseY/8; 
    var w = width/4;
    var num = int((height/2)/space);

    //var y1 = height/2-space;
    //var y2 = height/2+space;
   
    var r = mouseY/6;
    let xEllipse = map(mouseX,0,width,w*2-w/3,w*2+w/3);
    var yEllipse = height/2

    background(255);

    noFill();
    strokeWeight(2);
    push();
    translate(width/2,height/2);
    for(var i=0; i<num; i++){
        beginShape();
        line(-w*2, -space/2-space*i, -w, -space/2-space*i);
        curveVertex(-w*2, -space/2-space*i);
        curveVertex(-w, -space/2-space*i);
        curveVertex(0, -space/2-space*i-(h-i*h/num));
        curveVertex(w, -space/2-space*i);
        curveVertex(w*2, -space/2-space*i);
        line(w, -space/2-space*i,w*2, -space/2-space*i);
        endShape();    
    }
    for(var i=0; i<height/space; i++){
        beginShape();
        line(-w*2, space/2+space*i, -w, space/2+space*i);
        curveVertex(-w*2, space/2+space*i);
        curveVertex(-w, space/2+space*i);
        curveVertex(0, space/2+space*i+(h-i*h/num));
        curveVertex(w, space/2+space*i);
        curveVertex(w*2, space/2+space*i);
        line(w, space/2+space*i,w*2, space/2+space*i);
        endShape();    
    }
    pop();





/*
    beginShape();
    line(0,y1,x,y1);
    curveVertex(0,y1);
    curveVertex(x,y1);
    curveVertex(xEllipse,y1-h);
    curveVertex(x*3,y1);
    curveVertex(x*4,y1);
    line(x*3,y1,x*4,y1);
    endShape();

    beginShape();
    line(0,y2,x,y2);
    curveVertex(0,y2);
    curveVertex(x,y2);
    curveVertex(xEllipse,y2+h);
    curveVertex(x*3,y2);
    curveVertex(x*4,y2);
    line(x*3,y2,x*4,y2);
    endShape();
*/

    if(r>30){
        fill(0);
        ellipseMode(CENTER);
        ellipse(xEllipse,yEllipse,r,r);
    }

    

  
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }