var gameIndians;
$(function(){
	gameIndians = new Indians("gameIndians");
	gameIndians.addHero({"name" : Indians.PLAYER_NAME, "parent" : gameIndians});
	gameIndians.addHero({"name" : Indians.COMPUTER_NAME, "parent" : gameIndians});
});