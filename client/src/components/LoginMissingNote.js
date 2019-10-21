// @flow

import React, { PureComponent } from 'react';
import { Alert } from 'reactstrap';
import '../css/LoginMissingNote.css';

type Props = {| fieldName: string |};

export default class LoginMissingNote extends PureComponent<Props> {
  render() {
    const { fieldName } = this.props;

    return (
      <Alert className="loginMissingNote" color="danger">
        {fieldName} is missing.
      </Alert>
    );
  }
}
