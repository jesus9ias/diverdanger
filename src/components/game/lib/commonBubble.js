import Bubble from './bubble';
import * as types from'../../../common/constants';

class CommonBubble extends Bubble {
  constructor({ context, levelConfig }) {
    super();
    this.context = context;
    this.radius = Math.floor(Math.random() * 10) + 5;
    this.maxY = types.CANVAS_HEIGHT - levelConfig.WATER_BORDER_BOTTOM - this.radius;
    this.minY = levelConfig.WATER_BORDER_TOP + this.radius;
    this.x = types.OBJECT_INIT_X;
    this.y = Math.floor(Math.random() * (this.maxY - this.minY + 1) + this.minY);
    this.xSpeed = Math.floor(Math.random() * 3) + 1;
    this.ySpeed = Math.floor(Math.random() * 2) + 1;
    this.xDirection = 'left';
    this.yDirection = null;
    this.borderColor = 'black';
    this.background = 'white';
    this.canChangeDirection = true;
  }
}

export default (data) => {
  const random = Math.floor(Math.random() * 100) + 1;
  return (random < 5) ? new CommonBubble(data) : null ;
};
