// @flow

import React, { PureComponent, SyntheticEvent } from 'react';
import { Button, FormGroup, Input } from 'reactstrap';

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
