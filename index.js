const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

class snakePart{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}

let speed = 7;
let tileCount = 20;
let tileSize = canvas.width/tileCount - 2;
let headX = 10;
let headY = 10;
const snakeParts = [];
let tailLength = 2;
let appleX = Math.floor(Math.random()*tileCount);
let appleY = Math.floor(Math.random()*tileCount);
let xVelocity = 0;
let yVelocity = 0;
let score = 0;
let move = 0;

//game loop
function drawGame(){
    changeSnakePosition();
    let result = isGameOver();
    if(result){return;}
    clearScreen();
    checkAppleColision();
    drawApple();
    drawSnake();
    drawScore();
    setTimeout(drawGame, 1000/speed);
    move = 0;
}

function isGameOver()
{
    let gameOver = false;
    if(xVelocity == 0 && yVelocity == 0)
        return 0;
    if(headX<0 || headX>=tileCount || headY<0 || headY>=tileCount)
        gameOver = true;

    for(let i =0; i<snakeParts.length;i++)
    {
        let part = snakeParts[i];
        if(headX === part.x && headY === part.y)
        {
            gameOver = true;
            break;
        }
    }

    if(gameOver){
        ctx.fillStyle = 'white';
        ctx.font = "50px Verdana";
        ctx.fillText("Game Over", canvas.width/6.5, canvas.height/2+tileSize)
    }
    return gameOver;
}

function drawScore(){
    ctx.fillStyle = 'white';
    ctx.font = "10px Verdana";
    ctx.fillText("Score "+score, canvas.width - 50, 10);
}

function clearScreen() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0,canvas.width,canvas.height);
}

function drawSnake(){
    ctx.fillStyle = 'green';
    for(let i = 0; i<snakeParts.length;i++)
    {
        let part = snakeParts[i];
        ctx.fillRect(part.x*tileCount, part.y*tileCount, tileSize, tileSize);
    }
    snakeParts.push(new snakePart(headX, headY));
    if(snakeParts.length>tailLength){
        snakeParts.shift();
    }
    ctx.fillStyle ='orange';
    ctx.fillRect(headX*tileCount, headY*tileCount, tileSize, tileSize);
}

function changeSnakePosition(){
    headX += xVelocity;
    headY += yVelocity;
}


function drawApple(){
    ctx.fillStyle= "red";
    ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize);
}


function checkAppleColision(){
    if(appleX === headX && appleY === headY)
    {
        let repeat;
        do{
            repeat = 0;
            appleX = Math.floor(Math.random()*tileCount);
            appleY = Math.floor(Math.random()*tileCount);
            for(let i=0; i<snakeParts.length;i++)
            {
                let part = snakeParts[i];
                if(part.x == appleX && part.y == appleY)
                    repeat = 1;
            }
        }while(repeat);
        tailLength++;
        score++;
    }
}

document.body.addEventListener('keydown', keydown);

function keydown(event){
    if(move == 0)
    {
        if(event.keyCode==38){
            if(yVelocity==1)
                return;
            yVelocity = -1;
            xVelocity = 0;
        }
        else if(event.keyCode==39){
            if(xVelocity==-1)
                return;
            yVelocity = 0;
            xVelocity = 1;
        }
        else if(event.keyCode==40){
            if(yVelocity==-1)
                return;
            yVelocity = 1;
            xVelocity = 0;
        }
        else if(event.keyCode==37){
            if(xVelocity==1)
                return;
            yVelocity = 0;
            xVelocity = -1;
        }
        move = 1;
    }
}

drawGame();