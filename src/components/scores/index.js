import { appendElement } from '../../common/global';

const Scores = (seconds, oxygen, life, energy, points) => {
  appendElement('dialogs', `<div id="scores" class="scores">
    <h2>Scores</h2>
    <p>Points: ${points}</p>
    <p>Game time: ${seconds}</p>
    <p>Oxygen: ${oxygen.toFixed(2)}</p>
    <p>Life: ${life}</p>
    <p>Energy: ${energy}</p>
    <p>Press r to restart</p>
  </div>`);
};

export default Scores;
