// @flow

import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Button, Input, Select, Row, Col, message } from 'antd';
import 'antd/dist/antd.css';
import '../css/LoginRegister.css';

import { useAuth } from '../utils/use-auth';

const { Option } = Select;

const Register = ({ form }) => {
  const { register, securityQuestions } = useAuth();
  const [confirmDirty, setConfirmDirty] = useState(true);

  const handleConfirmBlur = useCallback(
    e => {
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
        callback('The two passwords you entered are inconsistent!');
      } else {
        callback();
      }
    },
    [form],
  );

  const onRegisterSubmit = useCallback(
    e => {
      e.preventDefault();

      form.validateFields((err, values) => {
        if (!err) {
          const { email, password, questionIdx, answer } = values;
          register({ email, password, questionIdx, answer }).then(
            errorMessage => {
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
          <div className="header-text">Registration</div>
        </Col>
      </Row>
      <Form onSubmit={e => onRegisterSubmit(e)} className="form">
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
                message: 'Please create a password!',
              },
            ],
          })(
            <Input.Password
              prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Create Password"
            />,
          )}
        </Form.Item>
        <Form.Item hasFeedback className="form-text">
          {getFieldDecorator('confirm', {
            rules: [
              {
                required: true,
                message: 'Please confirm your password!',
              },
              {
                validator: (rule, value, password) =>
                  compareToFirstPassword(rule, value, password),
              },
            ],
          })(
            <Input.Password
              onBlur={e => handleConfirmBlur(e)}
              prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Confirm Password"
            />,
          )}
        </Form.Item>
        <Form.Item name="select" hasFeedback className="form-text">
          {getFieldDecorator('questionIdx', {
            rules: [
              {
                required: true,
                message: 'Please select a security question!',
              },
            ],
          })(
            <Select placeholder="Please select a security question!">
              {securityQuestions.map((question, idx) => {
                return <Option value={idx}>{question}</Option>;
              })}
            </Select>,
          )}
        </Form.Item>
        <Form.Item hasFeedback className="form-text">
          {getFieldDecorator('answer', {
            rules: [
              {
                required: true,
                message: 'Please type in an answer!',
              },
            ],
          })(<Input placeholder="Answer" />)}
        </Form.Item>
        <Form.Item>
          <Button className="form-button" type="primary" htmlType="submit">
            Register
          </Button>
          <div className="white-text">Have an account?</div>{' '}
          <Link className="link-now" to="/login">
            Login now!
          </Link>
        </Form.Item>
      </Form>
    </div>
  );
};

Register.propTypes = {
  form: Form.isRequired,
};

export default Form.create()(Register);
