import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Textfit } from 'react-textfit';
import { PropTypes } from 'prop-types';
import { Button, Form, Input, Icon, Row, Col } from 'antd';
import 'antd/dist/antd.css';
import '../css/Register.css';

import { register } from '../utils/auth';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmDirty: true,
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
      callback('The two passwords you entered are inconsistent!');
    } else {
      callback();
    }
  };

  onRegisterSubmit = e => {
    e.preventDefault();

    const { form, setAuthed } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        const { email, password } = values;
        register({ email, password }).then(res => {
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

    return (
      <div className="register-block-1">
        <Row type="flex" justify="center" gutter={[16, 16]}>
          <Col span={4} className="top-margin">
            <img
              src="/asset/icon/icon-with-words.png"
              alt=""
              className="container"
            />
            <Textfit className="register-text" mode="single">
              Registration
            </Textfit>
          </Col>
        </Row>
        <Form
          {...formItemLayout}
          onSubmit={this.onRegisterSubmit}
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
                prefix={
                  <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
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
                {
                  validator: this.validateToNextPassword,
                },
              ],
            })(
              <Input.Password
                prefix={
                  <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
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
                  validator: this.compareToFirstPassword,
                },
              ],
            })(
              <Input.Password
                onBlur={this.handleConfirmBlur}
                prefix={
                  <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                type="password"
                placeholder="Confirm Password"
              />,
            )}
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

Register.propTypes = {
  form: Form.isRequired,
  authed: PropTypes.string.isRequired,
  setAuthed: PropTypes.func.isRequired,
};

export default Form.create()(Register);
