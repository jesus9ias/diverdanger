import { addRef, getRef } from '../common/global';
import Bubble from './bubble';
import Player from './player';

const bubbles = () => [];

let game = {
  canvas: null,
  context: null,
  cycle: null,
  player: null,
  bubbles: bubbles()
};

function clear() {
  game.context.clearRect(0, 0, game.canvas.width, game.canvas.height);
}

function drawRectangle({ x, y, width, height }, background) {
  game.context.fillStyle = background;
  game.context.fillRect(x, y, width, height);
}

function drawPlayer() {
  if (game.player) {
    game.player.draw();
  } else {
    game.player = Player({ context: game.context });
  }
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
  drawPlayer();
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
  game.player.collision(game.bubbles);
}

function cycle() {
  clearInterval(game.cycle);

  bubbleCreator();
  bubbleAnimator();

  game.cycle = setInterval(cycle, 10);
}

document.onkeypress = function(e = window.event) {
  var charCode = (typeof e.which == "number") ? e.which : e.keyCode;
  if (charCode) {
    console.log("Character typed: " + charCode);
  }
};

function startGame() {
  game.canvas = addRef('canvas');
  game.context = game.canvas.getContext('2d');
  clear();
  drawWather();
  drawPlayer();
  cycle();
}

export default startGame;
