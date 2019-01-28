import Shot from './shot';
import CommonBubble from './commonBubble';
import Drawer from './drawer';
import Player from './player';
import LifeBubble from './lifeBubble';
import DeathBubble from './deathBubble';
import { addRef } from '../../../common/global';
import * as types from '../../../common/constants';
import ray_gun from '../../../assets/audio/ray_gun.mp3';
import levelConfigs from './levelConfigs';

const bubbles = () => [];
const lifeBubbles = () => [];
const deathBubbles = () => [];
const shots = () => [];
const pressedKeys = () => [];

export default class Game extends Drawer {
  constructor() {
    super();
    this.externalMethods = {};
    this.startValues();
    this.setStatus(types.GAME_INITIAL);
  }

  startValues() {
    this.canvas = null;
    this.context = null;
    this.cycle = null;
    this.lapse = 0;
    this.player = null;
    this.episode = 1;
    this.setLevel(1);
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
      this.player = Player({
        context: this.context,
        waterBorderTop: this.levelConfig.WATER_BORDER_TOP
      });
    }
  }

  drawAir() {
    this.drawRectangle({
      context: this.context,
      x: 0,
      y: 0,
      width: types.CANVAS_WIDTH,
      height: this.levelConfig.WATER_BORDER_TOP,
      background: this.levelConfig.AIR_BACKGROUND
    });
  }

  drawWater() {
    this.drawRectangle({
      context: this.context,
      x: 0,
      y: this.levelConfig.WATER_BORDER_TOP,
      width: types.CANVAS_WIDTH,
      height: this.canvas.height - this.levelConfig.WATER_BORDER_TOP,
      background: this.levelConfig.WATER_BACKGROUND
    });
  }

  drawWaterFloor() {
    const { context } = this;
    this.drawRectangle({
      context,
      x: 0,
      y: this.canvas.height - this.levelConfig.FLOOR_BORDER_TOP,
      width: types.CANVAS_WIDTH,
      height: this.levelConfig.FLOOR_BORDER_TOP,
      background: this.levelConfig.FLOOR_BACKGROUND,
      borderWidth: 0,
      borderColor: ''
    })
  }

  checkLevel() {
    if (this.player.points >= 100 && this.player.points < 200) {
      this.setLevel(2);
    }
    if (this.player.points >= 200) {
      this.setLevel(3);
    }
  }

  setLevel(level) {
    this.level = level;
    this.levelConfig = levelConfigs[level];
  }

  bubbleCreator() {
    //  const currentBubblesLength = this.bubbles.length;
    const { context, levelConfig } = this;
    const newBubble = CommonBubble({ context, levelConfig });
    if (newBubble) {
      this.bubbles.push(newBubble);
    }
  }

  lifeBubbleCreator() {
    //  const currentBubblesLength = this.lifeBubbles.length;
    const { context, levelConfig } = this;
    const newBubble = LifeBubble({ context, levelConfig });
    if (newBubble) {
      this.lifeBubbles.push(newBubble);
    }
  }

  deathBubbleCreator() {
    //  const currentBubblesLength = this.deathBubbles.length;
    const { context, levelConfig } = this;
    const newBubble = DeathBubble({ context, levelConfig });
    if (newBubble) {
      this.deathBubbles.push(newBubble);
    }
  }

  shotCreator() {
    //  const currentShotsLength = this.shots.length;
    const newShot = Shot({ context: this.context, player: this.player });
    if (newShot) {
      const showAudio = new Audio(ray_gun);
      showAudio.play();
      this.shots.push(newShot);
    }
  }

  bubbleAnimator() {
    let toRemove = [];
    this.bubbles.forEach((bubble, i) => {
      if (this.status === types.GAME_PLAYING) {
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
    toRemove.forEach((a) => {
      this.bubbles.splice(a, 1);
    });
  }

  lifeBubbleAnimator() {
    let toRemove = [];
    this.lifeBubbles.forEach((bubble, i) => {
      if (this.status === types.GAME_PLAYING) {
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
    toRemove.forEach((a) => {
      this.lifeBubbles.splice(a, 1);
    });
  }

  deathBubbleAnimator() {
    let toRemove = [];
    this.deathBubbles.forEach((bubble, i) => {
      if (this.status === types.GAME_PLAYING) {
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
    toRemove.forEach((a) => {
      this.deathBubbles.splice(a, 1);
    });
  }

  shotAnimator() {
    let toRemove = [];
    this.shots.forEach((shot, i) => {
      if (this.status === types.GAME_PLAYING) {
        shot.move();
        if (shot.x > types.CANVAS_WIDTH) {
          toRemove.push(i);
        }
      }
      shot.draw();
    });
    toRemove.forEach((a) => {
      this.shots.splice(a, 1);
    });
  }

  removeShot(shot) {
    this.shots.splice(shot, 1);
  }

  playerAnimator() {
    this.player.setOxygen(-0.2);

    if (this.player.y < this.levelConfig.WATER_BORDER_TOP) {
      this.player.setOxygen(1.2);
    }

    if (this.player.x >= 0) {
      this.player.autoMove(-0.5, 0);
    }
    if (this.player.y >= this.levelConfig.WATER_BORDER_TOP - (this.player.height / 3)) {
      this.player.autoMove(0, -0.2);
    }
    if (this.pressedKeys.length > 0) {
      if (this.player.isMoving) {
        this.player.setAnim();
      }
      this.player.move(this.pressedKeys, this.levelConfig.WATER_BORDER_TOP, this.levelConfig.FLOOR_BORDER_TOP);
      const shotIndex = this.pressedKeys.indexOf(types.KEY_S)
      if (shotIndex > -1) {
        this.pressedKeys.splice(shotIndex, 1);
        if (this.player.energy >= 5) {
          this.shotCreator();
          this.player.setEnergy(-2);
        }
      }
    }
    if (this.player.outOfPlace(this.levelConfig.FLOOR_BORDER_TOP)) {
      this.player.setLife(-5);
    }
  }

  playerLife() {
    if (this.player.life <= 0 || this.player.oxygen <= 0) {
      this.setStatus(types.GAME_STOPPED);
    }
  }

  drawStats() {
    const { context, status, level, episode } = this;
    const font = '12px Arial';
    const color = 'black';
    const y = 15;
    const life = this.player.life;
    const seconds = this.lapse / 100;
    const energy = this.player.energy;
    const points = this.player.points;
    const oxygen = this.player.oxygen;
    this.externalMethods.updateStats({
      life,
      level,
      oxygen,
      status,
      points,
      energy,
      seconds,
      episode
    });
    this.drawText({ context, font, text: `Seconds: ${seconds}`, color, x: 10, y });
    this.drawText({ context, font, text: `Oxygen: ${oxygen.toFixed(2)}`, color, x: 120, y })
    this.drawText({ context, font, text: `Life: ${life}`, color, x: 240, y });
    this.drawText({ context, font, text: `Energy: ${energy}`, color, x: 330, y });
    this.drawText({ context, font, text: `Points: ${points}`, color, x: 850, y });
    this.drawText({ context, font, text: `Level: ${level}`, color, x: 950, y });
  }

  checkForPause() {
    if (this.pressedKeys.indexOf(types.KEY_P) > -1) {
      this.pressedKeys = pressedKeys();
      if (this.status === types.GAME_PLAYING) {
        this.setStatus(types.GAME_PAUSED);
        return null;
      }
      if (this.status === types.GAME_PAUSED) {
        this.setStatus(types.GAME_PLAYING);
        return null;
      }
    }
  }

  checkForStart() {
    if (this.pressedKeys.indexOf(types.KEY_I) > -1 && this.status === types.GAME_INITIAL) {
      this.pressedKeys = pressedKeys();
      this.setStatus(types.GAME_PLAYING);
    }
  }

  checkForRestarting() {
    if (this.pressedKeys.indexOf(types.KEY_R) > -1 && this.status === types.GAME_STOPPED) {
      this.pressedKeys = pressedKeys();
      this.startValues();
      this.initialize();
      this.setStatus(types.GAME_PLAYING);
    }
  }

  gamePlaying() {
    if (this.status === types.GAME_PLAYING) {
      this.doLapse();
      this.checkLevel();
      this.drawWaterFloor();
      this.bubbleCreator();
      this.bubbleAnimator();
      this.lifeBubbleCreator();
      this.lifeBubbleAnimator();
      this.deathBubbleCreator();
      this.deathBubbleAnimator();
      this.shotAnimator();
      this.drawStats();
      this.playerAnimator();
      this.playerLife();
    }
    if (this.status === types.GAME_PAUSED) {
      this.bubbleAnimator();
      this.lifeBubbleAnimator();
      this.deathBubbleAnimator();
      this.shotAnimator();
      this.drawStats();
    }
    if (this.status === types.GAME_PAUSED || this.status === types.GAME_PLAYING) {
      this.checkForPause()
    }
    if (this.status === types.GAME_INITIAL) {
      this.checkForStart()
    }
    if (this.status === types.GAME_STOPPED) {
      this.drawStats();
      this.checkForRestarting()
    }
  }

  gameIniting() {
    //  const { context } = this;
    if (this.status === types.GAME_INITIAL) {
    }
  }

  gameStopped() {
    //  const { context } = this;
    if (this.status === types.GAME_STOPPED) {
    }
  }
}
