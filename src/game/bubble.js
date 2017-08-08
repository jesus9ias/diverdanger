import Drawer from '../common/drawer';
import * as types from '../common/constants';

class Bubble extends Drawer {
  constructor({ context }) {
    super();
    this.context = context;
    this.x = types.OBJECT_INIT_X;
    this.y = Math.floor(Math.random() * types.OBJECT_MAX_Y) + types.OBJECT_MIN_Y;
    this.radius = Math.floor(Math.random() * 10) + 5;
    this.xSpeed = Math.floor(Math.random() * 3) + 1;
    this.ySpeed = Math.floor(Math.random() * 2) + 1;
    this.xDirection = 'left';
    this.yDirection = null;
  }

  draw() {
    const { context, x, y, radius } = this;
    this.drawCircle({
      context,
      x,
      y,
      radius,
      borderWidth: 1,
      borderColor: 'black',
      background: 'white'
    });
  }

  changeYDirection() {
    const random = Math.floor(Math.random() * 100) + 1;
    if (random < 5) {
      this.yDirection = this.yDirection === 'top' ? 'bottom' : 'top';
    }
    if (random >= 5 && random < 10) {
      this.yDirection = null;
    }
  }

  move() {
    this.changeYDirection();

    if (this.xDirection) {
      if (this.xDirection === 'left') {
        this.x -= this.xSpeed;
      }
      if (this.xDirection === 'right') {
        this.x += this.xSpeed;
      }
    }

    if (this.yDirection) {
      if (this.yDirection === 'top' && this.y > types.OBJECT_MIN_Y) {
        this.y -= this.ySpeed;
      }
      if (this.yDirection === 'bottom' && this.y < types.OBJECT_MAX_Y) {
        this.y += this.ySpeed;
      }
    }
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
  const random = Math.floor(Math.random() * 100) + 1;
  return (random < 5) ? new Bubble(data) : null ;
};
