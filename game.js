(function () {
  const Game = function (canvasId) {
    const canvas = document.getElementById(canvasId);
    const screen = canvas.getContext('2d');
    const gameSize = { x: canvas.width, y: canvas.height };

    this.bodies = [new Player(this, gameSize)];
    this.gravity = 1;

    const self = this;
    const tick = function () {
      self.update(gameSize);
      self.draw(screen, gameSize);
      requestAnimationFrame(tick);
    };

    tick();
  };

  Game.prototype = {
    update(gameSize) {
      this.bodies.forEach((body) => {
        body.update(gameSize);
      });
    },

    draw(screen, gameSize) {
      screen.clearRect(0, 0, gameSize.x, gameSize.y);

      this.bodies.forEach((body) => {
        drawRect(screen, body);
      });
    }
  };

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
    }
  };

  const drawRect = function (screen, body) {
    screen.fillRect(
      body.center.x - body.size.x / 2,
      body.center.y - body.size.y / 2,
      body.size.x,
      body.size.y
    );
  };

  const Keyboarder = function () {
    const keyState = {};

    window.onkeydown = function (e) {
      keyState[e.keyCode] = true;
    };

    window.onkeyup = function (e) {
      keyState[e.keyCode] = false;
    };

    this.isDown = function (keyCode) {
      return keyState[keyCode] === true;
    };

    this.KEYS = { LEFT: 37, RIGHT: 39, SPACE: 32 };
  };

  window.onload = function () {
    new Game('screen');
  };
}());
