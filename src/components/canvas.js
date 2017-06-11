import { renderComponent } from '../common/global';

export default renderComponent((props) => {
  return `<canvas id="canvas" width="${props.width}" height="${props.height}" />`;
});
