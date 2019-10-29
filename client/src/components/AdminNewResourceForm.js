import React, { useState, useDebugValue } from 'react';
import {
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Button,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from 'reactstrap';
import AppNavbar from './AppNavbar';
import ExtraResourceInformationForm from './ExtraResourceInformationForm';

const AdminNewResourceForm = () => {
  const [seeMoreInfo, setSeeMoreInfo] = useState(false);
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [resourceName, setResourceName] = useState('');
  const [description, setDescription] = useState('');
  const [website, setWebsite] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumbers, setPhoneNumbers] = useState();
  const [contacts, setContacts] = useState();
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [hoursOfOperation, setHoursOfOperation] = useState('');
  const [eligibilityRequirements, setEligibilityRequirements] = useState('');
  const [financialAidDetails, setFinancialAidDetails] = useState();
  const [cost, setCost] = useState('');
  const [availableLanguages, setAvailableLanguages] = useState([]);
  const [recommendation, setRecommendation] = useState('');
  const [comments, setComments] = useState([]);
  const [internalNotes, setInternalNotes] = useState([]);

  return (
    <Form>
      <FormGroup>
        <Label for="category">Category</Label>
        <Input
          type="select"
          name="selectCategory"
          onChange={e => setCategory(e.target.value)}
        >
          <option>Select an option</option>
          {}
        </Input>
      </FormGroup>
      <FormGroup>
        <Label for="subcategory">Subcategory</Label>
        <Input
          type="select"
          name="selectSubcategory"
          onChange={e => setSubcategory(e.target.value)}
        >
          <option>Select an option</option>
          {}
        </Input>
      </FormGroup>
      <FormGroup>
        <Label for="resourceName">Resource Name</Label>
        <Input
          type="text"
          name="name"
          placeholder="Resource Name"
          onChange={e => setResourceName(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Label for="description" onChange={setDescription}>
          Description
        </Label>
        <Input
          type="textfield"
          name="description"
          placeholder="Description"
          onChange={e => setDescription(e.target.value)}
        />
      </FormGroup>

      <Button color="link" onClick={() => setSeeMoreInfo(!seeMoreInfo)}>
        {' '}
        {(!seeMoreInfo && <>More details</>) || <>Less details</>}
      </Button>
      {seeMoreInfo &&
        ExtraResourceInformationForm({
          setWebsite,
          setEmail,
          setPhoneNumbers,
          setContacts,
          setAddress,
          setCity,
          setHoursOfOperation,
          setEligibilityRequirements,
          setFinancialAidDetails,
          setCost,
          setAvailableLanguages,
          setRecommendation,
          setComments,
          setInternalNotes,
        })}
    </Form>
  );
};

export default AdminNewResourceForm;

const onSubmitAdminNewResourceForm = e => {
  e.preventDefault();
};

const PhoneNumberView = () => {
  return (
    <>
      <InputGroup>
        <Input type="text" placeholder="Phone Number" />
      </InputGroup>
    </>
  );
};
