HeroComputer = function(params){
	var o = this;
	
  o.name = Indians.COMPUTER_NAME;
	o.hero = new Hero(params);
  o.hero.xSign = "";
	o.hero.setHeroScale();
  o.parent = params.parent;
  o.stopped = false;

  o.motionTimeout;

	o.init(params);	
}
HeroComputer.prototype.init = function(params){
	var o = this;

  o.initHeroMotion();
}
HeroComputer.prototype.initHeroMotion = function(){
  var o = this;

  if(!o.stopped){
    o.motionTimeout = setTimeout(function(){
      o.doHeroStep();
    }, o.getHeroPause());
  }
}
HeroComputer.prototype.doHeroStep = function(){
  var o = this;

  var pos = o.getHeroPosition();

  o.hero.moveHeroToPoint({
    "y" : pos
  });

  o.hero.shot({
    "y" : pos,
    "who" : o.name,
    "shotDoneFunc" : function(){
      o.initHeroMotion();
    }
  });
}
HeroComputer.prototype.getHeroPosition = function(){
  var o = this;

  return o.hero.top + Math.floor(Math.random()*o.hero.bot);
}
HeroComputer.prototype.getHeroPause = function(){
  var o = this;

  return 500 + Math.floor(Math.random()*2000);
}
HeroComputer.prototype.stop = function(){
  var o = this;

  clearTimeout(o.motionTimeout);
  o.hero.stop();
  o.stopped = true;
}