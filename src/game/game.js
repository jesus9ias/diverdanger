import { addRef } from '../common/global';
import Drawer from '../common/drawer';
import * as types from '../common/constants';
import Bubble from './bubble';
import LifeBubble from './lifeBubble';
import DeathBubble from './deathBubble';
import Shot from './shot';
import Player from './player';

const bubbles = () => [];
const lifeBubbles = () => [];
const deathBubbles = () => [];
const shots = () => [];
const pressedKeys = () => [];

const skorpion_gun = new Audio('dist/assets/audio/ray_gun.mp3');

export default class Game extends Drawer {
  constructor() {
    super();
    this.status = 'initial';
    this.canvas = null;
    this.context = null;
    this.cycle = null;
    this.player = null;
    this.waterBorder = types.WATER_BORDER;
    this.bubbles = bubbles();
    this.lifeBubbles = lifeBubbles();
    this.deathBubbles = deathBubbles();
    this.shots = shots();
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
      this.player = Player({ context: this.context, waterBorder: this.waterBorder });
    }
  }

  drawWater() {
    this.drawRectangle({
      context: this.context,
      x: 0,
      y: this.waterBorder,
      width: types.CANVAS_WIDTH,
      height: this.canvas.height - this.waterBorder,
      background: types.WATER_BACKGROUND
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

  shotCreator() {
    const currentShotsLength = this.shots.length;
    const newShot = Shot({ context: this.context, player: this.player });
    if (newShot) {
      skorpion_gun.play();
      this.shots.push(newShot);
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
      const collision = bubble.shotCollision(this.shots);
      if(collision) {
        toRemove.push(i);
        this.removeShot(collision);
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
      const collision = bubble.shotCollision(this.shots);
      if(collision) {
        toRemove.push(i);
        this.removeShot(collision);
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
      const collision = bubble.shotCollision(this.shots);
      if(collision) {
        toRemove.push(i);
        this.removeShot(collision);
      }
      if (bubble.x < -30) {
        toRemove.push(i);
      }
    });
    toRemove.map((a) => {
      this.deathBubbles.splice(a, 1);
    });
  }

  shotAnimator() {
    let toRemove = [];
    this.shots.map((shot, i) => {
      shot.move();
      shot.draw();
      if (shot.x > types.CANVAS_WIDTH) {
        toRemove.push(i);
      }
    });
    toRemove.map((a) => {
      this.shots.splice(a, 1);
    });
  }

  removeShot(shot) {
    this.shots.splice(shot, 1);
  }

  playerAnimator() {
    this.player.setOxygen(-0.2);

    if (this.player.y < this.waterBorder) {
      this.player.setOxygen(1.2);
    }

    if (this.player.x >= 0) {
      this.player.autoMove(-0.5, 0);
    }
    if (this.player.y >= this.waterBorder - (this.player.height / 2)) {
      this.player.autoMove(0, -0.2);
    }
    if (this.pressedKeys.length > 0) {
      if (this.player.isMoving) {
        this.player.setAnim();
      }
      this.player.move(this.pressedKeys, this.waterBorder);
      if (this.pressedKeys.indexOf(types.KEY_S) > -1) {
        if (this.player.energy >= 5) {
          this.shotCreator();
          this.player.setEnergy(-2);
        }
      }
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
    console.info('Oyigen:', this.player.oxygen);
    console.info('Life:', this.player.life);
    console.info('Energy:', this.player.energy);
  }

  gamePlaying() {
    if (this.status === 'playing') {
      this.bubbleCreator();
      this.bubbleAnimator();
      this.lifeBubbleCreator();
      this.lifeBubbleAnimator();
      this.deathBubbleCreator();
      this.deathBubbleAnimator();
      //  this.shotCreator();
      this.shotAnimator();
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
