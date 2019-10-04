// @flow

import React, { PureComponent } from 'react';
import '../css/LoginMissingNote.css';

type Props = {| fieldName: string |};

export default class LoginErrorNote extends PureComponent<Props> {
  render() {
    const { fieldName } = this.props;

    return (
      <div>
        <p>{fieldName} is missing.</p>
      </div>
    );
  }
}
