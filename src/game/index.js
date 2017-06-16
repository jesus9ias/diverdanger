import { addRef, getRef, addEvent } from '../common/global';
import Bubble from './bubble';
import Player from './player';

const bubbles = () => [];
const pressedKeys = () => [];

let game = {
  status: 'initial',
  canvas: null,
  context: null,
  cycle: null,
  player: null,
  bubbles: bubbles(),
  pressedKeys: pressedKeys()
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
  let toRemove = [];
  game.bubbles.map((bubble, i) => {
    bubble.move();
    bubble.draw();
    if(bubble.collision(game.player)) {
      game.player.setLife(-5);
    }
    if (bubble.x < -10) {
      toRemove.push(i);
    }
  });
  toRemove.map((a) => {
    game.bubbles.splice(a, 1);
  });
}

function playerAnimator() {
  game.player.autoMove(-0.5, -0.2);
  if (game.pressedKeys.length > 0) {
    game.player.move(game.pressedKeys);
  }
}

function playerLife() {
  if (game.player.life <= 0) {
    game.status = 'stopped';
  }
}

function gameChecker() {
  console.log(game.player.life);
}

function gamePlaying() {
  if (game.status === 'playing') {
    bubbleCreator();
    bubbleAnimator();
    playerAnimator();
    playerLife();
  }
}

function gameStopped() {
  if (game.status === 'stopped') {
    console.log('stopped');
  }
}

function cycle() {
  clearInterval(game.cycle);

  clear();
  drawWather();
  drawPlayer();

  gameChecker();
  gamePlaying();
  gameStopped();

  game.cycle = setInterval(cycle, 10);
}

addEvent(document, 'keydown', (e = window.event) => {
  const charCode = (typeof e.which == 'number') ? e.which : e.keyCode;
  if (game.pressedKeys.indexOf(charCode) === -1) {
    game.pressedKeys.push(charCode);
  }
});

addEvent(document, 'keyup', (e = window.event) => {
  game.pressedKeys = pressedKeys();
});

function startGame() {
  game.status = 'playing';
  game.canvas = addRef('canvas');
  game.context = game.canvas.getContext('2d');
  cycle();
}

export default startGame;
