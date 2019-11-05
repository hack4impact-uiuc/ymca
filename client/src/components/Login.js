import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Checkbox, Form, Icon, Input } from 'antd';
import 'antd/dist/antd.css';
import '../css/Login.css';

import { login } from '../utils/auth';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authSucess: false,
    };
  }

  onLoginSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { email, password } = values;
        login({ email, password }).then(res => {
          if (res.status === 200) {
            this.setState({ authSucess: true });
          } else {
            // show error message
          }
        });
      }
    });
  };

  render() {
    if (this.state.authSucess) return <Redirect to="/admin" />;

    const { getFieldDecorator } = this.props.form;
    return (
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
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
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
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
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
    );
  }
}

Login.propTypes = {
  form: Form.isRequired,
};

export default Form.create()(Login);
