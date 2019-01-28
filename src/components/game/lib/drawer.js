
export default class Drawer {
  drawCircle({ x, y, radius, background, borderWidth, borderColor }) {
    this.context.beginPath();
    this.context.arc(x, y, radius, 0, 2 * Math.PI, false);
    this.context.fillStyle = background;
    this.context.fill();
    this.context.lineWidth = borderWidth;
    this.context.strokeStyle = borderColor;
    this.context.stroke();
  }

  drawRectangle({ x, y, width, height, background, borderWidth, borderColor }) {
    this.context.beginPath();
    this.context.lineWidth = 0;
    this.context.strokeStyle = 'transparent';
    if (borderWidth) {
      this.context.lineWidth = borderWidth;
      this.context.strokeStyle = borderColor;
    }
    this.context.rect(x, y, width, height);
    this.context.fillStyle = background;
    this.context.fill();
    this.context.stroke();
  }

  drawImage({ img, sx, sy, swidth, sheight, x, y, width, height }) {
    this.context.drawImage(img, sx, sy, swidth, sheight, x, y, width, height);
  }

  drawText({ font, color, text, x, y }) {
    this.context.font = font;
    this.context.fillStyle = color;
    this.context.fillText(text, x, y);
  }

  circleCollision(collisioner, objX, objY, objRadius) {
    const collisionerWidth = collisioner.x + collisioner.width;
    const collisionerHeight = collisioner.y + collisioner.height;
    const objMinX = objX - objRadius;
    const objMaxX = objX + objRadius;
    const objMinY = objY - objRadius;
    const objMaxY = objY + objRadius;
    if ( //--bottom right corner
      (collisionerWidth >= objMinX
      && collisionerWidth <= objMaxX
      && collisionerHeight >= objMinY
      && collisionerHeight <= objMaxY)
    || //--top right corner
      (collisionerWidth >= objMinX
      && collisionerWidth <= objMaxX
      && collisioner.y >= objMinY
      && collisioner.y <= objMaxY)
    || //--top left corner
      (collisioner.x >= objMinX
      && collisioner.x <= objMaxX
      && collisioner.y >= objMinY
      && collisioner.y <= objMaxY)
    || // bottom left corner
      (collisioner.x >= objMinX
      && collisioner.x <= objMaxX
      && collisionerHeight >= objMinY
      && collisionerHeight <= objMaxY)
    || // over
      (collisioner.x <= objMinX
      && collisionerWidth >= objMaxX
      && collisioner.y <= objMinY
      && collisionerHeight >= objMaxY)
    ) {
      return true;
    }
    return false;
  }
}
