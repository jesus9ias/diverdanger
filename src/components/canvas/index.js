import { renderElement, addEvent } from '../../common/global';

const Canvas = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  renderElement('content', `<canvas id="canvas" width="${width}" height="${height}" />`);
};

addEvent(window, 'resize', Canvas);


export default Canvas;
