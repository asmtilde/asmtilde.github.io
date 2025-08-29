/*
    This file is deprecated, and will be removed in the future.
    It is only here for reference while we move to typescript.
*/

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const cube = {
    name: "CubeDood: ReCubed",
    author: "Colack",
    version: "0.0.1",
    fps: 144,

    canWidth: 800,
    canHeight: 640
}

var player = {
    x: 0,
    y: 0,
    w: 32,
    h: 32,
    vX: 0,
    vY: 0,

    costume: "cd",
    direction: "right",

    isJumping: false,
    isGrounded: false,

    jumpHeight: 3.3,
    gravity: 0.215,
    friction: 0.92,
    speed: 4,
    slowSpeed: 1,
    highSpeed: 6,
    defSpeed: 4

}

const blockTypes = [
    {
        isSolid: false,
        color: "transparent",
    },
    {
        isSolid: true,
        color: "black",
    },
    {
        isSolid: true,
        color: "red",
    },
    {
        isSolid: true,
        color: "blue",
    },
    {
        isSolid: true,
        color: "green",
    },
    {
        isSolid: true,
        color: "yellow",
    },
    {
        isSolid: true,
        color: "purple",
    },
    {
        isSolid: true,
        color: "orange",
    },
    {
        isSolid: true,
        color: "pink",
    }
]

var keys = [];

document.addEventListener("keydown", function(event)
{
    keys[event.keyCode] = true;
});

document.addEventListener("keyup", function(event)
{
    keys[event.keyCode] = false;
});

/*
    Images & Sprites
*/
var logo = new Image();
logo.src = "assets/game/logo.png";

var levelGoalFlag = new Image();
levelGoalFlag.src = "assets/game/goal.png";

/*
    Audio
*/
const songList = [
    {
        name: "4 Sided Blighted",
        description: "A chill, mysterious beat, mainly for background music and cutscenes.",
        file: "assets/ost/4 Sided Blighted.mp3",
        game: "CubeDood in 'The Memory Snatcher'"
    },
    {
        name: "Angie",
        description: "For Angie, someone close to me.",
        file: "assets/ost/Angie.wav",
        game: "CubeDood: ReCubed"
    },
    {
        name: "Another Day Another Vibe",
        description: "A jazzy lofi beat, for when you're feeling down, or in the settings menu.",
        file: "assets/ost/Another Day Another Vibe.wav",
        game: "CubeDood: ReCubed"
    },
    {
        name: "Blast from the Past",
        description: "This song will shoot you back to the original CubeDood!",
        file: "assets/ost/Blast from the Past.mp3",
        game: "CubeDood in 'The Memory Snatcher'"
    },
    {
        name: "BOLT and DASH!",
        description: "A remix of BOLT! from the original CubeDood, now with a louder piano, and a groovier drum.",
        file: "assets/ost/BOLT and DASH!.mp3",
        game: "CubeDood vs The World!"
    },
    {
        name: "BOLT!",
        description: "One of the classic level songs used in the first CubeDood.",
        file: "assets/ost/BOLT!.mp3",
        game: "CubeDood in 'The Memory Snatcher'"
    },
    {
        name: "Brutish Fighter, Cubed and Everything!",
        description: "The boss battle theme for CubeBrute, from the cancelled 'CubeDood vs The World!'.",
        file: "assets/ost/Brutish Fighter, Cubed and Everything!.mp3",
        game: "CubeDood vs The World!"
    },
    {
        name: "Cubed and Dash",
        description: "A very, very loud rock + jazz combination, for harder levels.",
        file: "assets/ost/Cubed and Dash.mp3",
        game: "CubeDood vs The World!"
    },
    {
        name: "CubeTops Revenge; Return of the Hero",
        description: "CubeTop is back, and this time, he isn't playing games.",
        file: "assets/ost/CubeTops Revenge_ Return of the Hero.mp3",
        game: "CubeDood vs The World!"
    },
    {
        name: "Cylinder Blunder",
        description: "Very fast and jazzy, with great Marimbas, along with a amazing Saxophone.",
        file: "assets/ost/Cylinder Blunder.mp3",
        game: "CubeDood vs The World!"
    },
    {
        name: "Dance With Me CubeDood!",
        description: "CubeTop's boss battle theme. 'Dance with me, CubeDood! It will surely be your last!' - CubeTop",
        file: "assets/ost/Dance With Me CubeDood!.mp3",
        game: "CubeDood vs The World!"
    },
    {
        name: "Et tu, Cube",
        description: "Level theme for anything sneaky, or fast pased. Also used for challenge levels.",
        file: "assets/ost/Et tu, Cube.mp3",
        game: "CubeDood vs The World!"
    },
    {
        name: "Fight with Might",
        description: "A very chill theme for CubeDood vs The World!'s level editor.",
        file: "assets/ost/Fight with Might.mp3",
        game: "CubeDood vs The World!"
    },
    {
        name: "Fire at will!",
        description: "A hidden song that would only play if CubeDood collected all of the Cubed Coins.",
        file: "assets/ost/Fire at will!.mp3",
        game: "CubeDood vs The World!"
    },
    {
        name: "Functional Equation",
        description: "The level editor theme from CubeDood in 'The Memory Snatcher'. A very relaxed jazz song.",
        file: "assets/ost/Functional Equation.mp3",
        game: "CubeDood in 'The Memory Snatcher'"
    },
    {
        name: "Keep it plane",
        description: "A super freaking energetic song, meant to be the original CubeDood: ReCubed title theme.",
        file: "assets/ost/Keep it plane.mp3",
        game: "CubeDood: ReCubed"
    },
    {
        name: "Lead me in the right Direction",
        description: "A much faster remix of 'Swing in the Right Direction' from the Original CubeDood.",
        file: "assets/ost/Lead me in the right Direction.wav",
        game: "CubeDood: ReCubed"
    },
    {
        name: "Maximus Square",
        description: "The title theme for CubeDood vs The World!",
        file: "assets/ost/Maximus Square.mp3",
        game: "CubeDood vs The World!"
    },
    {
        name: "Meeting with the Cube",
        description: "Level editor theme and Settings theme from the Original CubeDood.",
        file: "assets/ost/Meeting with the Cube.mp3",
        game: "CubeDood in 'The Memory Snatcher'"
    },
    {
        name: "Quadrilateral Collateral",
        description: "CubeTop's boss battle theme from the Original CubeDood.",
        file: "assets/ost/Quadrilateral Collateral.mp3",
        game: "CubeDood in 'The Memory Snatcher'"
    },
    {
        name: "Return of CubeTop",
        description: "CubeTop's theme song, from the original CubeDood.",
        file: "assets/ost/Return of CubeTop.mp3",
        game: "CubeDood in 'The Memory Snatcher'"
    },
    {
        name: "Revival",
        description: "The CubeDood: ReCubed title theme.",
        file: "assets/ost/Revival.wav",
        game: "CubeDood: ReCubed"
    },
    {
        name: "Shadows",
        description: "A hidden song in CubeDood: ReCubed, but I'm not going to tell you how to find it. :P",
        file: "assets/ost/Shadows.wav",
        game: "CubeDood: ReCubed"
    },
    {
        name: "Simply Squared",
        description: "A bonus song included in CubeDood vs The World!, meant to be used in level editor levels.",
        file: "assets/ost/Simply Squared.mp3",
        game: "CubeDood vs The World!"
    },
    {
        name: "Sine-Cosine-Tangent",
        description: "Another level editor theme for CubeDood: ReCubed",
        file: "assets/ost/Sine-Cosine-Tangent.wav",
        game: "CubeDood: ReCubed"
    },
    {
        name: "Sound Test",
        description: "The default sound test song from CubeDood vs The World!",
        file: "assets/ost/Sound Test.mp3",
        game: "CubeDood vs The World!"
    },
    {
        name: "Squared Impared",
        description: "A song that plays after you beat the game in the Original CubeDood.",
        file: "assets/ost/Squared Impared.mp3",
        game: "CubeDood in 'The Memory Snatcher'"
    },
    {
        name: "Swing in the right Direction",
        description: "Level song for more advanced and harder levels in CubeDood in 'The Memory Snatcher'.",
        file: "assets/ost/Swing in the right Direction.mp3",
        game: "CubeDood in 'The Memory Snatcher'"
    },
    {
        name: "The Memory Snatcher",
        description: "The title theme for CubeDood in 'The Memory Snatcher'",
        file: "assets/ost/The Memory Snatcher.mp3",
        game: "CubeDood in 'The Memory Snatcher'"
    },
    {
        name: "The Narcissist",
        description: "Theme song for Cubie, originating from CubeDood vs The World!",
        file: "assets/ost/The Narcissist.mp3",
        game: "CubeDood vs The World!"
    },
    {
        name: "The Second Dimention",
        description: "An alternate version of the title screen theme for CubeDood: ReCubed",
        file: "assets/ost/The Second Dimention.wav",
        game: "CubeDood: ReCubed"
    }
];

var currentSongId = 0;  // Integer

/*
    Constant & Final Variables
*/
const keyDelayTime = 150;
const enableDebug = false;

const reallyBadLoadingScreenTips = [
    "Pro Tip: Hit the space bar to jump",
    "Hidden Feature: Pressing 'Z' will make you go faster",
    "Did you know? You can change your costume in the options menu",
    "Fun Fact: The original CubeDood was made in 2 weeks!",
    "Did you know? CubeDood is a cube",
    "Pro Tip: Avoid all spikes!",
    "Fun Fact: In the original CubeDood, level 15 was the hardest level in the game",
    "Pro Tip: Alt+F4 will enable cheats"
];

const keyBinds = {
    "up": 38,
    "down": 40,
    "left": 37,
    "right": 39,
    "w": 87,
    "s": 83,
    "a": 65,
    "d": 68,
    "space": 32,
    "z": 90,
    "x": 88,
    "enter": 13
}

/*
    Variables
*/
var lastUpdateTime = performance.now();
var deltaTime = 0;
var fpsInterval = 1000 / cube.fps;

var keyDelay = false;

var gameState = "load";
var menuState = "main";
var gameMode = "standard";
var menuSelection = 0;

var levelHasLoaded = false;
var levelData = "";
var level = [];
var levelNum = 0;

function update()
{
    requestAnimationFrame(update);

    var currentTime = performance.now();
    deltaTime += currentTime - lastUpdateTime;

    if (deltaTime >= fpsInterval)
    {
        graphics_clearCanvas();
        input();
        draw();
        deltaTime = 0;
    }

    lastUpdateTime = currentTime;
}

function draw()
{

    switch (gameState)
    {
        case "load":
            graphics_drawBackground("black");
            graphics_drawText("white", "Loading...", 10, 20, "20px", "Helvetica");
            break;
        case "pressStart":
            graphics_drawBackground("black");
            graphics_drawText("white", "Press Enter to Start", 10, 20, "20px", "Helvetica");
            break;
        case "menu":
            graphics_drawMenuBackground();
            
            switch (menuState)
            {
                case "main":
                    graphics_drawGameLogo(10, 10);
                    graphics_drawText("black", "Main Menu", 605, 30, "30px", "Helvetica");
                    graphics_drawText("black", "Version: " + cube.version, 605, 60, "20px", "Helvetica");
                    graphics_drawText("black", "By Studio Cubed", 605, 90, "20px", "Helvetica");
                    switch (menuSelection)
                    {
                        case 0:
                            graphics_drawLayeredButton(300, 200, 200, 50, "Play", "black", "orange", "orange");
                            graphics_drawLayeredButton(300, 280, 200, 50, "Editor", "orange", "black", "black");
                            graphics_drawLayeredButton(300, 360, 200, 50, "Options", "orange", "black", "black");
                            graphics_drawCubeDood(250, 210, 32, 32, "right");
                            break;
                        case 1:
                            graphics_drawLayeredButton(300, 200, 200, 50, "Play", "orange", "black", "black");
                            graphics_drawLayeredButton(300, 280, 200, 50, "Editor", "black", "orange", "orange");
                            graphics_drawLayeredButton(300, 360, 200, 50, "Options", "orange", "black", "black");
                            graphics_drawCubeDood(250, 290, 32, 32, "right");
                            break;
                        case 2:
                            graphics_drawLayeredButton(300, 200, 200, 50, "Play", "orange", "black", "black");
                            graphics_drawLayeredButton(300, 280, 200, 50, "Editor", "orange", "black", "black");
                            graphics_drawLayeredButton(300, 360, 200, 50, "Options", "black", "orange", "orange");
                            graphics_drawCubeDood(250, 370, 32, 32, "right");
                            break;
                    }
                    break;
            }
            break;
        case "game":
            switch (gameMode)
            {
                case "standard":
                    player_draw();
                    break;
            }
    }

    if (enableDebug)
    {
        graphics_drawText("purple", "FPS: " + Math.round(1 / (deltaTime / 1000)), 10, 20, "20px", "Helvetica");
        graphics_drawText("purple", "Delta Time: " + deltaTime, 10, 40, "20px", "Helvetica");
        graphics_drawText("purple", "Can Jump: " + player.isGrounded, 10, 60, "20px", "Helvetica");
    }
}

function input()
{
    if (!keyDelay)
    {
        switch (gameState)
    {
        case "pressStart":
            if (keys[keyBinds.enter])
            {
                gameState = "menu";
                utility_setKeyDelay();
            }
            break;
        case "menu":
            switch (menuState)
            {
                case "main":
                    if (keys[keyBinds.up] && !keys[keyBinds.enter])
                    {
                        if (menuSelection > 0)
                        {
                            menuSelection--;
                        } else {
                            menuSelection = 2;
                        }
                        utility_setKeyDelay();
                    }

                    if (keys[keyBinds.down] && !keys[keyBinds.enter])
                    {
                        if (menuSelection < 2)
                        {
                            menuSelection++;
                        } else {
                            menuSelection = 0;
                        }
                        utility_setKeyDelay();
                    }

                    if (keys[keyBinds.enter])
                    {
                        switch (menuSelection)
                        {
                            case 0:
                                gameState = "game";
                                gameMode = "standard";
                                utility_setKeyDelay();
                                break;
                        }
                    }
                    break;
            }
            break;
        case "game":
            switch (gameMode)
            {
                case "standard":
                    player_update();
                    break;
            }
            break;
    }
    }
}

function graphics_clearCanvas()
{
    ctx.clearRect(0, 0, cube.canWidth, cube.canHeight);
}

function graphics_drawBackground(color)
{
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, cube.canWidth, cube.canHeight);
}

function graphics_drawRect(color, x, y, w, h)
{
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
}

function graphics_drawText(color, text, x, y, size, font)
{
    ctx.fillStyle = color;
    ctx.font = size + " " + font;
    ctx.fillText(text, x, y);
}

function graphics_drawLine(color, x1, y1, x2, y2)
{
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

function graphics_drawRectOutline(color, x, y, w, h)
{
    ctx.strokeStyle = color;
    ctx.strokeRect(x, y, w, h);
}

function graphics_drawMenuBackground()
{
    graphics_drawBackground("black");
    graphics_drawRect("white", 0, 0, 780, 620);
    graphics_drawRect("orange", 0, 0, 760, 600);
}

function graphics_drawGameLogo(x, y)
{
    ctx.drawImage(logo, x, y);
    ctx.drawImage(levelGoalFlag, x + 408, y - 13, 32, 32);
    graphics_drawText("black", "ReCubed", x + 260, y + 135, "40px", "Helvetica");
    graphics_drawCubeDood(x + 440, y+68, 32, 32, "right");
    graphics_drawCubeTop(x + 504, y + 68, 32, 32, "left");
}

function graphics_drawButton(x, y, w, h, text, color, textColor, strokeColor)
{
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);

    ctx.strokeStyle = strokeColor;
    ctx.strokeRect(x, y, w, h);

    ctx.fillStyle = textColor;
    ctx.font = "20px Helvetica";
    ctx.fillText(text, x + (w / 2) - (text.length * 5), y + (h / 2) + 5);
}

function graphics_drawLayeredButton(x, y, w, h, text, color, textColor, strokeColor)
{
    ctx.fillStyle = "black";
    ctx.fillRect(x + 10, y + 10, w, h);

    ctx.fillStyle = "white";
    ctx.fillRect(x + 5, y + 5, w, h);

    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);

    ctx.strokeStyle = strokeColor;
    ctx.strokeRect(x, y, w, h);

    ctx.fillStyle = textColor;
    ctx.font = "20px Helvetica";
    ctx.fillText(text, x + (w / 2) - (text.length * 5), y + (h / 2) + 5);
}

function graphics_drawCubeDood(x, y, w, h, direction)
{
    ctx.fillStyle = "white";
    ctx.fillRect(x, y, w, h);

    ctx.strokeStyle = "black";
    ctx.strokeRect(x, y, w, h);

    switch (direction) {
        case "right":
            ctx.fillStyle = "black";
            ctx.beginPath();
            ctx.arc(x + 12, y + 14, 2.5, 0, 2 * Math.PI);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(x + 28, y + 14, 2.5, 0, 2 * Math.PI);
            ctx.fill();
            break;
        case "left":
            ctx.fillStyle = "black";
            ctx.beginPath();
            ctx.arc(x + 4, y + 14, 2.5, 0, 2 * Math.PI);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(x + 20, y + 14, 2.5, 0, 2 * Math.PI);
            ctx.fill();
            break;
        case "upleft":
            ctx.fillStyle = "black";
            ctx.beginPath();
            ctx.arc(x + 4, y + 4, 2.5, 0, 2 * Math.PI);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(x + 20, y + 4, 2.5, 0, 2 * Math.PI);
            ctx.fill();
            break;
        case "upright":
            ctx.fillStyle = "black";
            ctx.beginPath();
            ctx.arc(x + 12, y + 4, 2.5, 0, 2 * Math.PI);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(x + 28, y + 4, 2.5, 0, 2 * Math.PI);
            ctx.fill();
            break;
    }
}

function graphics_drawCubeTop(x, y, w, h, direction)
{
    ctx.fillStyle = "white";
    ctx.fillRect(x, y, w, h);

    ctx.strokeStyle = "black";
    ctx.strokeRect(x, y, w, h);

    switch (direction) {
        case "right":
            ctx.fillStyle = "black";
            ctx.beginPath();
            ctx.moveTo(x + 6, y + 14);
            ctx.lineTo(x + 10, y + 10);
            ctx.lineTo(x + 14, y + 14);
            ctx.fill();
            ctx.beginPath();
            ctx.moveTo(x + 22, y + 14);
            ctx.lineTo(x + 26, y + 10);
            ctx.lineTo(x + 30, y + 14);
            ctx.fill();
            break;
        case "left":
            ctx.fillStyle = "black";
            ctx.beginPath();
            ctx.moveTo(x + 2, y + 14);
            ctx.lineTo(x + 6, y + 10);
            ctx.lineTo(x + 10, y + 14);
            ctx.fill();
            ctx.beginPath();
            ctx.moveTo(x + 18, y + 14);
            ctx.lineTo(x + 22, y + 10);
            ctx.lineTo(x + 26, y + 14);
            ctx.fill();
            break;
    }

    ctx.fillStyle = "black";
    ctx.rect(x + 3, y - 5, 26, 5);
    ctx.fill();
    ctx.rect(x + 6, y - 30, 20, 25);
    ctx.fill();
    ctx.fillStyle = "gold";
    ctx.beginPath();
    ctx.arc(x + 16, y - 5, 10, 0, Math.PI, true);
    ctx.fill();
    ctx.closePath();
}

/*
    Graphics Functions for Levels
*/

function graphics_drawLevel(level)
{
    /*
        This will be implemented in the future!

        But basically, levels are width & height array of tiles / 32.
        So since the width is 800, and the height is 640, the level would be 25x20.

        This will be tied in with the utility function "parseLevel" which will take a level string and convert it into a 2D array of tiles.
    */ 
}

function graphics_drawTile(x, y, w, h, color)
{
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
}

function graphics_drawTileWithBorder(x, y, w, h, color, borderColor)
{
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);

    ctx.strokeStyle = borderColor;
    ctx.strokeRect(x, y, w, h);
}

/*
    Utility Functions
*/

function utility_setKeyDelay()
{
    keys = [];
    keyDelay = true;
    setTimeout(function()
    {
        keyDelay = false;
    }, keyDelayTime);
}

function utility_parseLevel()
{
    /*
        Level strings will be formatted as follows:

        "levelname,levelauthor,songid,bgcolor,0,0..."

        First 2 are level name and author
        3rd is song id
        4th is background color
        The rest are the level tiles, which are integers that represent the tile type.
    */
}

/*
    Player Functions
*/
function player_update()
{
    player_handleJump();
    player_handleMovement()
    player_handleCollision();
}

function player_handleJump()
{
    if (keys[keyBinds.space] || keys[keyBinds.up] || keys[keyBinds.w])
    {
        if (!player.isJumping)
        {
            player.isJumping = true;
            player.isGrounded = false;

            player.vY = -player.jumpHeight * 2;
            player.direction = player.direction == "right" ? "upright" : "upleft";
        }
    }
}

function player_handleMovement()
{
    if (keys[keyBinds.z])
    {
        player.speed = player.highSpeed;
    } else if (keys[keyBinds.x])
    {
        player.speed = player.slowSpeed;
    } else {
        player.speed = player.defSpeed;
    }

    if (keys[keyBinds.left] || keys[keyBinds.a])
    {
        if (player.vX > -player.speed)
        {
            player.vX--;
            player.direction = player.isJumping ? "upleft" : "left";
        }
    }

    if (keys[keyBinds.right] || keys[keyBinds.d])
    {
        if (player.vX < player.speed)
        {
            player.vX++;
            player.direction = player.isJumping ? "upright" : "right";
        }
    }
}

function player_handleCollision()
{
    /*
        Gravity, Friction, and Collision (in that order)
    */

    player.vY += player.gravity;
    player.vX *= player.friction;

    player.x += player.vX;
    player.y += player.vY;

    if (player.x + player.w > cube.canWidth)
    {
        player.x = cube.canWidth - player.w;
        player.vX = 0;
    }

    if (player.x < 0)
    {
        player.x = 0;
        player.vX = 0;
    }

    if (player.y < 0)
    {
        player.y = 0;
        player.vY = 0;
    }

    if (player.y >= cube.canHeight - player.h)
    {
        player.y = cube.canHeight - player.h;
        player.isJumping = false;
        player.isGrounded = true;
        player.vY = 0;
        
        if (player.direction == "upleft")
        {
            player.direction = "left";
        } else if (player.direction == "upright")
        {
            player.direction = "right";
        }
    }

    if (player.y + player.h > cube.canHeight)
    {
        player.y = cube.canHeight - player.h;
        player.vY = 0;
    }

    if (player.y < cube.canHeight - player.h)
    {
        player.isGrounded = false;
        player.isJumping = true;
    }

    player_handleLevelCollision(level);
}

function player_handleLevelCollision(levelArray)
{
    for (var x = 0; x < levelArray.length; x++)
    {
        for (var y = 0; y < levelArray[x].length; y++)
        {
            
        }
    }
}

function player_draw()
{
    switch (player.costume)
    {
        case "cd":
            graphics_drawCubeDood(player.x, player.y, player.w, player.h, player.direction);
            break;
        case "ct":
            graphics_drawCubeTop(player.x, player.y, player.w, player.h, player.direction);
            break;
        default:
            graphics_drawCubeDood(player.x, player.y, player.w, player.h, player.direction);
            break;
    }
}

/*
    Level Functions
*/

function level_collisionSide(player, tile)
{
    var deltaX = player.x + player.w / 2 - (tile.x + tile.w / 2);
    var deltaY = player.y + player.h / 2 - (tile.y + tile.h / 2);

    if (Math.abs(deltaX) > Math.abs(deltaY))
    {
        return deltaX > 0 ? "right" : "left";
    } else {
        return deltaY > 0 ? "bottom" : "top";
    }
}

/*
    Editor Functions (help me)
*/

function editor_update()
{
    
}

function editor_draw()
{

}

function editor_input()
{
    
}

function init()
{
    canvas.width = cube.canWidth;
    canvas.height = cube.canHeight;

    console.log(cube.name + " v" + cube.version + " by " + cube.author);

    update();

    gameState = "loading";

    /*
        Any loading code goes here.
    */

    gameState = "pressStart";
}

init();