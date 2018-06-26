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
      body.draw(screen);
    });
  }
};
