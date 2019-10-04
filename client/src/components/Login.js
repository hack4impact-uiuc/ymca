import React, { Component } from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import '../css/Login.css';
import LoginSubmitGroup from './LoginSubmitGroup';
import LoginMissingNote from './LoginMissingNote';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      companyId: '',
      confirmPassword: '',
      emailFieldIsEmpty: false,
      passwordFieldIsEmpty: false,
      companyIdFieldIsEmpty: false,
      isPasswordConfirmed: true,
      showRegisterFields: false,
    };
  }

  setShowRegisterFields = shouldShow => {
    this.setState({
      showRegisterFields: shouldShow,
      emailFieldIsEmpty: false,
      passwordFieldIsEmpty: false,
    });
  };

  onEmailChange = e => {
    this.setState({ email: e.target.value, emailFieldIsEmpty: false });
  };

  onPasswordChange = e => {
    this.setState({ password: e.target.value, passwordFieldIsEmpty: false });

    const { confirmPassword } = this.state;
    this.processIfPasswordIsConfirmed(e.target.value, confirmPassword);
  };

  onCompanyIdChange = e => {
    this.setState({ companyId: e.target.value, companyIdFieldIsEmpty: false });
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

  verifyLoginFields = () => {
    const { email, password } = this.state;

    if (email === '') {
      // display missing note
      this.setState({ emailFieldIsEmpty: true });
    } else {
      this.setState({ emailFieldIsEmpty: false });
    }

    if (password === '') {
      // display missing note
      this.setState({ passwordFieldIsEmpty: true });
    } else {
      this.setState({ passwordFieldIsEmpty: false });
    }
  };

  onLoginSubmit = e => {
    e.preventDefault();

    this.verifyLoginFields();
    // auth
  };

  verifyRegisterFields = () => {
    // verifies email and password
    this.verifyLoginFields();

    const { companyId } = this.state;

    // if the confirm password field is valid then
    // it is handled by the processIfPasswordIsConfirmed function

    if (companyId === '') {
      this.setState({ companyIdFieldIsEmpty: true });
    } else {
      this.setState({ companyIdFieldIsEmpty: false });
    }
  };

  onRegisterSubmit = e => {
    e.preventDefault();

    this.verifyRegisterFields();
    // auth
  };

  getCompanyIdField = () => {
    const { companyIdFieldIsEmpty } = this.state;
    return (
      <FormGroup for="companyId">
        {companyIdFieldIsEmpty ? (
          <LoginMissingNote fieldName="Company ID" />
        ) : null}
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
    const {
      showRegisterFields,
      emailFieldIsEmpty,
      passwordFieldIsEmpty,
    } = this.state;
    let confirmPasswordField;
    let companyIdField;
    let submit = (
      <LoginSubmitGroup
        inputText="Login"
        linkText="Register"
        linkOnClick={() => this.setShowRegisterFields(true)}
      />
    );

    if (showRegisterFields) {
      confirmPasswordField = this.getConfirmPasswordField();
      companyIdField = this.getCompanyIdField();
      submit = (
        <LoginSubmitGroup
          inputText="Register"
          linkText="Login"
          linkOnClick={() => this.setShowRegisterFields(false)}
        />
      );
    }

    return (
      <div>
        <Form
          onSubmit={
            !showRegisterFields ? this.onLoginSubmit : this.onRegisterSubmit
          }
        >
          <FormGroup for="email">
            {emailFieldIsEmpty ? <LoginMissingNote fieldName="Email" /> : null}
            <Label>Email:</Label>
            <Input
              onChange={this.onEmailChange}
              type="email"
              name="email"
              placeholder="example@abc.com"
            />
          </FormGroup>
          <FormGroup>
            {passwordFieldIsEmpty ? (
              <LoginMissingNote fieldName="Password" />
            ) : null}
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
