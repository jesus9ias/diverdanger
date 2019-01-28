import React, { Component } from 'react';
import './game.css';
import MakeGame from './lib'
import Stats from '../dialogs/stats';
import StartGame from '../dialogs/startGame';
import PausedGame from '../dialogs/pausedGame';
import player_sprite from '../../assets/sprites/diver.png';
import * as types from '../../common/constants';

class Game extends Component {

  componentDidMount() {
    MakeGame(this.props.updateStats);
  }

  renderInitialDialog() {
    return this.props.stats.status === types.GAME_INITIAL ?
      <StartGame {...this.props.stats} />
      :
      null;
  }

  renderPausedDialog() {
    return this.props.stats.status === types.GAME_PAUSED ?
      <PausedGame {...this.props.stats} />
      :
      null;
  }

  renderStatsDialog() {
    return this.props.stats.status === types.GAME_STOPPED ?
        <Stats {...this.props.stats} />
      :
        null;
  }

  render() {
    return (
      <div className="game">
        <canvas id="canvas" width="1000px" height="500px" ></canvas>
        {this.renderInitialDialog()}
        {this.renderPausedDialog()}
        {this.renderStatsDialog()}
        <img id="player" alt="player" className="canvas__image" src={player_sprite} />
      </div>
    );
  }
}

export default Game;
