Animation = function(params){
	var o = this;
	
	o.block = params.block;
	o.startFrame = params.start;
	o.endFrame = params.end;
	o.step = params.step;
	o.once = params.once;
	o.complete = params.complete;
	o.back = params.back;
	
	o.currentFrame = o.startFrame;
	
	o.idInterval;
}
Animation.prototype.start = function(){
	var o = this;
	
	if(!o.idInterval){
		o.currentFrame = o.startFrame;
		o.idInterval = setInterval(function(){
			if(o.back){
				if(o.currentFrame > o.endFrame){
					o.currentFrame--;
				}
				else{
					if(o.once){
						o.stop();
						if(o.complete){
							o.complete();
						}
					}
					else{
						o.currentFrame = o.startFrame;
					}
				}
				o.block.css("background-position", o.currentFrame*o.step + "px 0px");
			}
			else{
				if(o.currentFrame < o.endFrame){
					o.currentFrame++;
				}
				else{
					if(o.once){
						o.stop();
						if(o.complete){
							o.complete();
						}
					}
					else{
						o.currentFrame = o.startFrame;
					}
				}
				o.block.css("background-position", o.currentFrame*o.step + "px 0px");		
			}				
		}, 40);
	}
}
Animation.prototype.stop = function(){
	var o = this;
	
	clearInterval(o.idInterval);
	o.idInterval = null;
}