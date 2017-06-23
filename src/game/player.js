import Drawer from '../common/drawer';

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
    this.life = 1000;
    this.oxygen = 1000;
    this.energy = 1000;
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
    if (charCodes.indexOf(37) > -1
      && charCodes.length <= 2
      && this.x >= 0
    ) {
      this.x -= this.speed * 1.5;
    }
    if (charCodes.indexOf(38) > -1
      && charCodes.length <= 2
      && this.y >= waterBorder - (this.height / 2)
    ) {
      this.y -= this.speed;
      this.setOxygen(-0.3);
    }
    if (charCodes.indexOf(39) > -1
      && charCodes.length <= 2
      && this.x <= 1000 - this.width
    ) {
      this.x += this.speed / 3;
      this.setOxygen(-0.5);
    }
    if (charCodes.indexOf(40) > -1
      && charCodes.length <= 2
      && this.y <= 500 - this.height
    ) {
      this.y += this.speed;
      this.setOxygen(-0.3);
    }

    if (charCodes.indexOf(37) > -1
    || charCodes.indexOf(38) > -1
    || charCodes.indexOf(39) > -1
    || charCodes.indexOf(40) > -1
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
      || this.x > 1000 - this.width
      || this.y > 500 - this.height
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
    if (this.oxygen <= 1000) {
      this.oxygen += points;
    }
    if (this.oxygen > 1000) {
      this.oxygen = 1000;
    }
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
