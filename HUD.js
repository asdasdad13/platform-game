function drawGameScore()
{
	textSize(24);
	textAlign(LEFT);
	textStyle(NORMAL);
	fill(255);
	noStroke();
	text('Score: ' + game_score, 20, 30);
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

class fadingTextBox
{
    constructor(action, x,y,w,h) //action (string), x-pos, y-pos, width, height
    {
        this.boxPos = createVector(x,y);
        this.boxAlpha = 0;
        this.textPos = createVector(x+15,y+25);
        this.textAlpha = 0;
        this.width = w;
        this.height = h;
        this.visible = false;
        
        switch (action)
        {
            case 'walk':
                this.textStr = "Use Left/Right Arrow keys\nto move character about."
                break;
            
            case 'collect':
                this.textStr = 'Walk over coins to pick them up.\nCoins collected will add to your score.'
                break;

            case 'jump':
                this.textStr = "Use Up Arrow key or Space\nto jump."
                break;
        }

        this.fadeOut = function()
        {
            this.visible = false;
            if(this.boxAlpha!=0)
            {
                this.boxAlpha--;
                this.textAlpha-=5;
            }
        }

        this.render = function()
        {
            if(this.boxAlpha!=100)
            {
                this.boxAlpha++;
                this.textAlpha+=5;
            }

            fill(0,0,0,this.boxAlpha);
            rect(this.boxPos.x,this.boxPos.y,this.width,this.height,10);
            fill(255,255,255,this.textAlpha);
            textSize(16);
            text(this.textStr, this.textPos.x,this.textPos.y);
        }
        
        this.checkBoxInView = function() //if box position is within current view, render, if not, fade invisible
        {
            if(this.boxPos.x+scrollPos*0.04>=this.boxPos.x) this.visible = true;
            this.render();
            if(!this.visible) this.fadeOut();
        }
    }
}