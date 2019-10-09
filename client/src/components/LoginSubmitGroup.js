// @flow

import React, { PureComponent, SyntheticEvent } from 'react';
import { FormGroup, Input, Button } from 'reactstrap';
import '../css/LoginSubmitGroup.css';

type Props = {|
  inputText: string,
  linkText: string,
  linkOnClick: SyntheticEvent => void,
|};

export default class LoginSubmitGroup extends PureComponent<Props> {
  render() {
    const { inputText, linkText, linkOnClick } = this.props;

    return (
      <FormGroup>
        <Input className="submitButton" type="submit" value={inputText} />
        <Button color="link" onClick={linkOnClick}>
          {linkText}
        </Button>
      </FormGroup>
    );
  }
}
