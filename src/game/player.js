import Drawer from '../common/drawer';

class Player extends Drawer {
  constructor({ context }) {
    super();
    this.context = context;
    this.x = 100;
    this.y = 100;
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

  move() {

  }

  collision(bubbles) {
    bubbles.map((bubble) => {
      if (this.x >= bubble.x
        && this.x <= bubble.x + (bubble.radius * 2)
        && this.y >= bubble.y
        && this.y <= bubble.y + (bubble.radius * 2)
      ) {
        console.log('collision!!');
      }
    });
  }
}

export default (data) => {
  return new Player(data);
};
