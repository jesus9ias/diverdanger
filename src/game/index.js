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

function startGame() {
  game.canvas = addRef('canvas');
  game.context = game.canvas.getContext('2d');
  clear();
  test();
}

export default startGame;
