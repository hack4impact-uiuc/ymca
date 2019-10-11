import React, { Component } from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import '../css/Login.css';
import LoginSubmitGroup from './LoginSubmitGroup';
import LoginMissingNote from './LoginMissingNote';

/*
TODO 1: Add calls to authentication.
TODO 2: Replace all reactstrap with custom html and css for wireframe.
TODO 3: Add language selector.
*/
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
    // reset some fields
    this.setState({
      showRegisterFields: shouldShow,
      confirmPassword: '',
      companyId: '',
      // reset errors
      emailFieldIsEmpty: false,
      passwordFieldIsEmpty: false,
      companyIdFieldIsEmpty: false,
    });
  };

  onEmailChange = e => {
    this.setState({ email: e.target.value, emailFieldIsEmpty: false });
  };

  onPasswordChange = e => {
    const password = e.target.value;
    const { confirmPassword } = this.state;
    this.setState({
      password,
      passwordFieldIsEmpty: false,
      isPasswordConfirmed: password === confirmPassword,
    });
  };

  onCompanyIdChange = e => {
    this.setState({ companyId: e.target.value, companyIdFieldIsEmpty: false });
  };

  onConfirmPasswordChange = e => {
    const confirmPassword = e.target.value;
    const { password } = this.state;
    this.setState({
      confirmPassword,
      isPasswordConfirmed: confirmPassword === password,
    });
  };

  loginFieldsValid = () => {
    const { email, password } = this.state;
    const emailFieldIsEmpty = email === '';
    const passwordFieldIsEmpty = password === '';

    this.setState({ emailFieldIsEmpty, passwordFieldIsEmpty });
    return !emailFieldIsEmpty && !passwordFieldIsEmpty;
  };

  onLoginSubmit = e => {
    e.preventDefault();

    if (this.loginFieldsValid()) {
      // auth
    }
  };

  registerFieldsValid = () => {
    // verifies email and password
    const loginValid = this.loginFieldsValid();

    const { companyId, isPasswordConfirmed } = this.state;
    const companyIdFieldIsEmpty = companyId === '';
    const registerValid = isPasswordConfirmed && !companyIdFieldIsEmpty;

    this.setState({ companyIdFieldIsEmpty });
    return loginValid && registerValid;
  };

  onRegisterSubmit = e => {
    e.preventDefault();

    if (this.registerFieldsValid()) {
      // auth
    }
  };

  getCompanyIdField = () => {
    const { companyIdFieldIsEmpty } = this.state;
    return (
      <FormGroup for="companyId">
        {companyIdFieldIsEmpty && <LoginMissingNote fieldName="Company ID" />}
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
        {!isPasswordConfirmed && <p>Passwords do not match</p>}
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
      <Form
        onSubmit={
          !showRegisterFields ? this.onLoginSubmit : this.onRegisterSubmit
        }
      >
        <FormGroup for="email">
          {emailFieldIsEmpty && <LoginMissingNote fieldName="Email" />}
          <Label>Email:</Label>
          <Input
            onChange={this.onEmailChange}
            type="email"
            name="email"
            placeholder="example@abc.com"
          />
        </FormGroup>
        <FormGroup>
          {passwordFieldIsEmpty && <LoginMissingNote fieldName="Password" />}
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
    );
  }
}