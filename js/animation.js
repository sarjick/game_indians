Animation = function(params){
	var o = this;
	
	o.block = params.block;
	o.startFrame = params.start;
	o.endFrame = params.end;
	o.step = params.step;
	
	o.currentFrame = o.startFrame;
	
	o.idInterval;
}
Animation.prototype.start = function(){
	var o = this;
	
	if(!o.idInterval){
		o.idInterval = setInterval(function(){
			if(o.currentFrame < o.endFrame){
				o.currentFrame++;
			}
			else{
				o.currentFrame = o.startFrame;
			}
			o.block.css("background-position", o.currentFrame*o.step + "px 0px");
		}, 40);
	}
}
Animation.prototype.stop = function(){
	var o = this;
	
	clearInterval(o.idInterval);
	o.idInterval = null;
}