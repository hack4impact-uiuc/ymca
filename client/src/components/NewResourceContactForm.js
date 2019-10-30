// @flow

/*
TODO: Implement phoneType into form.
*/

import React, { useState } from 'react';
import '../css/NewResourcePhoneNumberForm.css';
import {
  Form,
  FormGroup,
  Label,
  Input,
  ListGroup,
  ListGroupItem,
  Button,
  Alert,
} from 'reactstrap';

type Contact = {|
  role: String,
  name: String,
  email: String,
  phoneNumber: String,
  note: String,
|};

type FormProps = {|
  contacts: Array<Contact>,
  setContacts: () => void,
  setTotalSubmitEnabled: () => void,
|};

type EntryProps = {|
  contact: Contact,
  contacts: Array<Contact>,
  setContacts: () => void,
|};

const ContactEntry = (props: EntryProps) => {
  const { contact, contacts, setContacts } = props;

  return (
    <ListGroupItem>
      <div className="contactsContainer">
        <div className="contactNameView">{contact.name}</div>
        <div className="contactRoleView">{contact.role}</div>
        <div className="contactEmailView">{contact.email}</div>
        <div className="contactPhoneNumber">{contact.phoneNumber}</div>
        <div className="contactNoteView">{contact.note}</div>
        <div className="contactDeleteButton">
          <Button
            color="danger"
            onClick={e => {
              e.preventDefault();
              setContacts(contacts.filter(c => c !== contact));
            }}
          >
            Delete
          </Button>
        </div>
      </div>
    </ListGroupItem>
  );
};

const onSubmit = args => {
  const {
    e,
    submitEnabled,
    contact,
    contacts,
    setContacts,
    setRole,
    setName,
    setEmail,
    setPhoneNumber,
    setNote,
    setErrorMessage,
  } = args;

  e.preventDefault();

  if (submitEnabled) {
    if (contact.name !== '' && contact.role !== '') {
      setContacts([...contacts, contact]);

      setRole('');
      setName('');
      setEmail('');
      setPhoneNumber('');
      setNote('');

      setErrorMessage('');

      document.getElementById('contactRoleInput_').value = '';
      document.getElementById('contactNameInput_').value = '';
      document.getElementById('contactEmailInput_').value = '';
      document.getElementById('contactPhoneNumberInput_').value = '';
      document.getElementById('contactNoteInput_').value = '';
    } else {
      setErrorMessage('A field is missing.');
    }
  }
};

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

const NewResourceContactForm = (props: FormProps) => {
  const { contacts, setContacts, setTotalSubmitEnabled } = props;

  const [submitEnabled, setSubmitEnabled] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [role, setRole] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [note, setNote] = useState('');

  return (
    <>
      {errorMessage !== '' && <Alert color="danger">{errorMessage}</Alert>}
      <ListGroup>
        {contacts.map(cobj => {
          return ContactEntry({
            contact: cobj,
            contacts,
            setContacts,
          });
        })}
      </ListGroup>
      <Form
        onSubmit={e =>
          onSubmit({
            e,
            submitEnabled,
            contact: {
              role,
              name,
              email,
              phoneNumber,
              note,
            },
            contacts,
            setContacts,
            setRole,
            setName,
            setEmail,
            setPhoneNumber,
            setNote,
            setErrorMessage,
          })
        }
      >
        <FormGroup>
          <div className="contactContainer">
            <div className="contactRoleInput">
              <Input
                id="contactRoleInput_"
                type="text"
                placeholder="Role"
                onChange={e => setRole(e.target.value)}
                onFocus={e =>
                  onInputFocus(setTotalSubmitEnabled, setSubmitEnabled)
                }
                onBlur={e =>
                  onInputBlur(
                    setTotalSubmitEnabled,
                    setSubmitEnabled,
                    setErrorMessage,
                  )
                }
              />
            </div>
            <div className="contactNameInput">
              <Input
                id="contactNameInput_"
                type="text"
                placeholder="Name"
                onChange={e => setName(e.target.value)}
                onFocus={e =>
                  onInputFocus(setTotalSubmitEnabled, setSubmitEnabled)
                }
                onBlur={e =>
                  onInputBlur(
                    setTotalSubmitEnabled,
                    setSubmitEnabled,
                    setErrorMessage,
                  )
                }
              />
            </div>
            <div className="contactEmailInput">
              <Input
                id="contactEmailInput_"
                type="text"
                placeholder="Email"
                onChange={e => setEmail(e.target.value)}
                onFocus={e =>
                  onInputFocus(setTotalSubmitEnabled, setSubmitEnabled)
                }
                onBlur={e =>
                  onInputBlur(
                    setTotalSubmitEnabled,
                    setSubmitEnabled,
                    setErrorMessage,
                  )
                }
              />
            </div>
            <div className="contactPhoneNumberInput">
              <Input
                id="contactPhoneNumberInput_"
                type="text"
                placeholder="Phone number"
                onChange={e => setPhoneNumber(e.target.value)}
                onFocus={e =>
                  onInputFocus(setTotalSubmitEnabled, setSubmitEnabled)
                }
                onBlur={e =>
                  onInputBlur(
                    setTotalSubmitEnabled,
                    setSubmitEnabled,
                    setErrorMessage,
                  )
                }
              />
            </div>
            <div className="contactNoteInput">
              <Input
                id="contactNoteInput_"
                type="textarea"
                placeholder="Note"
                onChange={e => setNote(e.target.value)}
                onFocus={e =>
                  onInputFocus(setTotalSubmitEnabled, setSubmitEnabled)
                }
                onBlur={e =>
                  onInputBlur(
                    setTotalSubmitEnabled,
                    setSubmitEnabled,
                    setErrorMessage,
                  )
                }
              />
            </div>
          </div>
        </FormGroup>
        <Input
          type="submit"
          value="Add contact"
          onClick={() => setSubmitEnabled(true)}
        />
      </Form>
    </>
  );
};

export default NewResourceContactForm;
