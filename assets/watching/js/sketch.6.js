var mic;
var micLevel = 0;
var micValue = [];

let eyes = [];

let featureExtractor;
let regressor;
let video;
let loss;
let slider;
let samples = 0;
let positionX = 0;
let addButton;
let preButton;
let trainButton;

function modelReady() {
    console.log('Model Loaded!');
  }
  
function videoReady() {
  console.log('The video is ready!');
}

function setup(){
    createCanvas(600, 400);
    mic = new p5.AudioIn()
    mic.start();
    frameRate(20);

    video = createCapture(VIDEO);
    video.hide();

    featureExtractor = ml5.featureExtractor('MobileNet', modelReady);
    regressor = featureExtractor.regression(video, videoReady);

    setupButtons();

}

function draw(){
    
    background(0);
    micLevel = mic.getLevel();
    image(video, 0, 0);

    if (micLevel > 0.004){ 
        let x = random(width);
        let y = random(height);
        let e = new Eye(x, y, 50);
        print('The value of mic is ' + micLevel); 
        eyes.push(e);
        setTimeout(disappear,5000);
    }
    for(let i = 0; i<eyes.length; i++){
        eyes[i].show();
        eyes[i].move();
        print(eyes);
    }

}

function disappear(){
    eyes.shift();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function predict() {
  regressor.predict(gotResults);
}

function setupButtons() {
  slider = select('#slider');
  // When the Dog button is pressed, add the current frame
  // from the video with a label of "dog" to the classifier
  addButton = createButton("Add Sample")
  addButton.mousePressed(function() {
    regressor.addImage(slider.value());
    select('#amountOfSamples').html(samples++);
  });

  // Train Button
  trainButton = createButton("Train")
  trainButton.mousePressed(function() {
    regressor.train(function(lossValue) {
      if (lossValue) {
        loss = lossValue;
        select('#loss').html('Loss: ' + loss);
      } else {
        select('#loss').html('Done Training! Final Loss: ' + loss);
      }
    });
  });
  preButton = createButton("Predict")
  preButton.mousePressed(predict);
}

function gotResults(err, result) {
  if (err) {
    console.error(err);
  }
  positionX = map(result, 0, 1, -4, 4);
  slider.value(result);
  predict();
}















class Eye{
    
    constructor(x, y, r=50){
        this.x = x;
        this.y = y;
        this.r = r;
    }

    show(){
        stroke(255);
        fill(255,125);
        ellipse(this.x, this.y, this.r, this.r);
    }

    move(){
        this.x = this.x + positionX;
    }

    // clicked(px, py){
    //     let d = dist(px, py, this.x, this.y)
    //     if(d < this.r){
    //         this.x = px;
    //         this.y = py;
    //     }
    // }
}