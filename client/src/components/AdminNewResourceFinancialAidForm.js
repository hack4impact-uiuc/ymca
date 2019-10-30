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

type FinancialAid = {|
  education: String,
  immigrationStatus: String,
  deadline: String,
|};

type FormProps = {|
  financialAidDetails: FinancialAid,
  setFinancialAidDetails: () => void,
  setTotalSubmitEnabled: () => void,
|};

type EntryProps = {|
  financialAidDetails: FinancialAid,
  setFinancialAidDetails: () => void,
|};

const FinancialAidEntry = (props: EntryProps) => {
  const { financialAidDetails, setFinancialAidDetails } = props;

  return (
    <ListGroupItem>
      <div className="finAidContainer">
        <div className="finAidEducationView">
          {financialAidDetails.education}
        </div>
        <div className="finAidImmigrationStatusView">
          {financialAidDetails.immigrationStatus}
        </div>
        <div className="finAidDeadlineView">{financialAidDetails.deadline}</div>
        <div className="finAidClearButton">
          <Button
            color="danger"
            onClick={e => {
              e.preventDefault();
              setFinancialAidDetails({});
            }}
          >
            Clear
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
    education,
    immigrationStatus,
    deadline,
    setFinancialAidDetails,
    setEducation,
    setImmigrationStatus,
    setDeadline,
    setErrorMessage,
  } = args;

  e.preventDefault();

  if (submitEnabled) {
    setFinancialAidDetails({ education, immigrationStatus, deadline });
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

const AdminNewResourceFinancialAidForm = (props: FormProps) => {
  const {
    financialAidDetails,
    setFinancialAidDetails,
    setTotalSubmitEnabled,
  } = props;

  const [submitEnabled, setSubmitEnabled] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [education, setEducation] = useState('');
  const [immigrationStatus, setImmigrationStatus] = useState('');
  const [deadline, setDeadline] = useState('');

  return (
    <>
      {errorMessage !== '' && <Alert color="danger">{errorMessage}</Alert>}
      <ListGroup>
        {FinancialAidEntry({ financialAidDetails, setFinancialAidDetails })}
      </ListGroup>
      <Form
        onSubmit={e =>
          onSubmit({
            e,
            submitEnabled,
            education,
            immigrationStatus,
            deadline,
            setEducation,
            setImmigrationStatus,
            setDeadline,
            setErrorMessage,
            setFinancialAidDetails,
          })
        }
      >
        <FormGroup>
          <div className="finAidContainer">
            <div className="finAidEducationInput">
              <Input
                id="finAidEducationInput_"
                type="text"
                placeholder="Education"
                onChange={e => setEducation(e.target.value)}
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
            <div className="finAidImmigrationStatusInput">
              <Input
                id="finAidImmigrationStatusInput_"
                type="text"
                placeholder="Immigration status"
                onChange={e => setImmigrationStatus(e.target.value)}
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
            <div className="finAidDeadlineInput">
              <Input
                id="finAidDeadlineInput_"
                type="text"
                placeholder="Deadline"
                onChange={e => setDeadline(e.target.value)}
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
          value="Add information"
          onClick={() => setSubmitEnabled(true)}
        />
      </Form>
    </>
  );
};

export default AdminNewResourceFinancialAidForm;
