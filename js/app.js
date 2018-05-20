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
Enemy.prototype.update = function(dt) {
	// You should multiply any movement by the dt parameter
	// which will ensure the game runs at the same speed for
	// all computers.
	// movement on the horizontal x axis only
	this.x += this.movement * dt; 
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
};

// Player update()
Player.prototype.update = function() {
};

// Player render()
// Draw the player on the screen, required method for game
Player.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now instantiate your objects.
// Instances of Enemy for access to Enemy.protype methods
// arguments are coordinates
var bug1 = new Enemy(20, 60, 50);
var bug2 = new Enemy(20, 145, 50);
var bug3 = new Enemy(20, 225, 50);
// Place all enemy objects in an array called allEnemies
var allEnemies = [bug1, bug2, bug3];

// Place the player object in a variable called player
// Instance of Player
var player = new Player(100, 300);

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
