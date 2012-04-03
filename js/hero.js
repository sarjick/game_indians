Hero = function(params){
	var o = this;
	
	o.movingInterval;
	o.movingStep = 4;
	o.parent = params.parent;
	o.startPos = new Array(50, 80, 120, 150);
	o.block = $('<div class="hero" style="top:' + o.startPos[Math.floor(Math.random()*o.startPos.length)] + 'px"><div class="heroHead"></div><div class="handLeft"></div><div class="handRight"></div><div class="heroLags"></div></div>');
	o.animationLags = new Animation({
		"block" : o.block.find(".heroLags"),
		"start" : 1,
		"end" : 12,
		"step" : 65
	});
	
	o.xSign = "+";
	o.top = 50;
	o.bot = o.parent.block.height() - 70;
	o.minScale = 0.7;
	o.maxScale = 1;
	o.deltaScaleX = 50;
	
	o.init(params);	
}
Hero.prototype.init = function(params){
	var o = this;
	
	o.block.addClass(params.name);
	o.block.appendTo(o.parent.block);
}
Hero.prototype.setHeroScale = function(){
	var o = this;
	
	var top = parseInt(o.block.css("top"));
	var scaleNum = o.minScale + top/(o.bot - o.top)*(o.maxScale - o.minScale);
	var deltaX = o.xSign + (o.deltaScaleX - o.deltaScaleX*top/(o.bot - o.top));	
	
	o.block.css("margin-left", parseInt(deltaX) + "px");
	
	if(scaleNum > 1){
		scaleNum = 1;	
	}
	setTransform({
		"block" : o.block,
		"scaleX" : o.xSign + scaleNum,
		"scaleY" : scaleNum
	});
}
Hero.prototype.moveHeroToPoint = function(params){
	var o = this;
	
	var y = params.y;
	if(y < o.top){
		y = o.top;	
	}
	else if(y > o.bot){
		y = o.bot;
	}
	
	clearInterval(o.movingInterval);
	o.animationLags.start();
	o.movingInterval = setInterval(function(){
		var top = parseInt(o.block.css("top"));
		if(top < y - o.movingStep){
			o.block.css("top", top + o.movingStep + "px");
		}
		else if(top > y + o.movingStep){
			o.block.css("top", top - o.movingStep + "px");
		}
		else{
			top = y; 
			clearInterval(o.movingInterval);
			o.animationLags.stop();
		}
		
		o.setHeroScale();
		
	}, Indians.FRAME_RATE);
}