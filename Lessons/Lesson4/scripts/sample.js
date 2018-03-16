
//create var for paddleWidth

var paddleWidth = 200;
var paddleHeight = 20;

//move paddle to bottom of screen

//paddle movement
//in draw()

if(rightPressed && paddleXPos < canvas.width-paddleWidth) {
    paddleXPos += 7;
}
else if(leftPressed && paddleXPos > 0) {
    paddleXPos -= 7;
}

//check paddle hit
if (y < 0) {
    dy = dy * -1;
}
else if(y > canvas.height) {
    if(x > paddleXPos && x < paddleXPos + paddleWidth) {
        dy = dy * -1;
    }
}


//game over

var interval = setInterval(draw, 10);

//after 
//if(x > paddleXPos && x < paddleXPos + paddleWidth) {
//    dy = dy * -1;
//} 
else {
    titleObj.innerText = "GAME OVER";
    clearInterval(interval);
}