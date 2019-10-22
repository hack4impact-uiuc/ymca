import React, { Component } from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import '../css/Login.css';
import { useHistory } from 'react-router-dom';
import LoginSubmitGroup from './LoginSubmitGroup';
import LoginMissingNote from './LoginMissingNote';
import AppNavbar from './AppNavbar';

import { login, register } from '../utils/auth';

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
      isAuthSuccessful: false,
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

  registerFieldsValid = () => {
    // verifies email and password
    const loginValid = this.loginFieldsValid();

    const { companyId, isPasswordConfirmed } = this.state;
    const companyIdFieldIsEmpty = companyId === '';
    const registerValid = isPasswordConfirmed && !companyIdFieldIsEmpty;

    this.setState({ companyIdFieldIsEmpty });
    return loginValid && registerValid;
  };

  onLoginSubmit = e => {
    e.preventDefault();

    if (this.loginFieldsValid()) {
      const { email, password } = this.state;
      // auth
      login({ email, password }).then(res => {
        if (res.status === 200) {
          // go to main menu
          this.setState({ isAuthSuccessful: true });
        } else {
          // show error message
        }
      });
    }
  };

  onRegisterSubmit = e => {
    e.preventDefault();

    if (this.registerFieldsValid()) {
      const { email, password, companyId } = this.state;

      register({ email, password, companyId }).then(res => {
        if (res.status === 200) {
          // auto login and go to main menu
          this.setState({ isAuthSuccessful: true });
        } else {
          // show error message.
        }
      });
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
      isAuthSuccessful,
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
        <AppNavbar />

        {isAuthSuccessful && <ToHomePage />}

        <Form
          className="form"
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
      </div>
    );
  }
}

function ToHomePage() {
  useHistory().push('/');
  return null;
}
