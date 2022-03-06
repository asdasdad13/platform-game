function initClouds()
{
	for(i=0;i<10;i++)[
		clouds.push(new Cloud)
	]
}

function drawClouds()
{
    for (i in clouds)
    {
        clouds[i].drawCloud();
    }
}

class Cloud
{
    constructor()
    {
        var pos = createVector(random(0, width - 10), random(0, height / 3));
        var h = random(30, 60);

        this.speed = random(0.1, 0.3),
        this.left =
        {
            pos: createVector(pos.x - 30, pos.y),
            w: random(40, 70),
            h: random(h * 0.5, h)
        };
        this.mid =
        {
            pos: pos,
            w: random(40, 70),
            h: h
        };
        this.right =
        {
            pos: createVector(pos.x + 30, pos.y),
            w: random(40, 70),
            h: random(h * 0.5, h)
        };

        this.drawCloud = function()
        {
            if (!cheatMode)
                fill(200, 207, 211);
            else
                fill(104, 102, 126);

            ellipse(this.left.pos.x, this.left.pos.y, this.left.w, this.left.h);
            ellipse(this.mid.pos.x, this.mid.pos.y, this.mid.w, this.mid.h);
            ellipse(this.right.pos.x, this.right.pos.y, this.right.w, this.right.h);

            //update x for animation
            this.left.pos.x += this.speed;
            this.mid.pos.x += this.speed;
            this.right.pos.x += this.speed;

            if (this.left.pos.x+this.left.w/2 > width + 100) {
                var newX = random(-50, -70);

                this.left.pos.x = newX - 30;
                this.mid.pos.x = newX;
                this.right.pos.x = newX + 30;
            }
        };
    }
}