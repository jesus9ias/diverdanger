import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './store/reducers';

const store = createStore(rootReducer)

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          {this.props.children}
        </div>
      </Provider>
    );
  }
}

export default App;
