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
  drawRectangle({ x: 0, y: 50, width: 1000, height: window.innerHeight - 50 }, '#3cbff0')
}

function bubbleCreator() {
  const currentBubblesLength = game.bubbles.length;
  const newBubbleName = `bubble_${currentBubblesLength}`;
  const newBubble = Bubble(newBubbleName);
  game.bubbles.push(newBubble);
}

function bubbleAnimator() {
  game.bubbles.map((bubble) => {
    bubble.move();
  });
}

function cycle() {
  clearInterval(game.cycle);

  bubbleCreator();
  bubbleAnimator();

  game.cycle =  setInterval(cycle, 500);
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
