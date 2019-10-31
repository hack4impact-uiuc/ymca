// @flow

/*
TODO: Implement phoneType into form.
*/

import React, { useState } from 'react';
import '../css/NewResourcePhoneNumberForm.css';
import { Input, Form, Button, List, Skeleton } from 'antd';

type PhoneNumber = {|
  phoneNumber: Number,
  phoneType: String,
|};

type EntryProps = {|
  phoneNumber: Number,
  phoneType: String,
  phoneNumbers: Array<String>,
  setPhoneNumbers: () => void,
|};

const onInputFocus = (setTotalSubmitEnabled, setSubmitEnabled) => {
  setTotalSubmitEnabled(false);
  setSubmitEnabled(true);
};

const onInputBlur = (
  setTotalSubmitEnabled,
  setSubmitEnabled,
  setErrorMessage,
) => {
  setTotalSubmitEnabled(true);
  setSubmitEnabled(false);
  setErrorMessage('');
};

const PhoneNumberForm = Form.create({ name: 'phoneNumber' })(props => {
  const { setPhoneNumbers, phoneNumbers } = props;

  const { setFieldsValue, getFieldValue, getFieldDecorator } = props.form;

  return (
    <Form
      className="phoneNumberForm"
      onSubmit={e => {
        const phoneNumber = getFieldValue('phoneNumber');
        const phoneType = getFieldValue('phoneType') || '';

        if (phoneNumber !== '') {
          setPhoneNumbers([
            ...phoneNumbers,
            {
              phoneNumber,
              phoneType,
            },
          ]);

          setFieldsValue({
            phoneNumber: '',
            phoneType: '',
          });
        }
      }}
    >
      <Form.Item>
        {getFieldDecorator('phoneNumber', {
          rules: [
            {
              required: true,
              message: 'Please input a phone number!',
              whitespace: true,
            },
          ],
        })(<Input id="phoneNumberInput" placeholder="Phone Number" />)}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('phoneType', {
          rules: [
            {
              required: true,
              message: 'Please input phone type!',
            },
          ],
        })(
          <Input
            id="phoneTypeInput"
            placeholder="Phone Type (i.e. Mobile, Home, etc.)"
          />,
        )}
      </Form.Item>
      <Button type="primary" htmlType="submit" className="phoneNumberSubmit">
        Add Phone Number
      </Button>
    </Form>
  );
});

const NewResourcePhoneNumberFormItem = props => {
  const {
    phoneNumbers,
    setPhoneNumbers,
    setTotalSubmitEnabled,
    getFieldDecorator,
  } = props;

  const [submitEnabled, setSubmitEnabled] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  return (
    <Form.Item label="Phone Number">
      <List
        className="phoneNumberList"
        itemLayout="horizontal"
        dataSource={phoneNumbers}
        renderItem={item => (
          <List.Item
            actions={[
              <Button
                onClick={e => {
                  e.preventDefault();
                  setPhoneNumbers(
                    phoneNumbers.filter(
                      num =>
                        num.phoneNumber !== item.phoneNumber ||
                        num.phoneType !== item.phoneType,
                    ),
                  );
                }}
              >
                Delete
              </Button>,
            ]}
          >
            <List.Item.Meta
              title={item.phoneNumber}
              description={item.phoneType}
            />
          </List.Item>
        )}
      />

      <PhoneNumberForm
        phoneNumbers={phoneNumbers}
        setPhoneNumbers={setPhoneNumbers}
        wrappedComponentRef={form => (this.form = form)}
      />
    </Form.Item>
  );
};

export default NewResourcePhoneNumberFormItem;
