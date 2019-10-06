// @flow

import React, { Component } from 'react';
import './App.css';
import Login from './components/Login';

type Props = {};

type State = {};

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Login />
        </header>
      </div>
    );
  }
}

export default App;
