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
var paddleYPos = 300;
var paddleWidth = 200;
var paddleHeight = 20;
var block = {
    height: 20,
    width: 50,
    cols: 5,
    rows: 3,
    colPad: 10,
    rowPad: 10
};
var blockRange = [block.rows][block.cols];

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

function drawBlocks() {
    for (row = 0; row < block.rows; row++) {
        for (col = 0; col < block.cols; col++) {
            drawRect(block.width, block.height, (block.width + block.colPad) * col, (block.height + block.rowPad) * row);
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBlocks();
    drawBall();
    drawRect(paddleWidth, paddleHeight, paddleXPos, paddleYPos);
    x = x + dx;
    y = y + dy;

    if (x > canvas.width || x < 0) {
        dx = dx * -1;
    }

    if (y < 0) {
        dy = dy * -1;
    } else if (y > canvas.height - paddleHeight) {
        if (x > paddleXPos && x < paddleXPos + paddleWidth) {
            dy = dy * -1;
        } else if (y > canvas.height + ballRadius) {
            clearInterval(interval);
            titleObj.innerText = "Game Over";
        }
    }

    if (rightPressed && paddleXPos < canvas.width - paddleWidth) {
        paddleXPos = paddleXPos + 7;
    }
    else if (leftPressed && paddleXPos > 0) {
        paddleXPos = paddleXPos - 7;
    }
}

function keyDownHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = true;
    }
    else if (e.keyCode == 37) {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = false;
    }
    else if (e.keyCode == 37) {
        leftPressed = false;
    }
}

var interval = setInterval(draw, 10);
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);