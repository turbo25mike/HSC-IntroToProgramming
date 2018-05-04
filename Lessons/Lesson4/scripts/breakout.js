//TODO Clean up header remove titleObj
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
var blockConfig = {
    height: 20,
    width: 50,
    cols: 8,
    rows: 3,
    colPad: 10,
    rowPad: 10
};
//TODO ADD score, function update score and in draw add score
var score = 0;

var blockRange = new Array(blockConfig.rows);
for (row = 0; row < blockConfig.rows; row++) {
    blockRange[row] = new Array(blockConfig.cols);
    for (col = 0; col < blockConfig.cols; col++) {
        blockRange[row][col] = {
            xPos: (blockConfig.width + blockConfig.colPad) * col,
            yPos: (blockConfig.height + blockConfig.rowPad) * row,
            width: blockConfig.width,
            height: blockConfig.height,
            isHit: false
        };
    }
}

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
    for (row = 0; row < blockConfig.rows; row++) {
        for (col = 0; col < blockConfig.cols; col++) {
            //TODO switch to var of block for current item
            var block = blockRange[row][col];
            if(block.isHit == false) {
                drawRect(block.width, block.height, block.xPos, block.yPos);
            }
        }
    }
}

//TODO 
function collisionDetection() {
    for (row = 0; row < blockConfig.rows; row++) {
        for (col = 0; col < blockConfig.cols; col++) {
            var block = blockRange[row][col];
            if (!block.isHit) {
                if (x > block.xPos && x < block.xPos + block.width && y > block.yPos && y < block.yPos + block.height) {
                    dy = dy * -1;
                    block.isHit = true;
                    score++;
                }
            }
        }
    }
}
//TODO
function updateScore(){
    document.getElementById("score").innerText = score;
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBlocks();
    drawBall();
    drawRect(paddleWidth, paddleHeight, paddleXPos, paddleYPos);
    //TODO
    collisionDetection();
    updateScore();
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
            document.getElementById("alert").innerText = "Game Over";
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