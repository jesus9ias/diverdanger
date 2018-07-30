import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from '../App';
import Home from '../views/Home';
import About from '../views/About';

class RouterHandler extends Component {
  render() {
    return (
      <Router>
        <App>
          <Route exact path="/" component={Home}/>
          <Route exact path="/about" component={About} />
        </App>
      </Router>
    );
  }
}
export default () => <RouterHandler />;