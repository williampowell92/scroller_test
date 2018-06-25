(function () {
  const Game = function (canvasId) {
    const canvas = document.getElementById(canvasId);
    const screen = canvas.getContext('2d');
    const gameSize = { x: canvas.width, y: canvas.height };

    const self = this;
    const tick = function () {
      self.update();
      self.draw(screen, gameSize);
      requestAnimationFrame(tick);
    };

    tick();
  };

  Game.prototype = {
    update() {

    },

    draw() {

    }
  };

  window.onload = function () {
    new Game('screen');
  };
}());
