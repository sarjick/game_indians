Indians = function(id){
	var o = this;
	
	o.id = id;
	o.block = $("#" + o.id);
	
	o.heros = new Array();
}
Indians.PLAYER_NAME = "player";
Indians.COMPUTER_NAME = "computer";
Indians.FRAME_RATE = 20;


Indians.prototype.addHero = function(params){
	var o = this;
	
	if(params.name == Indians.PLAYER_NAME){
		o.heros.push(new HeroPlayer(params));		
	}
	else if(params.name == Indians.COMPUTER_NAME){
		o.heros.push(new HeroComputer(params));	
	}	
}