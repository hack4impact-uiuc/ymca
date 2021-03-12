// @flow

/*
TODO: Implement phoneType into form.
*/

import React from 'react';
import '../css/ResourcePhoneNumberForm.css';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input, Button, List } from 'antd';

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

const ContactForm = Form.create({ name: 'contactForm' })((props) => {
  const { contacts, setContacts, setTotalSubmitEnabled } = props;

  const { getFieldDecorator, setFieldsValue, getFieldValue } = props.form;

  const onSubmit = () => {
    const contactName = getFieldValue('contactName');
    const contactRole = getFieldValue('contactRole');

    if (
      contactName !== undefined &&
      contactRole !== undefined &&
      contactName.trim() !== '' &&
      contactRole.trim() !== ''
    ) {
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
  };

  return (
    <Form className="contact-form">
      <Form.Item>
        {getFieldDecorator('contactName', {
          rules: [
            {
              required: true,
              message: 'Please input a name!',
              whitespace: true,
            },
          ],
        })(
          <Input
            placeholder="Contact Name"
            onFocus={() => setTotalSubmitEnabled(false)}
            onBlur={() => setTotalSubmitEnabled(true)}
          />,
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('contactRole', {
          rules: [
            {
              required: true,
              message: 'Please input a role!',
              whitespace: true,
            },
          ],
        })(
          <Input
            placeholder="Contact Role"
            onFocus={() => setTotalSubmitEnabled(false)}
            onBlur={() => setTotalSubmitEnabled(true)}
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
            onFocus={() => setTotalSubmitEnabled(false)}
            onBlur={() => setTotalSubmitEnabled(true)}
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
            onFocus={() => setTotalSubmitEnabled(false)}
            onBlur={() => setTotalSubmitEnabled(true)}
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
            onFocus={() => setTotalSubmitEnabled(false)}
            onBlur={() => setTotalSubmitEnabled(true)}
          />,
        )}
      </Form.Item>
      <Button
        type="primary"
        className="contact-submit form-btn"
        onClick={() => {
          setTotalSubmitEnabled(false);
          onSubmit();
        }}
      >
        Add Contact
      </Button>
    </Form>
  );
});

const ContactFormItem = (props: FormItemProps) => {
  const { contacts, setContacts, setTotalSubmitEnabled } = props;

  return (
    <Form.Item>
      <List
        dataSource={contacts}
        renderItem={(contact) => (
          <List.Item
            actions={[
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  setContacts(contacts.filter((other) => other !== contact));
                }}
                key="delete-contact"
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
