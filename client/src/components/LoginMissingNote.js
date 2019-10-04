import React, { PureComponent } from 'react';
import '../css/LoginMissingNote.css';

export default class LoginErrorNote extends PureComponent {
  render() {
    const { fieldName } = this.props;

    return (
      <div>
        <p>{fieldName} is missing.</p>
      </div>
    );
  }
}
