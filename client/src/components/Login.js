import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import '../css/Login.css';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      companyId: '',
      showRegisterFields: false,
    };
  }

  setShowRegisterFields = shouldShow => {
    this.setState({ showRegisterFields: shouldShow });
  };

  onEmailChange = e => {
    this.setState({ email: e.target.value });
  };

  onPasswordChange = e => {
    this.setState({ password: e.target.value });
  };

  onCompanyIdChange = e => {
    this.setState({ companyId: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    // auth
  };

  resolveRegisterFields = () => {
    const { showRegisterFields } = this.state;
    if (!showRegisterFields) {
      return (
        <div>
          <Input className="submitButton" type="submit" value="Login" />
          <Button color="link" onClick={() => this.setShowRegisterFields(true)}>
            Register
          </Button>
        </div>
      );
    }
    return (
      <div>
        <FormGroup>
          <Label>Company Id:</Label>
          <Input
            onChange={this.onPasswordChange}
            name="companyId"
            placeholder="Enter password"
          />
        </FormGroup>
        <Input className="submitButton" type="submit" value="Register" />
        <Button color="link" onClick={() => this.setShowRegisterFields(false)}>
          Login
        </Button>
      </div>
    );
  };

  render() {
    const registerFields = this.resolveRegisterFields();

    return (
      <div>
        <Form onSubmit={this.onSubmit}>
          <FormGroup for="email">
            <Label>Email:</Label>
            <Input
              onChange={this.onEmailChange}
              type="email"
              name="email"
              placeholder="example@abc.com"
            />
          </FormGroup>
          <FormGroup>
            <Label>Password:</Label>
            <Input
              onChange={this.onPasswordChange}
              type="password"
              name="password"
              placeholder="Enter password"
            />
          </FormGroup>
        </Form>

        {registerFields}
      </div>
    );
  }
}
