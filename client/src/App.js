// @flow

import React, { Component } from 'react';
import './App.css';
import Login from './components/Login';

type Props = {};

type State = {| apiResponse: string |};

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { apiResponse: '' };
  }

  UNSAFE_componentWillMount() {
    this.callAPI();
  }

  callAPI() {
    fetch('http://localhost:9000/testAPI')
      .then(res => res.text())
      .then(res => this.setState({ apiResponse: res }));
  }

  render() {
    const { apiResponse } = this.state;
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
