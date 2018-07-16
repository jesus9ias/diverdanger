import React, { Component } from 'react';
import MakeGame from './lib'
import './game.css';
import player_sprite from '../../assets/sprites/diver.png';
import Scores from '../scores';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds: 0,
      oxygen: 0,
      life: 0,
      energy: 0,
      points: 0,
      level: 0
    };
  }

  componentDidMount() {
    MakeGame();
  }

  render() {
    return (
      <div>
        <canvas id="canvas" width="1000px" height="500px" ></canvas>
        <div id="dialogs" className="dialogs">
          <Scores {...this.state} />
        </div>
        <img id="player" alt="player" className="canvas__image" src={player_sprite} />
      </div>
    );
  }
}

export default Game;
