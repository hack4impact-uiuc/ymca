// @flow

import React, { useCallback } from 'react';
import { Form, Input, Button, List } from 'antd';

type FormProps = {
  listOfStrings: Array<String>,
  setListOfStrings: () => void,
  setTotalSubmitEnabled: () => void,
  form: {
    getFieldDecorator: () => any,
    getFieldValue: () => any,
    setFieldsValue: () => any,
  },
};

const StrForm = (props: FormProps) => {
  const { listOfStrings, setListOfStrings, setTotalSubmitEnabled } = props;

  const { getFieldDecorator, getFieldValue, setFieldsValue } = props.form;

  const onSubmit = useCallback(() => {
    const val = getFieldValue('requiredDocuments');

    if (val !== undefined && val.trim() !== '') {
      setListOfStrings([...listOfStrings, val]);

      setFieldsValue({ requiredDocuments: '' });
    }
  }, [getFieldValue, setListOfStrings, setFieldsValue, listOfStrings]);

  return (
    <Form onSubmit={onSubmit}>
      <Form.Item>
        {getFieldDecorator('requiredDocuments', {
          rules: [
            {
              required: true,
              message: 'Please input a value!',
              whitespace: true,
            },
          ],
        })(<Input placeholder="Enter required documents" />)}
      </Form.Item>
      <Button
        type="primary"
        className="form-btn"
        htmlType="submit"
        onClick={() => setTotalSubmitEnabled(false)}
      >
        Add
      </Button>
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

const RequiredDocumentsFormItem = (props: FormItemProps) => {
  const {
    formName,
    label,
    listOfStrings,
    setListOfStrings,
    setTotalSubmitEnabled,
    placeholder,
  } = props;

  const NewForm = Form.create({ name: formName })(StrForm);

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
      <NewForm
        listOfStrings={listOfStrings}
        setListOfStrings={setListOfStrings}
        setTotalSubmitEnabled={setTotalSubmitEnabled}
        placeholder={placeholder}
      />
    </Form.Item>
  );
};

export default RequiredDocumentsFormItem;
