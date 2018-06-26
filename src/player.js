const Player = function (game, gameSize) {
  this.game = game;
  this.size = { x: 15, y: 30 };
  this.center = { x: 10, y: gameSize.y - 15 };
  this.velocity = { x: 0, y: 0 };
  this.keyboarder = new Keyboarder();
};

Player.prototype = {
  update(gameSize) {
    if (this.keyboarder.isDown(this.keyboarder.KEYS.RIGHT)) {
      this.center.x += 3;
    } else if (this.keyboarder.isDown(this.keyboarder.KEYS.LEFT)) {
      this.center.x -= 3;
    }

    if (this.keyboarder.isDown(this.keyboarder.KEYS.SPACE)
    && this.center.y > gameSize.y - this.size.y / 2 - 1) {
      this.velocity.y = -25;
    }

    this.center.y = Math.min(
      this.center.y += this.velocity.y,
      gameSize.y - this.size.y / 2
    );

    this.velocity.y += this.game.gravity;
  },

  draw(screen) {
    screen.fillRect(
      this.center.x - this.size.x / 2,
      this.center.y - this.size.y / 2,
      this.size.x,
      this.size.y
    );
  }
};
