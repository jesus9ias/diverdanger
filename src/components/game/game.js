import React, { Component } from 'react';
import MakeGame from './lib'
import './game.css';
import player_sprite from '../../assets/sprites/diver.png';
import Scores from '../scores';

class Game extends Component {

  componentDidMount() {
    MakeGame(this.props.updateScores);
  }

  render() {
    return (
      <div className="game">
        <canvas id="canvas" width="1000px" height="500px" ></canvas>
        <div id="dialogs" className="dialogs">
          <Scores {...this.props.scores} />
        </div>
        <img id="player" alt="player" className="canvas__image" src={player_sprite} />
      </div>
    );
  }
}

export default Game;
