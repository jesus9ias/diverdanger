
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
}
