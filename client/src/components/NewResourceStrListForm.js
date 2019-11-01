// @flow

import React, { useState } from 'react';
import { Form, Input, Button, List } from 'antd';

const StrForm = Form.create({ name: 'availableLanguages' })(props => {
  const {
    listOfStrings,
    setListOfStrings,
    setTotalSubmitEnabled,
    placeholder,
  } = props;

  const { getFieldDecorator, getFieldValue, setFieldsValue } = props.form;

  return (
    <Form
      onSubmit={e => {
        const val = getFieldValue('val');
        setListOfStrings([...listOfStrings, val]);

        setFieldsValue({ val: '' });
      }}
    >
      <Form.Item>
        {getFieldDecorator('val', {
          rules: [
            {
              required: true,
              message: 'Please input a value!',
            },
          ],
        })(<Input placeholder={placeholder} />)}
      </Form.Item>
    </Form>
  );
});

type FormItemProps = {
  formName: String,
  label: String,
  placeholder: String,
  listOfStrings: Array<String>,
  setListOfStrings: () => void,
  setTotalSubmitEnabled: () => void,
};

const StrListFormItem = (props: FormItemProps) => {
  const {
    formName,
    label,
    listOfStrings,
    setListOfStrings,
    setTotalSubmitEnabled,
    placeholder,
  } = props;

  const form = Form.create({ name: formName })(StrForm);

  return (
    <Form.Item label={label}>
      <List
        dataSource={listOfStrings}
        renderItem={item => (
          <List.Item
            actions={[
              <Button
                onClick={e => {
                  e.preventDefault();
                  setListOfStrings(listOfStrings.filter(str => str !== item));
                }}
              >
                Delete
              </Button>,
            ]}
          >
            <List.Item.Meta title={item} />
          </List.Item>
        )}
      />
      <StrForm
        listOfStrings={listOfStrings}
        setListOfStrings={setListOfStrings}
        setTotalSubmitEnabled={setTotalSubmitEnabled}
        placeholder={placeholder}
      />
    </Form.Item>
  );
};

export default StrListFormItem;
