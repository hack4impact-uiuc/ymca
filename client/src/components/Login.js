import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Textfit } from 'react-textfit';
import { PropTypes } from 'prop-types';
import { Button, Checkbox, Form, Icon, Input, Row, Col } from 'antd';
import 'antd/dist/antd.css';
import '../css/Login.css';

import { login } from '../utils/auth';

class Login extends Component {
  onLoginSubmit = e => {
    e.preventDefault();

    const { form, setAuthed } = this.props;

    form.validateFields((err, values) => {
      if (!err) {
        const { email, password } = values;
        login({ email, password }).then(res => {
          if (res.status === 200) {
            localStorage.setItem('token', res.token);

            setAuthed(true);
          } else {
            // show error message
          }
        });
      }
    });
  };

  render() {
    const { authed } = this.props;
    if (authed) return <Redirect to="/admin" />;

    const { getFieldDecorator } = this.props.form;
    return (
      <div className="login-block-1">
        <Row type="flex" justify="center" gutter={[16, 16]}>
          <Col span={4} className="top-margin">
            <img
              src="/asset/icon/icon-with-words.png"
              alt=""
              className="container"
            />
            <Textfit className="login-text" mode="single">
              Admin Login
            </Textfit>
          </Col>
        </Row>
        <Form
          justify="center"
          onSubmit={this.onLoginSubmit}
          className="login-form"
        >
          <Form.Item className="form-text">
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
          <Form.Item hasFeedback className="form-text">
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
            })(
              <Checkbox className="login-form-checkbox">Remember me</Checkbox>,
            )}
            <a className="login-form-forgot" href="home">
              Forgot password
            </a>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log In
            </Button>
            Don&#39;t have an account?{' '}
            <a className="login-form-register-now" href="register">
              Register Now!
            </a>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

Login.propTypes = {
  form: Form.isRequired,
  authed: PropTypes.string.isRequired,
  setAuthed: PropTypes.func.isRequired,
};

export default Form.create()(Login);
