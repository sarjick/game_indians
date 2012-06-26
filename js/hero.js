Hero = function(params){
	var o = this;
	
	o.movingInterval;
	o.shotPosition = 0;
	o.canShot = false;
	o.movingStep = 4;
	o.parent = params.parent;
	o.counter = params.counter;
	o.startPos = new Array(50, 80, 120, 150);
	o.currentTop = o.startPos[Math.floor(Math.random()*o.startPos.length)];

	if($("div." + params.name).size() > 0){
		o.block = $("div." + params.name);
	}
	else{
		o.block = $('<div class="hero" style="top:' + o.currentTop + 'px"><div class="heroHead"></div><div class="handLeft"></div><div class="handRight"></div><div class="heroLags"></div></div>');
	}
	o.animationLags = new Animation({
		"block" : o.block.find(".heroLags"),
		"start" : 1,
		"end" : 12,
		"step" : 65
	});
	o.animationHeadTo = new Animation({
		"block" : o.block.find(".heroHead"),
		"start" : 8,
		"end" : 19,
		"step" : 93,
		"once": true
	});
	o.animationHeadShot = new Animation({
		"block" : o.block.find(".heroHead"),
		"start" : 4,
		"end" : 9,
		"step" : 93,
		"once": true
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
	
	o.name = params.name;

	o.block.addClass(params.name);
	o.block.appendTo(o.parent.block);

	o.block.bind("shotdone", function(){
		o.canShot = false;
		o.animationHeadTo.start();

		if(typeof(o.shotDoneFunc) == "function"){
			o.shotDoneFunc();
		}
	});

	o.block.bind("gotshot", function(e){
		o.plusPoint();
		o.animationHeadShot.start();
	});
}
Hero.prototype.stop = function(){
	var o = this;

	clearInterval(o.movingInterval);
	o.arrow.block.remove();
	o.block.remove();
	clearInterval(o.arrow.idInterval);
}
Hero.prototype.plusPoint = function(){
	var o = this;

	o.counter.text(parseInt(o.counter.text()) + 1);
}
Hero.prototype.setHeroScale = function(){
	var o = this;
	
	var top = parseInt(o.block.css("top"));
	var scaleNum = o.minScale + top/(o.bot - o.top)*(o.maxScale - o.minScale);
	var deltaX = o.xSign + (o.deltaScaleX - o.deltaScaleX*top/(o.bot - o.top));	
	
	o.block.css("margin-left", parseInt(deltaX) + "px");

	o.scaleX = o.xSign + scaleNum;
	o.scaleY = scaleNum;
	
	if(scaleNum > 1){
		scaleNum = 1;	
	}
	setTransform({
		"block" : o.block,
		"scaleX" : o.scaleX,
		"scaleY" : o.scaleY
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
			top = top + o.movingStep;
			o.block.css("top", top + "px");
		}
		else if(top > y + o.movingStep){
			top = top - o.movingStep;
			o.block.css("top", top + "px");
		}
		else{
			top = y; 
			clearInterval(o.movingInterval);
			o.animationLags.stop();
		}

		o.currentTop = top;
		
		o.setHeroScale();

		if(o.canShot){
			if(((o.currentTop > o.shotPosition - 2) && (o.currentTop < o.shotPosition + 2)) || (o.currentTop == y)){
				o.arrow = new Arrow({
					"y" :top,
					"who" : o.name,
					"timeout" : 100
				});
				o.block.trigger("shotdone");				
			}
		}
		
	}, Indians.FRAME_RATE);
}
Hero.prototype.shot = function(params){
	var o = this;

	o.shotPosition = params.y;
	o.canShot = true;

	if(typeof(params.shotDoneFunc) == "function"){
		o.shotDoneFunc = params.shotDoneFunc;
	}
}