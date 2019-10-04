import React, { Component } from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import '../css/Login.css';
import LoginSubmitGroup from './LoginSubmitGroup';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      companyId: '',
      confirmPassword: '',
      isEmailFieldNotEmpty: true,
      isPasswordFieldNotEmpty: true,
      isCompanyIdFieldNotEmpty: true,
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

  verifyLoginFields = () => {
    const { email, password } = this.state;

    if (email === '') {
      // display missing note
      this.setState({isEmailFieldNotEmpty: false});
    } else {
      this.setState({isEmailFieldNotEmpty: true});
    }

    if (password === '') {
      // display missing note
      this.setState({isPasswordFieldNotEmpty: false});
    } else {
      this.setState({isPasswordFieldNotEmpty: true});
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

    const {confirmPassword, companyId} = this.state;

    // if the field is valid then it is handled by the processIfPasswordIsConfirmed function
    if (confirmPassword === '') {
      this.setState({isPasswordConfirmed: false});
    }

    if (companyId === '') {
      this.setState({isCompanyIdFieldNotEmpty: false});
    } else {
      this.setState({isCompanyIdFieldNotEmpty: true});
    }
  }

  onRegisterSubmit = e => {
    e.preventDefault();

    this.verifyRegisterFields();
    // auth
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
