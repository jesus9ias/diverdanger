import styles from './app.scss'
import { renderElement, addEvent } from './common/global';
import app from './app';

function init() {
  renderElement('app', app());
}

init();

addEvent(window, 'resize', init);
