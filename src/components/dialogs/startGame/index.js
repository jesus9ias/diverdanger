import React from 'react';
import Dialog from '../dialog';
import * as types from '../../../common/constants';

export default ({ episode }) => <Dialog>
  <div className="dialog__body">
    <h2>Episode {episode}</h2>
    <h2>[ {types.EPISODES[episode]} ]</h2>
    <p>Press i to start the game</p>
  </div>
</Dialog>;
