// @flow

import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Button, Input, Select, Row, Col, message } from 'antd';
import { useIntl, FormattedMessage, defineMessage } from 'react-intl';
import 'antd/dist/antd.css';
import '../css/LoginRegister.css';

import { useAuth } from '../utils/use-auth';
import { loginMessages } from '../utils/messages';

const { Option } = Select;

const messages = defineMessage({
  pleaseSelectYourSecurityQuestion: {
    id: 'pleaseSelectYourSecurityQuestion',
    defaultMessage: 'Please select your security question!',
  },
});

const PasswordReset = ({ form }) => {
  const intl = useIntl();
  const { resetPassword, securityQuestions } = useAuth();
  const [confirmDirty, setConfirmDirty] = useState(true);

  const handleConfirmBlur = useCallback(
    (e) => {
      const { value } = e.target;
      if (!!value || confirmDirty) {
        setConfirmDirty(true);
      } else {
        setConfirmDirty(false);
      }
    },
    [confirmDirty, setConfirmDirty],
  );

  const compareToFirstPassword = useCallback(
    (rule, value, callback) => {
      if (value && value !== form.getFieldValue('password')) {
        callback(intl.formatMessage(loginMessages.passwordsInconsistent));
      } else {
        callback();
      }
    },
    [intl, form],
  );

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      form.validateFields((err, values) => {
        if (!err) {
          const { email, password, answer } = values;
          resetPassword({ email, password, answer }).then((errorMessage) => {
            if (errorMessage !== null) {
              message.error(errorMessage);
            }
          });
        }
      });
    },
    [form, resetPassword],
  );

  const { getFieldDecorator } = form;

  return (
    <div className="background-container">
      <Row type="flex" justify="center">
        <Col className="icon">
          <img src="/asset/icon/icon-with-words.png" alt="" />
          <div className="header-text">
            <FormattedMessage
              id="resetPassword"
              defaultMessage="Reset Password"
            />
          </div>
        </Col>
      </Row>
      <Form onSubmit={onSubmit} className="form">
        <Form.Item className="form-text">
          {getFieldDecorator('email', {
            rules: [
              {
                type: 'email',
                message: intl.formatMessage(loginMessages.inputIsNotValidEmail),
              },
              {
                required: true,
                message: intl.formatMessage(loginMessages.pleaseInputYourEmail),
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
                message: intl.formatMessage(
                  loginMessages.pleaseCreateAPassword,
                ),
              },
            ],
          })(
            <Input.Password
              prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder={intl.formatMessage(loginMessages.createPassword)}
            />,
          )}
        </Form.Item>
        <Form.Item hasFeedback className="form-text">
          {getFieldDecorator('confirm', {
            rules: [
              {
                required: true,
                message: intl.formatMessage(loginMessages.confirmPassword),
              },
              {
                validator: compareToFirstPassword,
              },
            ],
          })(
            <Input.Password
              onBlur={handleConfirmBlur}
              prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder={intl.formatMessage(loginMessages.confirmPassword)}
            />,
          )}
        </Form.Item>
        <Form.Item name="select" hasFeedback className="form-text">
          {getFieldDecorator('questionIdx', {
            rules: [
              {
                required: true,
                message: intl.formatMessage(
                  messages.pleaseSelectYourSecurityQuestion,
                ),
              },
            ],
          })(
            <Select
              placeholder={intl.formatMessage(
                messages.pleaseSelectYourSecurityQuestion,
              )}
            >
              {securityQuestions.map((question, idx) => (
                <Option value={idx} key={question}>
                  <FormattedMessage
                    id={`securityQuestion-${question}`.replace(/\s/g, '')}
                    defaultMessage={question}
                  />
                </Option>
              ))}
            </Select>,
          )}
        </Form.Item>
        <Form.Item hasFeedback className="form-text">
          {getFieldDecorator('answer', {
            rules: [
              {
                required: true,
                message: intl.formatMessage(loginMessages.pleaseTypeInAnAnswer),
              },
            ],
          })(<Input placeholder={intl.formatMessage(loginMessages.answer)} />)}
        </Form.Item>
        <Form.Item>
          <Button className="form-button" type="primary" htmlType="submit">
            <FormattedMessage id="reset" defaultMessage="Reset" />
          </Button>
          <div className="white-text">
            <FormattedMessage
              id="rememberYourLogin"
              defaultMessage="Remember your login?"
            />
          </div>{' '}
          <Link className="link-now" to="/login">
            <FormattedMessage id="loginNow" defaultMessage="Login now!" />
          </Link>
        </Form.Item>
      </Form>
    </div>
  );
};

PasswordReset.propTypes = {
  form: Form.isRequired,
};

export default (Form.create()(PasswordReset): any);
