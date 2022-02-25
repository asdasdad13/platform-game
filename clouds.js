function drawClouds() {
	fill(236,236,236);
	for (i=0;i<clouds.length;i++) {
		for (j=0;j<clouds[i].length;j++) {
			ellipse(clouds[i][j].pos_x,clouds[i][j].pos_y,clouds[i][j].r1,clouds[i][j].r2);
		}
	}
}

function initClouds()
{
    clouds_x = [150, 450, 800, 1000, -700, 1500,-300]; //anchor x coords of clouds
	clouds_y = [95, 140, 85, 90, 90, 120, 140]; //anchor y coords of clouds
	for (i in clouds_x) {
		clouds.push(
			[
				left = {pos_x: clouds_x[i], pos_y: clouds_y[i], r1: 100, r2: 70}, 
				mid = {pos_x: clouds_x[i]+50, pos_y: clouds_y[i]+10 ,r1: 80, r2: 50},
				right = {pos_x: clouds_x[i]-50, pos_y: clouds_y[i]+10, r1: 60, r2: 50}
			]
		)
	}
}