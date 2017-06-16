import { addRef } from '../common/global';
import Bubble from './bubble';
import Player from './player';

const bubbles = () => [];
const pressedKeys = () => [];

export default class Game {
  constructor() {
    this.status = 'initial';
    this.canvas = null;
    this.context = null;
    this.cycle = null;
    this.player = null;
    this.bubbles = bubbles();
    this.pressedKeys = pressedKeys();
  }

  initialize() {
    this.canvas = addRef('canvas');
    this.context = this.canvas.getContext('2d');
  }

  setStatus(status) {
    this.status = status;
  }

  clear() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  onKeyDown(charCode) {
    if (this.pressedKeys.indexOf(charCode) === -1) {
      this.pressedKeys.push(charCode);
    }
  }

  onKeyUp() {
    this.pressedKeys = pressedKeys();
  }

  drawRectangle({ x, y, width, height }, background) {
    this.context.fillStyle = background;
    this.context.fillRect(x, y, width, height);
  }

  drawPlayer() {
    if (this.player) {
      this.player.draw();
    } else {
      this.player = Player({ context: this.context });
    }
  }

  drawWather() {
    this.drawRectangle({ x: 0, y: 50, width: 1000, height: this.canvas.height - 50 }, '#3cbff0');
  }

  bubbleCreator() {
    const currentBubblesLength = this.bubbles.length;
    const newBubble = Bubble({ context: this.context });
    if (newBubble) {
      this.bubbles.push(newBubble);
    }
  }

  bubbleAnimator() {
    let toRemove = [];
    this.bubbles.map((bubble, i) => {
      bubble.move();
      bubble.draw();
      if(bubble.collision(this.player)) {
        this.player.setLife(-5);
      }
      if (bubble.x < -10) {
        toRemove.push(i);
      }
    });
    toRemove.map((a) => {
      this.bubbles.splice(a, 1);
    });
  }

  playerAnimator() {
    this.player.autoMove(-0.5, -0.2);
    if (this.pressedKeys.length > 0) {
      this.player.move(this.pressedKeys);
    }
  }

  playerLife() {
    if (this.player.life <= 0) {
      this.status = 'stopped';
    }
  }

  gameChecker() {
    console.log(this.player.life);
  }

  gamePlaying() {
    if (this.status === 'playing') {
      this.bubbleCreator();
      this.bubbleAnimator();
      this.playerAnimator();
      this.playerLife();
    }
  }

  gameStopped() {
    if (this.status === 'stopped') {
      console.log('stopped');
    }
  }
}
