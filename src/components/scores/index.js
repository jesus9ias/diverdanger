import { appendElement } from '../../common/global';

const Scores = (seconds, oxygen, life, energy, points, level) => {
  appendElement('dialogs', `<div id="scores" class="scores">
    <h2 class="dialog__title">Scores</h2>
    <p class="dialog__text">Reached Level: ${level}</p>
    <p class="dialog__text">Points: ${points}</p>
    <p class="dialog__text">Game time: ${seconds}</p>
    <p class="dialog__text">Oxygen: ${oxygen.toFixed(2)}</p>
    <p class="dialog__text">Life: ${life}</p>
    <p class="dialog__text">Energy: ${energy}</p>
    <p class="dialog__text">Press r to restart</p>
  </div>`);
};

export default Scores;
