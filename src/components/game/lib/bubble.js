import Drawer from './drawer';

class Bubble extends Drawer {
  changeYDirection() {
    if (this.canChangeDirection) {
      const random = Math.floor(Math.random() * 100) + 1;
      if (random < 5) {
        this.yDirection = this.yDirection === 'top' ? 'bottom' : 'top';
      }
      if (random >= 5 && random < 10) {
        this.yDirection = null;
      }
    }
  }

  draw() {
    const {
      context,
      x,
      y,
      radius,
      borderColor,
      background
    } = this;
    this.drawCircle({
      context,
      x,
      y,
      radius,
      borderWidth: 1,
      borderColor,
      background
    });
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
      if (this.yDirection === 'top' && (this.y + this.ySpeed + this.radius) > this.minY) {
        this.y -= this.ySpeed;
      }
      if (this.yDirection === 'bottom' && (this.y + this.ySpeed + this.radius) < this.maxY) {
        this.y += this.ySpeed;
      }
    }
  }

  collision(player) {
    return this.circleCollision(player, this.x, this.y, this.radius);
  }

  shotCollision(shots) {
    let isCollision = false;
    shots.forEach((shot, i) => {
      if (!isCollision) {
        if (this.circleCollision(shot, this.x, this.y, this.radius)) {
          isCollision = i;
        }
      }
    });
    return isCollision;
  }
}

export default Bubble;
