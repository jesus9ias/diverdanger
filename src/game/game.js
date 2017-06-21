import { addRef } from '../common/global';
import Drawer from '../common/drawer';
import Bubble from './bubble';
import LifeBubble from './lifeBubble';
import DeathBubble from './deathBubble';
import Player from './player';

const bubbles = () => [];
const lifeBubbles = () => [];
const deathBubbles = () => [];
const pressedKeys = () => [];

export default class Game extends Drawer {
  constructor() {
    super();
    this.status = 'initial';
    this.canvas = null;
    this.context = null;
    this.cycle = null;
    this.player = null;
    this.bubbles = bubbles();
    this.lifeBubbles = lifeBubbles();
    this.deathBubbles = deathBubbles();
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

  drawPlayer() {
    if (this.player) {
      this.player.draw();
    } else {
      this.player = Player({ context: this.context });
    }
  }

  drawWather() {
    this.drawRectangle({
      context: this.context,
      x: 0,
      y: 50,
      width: 1000,
      height: this.canvas.height - 50,
      background: '#3cbff0'
    });
  }

  bubbleCreator() {
    const currentBubblesLength = this.bubbles.length;
    const newBubble = Bubble({ context: this.context });
    if (newBubble) {
      this.bubbles.push(newBubble);
    }
  }

  lifeBubbleCreator() {
    const currentBubblesLength = this.lifeBubbles.length;
    const newBubble = LifeBubble({ context: this.context });
    if (newBubble) {
      this.lifeBubbles.push(newBubble);
    }
  }

  deathBubbleCreator() {
    const currentBubblesLength = this.deathBubbles.length;
    const newBubble = DeathBubble({ context: this.context });
    if (newBubble) {
      this.deathBubbles.push(newBubble);
    }
  }

  bubbleAnimator() {
    let toRemove = [];
    this.bubbles.map((bubble, i) => {
      bubble.move();
      bubble.draw();
      if(bubble.collision(this.player)) {
        this.player.setLife(-5);
        toRemove.push(i);
      }
      if (bubble.x < -10) {
        toRemove.push(i);
      }
    });
    toRemove.map((a) => {
      this.bubbles.splice(a, 1);
    });
  }

  lifeBubbleAnimator() {
    let toRemove = [];
    this.lifeBubbles.map((bubble, i) => {
      bubble.move();
      bubble.draw();
      if(bubble.collision(this.player)) {
        this.player.setLife(5);
        toRemove.push(i);
      }
      if (bubble.x < -10) {
        toRemove.push(i);
      }
    });
    toRemove.map((a) => {
      this.lifeBubbles.splice(a, 1);
    });
  }

  deathBubbleAnimator() {
    let toRemove = [];
    this.deathBubbles.map((bubble, i) => {
      bubble.move();
      bubble.draw();
      if(bubble.collision(this.player)) {
        this.player.setLife(-100);
        toRemove.push(i);
      }
      if (bubble.x < -30) {
        toRemove.push(i);
      }
    });
    toRemove.map((a) => {
      this.deathBubbles.splice(a, 1);
    });
  }

  playerAnimator() {
    this.player.setOxygen(-0.2);
    this.player.setAnim();

    if (this.player.y < 50) {
      this.player.setOxygen(1.2);
    }

    if (this.player.x >= 0) {
      this.player.autoMove(-0.5, 0);
    }
    if (this.player.y >= 50 - (this.player.height / 2)) {
      this.player.autoMove(0, -0.2);
    }
    if (this.pressedKeys.length > 0) {
      this.player.move(this.pressedKeys);
    }
    if (this.player.outOfPlace()) {
      this.player.setLife(-5);
    }
  }

  playerLife() {
    if (this.player.life <= 0 || this.player.oxygen <= 0) {
      this.status = 'stopped';
    }
  }

  gameChecker() {
    console.info('oyigen:', this.player.oxygen);
    console.info('life:', this.player.life);
  }

  gamePlaying() {
    if (this.status === 'playing') {
      this.bubbleCreator();
      this.bubbleAnimator();
      this.lifeBubbleCreator();
      this.lifeBubbleAnimator();
      this.deathBubbleCreator();
      this.deathBubbleAnimator();
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
