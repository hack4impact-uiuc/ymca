// @flow

import React, { useCallback } from 'react';
import { Textfit } from 'react-textfit';
import { Button, Checkbox, Form, Icon, Input, Row, Col, message } from 'antd';
import 'antd/dist/antd.css';
import '../css/Login.css';

import { login } from '../utils/auth';

type Props = {
  form: Form,
  setAuthed: boolean => void,
  setAuthRole: Boolean => void,
};

function Login(props: Props) {
  const { form, setAuthed, setAuthRole } = props;
  const { getFieldDecorator } = form;

  const onLoginSubmit = useCallback(
    e => {
      e.preventDefault();

      form.validateFields((err, values) => {
        if (!err) {
          const { email, password } = values;
          login({ email, password }).then(res => {
            if (res.status === 200) {
              localStorage.setItem('token', res.token);

              setAuthed(true);
              setAuthRole(res.permission);
            } else {
              message.error('Incorrect username or password');
            }
          });
        }
      });
    },
    [form, setAuthed, setAuthRole],
  );

  return (
    <div className="login-block-1">
      <Row type="flex" justify="center">
        <Col span={4} className="first-row-margin">
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
        onSubmit={e => onLoginSubmit(e)}
        className="login-form"
      >
        <Form.Item className="form-text">
          {getFieldDecorator('email', {
            rules: [
              {
                type: 'email',
                message: (
                  <div className="less-red-text">
                    Please input a valid E-mail!
                  </div>
                ),
              },
              {
                required: true,
                message: (
                  <div className="less-red-text">Please input your E-mail!</div>
                ),
              },
            ],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="E-mail"
            />,
          )}
        </Form.Item>
        <Form.Item hasFeedback className="form-text">
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: (
                  <div className="less-red-text">
                    Please input your password!
                  </div>
                ),
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
          })(
            <Checkbox className="login-form-checkbox">
              <div className="white-text">Remember me</div>
            </Checkbox>,
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
          <div className="white-text">Don&#39;t have an account?</div>{' '}
          <a className="login-form-register-now" href="register">
            Register Now!
          </a>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Form.create()(Login);
