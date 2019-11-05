import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Form, Input } from 'antd';
import 'antd/dist/antd.css';
import '../css/Register.css';

import { register } from '../utils/auth';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authSuccess: false,
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
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { email, password } = values;
        register({ email, password }).then(res => {
          if (res.status === 200) {
            this.setState({ authSuccess: true });
          } else {
            // show error message
          }
        });
      }
    });
  };

  render() {
    if (this.state.authSuccess) return <Redirect to="/admin" />;

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
      <Form {...formItemLayout} onSubmit={this.onRegisterSubmit}>
        <Form.Item label="E-mail">
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
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Create Password" hasFeedback>
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
          })(<Input.Password />)}
        </Form.Item>
        <Form.Item label="Confirm Password" hasFeedback>
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
          })(<Input.Password onBlur={this.handleConfirmBlur} />)}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button className="reg-button" type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

Register.propTypes = {
  form: Form.isRequired,
};

export default Form.create()(Register);
