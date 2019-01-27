import React, { Component } from 'react';
import './game.css';
import MakeGame from './lib'
import Scores from '../dialogs/scores';
import StartGame from '../dialogs/startGame';
import PausedGame from '../dialogs/pausedGame';
import player_sprite from '../../assets/sprites/diver.png';
import * as types from '../../common/constants';

class Game extends Component {

  componentDidMount() {
    MakeGame(this.props.updateScores);
  }

  renderScoreDialog() {
    return this.props.scores.status === types.GAME_STOPPED ?
        <Scores {...this.props.scores} />
      :
        null;
  }

  renderInitialDialog() {
    return this.props.scores.status === types.GAME_INITIAL ?
      <StartGame {...this.props.scores} />
      :
      null;
  }

  renderPausedDialog() {
    return this.props.scores.status === types.GAME_PAUSED ?
      <PausedGame {...this.props.scores} />
      :
      null;
  }

  render() {
    return (
      <div className="game">
        <canvas id="canvas" width="1000px" height="500px" ></canvas>
        {this.renderScoreDialog()}
        {this.renderInitialDialog()}
        {this.renderPausedDialog()}
        <img id="player" alt="player" className="canvas__image" src={player_sprite} />
      </div>
    );
  }
}

export default Game;
