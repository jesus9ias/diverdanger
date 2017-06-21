
export default class Drawer {
  drawCircle({ context, x, y, radius, background, borderWidth, borderColor }) {
    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI, false);
    context.fillStyle = background;
    context.fill();
    context.lineWidth = borderWidth;
    context.strokeStyle = borderColor;
    context.stroke();
  }

  drawRectangle({ context, x, y, width, height, background }) {
    context.fillStyle = background;
    context.fillRect(x, y, width, height);
  }

  drawImage({ context, img, sx, sy, swidth, sheight, x, y, width, height }) {
    context.drawImage(img, sx, sy, swidth, sheight, x, y, width, height);
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
