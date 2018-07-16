import React, { Component } from 'react';
import Movile from './components/movile';
import Game from './components/game';

const windowWidth = window.innerWidth;

class App extends Component {
  render() {
    return (
      <div className="App">
        {
          windowWidth < 1000 ?
            <Movile />
          :
            <Game />
        }
      </div>
    );
  }
}

export default App;
