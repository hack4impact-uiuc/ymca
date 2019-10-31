import React, { Component } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Checkbox, Form, Icon, Input } from 'antd';
import 'antd/dist/antd.css';
import '../css/Login.css';

import { login } from '../utils/auth';

/*
TODO 1: Add calls to authentication.
TODO 2: Replace all reactstrap with custom html and css for wireframe.
TODO 3: Add language selector.
*/
class Login extends Component {
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
      isRegisterSuccessful: false,
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
    console.log('works');
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

  render() {
    const { isAuthSuccessful } = this.state;

    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        {isAuthSuccessful && <ToHomePage />}
        <Form onSubmit={this.onLoginSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator('email', {
              rules: [
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
                {
                  required: true,
                  message: 'Please input your E-mail!',
                },
              ],
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                placeholder="E-mail"
              />,
            )}
          </Form.Item>
          <Form.Item hasFeedback>
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: 'Please input your password!',
                },
                {
                  validator: this.validateToNextPassword,
                },
              ],
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                type="password"
                placeholder="Password"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(<Checkbox>Remember me</Checkbox>)}
            <a className="login-form-forgot" href="home">
              Forgot password
            </a>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
            Don&#39;t have an account? <a href="register"> Register Now!</a>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

function ToHomePage() {
  useHistory().push('/');
  return null;
}

Login.propTypes = {
  form: Form.isRequired,
};

export default Form.create()(Login);
