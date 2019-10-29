// @flow

import React, { useState } from 'react';
import '../css/AdminNewResourcePhoneNumberForm.css';
import {
  Form,
  FormGroup,
  Label,
  Input,
  ListGroup,
  ListGroupItem,
  Button,
} from 'reactstrap';

type FormProps = {|
  phoneNumbers: Array<String>,
  setPhoneNumbers: () => void,
  setEnableTotalFormSubmission: () => void,
|};

type EntryProps = {|
  phoneNumber: Number,
  phoneNumbers: Array<String>,
  setPhoneNumbers: () => void,
|};

const PhoneNumberEntry = (props: EntryProps) => {
  const { phoneNumber, phoneNumbers, setPhoneNumbers } = props;

  return (
    <ListGroupItem>
      <div className="phoneNumberContainer">
        <div className="phoneNumber">{phoneNumber}</div>
        <div className="phoneNumberDeleteButton">
          <Button
            color="danger"
            onClick={e => {
              e.preventDefault();
              setPhoneNumbers(phoneNumbers.filter(num => num !== phoneNumber));
            }}
          >
            Delete
          </Button>
        </div>
      </div>
    </ListGroupItem>
  );
};

const onSubmit = (
  e,
  submitEnabled,
  newPhoneNumber,
  phoneNumbers,
  setPhoneNumber,
  setPhoneNumbers,
) => {
  e.preventDefault();

  if (submitEnabled && newPhoneNumber !== '') {
    setPhoneNumbers([...phoneNumbers, newPhoneNumber]);
    setPhoneNumber('');
    document.getElementById('phoneNumberInput').value = '';
  }
};

const AdminNewResourcePhoneNumberForm = (props: FormProps) => {
  const { phoneNumbers, setPhoneNumbers, setEnableTotalFormSubmission } = props;

  const [phoneNumber, setPhoneNumber] = useState('');
  const [submitEnabled, setSubmitEnabled] = useState(false);

  return (
    <>
      <ListGroup>
        {phoneNumbers.map(num => {
          return PhoneNumberEntry({
            phoneNumber: num,
            phoneNumbers,
            setPhoneNumbers,
          });
        })}
      </ListGroup>
      <Form
        onSubmit={e =>
          onSubmit(
            e,
            submitEnabled,
            phoneNumber,
            phoneNumbers,
            setPhoneNumber,
            setPhoneNumbers,
          )
        }
      >
        <FormGroup>
          <Input
            id="phoneNumberInput"
            type="text"
            placeholder="Enter phone number"
            onChange={e => setPhoneNumber(e.target.value)}
            onFocus={e => {
              setEnableTotalFormSubmission(false);
              setSubmitEnabled(true);
            }}
            onBlur={e => {
              setEnableTotalFormSubmission(true);
              setSubmitEnabled(false);
            }}
          />
        </FormGroup>
      </Form>
    </>
  );
};

export default AdminNewResourcePhoneNumberForm;
