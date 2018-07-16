import { addEvent } from '../../../common/global';
import * as types from'../../../common/constants';
import Game from './game';

const game = new Game();

function cycle() {
  clearInterval(game.cycle);

  game.clear();
  game.drawWater();
  game.drawPlayer();

  game.gameIniting();
  game.gamePlaying();
  game.gameStopped();

  game.cycle = setInterval(cycle, types.GAME_INTERVAL);
}

addEvent(document, 'keydown', (e = window.event) => {
  const charCode = (typeof e.which === 'number') ? e.which : e.keyCode;
  game.onKeyDown(charCode);
});

addEvent(document, 'keyup', () => {
  game.onKeyUp();
});

function startGame(setState) {
  //console.log(setState);
  game.initialize(setState);
  cycle();
}

export default startGame;
