import Drawer from '../common/drawer';

class Player extends Drawer {
  constructor({ context }) {
    super();
    this.context = context;
    this.x = 100;
    this.y = 100;
    this.speed = 10;
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

  move(charCode) {
    if (charCode === 37) {
      this.x -= this.speed / 3;
    }
    if (charCode === 38) {
      this.y -= this.speed;
    }
    if (charCode === 39) {
      this.x += this.speed;
    }
    if (charCode === 40) {
      this.y += this.speed;
    }
  }
}

export default (data) => {
  return new Player(data);
};
