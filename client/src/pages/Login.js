// @flow

import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Button, Checkbox, Input, Row, Col } from 'antd';
import 'antd/dist/antd.css';
import '../css/LoginRegister.css';

import { login } from '../utils/auth';

// type Props = {
//   form: Form,
//   setAuthed: boolean => void,
//   setAuthRole: Boolean => void,
// };

function Login(props: Props) {
  const { form, setAuthed, setAuthRole } = props;
  const { getFieldDecorator } = form;
  const [error, setError] = useState('');

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
              setError('');
            } else {
              setError(res.message);
            }
          });
        }
      });
    },
    [form, setAuthed, setAuthRole],
  );

  return (
    <div className="background-container">
      <Row type="flex" justify="center">
        <Col className="icon">
          <img src="/asset/icon/icon-with-words.png" alt="" />
          <div className="header-text">Login</div>
        </Col>
      </Row>
      <Form justify="center" onSubmit={e => onLoginSubmit(e)} className="form">
        <Form.Item className="form-text">
          {getFieldDecorator('email', {
            rules: [
              {
                type: 'email',
                message: 'Please input a valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ],
          })(
            <Input
              prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
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
            ],
          })(
            <Input
              prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />,
          )}
        </Form.Item>
        <div className="red-text">{error}</div>
        <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox className="form-checkbox">
              <div className="white-text">Remember me</div>
            </Checkbox>,
          )}
          <Link className="form-forgot" to="/password-reset">
            Forgot password
          </Link>
          <Button type="primary" htmlType="submit" className="form-button">
            Log In
          </Button>
          <div className="white-text">Don&#39;t have an account?</div>{' '}
          <Link className="link-now" to="/register">
            Register Now!
          </Link>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Form.create()(Login);
