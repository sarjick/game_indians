HeroPlayer = function(params){
	var o = this;
	
	o.name = Indians.PLAYER_NAME;
	o.hero = new Hero(params);
	o.hero.xSign = "-";
	o.hero.setHeroScale();
	o.parent = params.parent;
	
	o.init(params);
}
HeroPlayer.prototype.init = function(params){
	var o = this;
	
	window.ondevicemotion = function(event) {
	  ay = event.accelerationIncludingGravity.y;
	  
	  if(ay < -0.1){
		o.hero.moveHeroToPoint({
			"y" : o.parent.block.position().top + o.parent.block.height()
		});
	  }
	  else if(ay > 0.1){
		o.hero.moveHeroToPoint({
			"y" : o.parent.block.position().top
		});  
	  }
	}
	
	o.parent.block.bind("touchstart", function(e){
		o.hero.shot({
			"y" : e.pageY - o.parent.block.position().top,
			"who" : o.name
		});
	});
	/*
	o.parent.block.bind("dblclick", function(e){
		o.hero.shot({
			"y" : e.pageY - o.parent.block.position().top,
			"who" : o.name
		});
	});
	*/
}
HeroPlayer.prototype.stop = function(){
	var o = this;

	o.parent.block.unbind("click");
	o.parent.block.unbind("dblclick");
	o.hero.stop();
}