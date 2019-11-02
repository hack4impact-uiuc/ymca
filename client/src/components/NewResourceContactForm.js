// @flow

/*
TODO: Implement phoneType into form.
*/

import React, { useState } from 'react';
import '../css/NewResourcePhoneNumberForm.css';
import { Input, Form, Button, List, Skeleton } from 'antd';

type Contact = {|
  role: String,
  name: String,
  email: String,
  phoneNumber: String,
  note: String,
|};

type FormItemProps = {
  contacts: Array<Contact>,
  setContacts: () => void,
  setTotalSubmitEnabled: () => void,
};

const onInputFocus = (setSubmitEnabled, setTotalSubmitEnabled) => {
  setSubmitEnabled(true);
  setTotalSubmitEnabled(false);
};

const onInputBlur = (setSubmitEnabled, setTotalSubmitEnabled) => {
  setSubmitEnabled(false);
  setTotalSubmitEnabled(true);
};

const ContactForm = Form.create({ name: 'contactForm' })(props => {
  const { contacts, setContacts, setTotalSubmitEnabled } = props;

  const { getFieldDecorator, setFieldsValue, getFieldValue } = props.form;

  const [submitEnabled, setSubmitEnabled] = useState(false);

  return (
    <Form
      className="contactForm"
      onSubmit={e => {
        const contactName = getFieldValue('contactName');
        const contactRole = getFieldValue('contactRole');

        if (contactName !== '' && contactRole !== '') {
          setContacts([
            ...contacts,
            {
              name: contactName,
              role: contactRole,
              email: getFieldValue('contactEmail') || '',
              phoneNumber: getFieldValue('contactPhoneNumber') || '',
              note: getFieldValue('contactNote') || '',
            },
          ]);

          setFieldsValue({
            contactName: '',
            contactRole: '',
            contactEmail: '',
            contactPhoneNumber: '',
            contactNote: '',
          });
        }
      }}
    >
      <Form.Item>
        {getFieldDecorator('contactName', {
          rules: [
            {
              required: true,
              message: 'Please input a name!',
            },
          ],
        })(
          <Input
            placeholder="Contact Name"
            onFocus={e => onInputFocus(setSubmitEnabled, setTotalSubmitEnabled)}
            onBlur={e => onInputBlur(setSubmitEnabled, setTotalSubmitEnabled)}
          />,
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('contactRole', {
          rules: [
            {
              required: true,
              message: 'Please input a role!',
            },
          ],
        })(
          <Input
            placeholder="Contact Role"
            onFocus={e => onInputFocus(setSubmitEnabled, setTotalSubmitEnabled)}
            onBlur={e => onInputBlur(setSubmitEnabled, setTotalSubmitEnabled)}
          />,
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('contactEmail', {
          rules: [
            {
              required: false,
            },
          ],
        })(
          <Input
            placeholder="Contact Email"
            onFocus={e => onInputFocus(setSubmitEnabled, setTotalSubmitEnabled)}
            onBlur={e => onInputBlur(setSubmitEnabled, setTotalSubmitEnabled)}
          />,
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('contactPhoneNumber', {
          rules: [
            {
              required: false,
            },
          ],
        })(
          <Input
            placeholder="Contact Phone Number"
            onFocus={e => onInputFocus(setSubmitEnabled, setTotalSubmitEnabled)}
            onBlur={e => onInputBlur(setSubmitEnabled, setTotalSubmitEnabled)}
          />,
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('contactNote', {
          rules: [
            {
              required: false,
            },
          ],
        })(
          <Input
            placeholder="Contact Note"
            onFocus={e => onInputFocus(setSubmitEnabled, setTotalSubmitEnabled)}
            onBlur={e => onInputBlur(setSubmitEnabled, setTotalSubmitEnabled)}
          />,
        )}
      </Form.Item>
      <Button type="primary" htmlType="submit" className="contactSubmit">
        Add Contact
      </Button>
    </Form>
  );
});

const ContactFormItem = (props: FormItemProps) => {
  const { contacts, setContacts, setTotalSubmitEnabled } = props;

  return (
    <Form.Item label="Contacts">
      <List
        dataSource={contacts}
        renderItem={contact => (
          <List.Item
            actions={[
              <Button
                onClick={e => {
                  e.preventDefault();
                  setContacts(contacts.filter(other => other !== contact));
                }}
              >
                Delete
              </Button>,
            ]}
          >
            <List.Item.Meta title={contact.name} description={contact.role} />
            {contact.email}
            <br />
            {contact.phoneNumber}
            <br />
            {contact.note}
          </List.Item>
        )}
      />
      <ContactForm
        contacts={contacts}
        setContacts={setContacts}
        setTotalSubmitEnabled={setTotalSubmitEnabled}
      />
    </Form.Item>
  );
};

export default ContactFormItem;
