import React, { Component } from 'react';
import Game from '../components/game';
import Movile from '../components/movile';
import Section from '../components/section';

const windowWidth = window.innerWidth;

class Home extends Component {
  render() {
    return (
      <Section>
        {
          windowWidth < 1000 ?
            <Movile />
            :
            <Game />
        }
      </Section>
    );
  }
}

export default Home;
