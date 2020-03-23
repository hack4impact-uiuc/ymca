// @flow

import React, { useCallback, useState } from 'react';
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

  const [comment, setComment] = useState(null);

  const onSubmit = useCallback(() => {
    const val = getFieldValue('comment');

    if (val !== undefined && val.trim() !== '') {
      setListOfStrings([...listOfStrings, val]);

      setFieldsValue({ comment: '' });
    }
  }, [getFieldValue, setListOfStrings, setFieldsValue, listOfStrings]);

  const onInputBlur = useCallback(() => {
    setTotalSubmitEnabled(true);
  }, [setTotalSubmitEnabled, setFieldsValue, comment]);

  return (
    <Form onSubmit={onSubmit}>
      <Form.Item>
        {getFieldDecorator('comment', {
          rules: [
            {
              required: true,
              message: 'Please input a value!',
              whitespace: true,
            },
          ],
        })(<Input placeholder="Enter a comment" />)}
      </Form.Item>
      <Button
        type="primary"
        className="form-btn"
        htmlType="submit"
        onClick={() => setTotalSubmitEnabled(false)}
      >
        Add comment
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

const CommentsFormItem = (props: FormItemProps) => {
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

export default CommentsFormItem;
