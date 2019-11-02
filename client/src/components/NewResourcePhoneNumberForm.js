// @flow

/*
TODO: Implement phoneType into form.
*/

import React, { useState } from 'react';
import '../css/NewResourcePhoneNumberForm.css';
import { Input, Form, Button, List, Skeleton } from 'antd';

const onInputFocus = (setTotalSubmitEnabled, setSubmitEnabled) => {
  setTotalSubmitEnabled(false);
  setSubmitEnabled(true);
};

const onInputBlur = (setTotalSubmitEnabled, setSubmitEnabled) => {
  setTotalSubmitEnabled(true);
  setSubmitEnabled(false);
};

const PhoneNumberForm = Form.create({ name: 'phoneNumber' })(props => {
  const { setPhoneNumbers, phoneNumbers, setTotalSubmitEnabled } = props;
  const { setFieldsValue, getFieldValue, getFieldDecorator } = props.form;

  const [submitEnabled, setSubmitEnabled] = useState(false);

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
        })(
          <Input
            placeholder="Phone Number"
            onFocus={e => onInputFocus(setTotalSubmitEnabled, setSubmitEnabled)}
            onBlur={e => onInputBlur(setTotalSubmitEnabled, setSubmitEnabled)}
          />,
        )}
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
            placeholder="Phone Type (i.e. Mobile, Home, etc.)"
            onFocus={e => onInputFocus(setTotalSubmitEnabled, setSubmitEnabled)}
            onBlur={e => onInputBlur(setTotalSubmitEnabled, setSubmitEnabled)}
          />,
        )}
      </Form.Item>
      <Button type="primary" htmlType="submit" className="phoneNumberSubmit">
        Add Phone Number
      </Button>
    </Form>
  );
});

type PhoneNumber = {
  phoneNumber: String,
  phoneType: String,
};

type FormItemProps = {
  phoneNumbers: Array<PhoneNumber>,
  setPhoneNumbers: () => void,
  setTotalSubmitEnabled: () => void,
};

const PhoneNumberFormItem = (props: FormItemProps) => {
  const { phoneNumbers, setPhoneNumbers, setTotalSubmitEnabled } = props;

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
                  setPhoneNumbers(phoneNumbers.filter(num => num !== item));
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
        setTotalSubmitEnabled={setTotalSubmitEnabled}
      />
    </Form.Item>
  );
};

export default PhoneNumberFormItem;
