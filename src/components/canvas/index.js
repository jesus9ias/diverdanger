import { renderElement } from '../../common/global';
import Scores from '../scores';

const Canvas = () => {
  renderElement('content', '<canvas id="canvas" width="1000px" height="500px" /></canvas><div id="dialogs"></div>');
};

export default Canvas;
