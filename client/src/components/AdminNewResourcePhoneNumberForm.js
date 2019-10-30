// @flow

/*
TODO: Implement phoneType into form.
*/

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
  Alert,
} from 'reactstrap';

type FormProps = {|
  phoneNumbers: Array<String>,
  setPhoneNumbers: () => void,
  setEnableTotalFormSubmission: () => void,
|};

type EntryProps = {|
  phoneNumber: Number,
  phoneType: String,
  phoneNumbers: Array<String>,
  setPhoneNumbers: () => void,
|};

const PhoneNumberEntry = (props: EntryProps) => {
  const { phoneNumber, phoneType, phoneNumbers, setPhoneNumbers } = props;

  return (
    <ListGroupItem>
      <div className="phoneNumberContainer">
        <div className="phoneNumberView">{phoneNumber}</div>
        <div className="phoneTypeView">{phoneType}</div>
        <div className="phoneNumberDeleteButton">
          <Button
            color="danger"
            onClick={e => {
              e.preventDefault();
              setPhoneNumbers(
                phoneNumbers.filter(num => num.phoneNumber !== phoneNumber),
              );
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
    phoneNumber,
    phoneType,
    phoneNumbers,
    setPhoneNumber,
    setPhoneNumbers,
    setPhoneType,
    setErrorMessage,
  } = args;

  e.preventDefault();

  if (submitEnabled) {
    if (phoneNumber !== '' && phoneType !== '') {
      setPhoneNumbers([...phoneNumbers, { phoneNumber, phoneType }]);
      setPhoneNumber('');
      setPhoneType('');
      setErrorMessage('');

      document.getElementById('phoneNumberInput_').value = '';
      document.getElementById('phoneTypeInput_').value = '';
    } else {
      setErrorMessage('A field is missing.');
    }
  }
};

const onInputFocus = (setEnableTotalFormSubmission, setSubmitEnabled) => {
  setEnableTotalFormSubmission(false);
  setSubmitEnabled(true);
};

const onInputBlur = (setEnableTotalFormSubmission, setSubmitEnabled) => {
  setEnableTotalFormSubmission(true);
  setSubmitEnabled(false);
};

const AdminNewResourcePhoneNumberForm = (props: FormProps) => {
  const { phoneNumbers, setPhoneNumbers, setEnableTotalFormSubmission } = props;

  const [submitEnabled, setSubmitEnabled] = useState(false);

  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneType, setPhoneType] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  return (
    <>
      {errorMessage !== '' && <Alert color="danger">{errorMessage}</Alert>}
      <ListGroup>
        {phoneNumbers.map(pnobj => {
          return PhoneNumberEntry({
            phoneNumber: pnobj.phoneNumber,
            phoneType: pnobj.phoneType,
            phoneNumbers,
            setPhoneNumbers,
          });
        })}
      </ListGroup>
      <Form
        onSubmit={e =>
          onSubmit({
            e,
            submitEnabled,
            phoneNumber,
            phoneType,
            phoneNumbers,
            setPhoneNumber,
            setPhoneNumbers,
            setPhoneType,
            setErrorMessage,
          })
        }
      >
        <FormGroup>
          <div className="phoneInputContainer">
            <div className="phoneNumberInput">
              <Input
                id="phoneNumberInput_"
                type="text"
                placeholder="Enter phone number"
                onChange={e => setPhoneNumber(e.target.value)}
                onFocus={e =>
                  onInputFocus(setEnableTotalFormSubmission, setSubmitEnabled)
                }
                onBlur={e =>
                  onInputBlur(setEnableTotalFormSubmission, setSubmitEnabled)
                }
              />
            </div>
            <div className="phoneTypeInput">
              <Input
                id="phoneTypeInput_"
                type="text"
                placeholder="Enter phone type (i.e. Mobile, Home, ...)"
                onChange={e => setPhoneType(e.target.value)}
                onFocus={e =>
                  onInputFocus(setEnableTotalFormSubmission, setSubmitEnabled)
                }
                onBlur={e =>
                  onInputBlur(setEnableTotalFormSubmission, setSubmitEnabled)
                }
              />
            </div>
          </div>
        </FormGroup>
        <Input
          type="submit"
          value="Add phone number"
          onClick={() => setSubmitEnabled(true)}
        />
      </Form>
    </>
  );
};

export default AdminNewResourcePhoneNumberForm;
