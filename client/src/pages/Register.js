import React, { useCallback, useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import { Button, Form, Input, Icon, Select, Row, Col, message } from 'antd';
import 'antd/dist/antd.css';
import '../css/Register.css';

import { getSecurityQuestions, register } from '../utils/auth';

const { Option } = Select;

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

const Register = ({ form, setAuthed, setAuthRole }) => {
  const [confirmDirty, setConfirmDirty] = useState(true);
  const [securityQuestions, setSecurityQuestions] = useState([]);

  useEffect(() => {
    async function fetchSecurityQuestions() {
      const securityQuestionsData = await getSecurityQuestions();
      setSecurityQuestions(securityQuestionsData.questions);
    }
    fetchSecurityQuestions();
  }, [setSecurityQuestions]);

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
          register({ email, password, questionIdx, answer }).then(res => {
            if (res.status === 200) {
              localStorage.setItem('token', res.token);
              setAuthed(true);
              setAuthRole(res.permission);
            } else {
              // show error message
              message.error(res.message);
            }
          });
        }
      });
    },
    [form, setAuthed, setAuthRole],
  );

  const { getFieldDecorator } = form;

  return (
    <div className="register-block-1">
      <Row type="flex" justify="center">
        <Col className="icon">
          <img
            src="/asset/icon/icon-with-words.png"
            alt=""
            className="container"
          />
          <div className="register-text">Registration</div>
        </Col>
      </Row>
      <Form
        {...formItemLayout}
        onSubmit={e => onRegisterSubmit(e)}
        className="register-form"
      >
        <Form.Item label="*" className="form-text">
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
        <Form.Item label="*" hasFeedback className="form-text">
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: 'Please create a password!',
              },
            ],
          })(
            <Input.Password
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Create Password"
            />,
          )}
        </Form.Item>
        <Form.Item label="*" hasFeedback className="form-text">
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
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Confirm Password"
            />,
          )}
        </Form.Item>
        <Form.Item name="select" label="*" hasFeedback className="form-text">
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
        <Form.Item label="*" hasFeedback className="form-text">
          {getFieldDecorator('answer', {
            rules: [
              {
                required: true,
                message: 'Please type in an answer!',
              },
            ],
          })(<Input placeholder="Answer" />)}
        </Form.Item>
        <Row type="flex" justify="center">
          <Button className="reg-button" type="primary" htmlType="submit">
            Register
          </Button>
        </Row>
      </Form>
    </div>
  );
};

Register.propTypes = {
  form: Form.isRequired,
  authed: PropTypes.string.isRequired,
  setAuthed: PropTypes.func.isRequired,
  setAuthRole: PropTypes.func.isRequired,
};

export default Form.create()(Register);
