/*
Sound credits:
    - a#2 by angstrom
    - Spring Birds Loop with Low-Cut (New Jersey) by hargissssound
    - Malletlayer by tarane468
    - Wobble 19 by nomiqbomi
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
var trees_x;
var trees_y;
var clouds_x;
var clouds_y;
var canyons;
var canyons_x;
var collectables;
var collectables_x;
var collectables_y;
var mountains;
var mountains_x;
var mountains_y;

var game_score;
var flagpole;
var lives;
var gameOver;

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
    birdSound.setVolume(0.1);
}

function setup()
{
	gameOver=false;
	createCanvas(1024, 576);
	floorPos_y = height * 3/4;
	lives = 3;

	trees = [];
    clouds = [];
    canyons = [];
    collectables = [];
    mountains = [];

    initTrees();
    initClouds();
    initCanyons();
    initCollectables();
    initMountains();

	startGame();
}

function initTrees()
{
    trees_x = [-200,-500,-340,-100,50,240,400,640,810,940,1030,1200,1500,1760]; //anchor for x-coord of trees
	trunk = 
	{		
		width: 20,
		height: 45
	};
	trees_y = floorPos_y-trunk.height;
}

function initCanyons()
{
    canyons_x = [300, 700, 850, -330, -450, -100, 1500]; //anchor x coords of canyons
	for (i in canyons_x) {
		canyons.push({x_pos: canyons_x[i],width: 70})
	}
}


function initCollectables()
{
    collectables_x = [210, 745, 820, -550, 1100, 1600]; //anchor x coords of collectables
	collectables_y = [floorPos_y-25, floorPos_y-90, floorPos_y-25, floorPos_y-25, floorPos_y-25, floorPos_y-25];
	for (i in collectables_x) {
		collectables.push(
			collectable = {x_pos: collectables_x[i], y_pos: collectables_y[i], size: 50, line_points_y: [collectables_y[i]-10,collectables_y[i]+10], isFound: false}
		)}
}

function initMountains()
{
    mountains_x = [140, 680, 1200,-900]; //anchor x coords of mountains
	mountains_y = floorPos_y; //anchor y coords of mountains, same for all

	for (i in mountains_x) {
		var mountains_size = 250;
		mountains.push(
			[
				bigMount = {pos_x1: mountains_x[i], pos_y1: mountains_y, pos_x2: mountains_x[i]+285, pos_y2: mountains_y,pos_x3: (mountains_x[i]*2+285)/2, pos_y3: mountains_y-mountains_size*1.55},
				smallMount = {pos_x1: mountains_x[i]+140, pos_y1: mountains_y, pos_x2: mountains_x[i]+350, pos_y2: mountains_y,pos_x3: (mountains_x[i]*2+140+350)/2, pos_y3: mountains_y-mountains_size},
				snowPeak = {pos_x1:  mountains_x[i]+92, pos_y1: mountains_y-mountains_size, pos_x2: mountains_x[i]+92+101, pos_y2: mountains_y-mountains_size,pos_x3: ((mountains_x[i]+92)*2+101)/2, pos_y3: mountains_y-mountains_size*1.55}
			]
		)
	}
}

function startGame()
{
	//init the game
	gameChar_x = width/2;
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
    platforms = [];
    platforms.push(createPlatform(400,floorPos_y-100,100));
    platforms.push(createPlatform(600,floorPos_y-200,100));
}

function draw()
{
	noStroke();

    drawSky();
    drawGround();
	push();
	translate(scrollPos, 0);	

	drawTrees();
	drawClouds();
	drawMountains();
	checkPlayerDie();
    drawFlagpole();
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
	if(lives==0 || flagpole.isReached) //game won or lost
	{
		if(!gameOver)
		{
			flagSound.play();
			gameOver = true;
		}
		drawGameOver();
	}

	// Logic to make the game character move or the background scroll.
	if(isLeft)
	{
		if(gameChar_x > width * 0.2)
		{
			gameChar_x -= 5;
		}
		else
		{
			scrollPos += 5;
		}
	}

	if(isRight)
	{
		if(gameChar_x < width * 0.8)
		{
			gameChar_x  += 5;
		}
		else
		{
			scrollPos -= 5; // negative for moving against the background
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
	if (isPlummeting) {
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
	if (keyCode==37) //left arrow
	{
		isLeft = true;
	}
	else if (keyCode==39) //right arrow
	{
		isRight = true;
	}
	else if ((keyCode==38 || keyCode==32) && gameChar_y==floorPos_y) //space
	{
		if(!isFalling)
		{
			jumpSound.play();
			gameChar_y-=100;
		}
	}

	else if (keyCode==81) //letter Q to reset all
	{
		setup();
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
	if (dist(gameChar_world_x,gameChar_y,t_collectable.x_pos,t_collectable.y_pos) <= t_collectable.size) { //character is touching collectable coin
		t_collectable.isFound = true;
		game_score += 1;
		collectableSound.play();
	}
}

function checkPlayerDie()
{
	if (lives!=0 && gameChar_y > height) //character has fallen below the bottom of the canvas
	{
		lives--;
		deathSound.play();
		if (lives > 0) //stage restarts automatically
		{
			initCollectables();
			startGame();
		}
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
            fill(255,0,255);
            rect(this.x,this.y,this.length,20);
        },
        checkContact: function(gc_x,gc_y)
        {
            if (gc_x>this.x && gc_x<this.x+this.length) //check x-axis
            {
                var d = this.y - gc_y; //check y-axis
                if(d>=0 && d<5) 
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
	textSize(36);
	textAlign(CENTER); //center align text
	textStyle(BOLD); //make text even more visible by boldening
	fill(160,33,61);
	if (lives==0)
	{
		text('Game over. Press space to continue.',width/2,height/2);
		pop();
		return;
	}
	if (flagpole.isReached==true)
	{
		text("Level complete. Press space to continue.",width/2,height/2);
		pop();
		return;
	}
}