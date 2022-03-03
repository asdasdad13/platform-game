/*
Sound credits:
    - a#2 by angstrom
    - Spring Birds Loop with Low-Cut (New Jersey) by hargissssound
    - Malletlayer by tarane468
    - Wobble 19 by nomiqbomi

Extensions:
	- added some vanity effects such as game over screen fading to black
Bits I found difficult:
 - I spent a lot of time re-writing the logic for changes to the value of scrollPos in order to make the side-scrolling pause whenever the character reaches the edge of the level area. I tried adding more conditions, but the final solution was simply to switch the case conditions.
 - can't play birdSound no matter how short i cut it
 For example, the initial conditions only checked if the character was on the left or right side of the screen, and attempting to add on conditions to check if character had reached certain part of map made character stop moving at the wrong threshold.

			fill(44,35,73,150);
			use csp colour picker, then manually add if-else cases for nighttime colours.



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

var game_score;
var flagpole;
var lives;
var gameOver;
var cheatMode;
var fadeInBlackAlpha;
var fadeInRedAlpha;

// var jumpSound;
// var collectableSound;
// var deathSound;
// var flagSound;
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
	lives = 3;
	startGame();
}

function initStars()
{
	for(var i=0;i<30;i++)
	{
		stars.push(
			{
				x_pos: random(i,width),
				y_pos: random(0,height/3)
			}
		)
	}
}

function initTrees()
{
    var trees_x = [-200,-500,-340,-100,50,240,400,640,810,940,1030,1200,1500,1760]; //anchor for x-coord of trees
	var trunk = 
	{		
		w: 20, //width
		h: 45 //height
	};
	var trees_y = floorPos_y-trunk.h;

	for (i in trees_x)
	{
		trees.push
		(
			{
				x: trees_x[i], y: trees_y, trunk: trunk
			}
		);
	}
}

function initCanyons()
{
    var canyons_x = [300, 700, 850, -330, -450, -100, 1500]; //anchor x coords of canyons
	for (i in canyons_x) {
		canyons.push({x_pos: canyons_x[i],width: 70})
	}
}


function initCollectables()
{
	collectables = [];
    var collectables_x = [210, 745, 820, -550, 1100, 1600]; //anchor x coords of collectables
	var collectables_y = [floorPos_y-25, floorPos_y-90, floorPos_y-25, floorPos_y-25, floorPos_y-25, floorPos_y-25];
	for (i in collectables_x)
	{
		collectables.push(
			collectable = {x_pos: collectables_x[i], y_pos: collectables_y[i], size: 30, line_points_y: [collectables_y[i]-10,collectables_y[i]+10], isFound: false}
		)
	}
}

function initMountains()
{
    var mountains_x = [140, 680, 1200,-900]; //anchor x coords of mountains

	for (i in mountains_x)
	{
		var x = mountains_x[i];
		var mountains_size = 250;
		mountains.push
		(
			{
				bigMount: {pos_x1: x, pos_y1: floorPos_y, pos_x2: x+285, pos_y2: floorPos_y,pos_x3: (x*2+285)/2, pos_y3: floorPos_y-mountains_size*1.55},
				smallMount: {pos_x1: x+140, pos_y1: floorPos_y, pos_x2: x+350, pos_y2: floorPos_y,pos_x3: (x*2+140+350)/2, pos_y3: floorPos_y-mountains_size},
				snowPeak: {pos_x1:  x+92, pos_y1: floorPos_y-mountains_size, pos_x2: x+92+101, pos_y2: floorPos_y-mountains_size,pos_x3: ((x+92)*2+101)/2, pos_y3: floorPos_y-mountains_size*1.55}
			}
		);
	}
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

	initStars();
    initTrees();
    initClouds();
    initCanyons();
    initMountains();

	//init the game
	gameChar_x = 120;
	gameChar_y = floorPos_y;

	// Variable to control the background scrolling.
	scrollPos = 0;
	game_score = 0;
	flagpole = {isReached: false, x_pos: 1700};

	// Variable to store the real position of the gameChar in the game
	// world. Needed for collision detection.
	gameChar_world_x = gameChar_x - scrollPos;

	// Boolean variables to control the movement of the game character.
	isLeft = false;
	isRight = false;
	isFalling = false;
	isPlummeting = false;
    initCollectables();
    platforms = [];
    platforms.push(createPlatform(400,floorPos_y-80,200));
    platforms.push(createPlatform(500,floorPos_y-200,100));
    platforms.push(createPlatform(650,floorPos_y-180,100));
    platforms.push(createPlatform(650,floorPos_y-120,100));
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
	animateClouds();
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

	for (i in collectables) {
		if (!collectables[i].isFound) {
			drawCollectable(collectables[i]);
			checkCollectable(collectables[i]);
		}
	}

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
		}
		else if(gameChar_world_x>17) //if character has NOT reached left threshold, char updates
		{
			gameChar_x -= 5;
		}
	}
	if(isRight)
	{
		if(gameChar_x > width * 0.7 && gameChar_world_x-10<1800)
		{
			scrollPos -= 5
		}
		else if(gameChar_world_x<2100)
		{
			gameChar_x  += 5;; // negative for moving against the background
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
		if(keyCode==71) //letter G to activate cheat mode
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
		t_collectable.isFound = true;
		game_score++;
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

function drawGameScore()
{
	textSize(24);
	textAlign(LEFT);
	textStyle(NORMAL);
	fill(255);
	noStroke();
	text('Score: ' + game_score, 20, 30);
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

function drawGameOver()
{
	push();
	stroke(255);
	textSize(72);
	textAlign(CENTER); //center align text
	textStyle(BOLD); //make text even more visible by boldening
	fill(160,33,61);
	if(fadeInBlackAlpha<80) fadeInBlackAlpha++;
	if(fadeInRedAlpha<255) fadeInRedAlpha++;
	noStroke();
	fill(0,0,0,fadeInBlackAlpha);
	rect(0,0,width,height);

	fill(255,0,0,fadeInRedAlpha);
	if (lives==0)
	{
		text('Game over.',width/2,height/2);
		textSize(24);
		text('Press Space to restart level.',width/2,height/2+60);
		pop();
		return;
	}
	if (flagpole.isReached==true)
	{
		text("Level complete!",width/2,height/2);
		textSize(24);
		text('Press space to continue.',width/2,height/2+60);
		pop();
		return;
	}
}