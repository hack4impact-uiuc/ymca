// @flow

import React, { Component } from 'react';

type Props = {};

type State = {| apiResponse: string |};

export default class Home extends Component<Props, State> {
  // constructor(props: Props) {
  //   super(props);
  //   this.state = { apiResponse: '' };
  // }

  // UNSAFE_componentWillMount() {
  //   this.callAPI();
  // }

  // callAPI() {
  //   fetch('http://localhost:9000/testAPI')
  //     .then(res => res.text())
  //     .then(res => this.setState({ apiResponse: res }));
  // }

  render() {
    return <div className="App" />;
  }
}
