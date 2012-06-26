Arrow = function(params){
	var o = this;

	o.parent = gameIndians.heros[params.who];
	o.y = params.y;
	o.top = 0;
	o.step = 20;
	o.timeout = params.timeout;
	o.block = $('<div class="arrow"></div>');
	setTransform({
		"block" : o.block,
		"scaleX" : Math.abs(o.parent.hero.scaleX),
		"scaleY" : Math.abs(o.parent.hero.scaleY)
	});
	o.idInterval;

	if(o.timeout){
		setTimeout(function(){
			o.init();
		}, o.timeout);
	}
	else{
		o.init();
	}
}
Arrow.prototype.init = function(){
	var o = this;

	o.top = o.y - o.block.height();

	o.block.css("left", o.parent.hero.block.position().left - 20*o.parent.hero.scaleY + "px");
	o.block.css("top", o.top + "px");
	o.block.appendTo(o.parent.parent.block);

	o.move();
}
Arrow.prototype.move = function(){
	var o = this;

	if(o.parent.name == Indians.PLAYER_NAME){
		o.idInterval = setInterval(function(){
			var l = parseInt(o.block.css("left"));
			o.block.css("left", l - o.step + "px");
			if(l < 0){
				clearInterval(o.idInterval);
				o.block.remove();
				o = undefined;
			}
			else if((l > 60 - o.step) && (l < 60 + o.step)){
				var heroOpponent = gameIndians.heros[Indians.COMPUTER_NAME];
				var heroPos = heroOpponent.hero.currentTop;
				if((o.top > heroPos - 15) && (o.top < heroPos + 15)){
					heroOpponent.hero.block.trigger("gotshot", [{"arrow":o}]);
					o.hide();
					clearInterval(o.idInterval);
				}
			}
		}, 20);
	}
	else if(o.parent.name == Indians.COMPUTER_NAME){
		o.block.css("left", "100px");
		o.idInterval = setInterval(function(){			
			var l = parseInt(o.block.css("left"));
			o.block.css("left", l + o.step + "px");
			if(l > gameIndians.block.width()){
				clearInterval(o.idInterval);
				o.block.remove();
				o = undefined;
			}
			else if(l > gameIndians.block.width() - 100){
				var heroOpponent = gameIndians.heros[Indians.PLAYER_NAME];
				var heroPos = heroOpponent.hero.currentTop;
				if((o.top > heroPos - 15) && (o.top < heroPos + 15)){
					heroOpponent.hero.block.trigger("gotshot", [{"arrow":o}]);
					o.hide();
					clearInterval(o.idInterval);
				}
			}
		}, 20);
	}
}
Arrow.prototype.hide = function(){
	var o = this;

	o.block.remove();
}