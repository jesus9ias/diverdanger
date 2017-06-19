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
      borderWidth: 1,
      borderColor: '#ffffff',
      background: 'transparent'
    });
  }

  move() {
    this.x -= this.speed;
  }

  collision(player) {
    const playerWidth = player.x + player.width;
    const playerHeight = player.y + player.height;
    const bubbleMinX = this.x - this.radius;
    const bubbleMaxX = this.x + this.radius;
    const bubbleMinY = this.y - this.radius;
    const bubbleMaxY = this.y + this.radius;
    if (
      (playerWidth >= bubbleMinX
      && playerWidth <= bubbleMaxX
      && playerHeight >= bubbleMinY
      && playerHeight <= bubbleMaxY)
    ||
      (playerWidth >= bubbleMinX
      && playerWidth <= bubbleMaxX
      && player.y >= bubbleMinY
      && player.y <= bubbleMaxY)
    ||
      (player.x >= bubbleMinX
      && player.x <= bubbleMaxX
      && player.y >= bubbleMinY
      && player.y <= bubbleMaxY)
    || (player.x >= bubbleMinX
      && player.x <= bubbleMaxX
      && playerHeight >= bubbleMinY
      && playerHeight <= bubbleMaxY)
    ) {
      return true;
    }
    return false;
  }
}

export default (data) => {
  const random = Math.floor(Math.random() * 100) + 1;
  return (random < 5) ? new Bubble(data) : null ;
};
