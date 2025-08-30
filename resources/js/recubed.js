const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const isDebug = true;

const tileSize = 32;    // ~ everything is 32x32

var keys = [];
var gameState = 0;

var logoImage;
var goalImage;

document.body.addEventListener("keydown", function(e) {
    keys[e.keyCode] = true;
});

document.body.addEventListener("keyup", function(e) {
    keys[e.keyCode] = false;
});

function drawImage(img, x, y, width = tileSize, height = tileSize)
{
    ctx.drawImage(img, x, y, width, height);

    if (isDebug)
    {
        ctx.strokeStyle = "red";
        ctx.strokeRect(x, y, width, height);
    }
}

function drawImageNod(img, x, y)
{
    ctx.drawImage(img, x, y);

    if (isDebug)
    {
        ctx.strokeStyle = "red";
        ctx.strokeRect(x, y, img.width, img.height);
    }
}

function drawCubedood(x, y, d)
{
}

function drawCubetop(x, y, d)
{

}

function drawGameLogo(x, y)
{
    drawImageNod(logoImage, x, y);
    drawImage(goalImage, x + 408, y - 13);
    drawText("ReCubed", x + 260, y + 135, "40px Helvetica", "black");
    drawCubedood(x + 440, y+68, 'r');
    drawCubetop(x+504, y+68, 'l');
}

function drawGrid(color = "gray", gridSize = tileSize)
{
    ctx.strokeStyle = color;
    for(let x = 0; x < canvas.width; x += gridSize)
    {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }
    for(let y = 0; y < canvas.height; y += gridSize)
    {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }
}

function drawBackground(color)
{
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawRect(x, y, width, height, color)
{
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
}

function drawText(text, x, y, font = "30px Arial", color = "white")
{
    ctx.fillStyle = color;
    ctx.font = font;
    ctx.fillText(text, x, y);
}

function loadingMenu()
{
    // ~ Girl I must-
    drawBackground("black");
    drawText("Loading...", canvas.width / 2 - 70, canvas.height / 2);
}

function pressEnterMenu()
{
    drawBackground("black");
    drawText("Press Enter to Start", canvas.width / 2 - 150, canvas.height / 2);

    if(keys[13])
    {
        gameState = 2;
    }
}

function mainMenu()
{
    drawBackground("black");
    drawRect(0, 0, canvas.width - tileSize, canvas.height - tileSize, "white");
    drawRect(0, 0, canvas.width - tileSize*2, canvas.height - tileSize*2, "orange");
    drawGameLogo(10, 10);
}

function update()
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    switch(gameState)
    {
        case 0:
            loadingMenu();
            break;
        case 1:
            pressEnterMenu();
            break;
        case 2:
            mainMenu();
            break;
    }

    if (isDebug)
    {
        drawGrid();
    }
}

function init()
{
    setInterval(update, 1000/60);

    gameState = 0;

    canvas.width = 1024;
    canvas.height = 960;

    logoImage = new Image();
    logoImage.src = "./resources/images/logo.png";  

    goalImage = new Image();
    goalImage.src = "./resources/images/goal.png";

    // ~ done loading
    gameState = 1;
}

window.onload = init;