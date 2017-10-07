import { renderElement } from './common/global';
import app from './app';
import StartGame from './game';
import Canvas from './components/canvas';
import Movile from './components/movile';

const windowWidth = window.innerWidth;

function init() {
  renderElement('app', app(), windowWidth >= 1000 ?
    [ Canvas, StartGame ]
  :
    [ Movile ]
  );
}

init();
