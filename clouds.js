function drawClouds()
{
	fill(236,236,236);
	for (i in clouds) {
		var cl = clouds[i].left;
		var cm = clouds[i].mid;
		var cr = clouds[i].right;
		ellipse(cl.pos_x,cl.pos_y,cl.r1,cl.r2);
		ellipse(cm.pos_x,cm.pos_y,cm.r1,cm.r2);
		ellipse(cr.pos_x,cr.pos_y,cr.r1,cr.r2);
	}
}

function initClouds()
{
	for (i=0;i<10;i++)
	{
		var x = random(0,width-10);
		var y = random(0,height/3);
		clouds.push(
			{
				speed: random(0.5,1.5),
				left: {pos_x: x, pos_y: y, r1: 100, r2: 70}, 
				mid: {pos_x: x+50, pos_y: y+10 ,r1: 80, r2: 50},
				right: {pos_x: x-50, pos_y: y+10, r1: 60, r2: 50}
				//make the cloud shape more randomised
			}
		)
	}
}

function animateClouds()
{
	for (i in clouds)
	{
		var c = clouds[i];
		
	}
}