// @flow

import React, { useState, useEffect } from 'react';
import { Form, Button, Input, List } from 'antd';

const { TextArea } = Input;

type FormProps = {
  setTotalSubmitEnabled: () => void,
  placeholder: String,
  form: {
    getFieldDecorator: () => any,
    getFieldValue: () => any,
    setFieldsValue: () => any,
  },
};
const InternalNotesForm = (props: FormProps) => {
  const { setTotalSubmitEnabled, placeholder } = props;
  const { getFieldDecorator, getFieldValue, setFieldsValue } = props.form;

  return (
    <Form>
      <Form.Item>
        {getFieldDecorator('subject', {
          rules: [
            {
              required: true,
              message: 'Please enter subject!',
              whitespace: true,
            },
          ],
        })(<Input placeholder="Subject" />)}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('body', {
          rules: [
            {
              required: true,
              message: 'Please enter text!',
              whitespace: true,
            },
          ],
        })(
          <TextArea
            autoSize
            placeholder="Ex: Cases that deal with the courts 
            = NAWC does not accept.
                Refer to chicago attorney’s. 
                If letter from immigration authority in chicago most 
                likely deportation proceedings. 
                No one really in the area does this."
          />,
        )}
      </Form.Item>
    </Form>
  );
};

type FormItemProps = {
  formName: String,
  label: String,
  setTotalSubmitEnabled: () => void,
};
const InternalNotesFormItem = (props: FormItemProps) => {
  const { formName, label, setTotalSubmitEnabled } = props;

  const NoteForm = Form.create({ name: formName })(InternalNotesForm);

  return (
    <Form.Item label={label}>
      <NoteForm />
    </Form.Item>
  );
};

export default InternalNotesFormItem;
