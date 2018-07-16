import React from 'react';
import './scores.css';

export default ({ seconds, oxygen, life, energy, points, level }) => <div id="scores" className="scores">
  <h2 className="dialog__title">Scores</h2>
  <p className="dialog__text">Reached Level: {level}</p>
  <p className="dialog__text">Points: {points}</p>
  <p className="dialog__text">Game time: {seconds}</p>
  <p className="dialog__text">Oxygen: {oxygen.toFixed(2)}</p>
  <p className="dialog__text">Life: {life}</p>
  <p className="dialog__text">Energy: {energy}</p>
  <p className="dialog__text">Press r to restart</p>
</div>;
