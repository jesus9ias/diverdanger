import { addRef } from '../../../common/global';
import Drawer from './drawer';
import * as types from'../../../common/constants';
import Bubble from './bubble';
import LifeBubble from './lifeBubble';
import DeathBubble from './deathBubble';
import Shot from './shot';
import Player from './player';
import ray_gun from '../../../assets/audio/ray_gun.mp3';

const bubbles = () => [];
const lifeBubbles = () => [];
const deathBubbles = () => [];
const shots = () => [];
const pressedKeys = () => [];

const skorpion_gun = new Audio(ray_gun);

export default class Game extends Drawer {
  constructor() {
    super();
    this.externalMethods = {};
    this.startValues();
    this.setStatus('initial');
  }

  startValues() {
    this.canvas = null;
    this.context = null;
    this.cycle = null;
    this.lapse = 0;
    this.player = null;
    this.showedSocores = 0;
    this.level = 1;
    this.waterBorder = types.WATER_BORDER;
    this.bubbles = bubbles();
    this.lifeBubbles = lifeBubbles();
    this.deathBubbles = deathBubbles();
    this.shots = shots();
    this.pressedKeys = pressedKeys();
  }

  setExternalMethods(methods) {
    this.externalMethods = methods;
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

  doLapse() {
    this.lapse++;
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

  waterBottom() {
    const { context } = this;
    this.drawRectangle({
      context,
      x: 0,
      y: 495,
      width: 1000,
      height: 5,
      background: 'brown',
      borderWidth: 0,
      borderColor: ''
    })
  }

  checkLevel() {
    if (this.level === 1 && this.player.points >= 100) {
      this.setLevel(2);
    }
  }

  setLevel(level) {
    this.level = level;
  }

  bubbleCreator() {
    //  const currentBubblesLength = this.bubbles.length;
    const newBubble = Bubble({ context: this.context });
    if (newBubble) {
      this.bubbles.push(newBubble);
    }
  }

  lifeBubbleCreator() {
    //  const currentBubblesLength = this.lifeBubbles.length;
    const newBubble = LifeBubble({ context: this.context });
    if (newBubble) {
      this.lifeBubbles.push(newBubble);
    }
  }

  deathBubbleCreator() {
    //  const currentBubblesLength = this.deathBubbles.length;
    const newBubble = DeathBubble({ context: this.context });
    if (newBubble) {
      this.deathBubbles.push(newBubble);
    }
  }

  shotCreator() {
    //  const currentShotsLength = this.shots.length;
    const newShot = Shot({ context: this.context, player: this.player });
    if (newShot) {
      skorpion_gun.play();
      this.shots.push(newShot);
    }
  }

  bubbleAnimator() {
    let toRemove = [];
    // eslint-disable-next-line
    this.bubbles.map((bubble, i) => {
      if (this.status === 'playing') {
        bubble.move();
        if(bubble.collision(this.player)) {
          this.player.setLife(-5);
          toRemove.push(i);
        }
        const collision = bubble.shotCollision(this.shots);
        if(collision) {
          toRemove.push(i);
          this.removeShot(collision);
          this.player.setPoints(5);
        }
        if (bubble.x < -10) {
          toRemove.push(i);
        }
      }
      bubble.draw();
    });
    // eslint-disable-next-line
    toRemove.map((a) => {
      this.bubbles.splice(a, 1);
    });
  }

  lifeBubbleAnimator() {
    let toRemove = [];
    // eslint-disable-next-line
    this.lifeBubbles.map((bubble, i) => {
      if (this.status === 'playing') {
        bubble.move();
        if(bubble.collision(this.player)) {
          this.player.setLife(5);
          toRemove.push(i);
        }
        const collision = bubble.shotCollision(this.shots);
        if(collision) {
          toRemove.push(i);
          this.removeShot(collision);
          this.player.setPoints(-5);
        }
        if (bubble.x < -10) {
          toRemove.push(i);
        }
      }
      bubble.draw();
    });
    // eslint-disable-next-line
    toRemove.map((a) => {
      this.lifeBubbles.splice(a, 1);
    });
  }

  deathBubbleAnimator() {
    let toRemove = [];
    // eslint-disable-next-line
    this.deathBubbles.map((bubble, i) => {
      if (this.status === 'playing') {
        bubble.move();
        if(bubble.collision(this.player)) {
          this.player.setLife(-100);
          toRemove.push(i);
        }
        const collision = bubble.shotCollision(this.shots);
        if(collision) {
          toRemove.push(i);
          this.removeShot(collision);
          this.player.setPoints(10);
        }
        if (bubble.x < -30) {
          toRemove.push(i);
        }
      }
      bubble.draw();
    });
    // eslint-disable-next-line
    toRemove.map((a) => {
      this.deathBubbles.splice(a, 1);
    });
  }

  shotAnimator() {
    let toRemove = [];
    // eslint-disable-next-line
    this.shots.map((shot, i) => {
      if (this.status === 'playing') {
        shot.move();
        if (shot.x > types.CANVAS_WIDTH) {
          toRemove.push(i);
        }
      }
      shot.draw();
    });
    // eslint-disable-next-line
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
      const shotIndex = this.pressedKeys.indexOf(types.KEY_S)
      if (shotIndex > -1) {
        this.pressedKeys.splice(shotIndex, 1);
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
      this.setStatus('stopped');
    }
  }

  showInfo() {
    const { context } = this;
    this.drawRectangle({
      context,
      x: 10,
      y: 440,
      width: 100,
      height: 50,
      background: 'transparent',
      borderWidth: 3,
      borderColor: '#1f364d'
    });
    const font = '10px Arial';
    const color = 'white';
    const x = 15;
    const level = this.level;
    const life = this.player.life;
    const seconds = this.lapse / 100;
    const energy = this.player.energy;
    const points = this.player.points;
    const oxygen = this.player.oxygen;
    this.externalMethods.updateScores({
      life,
      level,
      oxygen,
      points,
      energy,
      seconds
    });
    this.drawText({ context, font, text: `Seconds: ${seconds}`, color, x, y: 450 });
    this.drawText({ context, font, text: `Oxygen: ${oxygen.toFixed(2)}`, color, x, y: 461 })
    this.drawText({ context, font, text: `Life: ${life}`, color, x, y: 472 });
    this.drawText({ context, font, text: `Energy: ${energy}`, color, x, y: 483 });
  }

  gameChecker() {
    console.info('Seconds:', this.lapse / 100);
    console.info('Oyigen:', this.player.oxygen);
    console.info('Life:', this.player.life);
    console.info('Energy:', this.player.energy);
  }

  checkForPause() {
    if (this.pressedKeys.indexOf(types.KEY_P) > -1) {
      this.pressedKeys = pressedKeys();
      if (this.status === 'playing') {
        this.setStatus('paused');
        return null;
      }
      if (this.status === 'paused') {
        this.setStatus('playing');
        return null;
      }
    }
  }

  checkForStart() {
    if (this.pressedKeys.indexOf(types.KEY_I) > -1 && this.status === 'initial') {
      this.pressedKeys = pressedKeys();
      this.setStatus('playing');
    }
  }

  checkForRestarting() {
    if (this.pressedKeys.indexOf(types.KEY_R) > -1 && this.status === 'stopped') {
      this.showedSocores = 0;
      //  renderElement('dialogs', '');
      this.pressedKeys = pressedKeys();
      this.startValues();
      this.initialize();
      this.setStatus('playing');
    }
  }

  gamePlaying() {
    if (this.status === 'playing') {
      this.doLapse();
      this.checkLevel();
      this.waterBottom();
      this.bubbleCreator();
      this.bubbleAnimator();
      this.lifeBubbleCreator();
      this.lifeBubbleAnimator();
      this.deathBubbleCreator();
      this.deathBubbleAnimator();
      this.shotAnimator();
      this.showInfo();
      this.playerAnimator();
      this.playerLife();
    }
    if (this.status === 'paused') {
      this.bubbleAnimator();
      this.lifeBubbleAnimator();
      this.deathBubbleAnimator();
      this.shotAnimator();
      this.showInfo();
    }
    if (this.status === 'paused' || this.status === 'playing') {
      this.checkForPause()
    }
    if (this.status === 'initial') {
      this.checkForStart()
    }
    if (this.status === 'stopped') {
      this.checkForRestarting()
    }
  }

  gameIniting() {
    const { context } = this;
    if (this.status === 'initial') {
      this.drawRectangle({
        context,
        x: 350,
        y: 190,
        width: 300,
        height: 100,
        background: 'transparent',
        borderWidth: 10,
        borderColor: '#1f364d'
      });
      const font = '20px Arial';
      const color = 'white';
      const x = 390;
      const y = 245;
      this.showedSocores = 0;
      //  renderElement('dialogs', '');
      this.drawText({ context, font, text: 'Press i to start the game', color, x, y });
    }
  }

  gameStopped() {
    const { context } = this;
    if (this.status === 'stopped') {
      this.drawRectangle({
        context,
        x: 350,
        y: 190,
        width: 300,
        height: 100,
        background: 'transparent',
        borderWidth: 10,
        borderColor: '#a20d37'
      });
      const font = '20px Arial';
      const color = 'white';
      const x = 360;
      const y = 245;
      this.drawText({ context, font, text: 'Game ended, Press r to restart', color, x, y });
      if (this.showedSocores === 0) {
        console.log(this.showedSocores);
        //  const seconds = this.lapse / 100;
        //  Scores(seconds, this.player.oxygen, this.player.life, this.player.energy, this.player.points, this.level);
        this.showedSocores = 1;
      }
    }
  }
}
