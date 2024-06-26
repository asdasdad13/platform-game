function drawJumpingLeft()
{
	//head
	fill(164,140,114);
	ellipse(gameChar_x,gameChar_y-60-10,20);
	//legs
	stroke(29,29,29);
	strokeWeight(5);
	//left
	line(gameChar_x-6,gameChar_y-20-10,gameChar_x-15,gameChar_y-17-10);
	line(gameChar_x-15,gameChar_y-17-10,gameChar_x-20,gameChar_y-10-10);
	//right
	line(gameChar_x+5,gameChar_y-20-10,gameChar_x+11,gameChar_y-10-10);
	line(gameChar_x+11,gameChar_y-10-10,gameChar_x+20,gameChar_y-15-10);
	//body
	noStroke();
	fill(71,100,155);
	rect(gameChar_x-8,gameChar_y-50-10,16,30);
}
function drawJumpingRight()
{
	//head
	fill(164,140,114);
	ellipse(gameChar_x,gameChar_y-60-5,20);
	//legs
	stroke(29,29,29);
	strokeWeight(5);
	//left
	line(gameChar_x-6,gameChar_y-20-5,gameChar_x-11,gameChar_y-10-5);
	line(gameChar_x-11,gameChar_y-10-5,gameChar_x-20,gameChar_y-15-5);
	//right
	line(gameChar_x+5,gameChar_y-20-5,gameChar_x+15,gameChar_y-17-5);
	line(gameChar_x+15,gameChar_y-17-5,gameChar_x+20,gameChar_y-10-5);
	//body
	noStroke();
	fill(71,100,155);
	rect(gameChar_x-8,gameChar_y-50-5,16,30);
}
function drawWalkingLeft()
{
	//head
	fill(164,140,114);
	ellipse(gameChar_x,gameChar_y-60,20);
	//legs
	stroke(29,29,29);
	strokeWeight(5);
	//left
	line(gameChar_x-6,gameChar_y-20,gameChar_x-10,gameChar_y);
	//right
	line(gameChar_x+5,gameChar_y-20,gameChar_x+5,gameChar_y-10);
	line(gameChar_x+5,gameChar_y-10,gameChar_x+10,gameChar_y);
	//body
	noStroke();
	fill(71,100,155);
	rect(gameChar_x-8,gameChar_y-50,16,30);
}
function drawWalkingRight()
{
	//head
	fill(164,140,114);
	ellipse(gameChar_x,gameChar_y-60,20);
	//legs
	stroke(29,29,29);
	strokeWeight(5);
	//left
	line(gameChar_x-6,gameChar_y-20,gameChar_x-6,gameChar_y-10);
	line(gameChar_x-6,gameChar_y-10,gameChar_x-10,gameChar_y);
	//right
	line(gameChar_x+5,gameChar_y-20,gameChar_x+10,gameChar_y);
	//body
	noStroke();
	fill(71,100,155);
	rect(gameChar_x-8,gameChar_y-50,16,30);
}
function drawJumpingFacingForwards()
{
	//head
	fill(164,140,114);
	ellipse(gameChar_x,gameChar_y-60,20);
	//legs
    stroke(29,29,29);
	strokeWeight(5);
	line(gameChar_x-6,gameChar_y-20,gameChar_x-6,gameChar_y); //left
	line(gameChar_x+5,gameChar_y-20,gameChar_x+5,gameChar_y); //right
	//body
	noStroke();
	fill(71,100,155);
	rect(gameChar_x-8,gameChar_y-50,16,30);
}
function drawStandingFrontFacing()
{
	//head
	fill(164,140,114);
	ellipse(gameChar_x,gameChar_y-60,20);
	//legs
    stroke(29,29,29);
	strokeWeight(5);
	line(gameChar_x-6,gameChar_y-20,gameChar_x-6,gameChar_y); //left
	line(gameChar_x+5,gameChar_y-20,gameChar_x+5,gameChar_y); //right
	//body
	noStroke();
	fill(71,100,155);
	rect(gameChar_x-8,gameChar_y-50,16,30);
}