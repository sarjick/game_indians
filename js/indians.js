Indians = function(id){
	var o = this;
	
	o.id = id;
	o.block = $("#" + o.id);
	
	o.heros = new Object();
}
Indians.PLAYER_NAME = "player";
Indians.COMPUTER_NAME = "computer";
Indians.FRAME_RATE = 20;


Indians.prototype.addHero = function(params){
	var o = this;
	
	if(params.name == Indians.PLAYER_NAME){
		o.heros[params.name] = new HeroPlayer(params);	
	}
	else if(params.name == Indians.COMPUTER_NAME){
		o.heros[params.name] = new HeroComputer(params);	
	}	
}
Indians.prototype.removeHero = function(){
	var o = this;

	for(var i in o.heros){
		o.heros[i].stop();		
	}
}
Indians.prototype.endGame = function(){
	var o = this;

	splashBlock.show();
	o.removeHero();

	$("div.pointLeft, div.pointRight").text("0");	
}