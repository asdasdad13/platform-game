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
	var y = 20 //middle of heart
	var w = 10 //standard width of half of heart
	for (var i=0;i<maxLives;i++)
	{
		var x = width-i*50-30;
		var pt1L = {x: x-w, y: y-w};
		var pt2L = {x: x-2*w, y: y};
		var pt3 = {x: x, y: y+2.5*w};
		var pt4 = {x: x, y: y};
		var pt1R = {x: x+w, y: y-w};
		var pt2R = {x: x+2*w, y: y};
		noStroke();
		//white outline
		fill(255);
		quad(pt1L.x,pt1L.y-3,pt2L.x-3,pt2L.y,pt3.x,pt3.y+3,pt4.x,pt4.y-3);
		quad(pt1R.x,pt1R.y-3,pt2R.x+3,pt2R.y,pt3.x,pt3.y+3,pt4.x,pt4.y-3);
		if(i+1<=lives){
			fill(160,33,61); //red heart
		}
		else
		{
			fill(0); //black heart
		}
		quad(pt1L.x,pt1L.y,pt2L.x,pt2L.y,pt3.x,pt3.y,pt4.x,pt4.y);
		quad(pt1R.x,pt1R.y,pt2R.x,pt2R.y,pt3.x,pt3.y,pt4.x,pt4.y);
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
			case 'canyon':
				this.textStr = "Be careful not to fall into canyons! You will lose a heart\nevery time you fall into one. You may restart the current\nstage if you still have hearts remaining, but when the\nnumber of hearts reaches 0, you will fail the entire level. \n\nJump over the canyon to proceed."
				break;
			case 'heart':
				this.textStr = 'Pick up hearts to gain lives.\nYou can pick them up only\nwhen your health isn\'t full.'
				break;
        }
	}

	fadeOut()
	{
		if(this.boxAlpha!=0) //fade out
		{
			this.boxAlpha--;
			this.textAlpha-=5;
		}
	}

	render() //if box position is within current view, render, if not, fade invisible
	{
		if(this.boxPos.x+scrollPos>width) return; //don't render if out of view
		if(this.boxPos.x+scrollPos<0.05*width) this.fadeOut(); //fade out if box is beyond left edge of screen
		else if(this.boxAlpha!=100) //fade in
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
}