import Drawer from '../common/drawer';

class Shot extends Drawer {
  constructor({ context, player }) {
    super();
    this.context = context;
    this.x = player.x + player.width;
    this.y = player.y + (player.height / 2);
    this.width = 2;
    this.height = 2;
    this.speed = 5;
  }

  draw() {
    const { context, x, y, width, height } = this;
    this.drawRectangle({
      context,
      x,
      y,
      width,
      height,
      borderWidth: 1,
      borderColor: 'yellow',
      background: 'red'
    });
  }

  move() {
    this.x += this.speed;
  }

  collision(player) {
    return this.circleCollision(player, this.x, this.y, this.radius);
  }
}

export default (data) => {
  return new Shot(data);
};
