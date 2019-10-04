import React, { PureComponent } from 'react';
import { FormGroup, Input, Button } from 'reactstrap';

export default class LoginSubmitGroup extends PureComponent {
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
