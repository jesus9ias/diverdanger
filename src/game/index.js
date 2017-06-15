import { addRef, getRef } from '../common/global';
import Bubble from './bubble';

const bubbles = () => [];

let game = {
  canvas: null,
  context: null,
  cycle: null,
  bubbles: bubbles()
};

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
  drawRectangle({ x: 0, y: 50, width: 1000, height: game.canvas.height - 50 }, '#3cbff0');
}

function bubbleCreator() {
  const currentBubblesLength = game.bubbles.length;
  const newBubble = Bubble({ context: game.context });
  if (newBubble) {
    game.bubbles.push(newBubble);
  }
}

function bubbleAnimator() {
  clear();
  drawWather();
  let toRemove = [];
  game.bubbles.map((bubble, i) => {
    bubble.move();
    bubble.draw();
    if (bubble.x < -10) {
      toRemove.push(i);
    }
  });
  toRemove.map((a) => {
    game.bubbles.splice(a, 1);
  });
}

function cycle() {
  clearInterval(game.cycle);

  bubbleCreator();
  bubbleAnimator();

  game.cycle = setInterval(cycle, 10);
}

function startGame() {
  game.canvas = addRef('canvas');
  game.context = game.canvas.getContext('2d');
  clear();
  drawWather();
  test();
  cycle();
}

export default startGame;
