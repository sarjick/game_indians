HeroPlayer = function(params){
	var o = this;
	
	o.hero = new Hero(params);
	o.hero.xSign = "-";
	o.hero.setHeroScale();
	o.parent = params.parent;
	
	o.init(params);
}
HeroPlayer.prototype.init = function(params){
	var o = this;
	
	o.parent.block.mouseover(function(){
		$(this).unbind("mousemove");
		$(this).mousemove(function(e){
			o.hero.moveHeroToPoint({
				"y" : e.pageY - o.parent.block.position().top
			});
		});
	});
	o.parent.block.mouseout(function(){
		$(this).unbind("mousemove");
	});
}