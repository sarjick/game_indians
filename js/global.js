function setTransform(params){
	var block = params.block;
	var scaleX = params.scaleX;
	var scaleY = params.scaleY;
	
	$(block).css("-webkit-transform", "scale(" + scaleX + ", " + scaleY + ")");
	$(block).css("-moz-transform", "scale(" + scaleX + ", " + scaleY + ")");
	$(block).css("-ms-transform", "scale(" + scaleX + ", " + scaleY + ")");
	$(block).css("transform", "scale(" + scaleX + ", " + scaleY + ")");
}