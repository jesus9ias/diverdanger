import Drawer from '../common/drawer';

class Player extends Drawer {
  constructor({ context }) {
    super();
    this.context = context;
    this.x = 100;
    this.y = 100;
    this.width = 24;
    this.height = 20;
    this.speed = 5;
    this.life = 1000;
    this.oxygen = 1000;
    this.energy = 1000;
  }

  draw() {
    const { context, x, y, width, height } = this;
    this.drawRectangle({
      context,
      x,
      y,
      width,
      height,
      background: 'red'
    });
  }

  move(charCodes) {
    if (charCodes.indexOf(37) > -1
      && charCodes.length <= 2
      && this.x >= 0
    ) {
      this.x -= this.speed * 1.5;
    }
    if (charCodes.indexOf(38) > -1
      && charCodes.length <= 2
      && this.y >= 50 - (this.height / 2)
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

  setOxygen(points) {
    if (this.oxygen <= 1000) {
      this.oxygen += points;
    }
    if (this.oxygen > 1000) {
      this.oxygen = 1000;
    }
  }
}

export default (data) => {
  return new Player(data);
};
