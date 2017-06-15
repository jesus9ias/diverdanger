import { addRef, getRef } from '../common/global';

let game = {
  canvas: null,
  context: null
}

function clear() {
  game.context.clearRect(0, 0, game.canvas.width, game.canvas.height);
}

function test() {
  game.context.beginPath();
  game.context.arc(100, 130, 90, 0, 2 * Math.PI, false);
  game.context.fillStyle = 'red';
  game.context.fill();
}

function drawRectangle({ x, y, width, height }, background) {
  game.context.fillStyle = background;
  game.context.fillRect(x, y, width, height);
}

function drawWather() {
  drawRectangle({ x: 0, y: 0, width: 100, height: 200 }, '#3cbff0')
}



function startGame() {
  game.canvas = addRef('canvas');
  game.context = game.canvas.getContext('2d');
  clear();
  drawWather();
}

export default startGame;
