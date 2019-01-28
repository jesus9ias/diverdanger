import React from 'react';
import Dialog from '../dialog';

export default ({ seconds, oxygen, life, energy, points, level }) => <Dialog>
  <div className="dialog__body">
    <h2 className="dialog__title">Game Stats</h2>
    <p className="dialog__text">Reached Level: {level}</p>
    <p className="dialog__text">Points: {points}</p>
    <p className="dialog__text">Game seconds: {seconds}</p>
    <p className="dialog__text">Oxygen: {oxygen.toFixed(2)}</p>
    <p className="dialog__text">Life: {life}</p>
    <p className="dialog__text">Energy: {energy}</p>
    <p className="dialog__text">Game ended. Press r to restart</p>
  </div>
</Dialog>;
