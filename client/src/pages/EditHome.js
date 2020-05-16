// @flow

import React from 'react';
import { Form, Icon, Input, Button } from 'antd';

import '../css/AdminResourceManager.css';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};

const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 },
  },
};

const EditHome = () => {
  const onFinish = values => {
    console.log('Received values of form:', values);
  };
  return <></>;
};

export default EditHome;
