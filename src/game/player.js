import Drawer from '../common/drawer';

class Player extends Drawer {
  constructor({ context }) {
    super();
    this.context = context;
    this.x = 100;
    this.y = 100;
    this.speed = 5;
    this.life = 1000;
    this.oxygen = 1000;
    this.energy = 1000;
  }

  draw() {
    const { context, x, y } = this;
    this.drawCircle({
      context,
      x,
      y,
      radius: 12,
      background: 'red',
      borderWidth: 1,
      borderColor: 'red'
    });
  }

  move(charCodes) {
    if (charCodes.indexOf(37) > -1
      && charCodes.length <= 2
      && this.x >= 0
    ) {
      this.x -= this.speed / 3;
    }
    if (charCodes.indexOf(38) > -1
      && charCodes.length <= 2
      && this.y >= 60
    ) {
      this.y -= this.speed;
    }
    if (charCodes.indexOf(39) > -1
      && charCodes.length <= 2
      && this.x <= 990
    ) {
      this.x += this.speed;
    }
    if (charCodes.indexOf(40) > -1
      && charCodes.length <= 2
      && this.y <= 490
    ) {
      this.y += this.speed;
    }
  }

  autoMove(x, y = 0) {
    this.x += x;
    this.y += y;
  }

  outOfPlace() {
    if (this.x <= 0
      || this.x >= 990
      || this.y >= 490
    ) {
      return true;
    }
    return false;
  }

  setLife(points) {
    this.life += points;
  }
}

export default (data) => {
  return new Player(data);
};
