var gameIndians, splashBlock;
function initGame(){
	gameIndians = new Indians("gameIndians");
	gameIndians.addHero({"name" : Indians.PLAYER_NAME, "parent" : gameIndians, "counter" : $("div.pointLeft:first")});
	gameIndians.addHero({"name" : Indians.COMPUTER_NAME, "parent" : gameIndians, "counter" : $("div.pointRight:first")});

  var shortly = new Date(); 
  shortly.setSeconds(shortly.getSeconds() + 30.5); 
  $('#countdown').remove();
  $('<div id="countdown"></div>').appendTo($("#gameIndians"));
  $('#countdown').countdown({until: shortly, format:'S', onTick: checkCountdown}); 
}
function checkCountdown(periods){
  if(periods[6] == 0){

    $(".you strong").text($(".pointRight").text());
    $(".enemy strong").text($(".pointLeft").text());
    
    gameIndians.endGame();   
  }
}

SplashBlock = function(){
  var o = this;

  o.block = $("div.splashScreen:first");

  o.update();

  $("a.startButton").click(function(){
    o.hide();
    initGame();
  });
}
SplashBlock.prototype.update = function(){

}
SplashBlock.prototype.hide = function(){
  var o = this;

  o.block.css("display", "none");
}
SplashBlock.prototype.show = function(){
  var o = this;

  o.block.css("display", "block");
}

$(function(){
  splashBlock = new SplashBlock(); 
})
