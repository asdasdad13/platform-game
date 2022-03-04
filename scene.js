////INITIALISATION OF BACKGROUND OBJECTS
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
    var canyons_x = [900]; //anchor x coords of canyons
	for (i in canyons_x) {
		canyons.push({x_pos: canyons_x[i],width: 70})
	}
}

function initCollectables()
{
	//some standard values for y-pos of collectables
	onFloorY = floorPos_y-25; //collectables on the floor
	abovePlatform = 100; //jump while on platform to get
    var collectables_x =
	[
		400,500,600,875,875
	];
	var collectables_y =
	[
		onFloorY, onFloorY, onFloorY, floorPos_y-100, floorPos_y-100-abovePlatform
	];
	for (i in collectables_x)
	{
		collectables.push(
			collectable = {x_pos: collectables_x[i], y_pos: collectables_y[i], size: 30, line_points_y: [collectables_y[i]-10,collectables_y[i]+10], isFound: false}
		)
	}
}

function initPlatforms()
{
	var platforms_x =
	[
		800,990,1180
	]
	var platforms_y =
	[
		floorPos_y-80, floorPos_y-135, floorPos_y-80
	]
	var platforms_w =
	[
		150,150,150
	]
	for(i in platforms_x)
	{
		platforms.push(createPlatform(platforms_x[i],platforms_y[i],150))
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

function initBonfire()
{

}


// Function to draw mountains objects.
function drawMountains() {
	for (i in mountains)
	{
		var m = mountains[i];

		if(!cheatMode) fill(56,56,56); //daytime colours
		else fill(49,44,66);			//nighttime colours
		triangle(m.bigMount.pos_x1,m.bigMount.pos_y1,m.bigMount.pos_x2,m.bigMount.pos_y2,m.bigMount.pos_x3,m.bigMount.pos_y3);
		if(!cheatMode) fill(43,40,35); //daytime colours
		else fill(44,37,57);			//nighttime colours
		triangle(m.smallMount.pos_x1,m.smallMount.pos_y1,m.smallMount.pos_x2,m.smallMount.pos_y2,m.smallMount.pos_x3,m.smallMount.pos_y3);
		if(!cheatMode) fill(190,197,201);
		else fill(104,102,126);
		triangle(m.snowPeak.pos_x1,m.snowPeak.pos_y1,m.snowPeak.pos_x2,m.snowPeak.pos_y2,m.snowPeak.pos_x3,m.snowPeak.pos_y3);
	}
}

// Function to draw trees objects.
function drawTrees() {
	//trunk
	for (i in trees) {
		var t = trees[i];

		if(!cheatMode) fill(95,74,47); //daytime colours
		else fill(65,51,62);
		rect(t.x,t.y,t.trunk.w,t.trunk.h); //nighttime colours
		//leaves
		if(!cheatMode) fill(54,86,62); //daytime colurs
		else fill(48,56,69);			//nighttime colours
		triangle(t.x-t.trunk.w,t.y,t.x+t.trunk.w*2,t.y,t.x+0.5*t.trunk.w,t.y-t.trunk.h);
		triangle(t.x-t.trunk.w*0.7,t.y-t.trunk.h*0.7,t.x+t.trunk.w*1.7,t.y-+t.trunk.h*0.7,t.x+0.5*t.trunk.w,t.y-t.trunk.h*1.5);
	}
}

function drawCanyon(t_canyon)
{
	fill(72,29,39);
	rect(t_canyon.x_pos,floorPos_y,t_canyon.width*1.2,floorPos_y);
	fill(132,87,94);
	//narrower rect
	rect(t_canyon.x_pos+t_canyon.width*.1,floorPos_y,t_canyon.width,floorPos_y);
}

function drawGround()
{
	if(!cheatMode) fill(54,86,62);
	else fill(48,56,69);
	rect(0, floorPos_y, width, height/4);
}

function drawSky()
{
	if(cheatMode) background(43,38,74);  //changes to night sky
	else background(94,125,151); 		 //default day
}

function drawStars() //only visible at night/cheat mode
{
	fill(255);
	if(cheatMode)
	{
		for(i in stars)
		{
			var s = stars[i];
			ellipse(s.x_pos,s.y_pos,2)
		}
	}
}

function drawMoon() //only visible at night/cheat mode
{
	if(cheatMode)
	{
		fill(200,200,200);
		ellipse(width*0.7,height*0.1,90);
	}
}

function drawFlagpole() {
	push();
	strokeWeight(5);
	stroke(255);
	line(flagpole.x_pos, floorPos_y, flagpole.x_pos, floorPos_y-250);
	fill(160,33,61);
	noStroke();

	if (flagpole.isReached) {
		rect(flagpole.x_pos, floorPos_y-250,50,50);
		fill(164,140,114);
		ellipse(flagpole.x_pos+25,floorPos_y-230,25);
		fill(71,100,155);
		rect(flagpole.x_pos+15,floorPos_y-217,20,15);
	}
	else {
		rect (flagpole.x_pos, floorPos_y-50,50,50);
	}

	pop(); //cancels strokeWeight at the end of the function
}

function drawCollectable(t_collectable) {
	if (t_collectable.isFound == false) {
		fill(211,166,99);
		ellipse(t_collectable.x_pos,t_collectable.y_pos,t_collectable.size);
		//star pattern on coin
		stroke(177,135,73);
		strokeWeight(2);
		line(t_collectable.x_pos,t_collectable.line_points_y[0],t_collectable.x_pos,t_collectable.line_points_y[1]);
		noStroke();
	}
}



class directionalSign
{
	constructor()
	{
		this.r = {pos: createVector(170,floorPos_y-47)} //rectangle coords
		this.t = //triangle coords
		{
			pos1: createVector(220,floorPos_y-57),
			pos2: createVector(220,floorPos_y-27),
			pos3: createVector(240,floorPos_y-42)
		}

		var movingRight = true;

		this.drawSign = function()
		{
			fill(160,33,61);
			rect(this.r.pos.x,this.r.pos.y,50,10); //form an arrow shape
			triangle(this.t.pos1.x,this.t.pos1.y,this.t.pos2.x,this.t.pos2.y,this.t.pos3.x,this.t.pos3.y);
		}

		this.animateSign = function() //arrow hovers left and right
		{
			this.drawSign();
			if (movingRight)
			{
				this.r.pos.x++;
				this.t.pos1.x++;
				this.t.pos2.x++;
				this.t.pos3.x++;
			}
			else
			{
				this.r.pos.x--;
				this.t.pos1.x--;
				this.t.pos2.x--;
				this.t.pos3.x--;
			}

			if(this.r.pos.x==180 || this.r.pos.x==140) movingRight=!movingRight;
		}
	}
}

function drawBonfire()
{
	fill(95,74,47);
	rect(140,floorPos_y-30,30,5);
}