// @flow

import React from 'react';
import 'antd/dist/antd.css';
import { Form, Input, Button, Col, Row } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

import '../css/EditHome.css';

const rules = [{ required: true }];

const EditHome = () => {
  const onFinish = values => {
    console.log('Received values of form:', values);
  };
  return (
    <Form onFinish={onFinish} className="my-form">
      <Form.List name="users">
        {(fields, { add, remove }) => {
          return (
            <div>
              {fields.map((field, index) => (
                <Row key={field.key}>
                  <Col>
                    <Form.Item
                      name={[field.name, 'lastName']}
                      fieldKey={[field.fieldKey, 'lastName']}
                      rules={rules}
                    >
                      <Input placeholder="last name" />
                    </Form.Item>
                  </Col>
                  <Col>
                    <Form.Item
                      name={[field.name, 'firstName']}
                      fieldKey={[field.fieldKey, 'firstName']}
                      rules={rules}
                    >
                      <Input placeholder="first name" />
                    </Form.Item>
                  </Col>
                  <Col flex="none">
                    <MinusCircleOutlined
                      className="dynamic-delete-button"
                      onClick={() => {
                        remove(field.name);
                      }}
                    />
                  </Col>
                </Row>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => {
                    add();
                  }}
                  style={{ width: '100%' }}
                >
                  <PlusOutlined /> Add field
                </Button>
              </Form.Item>
            </div>
          );
        }}
      </Form.List>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EditHome;
