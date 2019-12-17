var canvas = document.getElementById("grid");
var ctx = canvas.getContext("2d");

ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight;

let gap = 18;
let maxVertical = Math.floor(canvas.width/gap);
let maxHorizontal = Math.floor(canvas.height/gap);

ctx.strokeStyle = "rgb(0,110,171)"
ctx.lineWidth = 1;

// to make the lineWidth thinner
ctx.translate(0.5, 0.5)

for(let i=0; i<maxVertical; i++){
    ctx.moveTo(gap*(i+1), 0);
    ctx.lineTo(gap*(i+1), canvas.height);
    ctx.stroke();
}

for(let i=0; i<maxHorizontal; i++){
    ctx.moveTo(0,gap*(i+1));
    ctx.lineTo(canvas.width, gap*(i+1));
    ctx.stroke();
}
