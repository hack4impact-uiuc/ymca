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
      confirmPassword: '',
      isPasswordConfirmed: true,
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

    const { confirmPassword } = this.state;
    this.processIfPasswordIsConfirmed(e.target.value, confirmPassword);
  };

  onCompanyIdChange = e => {
    this.setState({ companyId: e.target.value });
  };

  onConfirmPasswordChange = e => {
    this.setState({ confirmPassword: e.target.value });

    const { password } = this.state;
    this.processIfPasswordIsConfirmed(password, e.target.value);
  };

  processIfPasswordIsConfirmed = (password, confirmPassword) => {
    if (confirmPassword === password) {
      this.setState({ isPasswordConfirmed: true });
    } else {
      this.setState({ isPasswordConfirmed: false });
    }
  };

  onSubmit = e => {
    e.preventDefault();

    // auth
  };

  getLoginLink = () => {
    return (
      <FormGroup>
        <Input className="submitButton" type="submit" value="Login" />
        <Button color="link" onClick={() => this.setShowRegisterFields(true)}>
          Register
        </Button>
      </FormGroup>
    );
  };

  getRegisterLink = () => {
    return (
      <FormGroup>
        <Input className="submitButton" type="submit" value="Register" />
        <Button color="link" onClick={() => this.setShowRegisterFields(false)}>
          Login
        </Button>
      </FormGroup>
    );
  };

  getCompanyIdField = () => {
    return (
      <FormGroup for="companyId">
        <Label>YMCA ID:</Label>
        <Input
          onChange={this.onCompanyIdChange}
          name="companyId"
          placeholder="Enter YMCA ID"
        />
      </FormGroup>
    );
  };

  getConfirmPasswordField = () => {
    const { isPasswordConfirmed } = this.state;
    return (
      <FormGroup for="confirmPassword">
        <p>{!isPasswordConfirmed ? <p>Passwords do not match</p> : null}</p>
        <Label>Confirm Password:</Label>
        <Input
          onChange={this.onConfirmPasswordChange}
          type="password"
          name="confirmPassword"
          placeholder="Confirm password"
        />
      </FormGroup>
    );
  };

  render() {
    const { showRegisterFields } = this.state;
    let confirmPasswordField;
    let companyIdField;
    let submit = this.getLoginLink();

    if (showRegisterFields) {
      confirmPasswordField = this.getConfirmPasswordField();
      companyIdField = this.getCompanyIdField();
      submit = this.getRegisterLink();
    }

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
          {confirmPasswordField}
          {companyIdField}
          {submit}
        </Form>
      </div>
    );
  }
}
