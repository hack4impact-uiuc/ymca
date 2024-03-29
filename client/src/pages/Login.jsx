// @flow

import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Button, Input, Row, Col } from 'antd';
import 'antd/dist/antd.css';
import '../css/LoginRegister.css';

import { useIntl, FormattedMessage, defineMessages } from 'react-intl';
import { loginMessages } from '../utils/messages';

import { useAuth } from '../utils/use-auth';

type Props = {
  form: typeof Form,
};

const messages = defineMessages({
  pleaseInputValidEmail: {
    id: 'pleaseInputValidEmail',
    defaultMessage: 'Please input a valid E-mail!',
  },
  pleaseInputYourPassword: {
    id: 'pleaseInputYourPassword',
    defaultMessage: 'Please input your password!',
  },
  password: {
    id: 'password',
    defaultMessage: 'Password',
  },
});

function Login(props: Props) {
  const intl = useIntl();
  const { login } = useAuth();
  const { form } = props;
  const { getFieldDecorator } = form;
  const [error, setError] = useState('');

  const onLoginSubmit = useCallback(
    (e) => {
      e.preventDefault();

      form.validateFields((err, values) => {
        if (!err) {
          const { email, password } = values;
          login({ email, password }).then((errorMessage) => {
            if (errorMessage !== null) {
              setError(errorMessage);
            } else {
              setError(null);
            }
          });
        }
      });
    },
    [form, login],
  );

  return (
    <div className="background-container">
      <Row type="flex" justify="center">
        <Col className="icon">
          <img src="/asset/icon/icon-with-words.png" alt="" />
          <div className="header-text">
            <FormattedMessage id="login" defaultMessage="Login" />
          </div>
        </Col>
      </Row>
      <Form justify="center" onSubmit={onLoginSubmit} className="form">
        <Form.Item className="form-text">
          {getFieldDecorator('email', {
            rules: [
              {
                type: 'email',
                message: intl.formatMessage(messages.pleaseInputValidEmail),
              },
              {
                required: true,
                message: intl.formatMessage(loginMessages.pleaseInputYourEmail),
              },
            ],
          })(
            <Input
              prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder={intl.formatMessage(loginMessages.email)}
            />,
          )}
        </Form.Item>
        <Form.Item hasFeedback className="form-text">
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: intl.formatMessage(messages.pleaseInputYourPassword),
              },
            ],
          })(
            <Input
              prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder={intl.formatMessage(messages.password)}
            />,
          )}
        </Form.Item>
        <div className="red-text">{error}</div>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="form-button">
            <FormattedMessage id="logInButton" defaultMessage="Log In" />
          </Button>
          <div className="white-text">
            <FormattedMessage
              id="dontHaveAnAccount"
              defaultMessage="Don't have an account?"
            />
          </div>{' '}
          <Link className="link-now" to="/register">
            <FormattedMessage id="registerNow" defaultMessage="Register Now!" />
          </Link>
          <Link className="form-forgot" to="/password-reset">
            <FormattedMessage
              id="forgotPassword"
              defaultMessage="Forgot password?"
            />
          </Link>
        </Form.Item>
      </Form>
    </div>
  );
}

export default (Form.create()(Login): any);
