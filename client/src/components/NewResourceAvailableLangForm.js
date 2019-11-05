// @flow

import React, { useState } from 'react';
import { Button, Form, Input, List } from 'antd';

type FormProps = {
  availableLanguages: () => void,
  setAvailableLanguages: () => void,
  setTotalSubmitEnabled: () => void,

  form: {
    getFieldDecorator: () => any,
    getFieldValue: () => any,
    setFieldsValue: () => any,
  },
};

const AvailableLangForm = Form.create({ name: 'availableLanguages' })(props => {
  const {
    availableLanguages,
    setAvailableLanguages,
    setTotalSubmitEnabled,
  } = props;

  const { getFieldDecorator, getFieldValue, setFieldsValue } = props.form;

  return (
    <Form
      onSubmit={e => {
        const lang = getFieldValue('lang');
        setAvailableLanguages([...availableLanguages, getFieldValue('lang')]);

        setFieldsValue({ lang: '' });
      }}
    >
      <Form.Item>
        {getFieldDecorator('lang', {
          rules: [
            {
              required: true,
              message: 'Please input a language!',
            },
          ],
        })(<Input placeholder="Language" />)}
      </Form.Item>
    </Form>
  );
});

type FormItemProps = {
  availableLanguages: () => void,
  setAvailableLanguages: () => void,
  setTotalSubmitEnabled: () => void,
};

const AvailableLangFormItem = (props: FormItemProps) => {
  const {
    availableLanguages,
    setAvailableLanguages,
    setTotalSubmitEnabled,
  } = props;

  return (
    <Form.Item label="Available Languages">
      <List
        dataSource={availableLanguages}
        renderItem={item => (
          <List.Item
            actions={[
              <Button
                onClick={e => {
                  e.preventDefault();
                  setAvailableLanguages(
                    availableLanguages.filter(lang => lang !== item),
                  );
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
      <AvailableLangForm
        availableLanguages={availableLanguages}
        setAvailableLanguages={setAvailableLanguages}
        setTotalSubmitEnabled={setTotalSubmitEnabled}
      />
    </Form.Item>
  );
};

export default AvailableLangFormItem;
