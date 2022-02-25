// Function to draw mountains objects.
function drawMountains() {
	for (i=0;i<mountains.length;i++) {
		for (j=0;j<mountains[0].length;j++) {
			if (j==0) {
				fill(56,56,56);	
			} else if (j==1) {
				fill(43,40,35);
			} else {
				fill(190,197,201);
			}
			triangle(mountains[i][j].pos_x1,mountains[i][j].pos_y1,mountains[i][j].pos_x2,mountains[i][j].pos_y2,mountains[i][j].pos_x3,mountains[i][j].pos_y3);
		}
	}
}
// Function to draw trees objects.
function drawTrees() {
	//trunk
	for (var i=0;i<trees_x.length;i++) {
		fill(95,74,47);
		rect(trees_x[i],trees_y,trunk.width,trunk.height);
		//leaves
		fill(54,86,62);
		triangle(trees_x[i]-trunk.width,trees_y,trees_x[i]+trunk.width*2,trees_y,trees_x[i]+0.5*trunk.width,trees_y-trunk.height);
		triangle(trees_x[i]-trunk.width*0.7,trees_y-trunk.height*0.7,trees_x[i]+trunk.width*1.7,trees_y-+trunk.height*0.7,trees_x[i]+0.5*trunk.width,trees_y-trunk.height*1.5);
		noStroke();
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

function drawTrees()
{
    trees_x = [-200,-500,-340,-100,50,240,400,640,810,940,1030,1200,1500,1760]; //anchor for x-coord of trees
	trunk = 
	{		
		width: 20,
		height: 45
	};
	trees_y = floorPos_y-trunk.height;
}

function drawGround()
{
    noStroke();
    fill(54,86,62);
	rect(0, floorPos_y, width, height/4);
}

function drawSky()
{
    background(94,125,151);
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
	for (i=0;i<lives;i++)
	{
		fill(160,33,61);
		rect(width-20*(i+1),10,10,20);
	}
}