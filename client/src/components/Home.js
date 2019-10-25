// @flow

import React, { Component } from 'react';
import '../css/Home.css';
import AppNavbar from './AppNavbar';

type Props = {};

type State = {};

export default class Home extends Component<Props, State> {
  render() {
    return (
      <div className="App">
        <AppNavbar />
      </div>
    );
  }
}
