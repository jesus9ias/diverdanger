import { renderElement, addEvent } from '../../common/global';

const Canvas = () => {
  renderElement('content', `<div class="movile__block">
    <p class="movile__message">See this game with minimun 1000px of width.</p>
  </div>`);
};

export default Canvas;
