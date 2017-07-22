import Drawer from '../common/drawer';
import * as types from '../common/constants';

class LifeBubble extends Drawer {
  constructor({ context }) {
    super();
    this.context = context;
    this.x = types.OBJECT_INIT_X;
    this.y = Math.floor(Math.random() * types.OBJECT_MAX_Y) + types.OBJECT_MIN_Y;
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

  shotCollision(shots) {
    let isCollision = false;
    shots.map((shot, i) => {
      if (!isCollision) {
        if (this.circleCollision(shot, this.x, this.y, this.radius)) {
          isCollision = i;
        }
      }
    });
    return isCollision;
  }
}

export default (data) => {
  const random = Math.floor(Math.random() * 500) + 1;
  return (random < 5) ? new LifeBubble(data) : null ;
};
