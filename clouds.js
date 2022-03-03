function drawClouds()
{
	if(!cheatMode) fill(200,207,211);
	else fill(104,102,126);

	for (i in clouds)
	{
		var c = clouds[i];
		var cl = c.left;
		var cm = c.mid;
		var cr = c.right;
		ellipse(cl.x_pos,cl.y_pos,cl.w,cl.h);
		ellipse(cm.x_pos,cm.y_pos,cm.w,cm.h);
		ellipse(cr.x_pos,cr.y_pos,cr.w,cr.h);
	}
}

function initClouds()
{
	for (i=0;i<10;i++)
	{
		var x = random(0,width-10);
		var y = random(0,height/3);
		var h = random(30,60);
		clouds.push(
			{
				speed: random(0.1,0.3),
				left: {x_pos: x-30, y_pos: y, w: random(40,70), h: random(h*0.5,h)}, 
				mid: {x_pos: x, y_pos: y-10, w: random(40,70), h: h},
				right: {x_pos: x+30, y_pos: y, w: random(40,70), h: random(h*0.5,h)}
			}
		)
	}
}

function animateClouds()
{
	for (i in clouds)
	{
		var c = clouds[i];
		c.left.x_pos+=c.speed;
		c.mid.x_pos+=c.speed;
		c.right.x_pos+=c.speed;

		if(c.mid.x_pos > width+100)
		{
			newX = random(-50,-70);
			c.left.x_pos = newX-30;
			c.mid.x_pos = newX;
			c.right.x_pos = newX+30;
		}
	}
}