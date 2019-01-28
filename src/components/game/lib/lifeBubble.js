import Bubble from './bubble';
import * as types from'../../../common/constants';

class LifeBubble extends Bubble {
  constructor({ context, levelConfig }) {
    super();
    this.context = context;
    this.radius = Math.floor(Math.random() * 2) + 2;
    this.maxY = types.CANVAS_HEIGHT - levelConfig.WATER_BORDER_BOTTOM - this.radius;
    this.minY = levelConfig.WATER_BORDER_TOP + this.radius;
    this.x = types.OBJECT_INIT_X;
    this.y = Math.floor(Math.random() * types.OBJECT_MAX_Y) + types.OBJECT_MIN_Y;
    this.xSpeed = Math.floor(Math.random() * 3) + 1;
    this.ySpeed = Math.floor(Math.random() * 3) + 1;
    this.xDirection = 'left';
    this.yDirection = null;
    this.borderColor = 'red';
    this.background = 'red';
    this.canChangeDirection = false;
  }

  move() {
    this.x -= this.xSpeed;
  }
}

export default (data) => {
  const random = Math.floor(Math.random() * 500) + 1;
  return (random < 5) ? new LifeBubble(data) : null ;
};
