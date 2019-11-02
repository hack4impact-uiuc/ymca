// @flow

import React, { Component } from 'react';
import Login from './components/Login';
import RegisterForm from './components/RegisterForm';

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
          <RegisterForm />
        </header>
      </div>
    );
  }
}

export default App;
