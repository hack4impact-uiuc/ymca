import React, { Component } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
  Form,
  Input,
  Tooltip,
  Icon,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
} from 'antd';
import 'antd/dist/antd.css';
import '../css/RegisterForm.css';
import RegisterSubmitGroup from './RegisterSubmitGroup';

import { register } from '../utils/auth';

/*
TODO 1: Add calls to authentication.
TODO 2: Replace all reactstrap with custom html and css for wireframe.
TODO 3: Add language selector.
*/
class RegisterForm extends Component {
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
      confirmDirty: false,
    };
  }

  handleConfirmBlur = e => {
    const { value } = e.target;
    if (!!value || this.state.confirmDirty) {
      this.setState({ confirmDirty: true });
    } else {
      this.setState({ confirmDirty: false });
    }
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

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

  onRegisterSubmit = e => {
    e.preventDefault();
    console.log('registers!');
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

  render() {
    const {
      showRegisterFields,
      emailFieldIsEmpty,
      passwordFieldIsEmpty,
      isAuthSuccessful,
    } = this.state;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
    let confirmPasswordField;
    let companyIdField;
    const submit = (
      <RegisterSubmitGroup
        inputText="Login"
        linkText="Register"
        linkOnClick={() => this.setShowRegisterFields(true)}
      />
    );

    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        {isAuthSuccessful && <ToHomePage />}
        <Form {...formItemLayout} onSubmit={this.onRegisterSubmit}>
          <Form.Item label="E-mail">
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
            })(<Input />)}
          </Form.Item>
          <Form.Item label="Create Password" hasFeedback>
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: 'Please create a password!',
                },
                {
                  validator: this.validateToNextPassword,
                },
              ],
            })(<Input.Password />)}
          </Form.Item>
          <Form.Item label="Confirm Password" hasFeedback>
            {getFieldDecorator('confirm', {
              rules: [
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                {
                  validator: this.compareToFirstPassword,
                },
              ],
            })(<Input.Password onBlur={this.handleConfirmBlur} />)}
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button className="reg-button" type="primary" htmlType="submit">
              Register
            </Button>
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

export default Form.create()(RegisterForm);
