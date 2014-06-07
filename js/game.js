/**
 * Playing Asteroids while learning JavaScript object model.
 */

/** 
 * Shim layer, polyfill, for requestAnimationFrame with setTimeout fallback.
 * http://paulirish.com/2011/requestanimationframe-for-smart-animating/
 */ 
window.requestAnimFrame = (function(){
	return  window.requestAnimationFrame       || 
          	window.webkitRequestAnimationFrame || 
          	window.mozRequestAnimationFrame    || 
          	window.oRequestAnimationFrame      || 
          	window.msRequestAnimationFrame     || 
          	function( callback ){
            	window.setTimeout(callback, 1000 / 60);
          	};
})();



/**
 * Shim layer, polyfill, for cancelAnimationFrame with setTimeout fallback.
 */
window.cancelRequestAnimFrame = (function(){
	return  window.cancelRequestAnimationFrame || 
			window.webkitCancelRequestAnimationFrame || 
			window.mozCancelRequestAnimationFrame    || 
			window.oCancelRequestAnimationFrame      || 
			window.msCancelRequestAnimationFrame     || 
			window.clearTimeout;
})();

/**
 * Trace the keys pressed
 * http://nokarma.org/2011/02/27/javascript-game-development-keyboard-input/index.html
 */
window.Key = {
	pressed: {},
	
	LEFT:   37,
	RIGHT:  39,
	SPACE:  32,
	  
	isDown: function(keyCode, keyCode1) {
		return this.pressed[keyCode] || this.pressed[keyCode1];
	},
	  
	onKeydown: function(event) {
		this.pressed[event.keyCode] = true;
		//console.log(event.keyCode);
	},
	  
	onKeyup: function(event) {
		delete this.pressed[event.keyCode];
	}
};
window.addEventListener('keyup',   function(event) { Key.onKeyup(event); },   false);
window.addEventListener('keydown', function(event) { Key.onKeydown(event); }, false);


/**
 * All positions and forces 
 */
function Vector(x, y) {
	this.x = x || 0;
	this.y = y || 0;
};

/**
 * The background object
 */

function Background(speed, position) {
	this.speed = speed || 2; // Define speed of the background for panning
	this.position = position || 0; // Define the x position of the background  
}

Background.prototype.update = function() {
	this.position -= this.speed;
	if (this.position <= -1800) {
		this.position = 0; 
	}

	
}
	
Background.prototype.draw = function() {
	ctx.drawImage(img.background, this.position, 0);
	ctx.drawImage(img.background, this.position+1800, 0);
	//console.log(this.position);
}


/**
 * The plane object
 */

function Plane(position, acceleration, direction, width, height, planeArea, level, throttley, gravity, speed) {
	this.position = position || new Vector(50, 200); // Set start position for the plane
	this.acceleration = acceleration || new Vector(0, 0);
	this.acceleration = acceleration || new Vector(0, 0);
	this.direction = direction  || 0;
	this.width = width || 64;
	this.height = height || 25;
	this.planeArea = planeArea || [];
	this.level = level || 194;
	this.throttley = throttley || 0.1;
	this.gravity = gravity || 0.04;
	this.speed = speed || 2;
}

Plane.prototype.update = function() {
	if (Key.isDown(Key.LEFT))   this.position.x -= this.speed;
	if (Key.isDown(Key.RIGHT))  this.position.x += this.speed;
	if (Key.isDown(Key.SPACE))  {
		this.acceleration.y -= this.throttley;
		smoke.place();
		audio.engine.play();
	} else {
		this.acceleration.y += this.gravity;
		audio.engine.pause();
	}
	if (this.acceleration.y === 0) {
		this.direction = 0;
	} else if(this.acceleration.y > 0) {
		this.direction = 0.4;
	} else if(this.acceleration.y < 0) {
		this.direction = -0.4;
	}
	//console.log(this.acceleration);
}

Plane.prototype.move = function() {
	this.position.y += this.acceleration.y;
	this.planeArea = [new Vector(this.position.x, this.position.y), new Vector(this.position.x+this.width, this.position.y), new Vector(this.position.x+this.width, this.position.y+ this.height), new Vector(this.position.x, this.position.y+this.height)];
		
}
	
Plane.prototype.draw = function() {
	ctx.save();
	ctx.translate(this.position.x, this.position.y)
	//ctx.rotate(this.direction);
	ctx.drawImage(img.plane, 0, 0);
	ctx.restore();
	
	//console.log(this.position);
}

Plane.prototype.onfield = function() {
	if(this.position.y < 0) {
		this.position.y = 0;
		this.acceleration.y = 0;
	}
	if(this.position.y+this.height > height) {
		this.crash();
		this.position.y = height-this.height;
		this.acceleration.y = 0;
	}
	if(this.position.x+this.width > width) {
		this.position.x = width - this.width;
	}
	if(this.position.x < 0) {
		this.position.x = 0;
	}
}

Plane.prototype.crash = function() {
	cancelRequestAnimFrame(id);
	audio.engine.pause();
	audio.crash.play();
	console.log(score);
	$('#submitscore').html('<form><input id="playername" type="text" placeholder="Name"><button id="save">Submit Score</button></form>');
	$('#save').click(function(event){
	event.preventDefault();
	plane.submitscore();	
	}); 
	crash = true;
	
		
}

Plane.prototype.fuellevel = function(decreasespeed) {
	this.level += decreasespeed/10;
	if(this.level > 194) {
	this.level = 194;	
	}
	if(this.level <= 0) {
	plane.crash();	
	}
	//console.log(this.level);
}

Plane.prototype.touch = function() {
	for (var i = 0; i < this.planeArea.length; i++) { 
		for (var z = 0; z < obstacles.positions.length; z++) {
			if ((this.planeArea[i].x > obstacles.positions[z].x+32 && this.planeArea[i].x < obstacles.positions[z].x+obstacles.width-32 && this.planeArea[i].y > obstacles.positions[z].y+100 && this.planeArea[i].y < obstacles.positions[z].y+obstacles.height) || ((obstacles.positions[z].x+obstacles.halfwidth-this.planeArea[i].x)*(obstacles.positions[z].x+obstacles.halfwidth-this.planeArea[i].x)+(obstacles.positions[z].y+obstacles.halfwidth-this.planeArea[i].y)*(obstacles.positions[z].y+obstacles.halfwidth-this.planeArea[i].y) < obstacles.halfwidth*obstacles.halfwidth)) {
				this.crash();	
			}
		}
		for (var z = 0; z < fuel.positions.length; z++) {
			if (this.planeArea[i].x > fuel.positions[z].x && this.planeArea[i].x < fuel.positions[z].x+fuel.width && this.planeArea[i].y > fuel.positions[z].y && this.planeArea[i].y < fuel.positions[z].y+fuel.height) {
				fuel.positions[z].x = -100;
				this.fuellevel(760);
				audio.refill.play();	
			}
		}
	}
}

Plane.prototype.fuelmeter = function() {
		ctx.save();
		ctx.translate(650,5);
		ctx.fillRect(0, 0, 200, 30);
		var grd=ctx.createLinearGradient(3,3,194,24);
		grd.addColorStop(0.5,"green");
		grd.addColorStop(1,"red");
		ctx.fillStyle = grd;
		ctx.fillRect(3, 3, 194, 24);
		ctx.clearRect(3, 3, 197-this.level, 24);
		ctx.restore();
		
}

Plane.prototype.scoremeter = function() {
		ctx.save();
		ctx.font = '20pt Calibri';
		ctx.fillStyle = 'black';
		ctx.fillText("Score: " + score,570, 27);
		ctx.restore();
		
}

Plane.prototype.submitscore = function() {
	name = document.getElementById('playername').value;
	if(name === ""){
		name = "Doe"
	}
	$.ajax({
    type: 'post',
    url: 'gameajax.php',
    data: {	name: name,
			score: score},
    dataType: 'json',
    success: function(data){
		$('#toplist').html("<h2>Toplist</h2>" + data.toplist);
		console.log('Ajax request succeeded: ' + data);
		
		},
	error: function(jqXHR, textStatus, errorThrown){
        		console.log('Ajax request failed: ' + textStatus + ', ' + errorThrown);
			},
	});
	$('#submitscore').html("")		
}

/**
 * The obstacles object
 */

function Obstacles(i, positions, width, height, timeBetween) {
	this.i = i || 100;
	this.positions = positions || [];
	this.width = width || 98;
	this.halfwidth = this.width/2;
	this.height = height || 160;
	this.timeBetween = timeBetween || 300; //How often should ballons show up

}

Obstacles.prototype.place = function() {
	if(this.i === this.timeBetween) {
		this.positions.unshift(new Vector(width, Frepp.random(0, height-this.height))); 
		this.i = 0;
		if(this.timeBetween > 100) {
			this.timeBetween -= 5;
		}
		//console.log('placed' + background.position, this.positions);
	}
	this.i++;
	
}

Obstacles.prototype.update = function() {
	for (var i = 0; i < this.positions.length; i++) { 
		this.positions[i].x--;
		if(this.positions[i].x+this.width < 0) {
		 	this.positions.pop();
		}
	}
}

Obstacles.prototype.draw = function() {
	for (var i = 0; i < this.positions.length; i++) { 
		ctx.save();
		ctx.drawImage(img.ballon, this.positions[i].x, this.positions[i].y);
		ctx.restore();
	}
}

/**
 * The fuel object
 */

function Fuel(i, positions, speed, width, height, timeBetween) {
	this.i = i || 200;
	this.positions = positions || [];
	this.speed = speed || [];
	this.width = width || 60;
	this.height = height || 65;
	this.timeBetween = timeBetween || 650; //How often should fuel cans show up

}

Fuel.prototype.place = function() {
	if(this.i === this.timeBetween) {
		this.positions.unshift(new Vector(width, Frepp.random(0, height-this.height)));
		this.speed.unshift(Frepp.random(2,5)) 
		this.i = 0;
		//console.log('placed' + background.position, this.positions);
	}
	this.i++;
	
}

Fuel.prototype.update = function() {
	for (var i = 0; i < this.positions.length; i++) { 
		this.positions[i].x -= this.speed[i];
		if(this.positions[i].x+this.width < 0) {
		 	this.positions.pop();
			this.speed.pop();
		}
	}
}

Fuel.prototype.draw = function() {
	for (var i = 0; i < this.positions.length; i++) {
		ctx.save();
		ctx.drawImage(img.fuel, this.positions[i].x, this.positions[i].y);
		ctx.restore();
	}
}

/**
 * The fuel object
 */

function Smoke(i, positions, speed, width, height, timeBetween) {
	this.i = i || 0;
	this.positions = positions || [];
	this.width = width || 15;
	this.height = height || 7;
	this.timeBetween = timeBetween || 4; //How often should smoke show up

}

Smoke.prototype.place = function() {
	//console.log(background.speed);
	if(this.i === this.timeBetween) {
		this.positions.unshift(new Vector(plane.position.x-this.width, plane.position.y+plane.height/2)); 
		this.i = 0;
	}
	this.i++;
	
}

Smoke.prototype.update = function() {
	for (var i = 0; i < this.positions.length; i++) { 
		this.positions[i].x -= background.speed;
		if(this.positions[i].x+this.width < 0) {
		 	this.positions.pop();
		}
	}
}

Smoke.prototype.draw = function() {
	for (var i = 0; i < this.positions.length; i++) {
		ctx.save();
		ctx.drawImage(img.smoke, this.positions[i].x, this.positions[i].y);
		ctx.restore();
	}
}

/**
 * Asteroids, the Game
 */
window.Game = (function(){

	var init = function(canvas) {
    	canvas = document.getElementById(canvas);
    	ctx = canvas.getContext('2d');
    	width = 900,
    	height = 500,
		score = 0,
		crash = false,
		started = false,
		name = "",
    	img = new function() {
			// Define images
			this.background = new Image();
			this.plane = new Image();
			this.fuel = new Image();
			this.ballon = new Image();
			this.smoke = new Image();
			// Set images src
			this.background.src = "img/background.png";
			this.plane.src = "img/plane.png";
			this.fuel.src = "img/fuel.png";
			this.ballon.src = "img/ballon.png";
			this.smoke.src = "img/smoke.png";
		},
		audio = new function() {
			// Define audio
			this.engine = new Audio();
			this.refill = new Audio();
			this.crash = new Audio();
			// Set images src
			this.engine.src = "audio/engine.mp3";
			this.refill.src = "audio/refill.mp3";
			this.crash.src = "audio/explosion.mp3";
		}
    
		background = new Background();
		plane = new Plane();
		obstacles = new Obstacles();
		fuel = new Fuel();
		smoke = new Smoke();
		
		img.background.addEventListener('load', function(){
			ctx.drawImage(img.background, 0, 0);
			ctx.textAlign = 'center';
			ctx.font = '30pt Calibri';
			ctx.fillStyle = 'black';
			ctx.fillText("Press space to begin",width/2, height/2);
		});
		
	
    console.log('Init the game');
	};


	var update = function() {
		background.update();
		plane.update();
		plane.move();
		plane.onfield();
		obstacles.place();
		obstacles.update();
		fuel.place();
		fuel.update();
		plane.touch();
		plane.fuellevel(-1);
		smoke.update();
	};

	var render = function() {
		background.draw();
		smoke.draw();
		plane.draw();
		obstacles.draw();
		fuel.draw();
		plane.fuelmeter();
		plane.scoremeter();	
	};

	var	gameLoop = function() {
			crash = false;
			score += 5;
			lastGameTick = Date.now();
    		id = requestAnimFrame(gameLoop);
			update();
			render();
			if (crash === true){
				ctx.save();	
				ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
				ctx.fillRect(0,0,width, height);
				ctx.font = '30pt Calibri';
				ctx.fillStyle = 'black';
				ctx.fillText("You scored: " + score,width/2, height/2);
				ctx.font = '15pt Calibri';
				ctx.fillText("Press R to restart",width/2, height/2+30);
				ctx.restore();
			}

	};
	
	var restart = function() {
		cancelRequestAnimFrame(id);
		Game.init('canvas1');
		$('#submitscore').html("")	
	};
	
	var start = function() {
		started = true;
		setTimeout(function(){
		ctx.save();
		ctx.font = '60pt Calibri';
		ctx.drawImage(img.background, 0, 0);
		ctx.fillText("3",width/2, height/2);
		ctx.restore();
		},1000);
		setTimeout(function(){
		ctx.save();
		ctx.font = '60pt Calibri';
		ctx.drawImage(img.background, 0, 0);
		ctx.fillText("2",width/2, height/2);
		ctx.restore();	
		},2000);
		setTimeout(function(){
		ctx.save();
		ctx.font = '60pt Calibri';
		ctx.drawImage(img.background, 0, 0);
		ctx.fillText("1",width/2, height/2);
		ctx.restore();	
		},3000);
		setTimeout(Game.gameLoop, 4000);
	};

	return {
		'init': init,
		'gameLoop': gameLoop,
		'restart': restart,
		'start': start
  	};
	
})();



// On ready
$(document).ready(function(){
	'use strict';
	
	Game.init('canvas1');
	$.ajax({
    url: 'gameajax.php',
    success: function(data){
		$('#toplist').html("<h2>Toplist</h2>" + data.toplist);
		console.log('Ajax request succeeded: ' + data);
		
		},
	error: function(jqXHR, textStatus, errorThrown){
        		console.log('Ajax request failed: ' + textStatus + ', ' + errorThrown);
			},
	});
	
	$(document).keydown(function(){
		var key;
    	key = event.keyCode || event.which;
		switch(key) {
      	case 32:
		if(started === false){   
        Game.start();
		}
		event.preventDefault();
        break;
		case 82: 
		Game.restart();
		}
		});

	console.log('Ready to play.');  
});