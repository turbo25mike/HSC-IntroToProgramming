var titleObj = document.getElementById("title");
var math = 2 + 2;
titleObj.innerText = "Welcome to" + math;

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var ballRadius = 10;
var x = canvas.width / 2;
var y = canvas.height - 30;
var dx = 2;
var dy = -2;
var rightPressed = false;
var leftPressed = false;
var paddleXPos = 20;
var paddleYPos = 20;

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawRect(width, height, xPos, yPos) {
    ctx.beginPath();
    ctx.rect(xPos, yPos, width, height);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawRect(200, 20, paddleXPos, paddleYPos);
    x = x + dx;
    y = y + dy;
    if (x > canvas.width || x < 0) {
        dx = dx * -1;
    }

    if (y > canvas.height || y < 0) {
        dy = dy * -1;
    }
}

function keyDownHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = true;
    }
    else if(e.keyCode == 37) {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 37) {
        leftPressed = false;
    }
}

setInterval(draw, 10);
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);