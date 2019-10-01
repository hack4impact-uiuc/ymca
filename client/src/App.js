// @flow

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

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
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <p>{apiResponse}</p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
