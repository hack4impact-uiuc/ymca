// @flow

import React from 'react';
import 'antd/dist/antd.css';
import { Form, Input, Button, Col, Row, Icon } from 'antd';

import '../css/EditHome.css';

const rules = [{ required: true }];

const EditHome = () => {
  const onFinish = values => {
    console.log('Received values of form:', values);
  };
  return (
    <Form onFinish={onFinish} className="my-form">
      <Form.List name="users">
        {(fields, { add, remove }) => (
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
                  <a
                    className="dynamic-delete-button"
                    onClick={() => {
                      remove(field.name);
                    }}
                  >
                    <Icon type="minus" />
                  </a>
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
                <Icon type="plus" /> Add field
              </Button>
            </Form.Item>
          </div>
        )}
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
