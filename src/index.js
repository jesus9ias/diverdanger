import styles from './dev.scss'
import { renderElement } from './common/global';
import app from './app';
import startGame from './game';
import Canvas from './components/canvas';

function init() {
  renderElement('app', app(), [
    Canvas,
    startGame
  ]);
}

init();
