// @flow

import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Button, Input, Select, Row, Col, message } from 'antd';
import 'antd/dist/antd.css';
import '../css/LoginRegister.css';
import { useIntl, FormattedMessage, defineMessage } from 'react-intl';
import { loginMessages } from '../utils/messages';

import { useAuth } from '../utils/use-auth';

const { Option } = Select;

type Props = {
  form: typeof Form,
};

const messages = defineMessage({
  pleaseSelectASecurityQuestion: {
    id: 'pleaseSelectASecurityQuestion',
    defaultMessage: 'Please select a security question!',
  },
});

const Register = ({ form }: Props) => {
  const intl = useIntl();
  const { register, securityQuestions } = useAuth();
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

  const onRegisterSubmit = useCallback(
    (e) => {
      e.preventDefault();

      form.validateFields((err, values) => {
        if (!err) {
          const { email, password, questionIdx, answer } = values;
          register({ email, password, questionIdx, answer }).then(
            (errorMessage) => {
              if (errorMessage !== null) {
                message.error(errorMessage);
              }
            },
          );
        }
      });
    },
    [form, register],
  );

  const { getFieldDecorator } = form;

  return (
    <div className="background-container">
      <Row type="flex" justify="center">
        <Col className="icon">
          <img src="/asset/icon/icon-with-words.png" alt="" />
          <div className="header-text">
            <FormattedMessage id="registration" defaultMessage="Registration" />
          </div>
        </Col>
      </Row>
      <Form onSubmit={onRegisterSubmit} className="form">
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
              placeholder={intl.formatMessage(loginMessages.email)}
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
                message: intl.formatMessage(
                  loginMessages.pleaseConfirmYourPassword,
                ),
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
                  messages.pleaseSelectASecurityQuestion,
                ),
              },
            ],
          })(
            <Select
              placeholder={intl.formatMessage(
                messages.pleaseSelectASecurityQuestion,
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
            <FormattedMessage id="register" defaultMessage="Register" />
          </Button>
          <div className="white-text">
            <FormattedMessage
              id="haveAnAccount"
              defaultMessage="Have an account?"
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

export default (Form.create()(Register): any);
