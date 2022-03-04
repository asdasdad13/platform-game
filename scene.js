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

function drawLifeTokens() //draw life tokens
{
	for (var i=0;i<3;i++)
	{
		var pt1L = {x: width-50*(i+0.5), y: 10};
		var pt2L = {x: width-50*(i+0.3), y: 20};
		var pt3 = {x: width-50*(i+0.7), y: 20};
		var pt4 = {x: width-50*(i+0.7), y: 45};
		var pt1R = {x: width-50*(i+0.9), y: 10};
		var pt2R = {x: width-50*(i+1.1), y: 20};

		noStroke();
		//white outline
		fill(255);
		quad(pt1L.x,pt1L.y-3,pt2L.x+3,pt2L.y,pt4.x,pt4.y+3,pt3.x,pt3.y-3);
		quad(pt1R.x,pt1R.y-3,pt2R.x-3,pt2R.y,pt4.x,pt4.y+4,pt3.x,pt3.y-3);
		if(i+1<=lives){
			fill(160,33,61); //red heart
		}
		else
		{
			fill(0); //black heart
		}
		quad(pt1L.x,pt1L.y,pt2L.x,pt2L.y,pt4.x,pt4.y,pt3.x,pt3.y);
		quad(pt1R.x,pt1R.y,pt2R.x,pt2R.y,pt4.x,pt4.y,pt3.x,pt3.y);
	}
}

function drawDirectionalSign()
{
	fill(160,33,61);
	rect(170,floorPos_y-47,20,5); //form an arrow shape
	triangle(190,floorPos_y-51,190,floorPos_y-37,200,floorPos_y-44);
}

function drawBonfire()
{
	fill(95,74,47);
	rect(140,floorPos_y-30,30,5);
}