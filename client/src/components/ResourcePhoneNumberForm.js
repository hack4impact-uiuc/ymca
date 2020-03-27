// @flow

/*
TODO: Implement phoneType into form.
*/

import React from 'react';
import '../css/ResourcePhoneNumberForm.css';
import { Input, Form, Button, List } from 'antd';

const PhoneNumberForm = Form.create({ name: 'phoneNumber' })(props => {
  const { setPhoneNumbers, phoneNumbers, setTotalSubmitEnabled } = props;
  const { setFieldsValue, getFieldValue, getFieldDecorator } = props.form;

  return (
    <Form
      className="phone-number-form"
      onSubmit={() => {
        const phoneNumber = getFieldValue('phoneNumber');
        const phoneType = getFieldValue('phoneType') || '';

        if (phoneNumber !== undefined && phoneNumber.trim() !== '') {
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
            onFocus={() => setTotalSubmitEnabled(false)}
            onBlur={() => setTotalSubmitEnabled(true)}
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
            onFocus={() => setTotalSubmitEnabled(false)}
            onBlur={() => setTotalSubmitEnabled(true)}
          />,
        )}
      </Form.Item>
      <Button
        type="primary"
        className="form-btn"
        htmlType="submit"
        onClick={() => setTotalSubmitEnabled(false)}
      >
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
    <Form.Item>
      <List
        className="phone-number-list"
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
