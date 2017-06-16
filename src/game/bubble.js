import Drawer from '../common/drawer';

class Bubble extends Drawer {
  constructor({ context }) {
    super();
    this.context = context;
    this.x = 1010;
    this.y = Math.floor(Math.random() * 435) + 55;
    this.radius = Math.floor(Math.random() * 10) + 5;
    this.speed = Math.floor(Math.random() * 3) + 1;
  }

  draw() {
    const { context, x, y, radius } = this;
    this.drawCircle({
      context,
      x,
      y,
      radius,
      background: 'transparent',
      borderWidth: 1,
      borderColor: '#ffffff'
    });
  }

  move() {
    this.x -= this.speed;
  }

  collision(player) {
    if (player.x >= this.x
      && player.x <= this.x + (this.radius * 2)
      && player.y >= this.y
      && player.y <= this.y + (this.radius * 2)
    ) {
      console.log('collision!!');
    }
  }
}

export default (data) => {
  const random = Math.floor(Math.random() * 100) + 1;
  return (random < 5) ? new Bubble(data) : null ;
};
