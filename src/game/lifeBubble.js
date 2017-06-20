import Drawer from '../common/drawer';

class LifeBubble extends Drawer {
  constructor({ context }) {
    super();
    this.context = context;
    this.x = 1010;
    this.y = Math.floor(Math.random() * 435) + 55;
    this.radius = Math.floor(Math.random() * 2) + 2;
    this.speed = Math.floor(Math.random() * 3) + 1;
  }

  draw() {
    const { context, x, y, radius } = this;
    this.drawCircle({
      context,
      x,
      y,
      radius,
      borderWidth: 1,
      borderColor: 'red',
      background: 'transparent'
    });
  }

  move() {
    this.x -= this.speed;
  }

  collision(player) {
    return this.circleCollision(player, this.x, this.y, this.radius);
  }
}

export default (data) => {
  const random = Math.floor(Math.random() * 500) + 1;
  return (random < 5) ? new LifeBubble(data) : null ;
};
