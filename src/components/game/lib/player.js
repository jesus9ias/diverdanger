import Drawer from './drawer';
import * as types from'../../../common/constants';

class Player extends Drawer {
  constructor({ context, waterBorder }) {
    super();
    this.context = context;
    this.sx = 0;
    this.sy = 0;
    this.x = 100;
    this.y = waterBorder + 50;
    this.width = 36;
    this.height = 36;
    this.speed = 5;
    this.points = 0;
    this.life = types.LIFE_INITIAL;
    this.oxygen = types.OXYGEN_INITIAL;
    this.energy = types.ENERGY_INITIAL;
    this.fase = 0;
    this.isMoving = false;
  }

  draw() {
    const { context, sx, sy, x, y, width, height } = this;
    const img = document.getElementById("player");
    this.drawImage({
      context,
      img,
      sx,
      sy,
      swidth: 256,
      sheight: 256,
      x,
      y,
      width,
      height
    });
  }

  move(charCodes, waterBorder) {
    if (charCodes.indexOf(types.KEY_LEFT) > -1
      && charCodes.length <= 2
      && this.x >= 0
    ) {
      this.x -= this.speed * 1.5;
    }
    if (charCodes.indexOf(types.KEY_UP) > -1
      && charCodes.length <= 2
      && this.y >= waterBorder - (this.height / 3)
    ) {
      this.y -= this.speed;
      this.setOxygen(-0.3);
    }
    if (charCodes.indexOf(types.KEY_RIGHT) > -1
      && charCodes.length <= 2
      && this.x <= types.CANVAS_WIDTH - this.width
    ) {
      this.x += this.speed / 3;
      this.setOxygen(-0.5);
    }
    if (charCodes.indexOf(types.KEY_DOWN) > -1
      && charCodes.length <= 2
      && this.y <= types.CANVAS_HEIGHT - this.height
    ) {
      this.y += this.speed;
      this.setOxygen(-0.3);
    }

    if (charCodes.indexOf(types.KEY_LEFT) > -1
    || charCodes.indexOf(types.KEY_UP) > -1
    || charCodes.indexOf(types.KEY_RIGHT) > -1
    || charCodes.indexOf(types.KEY_DOWN) > -1
    ) {
      this.isMoving = true;
    } else {
      this.isMoving = false;
    }
  }

  autoMove(x, y = 0) {
    this.x += x;
    this.y += y;
  }

  outOfPlace() {
    if (this.x < 0
      || this.x > types.CANVAS_WIDTH - this.width
      || this.y > types.CANVAS_HEIGHT - this.height
    ) {
      return true;
    }
    return false;
  }

  setLife(points) {
    this.life += points;
  }

  setEnergy(points) {
    this.energy += points;
  }

  setOxygen(points) {
    if (this.oxygen <= types.OXYGEN_INITIAL) {
      this.oxygen += points;
    }
    if (this.oxygen > types.OXYGEN_INITIAL) {
      this.oxygen = types.OXYGEN_INITIAL;
    }
  }

  setPoints(points) {
    this.points += points;
  }

  setAnim() {
    if (this.fase < 10) { this.sx = 0; this.sy = 0; }
    if (this.fase < 20 && this.fase >= 10) { this.sx = 256; this.sy = 0; }
    if (this.fase < 30 && this.fase >= 20) { this.sx = 512; this.sy = 0; }
    if (this.fase < 40 && this.fase >= 30) { this.sx = 768; this.sy = 0; }
    if (this.fase < 50 && this.fase >= 40) { this.sx = 0; this.sy = 256; }
    if (this.fase < 60 && this.fase >= 50) { this.sx = 256; this.sy = 256; }
    if (this.fase < 70 && this.fase >= 60) { this.sx = 512; this.sy = 256; }
    if (this.fase < 80 && this.fase >= 70) { this.sx = 768; this.sy = 256; }
    if (this.fase < 90 && this.fase >= 80) { this.sx = 0; this.sy = 512; }
    if (this.fase < 100 && this.fase >= 90) { this.sx = 0; this.sy = 768; }

    if (this.fase === 100) {
      this.fase = 0;
    } else {
      this.fase++;
    }
  }
}

export default (data) => {
  return new Player(data);
};
