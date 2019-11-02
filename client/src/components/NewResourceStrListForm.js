// @flow

import React from 'react';
import { Form, Input, Button, List } from 'antd';

type FormProps = {
  listOfStrings: Array<String>,
  setListOfStrings: () => void,
  setTotalSubmitEnabled: () => void,
  placeholder: String,
  form: {
    getFieldDecorator: () => any,
    getFieldValue: () => any,
    setFieldsValue: () => any,
  },
};

const StrForm = (props: FormProps) => {
  const {
    listOfStrings,
    setListOfStrings,
    setTotalSubmitEnabled,
    placeholder,
  } = props;

  const { getFieldDecorator, getFieldValue, setFieldsValue } = props.form;

  return (
    <Form
      onSubmit={() => {
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
};

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

  const NewFrom = Form.create({ name: formName })(StrForm);

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
      <NewFrom
        listOfStrings={listOfStrings}
        setListOfStrings={setListOfStrings}
        setTotalSubmitEnabled={setTotalSubmitEnabled}
        placeholder={placeholder}
      />
    </Form.Item>
  );
};

export default StrListFormItem;
