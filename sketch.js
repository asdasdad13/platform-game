/*
Sound credits:
    - a#2 by angstrom
    - Spring Birds Loop with Low-Cut (New Jersey) by hargissssound
    - Malletlayer by tarane468
    - Wobble 19 by nomiqbomi

Extensions:
	- added some vanity effects such as game over screen fading to black, and coded a textbox that would fade in and out using object-oriented programming.
	- intially, character would only pick up collectable if the 1 pixel at the bottom of its legs touches a collectable. I modified the code for checkCollectable such that the collectable can be found when in contact with more parts of the character's figure.
	- made cloud objects and animated them to float across the screen
Bits I found difficult:
 - I spent a lot of time re-writing the logic for changes to the value of scrollPos in order to make the side-scrolling pause whenever the character reaches the edge of the level area. I tried adding more conditions, but the final solution was simply to switch the case conditions.
	-- For example, the initial conditions only checked if the character was on the left or right side of the screen, and attempting to add on conditions to check if character had reached certain part of map made character unable to virtually move past a certain x-coordinate.
 - can't play birdSound no matter how short i cut it
 - could not work out a shorter way to implement a nighttime overlay such that all background objects except the moon would be darkened, while keeping the moon virtually positioned behind the mountain objects.
 - I incorrectly determined the condition for the textboxes to fade out in a mathematical sense, and had maintained trying to edit random properties like changing the format of the class methods, creating dummy objects and adding more redundant property names.

 */

var gameChar_x;
var gameChar_y;
var floorPos_y;
var scrollPos;
var gameChar_world_x;

var isLeft;
var isRight;
var isFalling;
var isPlummeting;

var trees;
var clouds;
var canyons;
var collectables;
var mountains;
var floorPos_y;
var stars;
var fire;

var game_score;
var flagpole;
var lives;
var gameOver;
var cheatMode;
var fadeInBlackAlpha;
var fadeInRedAlpha;
var textboxes;
var maxLives;

var jumpSound;
var collectableSound;
var deathSound;
var flagSound;
var birdSound;

var platforms;

function preload()
{
	soundFormats('mp3','wav');

    jumpSound = loadSound('assets/jump.wav');
    collectableSound = loadSound('assets/11072__angstrom__a-2.wav');
    deathSound = loadSound('assets/578827__nomiqbomi__wobble-19.mp3');
    flagSound = loadSound('assets/419242__tarane468__malletlayer.wav');
    birdSound = loadSound('assets/345852__hargissssound__spring-birds-loop-with-low-cut-new-jersey.wav');
    
    jumpSound.setVolume(0.1);
    collectableSound.setVolume(0.1);
    deathSound.setVolume(0.2);
    flagSound.setVolume(0.2);
    birdSound.setVolume(1);
}

function setup()
{
	createCanvas(1024, 576);
	lives = 2;
	maxLives = 2;
	startGame();
}

function startGame()
{
	gameOver = false;
	floorPos_y = height * 3/4;
	fadeInBlackAlpha = 0;
	fadeInRedAlpha = 20;

	trees = [];
    clouds = [];
    canyons = [];
    mountains = [];
	stars = [];
	collectables = [];
    platforms = [];
	textboxes = [];
	pickUpHearts = [];

	initStars();
    initTrees();
    initClouds();
    initCanyons();
    initMountains();
	initBonfire();
    initCollectables();
	initPlatforms();

	d = new directionalSign;
	walkInstructionsBox = new fadingTextBox('walk', 80,floorPos_y-190,220,60);
	collectInstructionsBox = new fadingTextBox('collect',360,floorPos_y-130,300,60);
	jumpInstructionsBox = new fadingTextBox('jump', 600,floorPos_y-290,230,60);
	canyonInstructionsBox = new fadingTextBox('canyon', 1500,floorPos_y-250,450,140);
	heartInstructionsBox = new fadingTextBox('heart',2300,floorPos_y-330,220,80);
	textboxes.push(walkInstructionsBox,collectInstructionsBox,jumpInstructionsBox,canyonInstructionsBox,heartInstructionsBox)


	//init the game
	gameChar_x = 120;
	gameChar_y = floorPos_y;

	// Variable to control the background scrolling.
	scrollPos = 0;
	game_score = 0;
	flagpole = {isReached: false, x_pos: 3000};

	// Variable to store the real position of the gameChar in the game
	// world. Needed for collision detection.
	gameChar_world_x = gameChar_x - scrollPos;

	// Boolean variables to control the movement of the game character.
	isLeft = false;
	isRight = false;
	isFalling = false;
	isPlummeting = false;
}

function draw()
{
	// if (!birdSound.isPlaying())
	// {
	// 	console.log('Looping track...')
	// 	birdSound.play(); //makes sure the track loops
	// }
	noStroke();
    drawSky();
    drawGround();
	
	push();
	translate(scrollPos*0.01,0);
	drawStars();
	drawMoon();
	pop();

	push();
	translate(scrollPos*0.04,0);
	drawClouds();
	drawMountains();
	drawTrees();
	pop();

	push();
	translate(scrollPos, 0);
	checkPlayerDie();
    checkFlagpole();
    drawPlatforms();

	for (i in canyons) {
		drawCanyon(canyons[i]);
		checkCanyon(canyons[i]);
	}

	
	//on-screen tutorial instructions, IN ORDER//
	for(i in textboxes) textboxes[i].render();

	for (i in collectables) {
		if (!collectables[i].isFound) {
			drawCollectable(collectables[i]);
			checkCollectable(collectables[i]);
		}
	}

	d.animateSign();
	drawFlagpole();
	pop();

	drawLifeTokens();
	drawGameChar();
	drawGameScore();

	textSize(16);
	if (cheatMode) text('Cheat mode on',width-120,height-10);

	if(lives==0 || flagpole.isReached) //game won or lost
	{
		if(!gameOver)
		{
			if(flagpole.isReached) flagSound.play();
			gameOver = true;
		}
		drawGameOver();
	}
	
	// Logic to make the game character move or the background scroll.
	if(isLeft)
	{
		if (gameChar_x < width * 0.3 && gameChar_world_x+10>317) //if char has reached threshold, the scene moves instead
		{
			scrollPos += 5;
			if(cheatMode) scrollPos += 20; //move in 2x speed for cheat mode
		}
		else if(gameChar_world_x>17) //if character has NOT reached left threshold, char updates
		{
			gameChar_x -= 5;
			if(cheatMode) gameChar_x -= 20;
		}
	}
	if(isRight)
	{
		if(gameChar_x > width * 0.7 && gameChar_world_x-10<2800)
		{
			scrollPos -= 5
			if(cheatMode) scrollPos -= 20;
		}
		else if(gameChar_world_x<3100)
		{
			gameChar_x += 5;
			if(cheatMode) gameChar_x += 20;
		}
	}

	// Logic to make the game character rise and fall.
	if (gameChar_y<floorPos_y) 
	{
		var isContact = false;
		for(i in platforms)
		{
			if (platforms[i].checkContact(gameChar_world_x,gameChar_y))
			{
				isContact = true;
				isFalling=false;
				break;
			}
		}
		if(!isContact)
		{
			gameChar_y+=4;
			isFalling=true;
		}
	}
	else
	{
		isFalling=false;
	}

	//make character plummet in canyons
	if (isPlummeting && !cheatMode) {
		gameChar_y += 10;
	}
	// Update real position of gameChar for collision detection.
	gameChar_world_x = gameChar_x - scrollPos;
	checkPlayerDie();

}

// ---------------------
// Key control functions
// ---------------------

function keyPressed()
{
	if(!gameOver)
	{
		if (keyCode==37) //left arrow
		{
			isLeft = true;
		}
		if (keyCode==39) //right arrow
		{
			isRight = true;
		}
		if (keyCode==38 || keyCode==32) //space, up arrow
		{
			if(!isFalling && gameChar_y<=floorPos_y)
			{
				jumpSound.play();
				gameChar_y-=100;
			}
		}
		if (keyCode==81) //letter Q to reset all
		{
			setup();
		}
		if(keyCode==69) //letter E to activate cheat mode
		{
			cheatMode = !cheatMode;
			if(!cheatMode)isPlummeting=false; //initialise isPlummeting after switching back to normal
		}
	}
	else //game is over, player shouldn't move anymore
	{
		if (keyCode==32) setup(); //space to continue
	}
	
}

function keyReleased()
{
	if (keyCode==37) { //left arrow
		isLeft = false;
	} else if (keyCode==39) { //right arrow
		isRight = false;
	}
}

// ------------------------------
// Game character render function
// ------------------------------

function drawGameChar()
{
    if(isLeft && isFalling)
    {
        drawJumpingLeft();
    }
    else if(isRight && isFalling)
    {
        drawJumpingRight();
    }
    else if(isLeft)
    {
        drawWalkingLeft();
    }
    else if(isRight)
    {
        drawWalkingRight();
    }
    else if(isFalling || isPlummeting)
    {
        drawJumpingFacingForwards();
    }
    else
    {
        drawStandingFrontFacing();
    }
}

// ---------------------------
// Background render functions
// ---------------------------

function checkCanyon(t_canyon)
{
	if (gameChar_world_x>t_canyon.x_pos && gameChar_world_x<t_canyon.x_pos+t_canyon.width && gameChar_y>=floorPos_y) { //when character jumps, gameChar_y decreases -> when gameChar_y=>floorPos_y ie. character is above ground, programme will not run this if-loop
		isPlummeting = true;
	}
}

function checkFlagpole()
{
	if (!gameOver && dist(gameChar_world_x, 0, flagpole.x_pos, 0) < 20)
	{
		flagpole.isReached = true;
		flagSound.play();
	}
}

function checkCollectable(t_collectable)
{
	var c1 = t_collectable.x_pos+t_collectable.size>=gameChar_world_x+5 && t_collectable.x_pos-t_collectable.size/2<=gameChar_world_x+5
	var c2 = t_collectable.y_pos+t_collectable.size/2>=gameChar_y-70 && t_collectable.y_pos-t_collectable.size/2<=gameChar_y

	if(c1 && c2)
	{
		if(t_collectable.c_type=='heart')
		{
			if(lives<maxLives) lives++; //gain 1 life, up to maxLives
			else return;
		}
		else game_score++;
		t_collectable.isFound = true;
		collectableSound.play();
	}
}

function checkPlayerDie()
{
	if (lives!=0 && gameChar_y > height) //character has fallen below the bottom of the canvas
	{
		lives--;
		deathSound.play();
		if (lives > 0) startGame();
	}
}

function createPlatform(x, y, length)
{
    var p =
    {
        x:x,
        y:y,
        length:length,
        draw: function()
        {
            fill(27,106,170);
            rect(this.x,this.y,this.length,20);
        },
        checkContact: function(gc_x,gc_y)
        {
            if (gc_x>this.x && gc_x<this.x+this.length) //check x-axis
            {
                var d = this.y - gc_y; //check y-axis
                if(d>=0 && d<4) 
                {
                    return true;
                }
            }
            return false;
        }
    }
    return p;
}

function drawPlatforms()
{
    for(i in platforms)
    {
        var platform = platforms[i];
        platform.draw();
    }
}