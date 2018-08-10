var snek;
var key = 39;
var xTouchStart, xTouchEnd, yTouchStart, yTouchEnd;

var gameArea = {
	canvas : document.createElement("canvas"),
	start : function() {
		var w = window.innerWidth;
		var h = window.innerHeight;
		var size = Math.min(h,w);
		if (size>980) {
			size = 980;
		}
		else if (size < 100) {
			size = 100;
		}
		else {
			size = size - size%100
		}
		this.canvas.width = size;
		this.canvas.height = size;
		this.context = this.canvas.getContext("2d");
		document.body.insertBefore(this.canvas, document.body.childNodes[0]);
		this.interval = setInterval(updateGameArea, 500);
		document.addEventListener("touchstart", handleStart, false);
		document.addEventListener("touchend", handleEnd, false);
		return size;
	},
	resize : function() {
		var w = window.innerWidth;
		var h = window.innerHeight;
		var size = Math.min(h,w);
		if (size>1000) {
			size = 1000;
		}
		else if (size < 100) {
			size = 100;
		}
		else {
			size = size - size%100
		}
		this.canvas.width = size;
		this.canvas.height = size;
		return size;
	},
	stop : function() {
		clearInterval(this.interval);
	},    
	clear : function() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}
}

function handleStart(e) {
	var touch = e.changedTouches[0];
	xTouchStart = touch.pageX;
	yTouchStart = touch.pageY;
}

function handleEnd(e) {
	var touch = e.changedTouches[0];
	xTouchEnd = touch.pageX;
	yTouchEnd = touch.pageY;
}

function startSnek() {
	var areaSize = gameArea.start();
	var snekSize = areaSize/25;
	snek = new component(snekSize, snekSize*12);
}

document.getElementsByTagName("BODY")[0].onresize = function() {
	var areaSize = gameArea.resize();
	var snekSize = areaSize/25;
	snek = new component(snekSize, snekSize*12);
	updateGameArea()
}

function component(size, pos) {
	this.width = size;
    this.height = size;
    this.xSpeed = size;
    this.ySpeed = 0;
    this.x = pos;
    this.y = pos;
    this.key = 39;
    this.lastKey = key;
    this.update = function() {
    	ctx = gameArea.context;
    	ctx.fillStyle = "white";
		ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.newPos = function() {
    	//document.addEventListener("onkeydown", function(e) {
    	document.onkeydown = function(e) {
	    	return key = e.which || e.keyCode;
		}
		this.xTouch = parseInt(xTouchEnd - xTouchStart);
		this.yTouch = parseInt(yTouchEnd - yTouchStart);
		// right
		if (this.xTouch > Math.abs(this.yTouch)) {
			key = 39;
			this.xTouch = this.yTouch = 0;
		} // left
		else if (this.xTouch < Math.abs(this.yTouch) && this.xTouch < 0) {
			key = 37;
			this.xTouch = this.yTouch = 0;
		} // up
		else if (Math.abs(this.xTouch) < this.yTouch) {
			key = 40;
			this.xTouch = this.yTouch = 0;
		} // down
		else if (Math.abs(this.xTouch) < Math.abs(this.yTouch) && this.yTouch < 0) {
			key = 38;
			this.xTouch = this.yTouch = 0;
		}
		switch (key) {
			case 37: //left
				if (this.lastKey != 39) {
	    			this.xSpeed = -size;
					this.ySpeed = 0;
					this.lastKey = key;
				}
				break;
			case 38: //up
				if (this.lastKey != 40) {
	    			this.xSpeed = 0;
					this.ySpeed = -size;
					this.lastKey = key;
				}
				break;
			case 39: //right
				if (this.lastKey != 37) {
	    			this.xSpeed = size;
					this.ySpeed = 0;
					this.lastKey = key;
				}
				break;
			case 40: //down
    			if (this.lastKey != 38) {
    				this.xSpeed = 0;
					this.ySpeed = size;
					this.lastKey = key;
				}
				break;
	    }
	    if (this.x == 0) {
	    	if (this.lastKey == 37) {
	    		this.xSpeed = 0;
	    	}
	    }
	    if (this.x == size*24) {
	    	if (this.lastKey == 39) {
	    		this.xSpeed = 0;
	    	}
	    }
	    if (this.y == 0) {
	    	if (this.lastKey == 38) {
	    		this.ySpeed = 0;
	    	}
	    }
	    if (this.y == size*24) {
	    	if (this.lastKey == 40) {
	    		this.ySpeed = 0;
	    	}
	    }
		this.x += this.xSpeed;
		this.y += this.ySpeed;
    }

}

function updateGameArea() {
    gameArea.clear();
    snek.newPos();
    snek.update();
}