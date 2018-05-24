/*
TODO: Constructor function for the enemy (bugs)
x and y will be the coordinates
Enemies our player must avoid
*/
var Enemy = function(x, y, movement) {
	// Variables applied to each of our instances go here,
	// we've provided one for you to get started

	// The image/sprite for our enemies, this uses
	// a helper we've provided to easily load images
	this.sprite = 'images/enemy-bug.png';
	this.x = x;
	this.y = y;
	this.movement = movement;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
// Reference for size of canvas: width = 505, height = 606;
Enemy.prototype.update = function(dt) {
	// You should multiply any movement by the dt parameter
	// which will ensure the game runs at the same speed for
	// all computers.
	// movement on the horizontal x axis only
	this.x += this.movement * dt;
	/*
	TODO: When the bugs go off canvas restart back at the start of
	the path but with a new random integer for movement speed
	*/
	if (this.x >= 505) {
		this.x = -100;
		this.movement = Math.floor(Math.random() * 250) + 150
		// console.log(this.movement);
	} 
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
/*
TODO: Constructor function for the player
character, x and y will be the coordinates
This class requires an update(), render() and
a handleInput() method.
*/
var Player = function(x, y) {
	this.sprite = "images/char-boy.png";
	this.x = x;
	this.y = y;
	this.totalScore = 0;
};

// Player update()
/*
TODO: Check to see if the player has reached the water for a win (ftw)
- If the player reaches the water, reset the player back to original
	coordinates after half a second.
- The second bit of code will keep the player within the canvas boundaries
- And also check if a collision has happened between bug and player
*/
Player.prototype.update = function() {
	// If character reaches the water
	if (this.y <= 0) {
		// Increment moves by 30
		this.totalScore += 30;
		// arrow function to inherit 'this' value from surrounding content
		setTimeout(() => {
			// reset the player after half a second
			this.resetPlayer();
		}, 500);
	}

	/*
	TODO: Keep player within the canvas.  X & Y axis don't allow movement
	beyond 0 and beyond 400 coordinates, otherwise out of bounds.
	*/
	// X axis
	if (this.x < 0) {
		this.x = 0;
	} else if (this.x > 400) {
		this.x = 400;
	}
	// Y axis
	if (this.y < 0) {
		this.y = 0;
	} else if (this.y > 400) {
		this.y = 400;
	}

	// Check to see if a collision happened
	this.collisionCheck();
	// Check to see if a collision between gem and player happened
	this.gemPickUpCheck();
};

/*
TODO: Check for collisions between enemy bugs and the player if a
collision happens reset the player back to original coordinates
For reference image is 101px width by 171px height
*/
Player.prototype.collisionCheck = function() {
	// loop through the enemy array
	for (var i = 0; i < allEnemies.length; i++) {
		const bug = allEnemies[i];
		if (this.x <= bug.x + 60 && //number is bug hitbox width
			this.x + 50 >= bug.x && //number is player hitbox width
			this.y <= bug.y + 80 && //number is bug hitbox height
			70 + this.y >= bug.y) { // number is player hitbox height
			// console.log('Hit box collision!');
			// Send player back to original coordinates
			this.resetPlayer();
			// Reset the gem to a different location on collision
			gem.update();
		}
	}
};

/*
TODO: Check for collisions between the player and a gem.  If a
collision happens the gem will disappear
*/
Player.prototype.gemPickUpCheck = function() {
	if (this.x <= gem.x + 60 &&
		this.x + 50 >= gem.x &&
		this.y <= gem.y + 80 &&
		70 + this.y >= gem.y) {
		console.log('Picked up gem!');
		// Reposition the gem off canvas
		gem.x = -600;
	}
};

/*
TODO: This resets the player back to it's original coordinates
*/
Player.prototype.resetPlayer = function() {
	this.x = 200;
	this.y = 400;
};

/*
TODO: Player render() Draw the player on the screen, required method
for game.  This method also updates the total scores on canvas
*/
Player.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	ctx.fillStyle = "#fff";
	ctx.font = "25px Aldrich, sans-serif";
	ctx.fillText("Total Score: " + this.totalScore, 10, 100); //location of score on canvas
};

// Player handleInput() method
/*
TODO: This sets the direction of the player, and uses
the event listener directly below.
*/
Player.prototype.handleInput = function(arrowKeys) {
	// up and down = y axis
	if (arrowKeys === 'up') {
			this.y -= 82;
		} else if (arrowKeys === 'down') {
			this.y += 82;
		// left & right = x axis
		} else if (arrowKeys === 'left') {
			this.x -=  100;
		} else if (arrowKeys === 'right') {
			this.x += 100;
	}
};

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
	var allowedKeys = {
		37: 'left',
		38: 'up',
		39: 'right',
		40: 'down'
	};

	player.handleInput(allowedKeys[e.keyCode]);
});

// Now instantiate your objects.
// Instances of Enemy for access to Enemy.protype methods
// arguments are coordinates x & y & the third argument is initial movement speed
var bug1 = new Enemy(-100, 60, 230); // top row bug
var bug2 = new Enemy(-20, 145, 170); // middle row bug
var bug3 = new Enemy(40, 225, 200); // bottom row bug
var bug4 = new Enemy(40, 225, 240); //bottom row bug
var bug5 = new Enemy(-40, 60, 300); //top row bug
// Place all enemy objects in an array called allEnemies
var allEnemies = [bug1, bug2, bug3, bug4, bug5];

// Place the player object in a variable called player
// Instance of Player
var player = new Player(200, 400);

//////// EXTRA -- Gems ////////
/*
TODO: Constructor function for the collectible
gems, x and y will be the coordinates
This class requires an update() and render() method.
*/
var Gem = function(x, y) {
	this.sprite = "images/Gem Green.png";
	this.x = x;
	this.y = y;
};

// Gem render()
// Draw the Gem on the screen, required method for game
Gem.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/*
TODO: Gem update() method. Updates the gems position if the player collides
with an enemy bug. Generates a gem in a random place on the road.  This method
is called from the player collisionCheck, so if theres a collision with enemy
update the gem coordinates.
*/
Gem.prototype.update = function(x, y) {
	// Coordinate options of gem to be located along x axis
	const gemXCoordinates = [0, 100, 200, 300, 400];
	// Coordinate options of gem to be located along y axis
	const gemYCoordinates = [72, 154, 236];
		this.x = gemXCoordinates[Math.floor(Math.random()*gemXCoordinates.length)];
		// console.log(this.x);
		this.y = gemYCoordinates[Math.floor(Math.random()*gemYCoordinates.length)];
		// console.log(this.y);
};

// Instantiate Gem
// x and y coordinates are the initial value of gem
var gem = new Gem(200, 154);

/*
Resources Used to help build this:
* For generating a random speed for the movement of bugs
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random

* Used below resource to help with coordinates:
https://www.w3schools.com/graphics/canvas_coordinates.asp

* Understanding the engine.js:
https://www.youtube.com/watch?v=oLSu3zc2jSA

* Help with unstanding how the collision works:
https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
https://discussions.udacity.com/t/collision-detection-not-working-player-also-no-longer-moves/187116/

* Used below resource to help generate a random gem coordinate from array:
https://css-tricks.com/snippets/javascript/select-random-item-array/

* Resource used to help with update score and render to canvas
https://www.w3schools.com/html/html5_canvas.asp
*/