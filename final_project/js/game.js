// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);


// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
    bgReady = true;
};
bgImage.src = "images/background.png";


// Dave image
var daveReady = false;
var daveImage = new Image();
daveImage.onload = function () {
    daveReady = true;
};
daveImage.src = "images/dave.png";


// Monster image
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
    monsterReady = true;
};
monsterImage.src = "images/monster.png";


// Game objects
var dave = {
    speed: 256 // movement in pixels per second
};
var monster = {};
var monstersCaught = 0;
var timeLeft = 30;

// Handle keyboard controls
var keysDown = {};
addEventListener("keydown", function (e) {
    keysDown[e.keyCode] = true;
}, false);
addEventListener("keyup", function (e) {
    delete keysDown[e.keyCode];
}, false);


// Reset the game when the player catches a monster
var reset = function () {
    dave.x = canvas.width / 2;
    dave.y = canvas.height / 2;


    // Throw the monster somewhere on the screen randomly
    monster.x = 32 + (Math.random() * (canvas.width - 64));
    monster.y = 32 + (Math.random() * (canvas.height - 64));
};


// Update game objects
var update = function (modifier) {
    //If the time is not over
    if(timeLeft>0)
    {
	if(dave.y>0 && 38 in keysDown) 
		{ // Player holding up
            dave.y -= dave.speed * modifier;
        }
		else if(dave.y<=0 && 38 in keysDown)
		{
			timeLeft=0;
			daveImage.src = "images/dead.png";
		}
	if(dave.y <448 && 40 in keysDown) { // Player holding down
            dave.y += dave.speed * modifier;
        }
		else if(dave.y >=448 && 40 in keysDown) { // Player holding down
            timeLeft=0;
			daveImage.src = "images/dead.png";
        }
	if(dave.x>0 && 37 in keysDown) { // Player holding left
            dave.x -= dave.speed * modifier;
        }
		else if(dave.x<=0 && 37 in keysDown) 
		{
			timeLeft=0;
daveImage.src = "images/dead.png";
		}
	if(dave.x<480 && 39 in keysDown) { // Player holding right
            dave.x += dave.speed * modifier;
        }
else 	if(dave.x>=480 && 39 in keysDown)
		{
			timeLeft=0;
daveImage.src = "images/dead.png";

		}

        // Are they touching?
        if (
            dave.x <= (monster.x + 32)
            && monster.x <= (dave.x + 32)
            && dave.y <= (monster.y + 32)
            && monster.y <= (dave.y + 32)
        ) {
            ++monstersCaught;
            reset();
        }
    }
    else
    {
         //alert(localStorage.highestScore);
        clearInterval(timerGameMain);
        clearInterval(timerGame);


        if (!localStorage.highestScore)
            localStorage.highestScore = 0;

        if (localStorage.highestScore < monstersCaught) {
            localStorage.highestScore = monstersCaught;
            alert("Congratulations! You scored the highest!!");
        }

        alert("Game Over\nYou have caught " + monstersCaught + " monsters in 30 seconds.");
    }
};


// Draw 
var render = function () {
    if (bgReady) {
        ctx.drawImage(bgImage, 0, 0);
    }


    if (daveReady) {
        ctx.drawImage(daveImage, dave.x, dave.y);
    }


    if (monsterReady) {
        ctx.drawImage(monsterImage, monster.x, monster.y);
    }


    // Score
    ctx.fillStyle = "rgb(250, 250, 250)";
    ctx.font = "24px Helvetica";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";

document.getElementById("dispScore").innerHTML="<font size=+2><b> Highest Score :</b>" + localStorage.highestScore;
document.getElementById("infoDiv").innerHTML="<font size=+2><b>   Monster Caught:</b> " + monstersCaught + "    <b>Time Left:</b> " + timeLeft + " Sec</font>";

};


// The main game loop
var main = function () {
    var now = Date.now();
    var delta = now - then;
    update(delta / 1000);
    render();
    then = now;
};

//Time Restriction
var timeRestrection= function ()
{
   timeLeft--;
}

// Let's play this game!
reset();
var then = Date.now();
var timerGameMain=setInterval(main, 1); // Execute as fast as possible
var timerGame=setInterval(timeRestrection,1000);