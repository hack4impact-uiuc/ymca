import React, { useState, useDebugValue } from 'react';
import '../css/NewResourceForm.css';
import {
  Alert,
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
import { addResource, getCategories } from '../utils/api';
import NewResourcePhoneNumberForm from './NewResourcePhoneNumberForm';
import NewResourceContactForm from './NewResourceContactForm';
import NewResourceFinancialAidForm from './NewResourceFinancialAidForm';

const onSubmitNewResourceForm = (e, enabled, resource, onSucc, onErr) => {
  e.preventDefault();

  if (enabled) {
    const res = addResource(resource);
    if (res.status === 200) {
      onSucc(res);
    } else {
      onErr(res);
    }
  }
};

const NewResourceForm = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [totalSubmitEnabled, setTotalSubmitEnabled] = useState(true);

  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [resourceName, setResourceName] = useState('');
  const [description, setDescription] = useState('');
  const [website, setWebsite] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumbers, setPhoneNumbers] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [hoursOfOperation, setHoursOfOperation] = useState('');
  const [eligibilityRequirements, setEligibilityRequirements] = useState('');
  const [financialAidDetails, setFinancialAidDetails] = useState({});
  const [cost, setCost] = useState('');
  const [availableLanguages, setAvailableLanguages] = useState([]);
  const [recommendation, setRecommendation] = useState('');
  const [comments, setComments] = useState([]);
  const [internalNotes, setInternalNotes] = useState([]);

  // load categories
  const categories = [];
  const subcategories = {};
  getCategories().then(res => {
    if (res.code === 200) {
      const fetchedCategories = res.result;

      fetchedCategories.forEach(fetched => {
        categories.push(
          <option>
            <p>{fetched.name}</p>
          </option>,
        );
        subcategories[fetched.name] = fetched.subcategories;
      });
    } else {
      setErrorMessage(res.message);
    }
  });

  console.log(categories);
  console.log(subcategories);

  return (
    <Form
      className="form"
      onSubmit={e =>
        onSubmitNewResourceForm(
          e,
          totalSubmitEnabled,
          {
            category,
            subcategory,
            resourceName,
            description,
            website,
            email,
            phoneNumbers,
            contacts,
            address,
            city,
            hoursOfOperation,
            eligibilityRequirements,
            financialAidDetails,
            cost,
            availableLanguages,
            recommendation,
            comments,
            internalNotes,
          },
          res => {
            setSuccessMessage('Resource successfully created!');
            setErrorMessage('');
          },
          res => {
            setSuccessMessage('');
            setErrorMessage('Something went wrong!');
          },
        )
      }
    >
      {errorMessage !== '' && <Alert color="danger">{errorMessage}</Alert>}

      <FormGroup>
        <Label for="category">Category</Label>
        <Input
          type="select"
          name="selectCategory"
          onChange={e => setCategory(e.target.value)}
        >
          {categories}
        </Input>
      </FormGroup>
      <FormGroup>
        <Label for="subcategory">Subcategory</Label>
        <Input
          type="select"
          name="selectSubcategory"
          onChange={e => setSubcategory(e.target.value)}
        />
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
      <FormGroup>
        <Label for="website">Website</Label>
        <Input
          type="text"
          name="website"
          placeholder="Website"
          onChange={e => setWebsite(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Label for="email">Email</Label>
        <Input
          type="email"
          name="email"
          placeholder="Email"
          onChange={e => setEmail(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Label for="phoneNumbers">Phone Numbers</Label>
        {NewResourcePhoneNumberForm({
          phoneNumbers,
          setPhoneNumbers,
          setTotalSubmitEnabled,
        })}
      </FormGroup>
      <FormGroup>
        <Label for="contacts">Contacts</Label>
        {NewResourceContactForm({
          contacts,
          setContacts,
          setTotalSubmitEnabled,
        })}
      </FormGroup>
      <FormGroup>
        <Label for="address">Address</Label>
        <Input
          type="text"
          name="address"
          placeholder="Address"
          onChange={e => setAddress(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Label for="city">City</Label>
        <Input
          type="text"
          name="city"
          placeholder="City"
          onChange={e => setCity(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Label for="hoursOfOperation">Hours of Operation</Label>
        <Input
          type="text"
          name="hoursOfOperation"
          placeholder="00:00:00"
          onChange={e => setHoursOfOperation(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Label for="eligibilityRequirements">Eligibility Requirements</Label>
        <Input
          type="text"
          name="eligibilityRequirements"
          placeholder="Eligibility Requirements"
          onChange={e => setEligibilityRequirements(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Label for="financialAidDetails">Financial Aid Details</Label>
        {NewResourceFinancialAidForm({
          financialAidDetails,
          setFinancialAidDetails,
          setTotalSubmitEnabled,
        })}
      </FormGroup>
      <FormGroup>
        <Label for="cost">Cost</Label>
        <InputGroup>
          <InputGroupAddon addonType="prepend">$</InputGroupAddon>
          <Input
            type="text"
            placeholder="Cost"
            onChange={e => setCost(e.target.value)}
          />
        </InputGroup>
      </FormGroup>
      <FormGroup>
        <Label for="availableLanguages">Available Languages</Label>
        <Input
          type="text"
          placeholder="Languages..."
          onChange={e => setAvailableLanguages(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Label for="recommendation">Recommendation</Label>
      </FormGroup>
      <FormGroup>
        <Label for="comments">Comments</Label>
        <Input type="textarea" onChange={e => setComments(e.target.value)} />
      </FormGroup>
      <FormGroup for="internalNotes">
        <Label for="internalNotes">Internal Notes</Label>
        <Input
          type="textarea"
          onChange={e => setInternalNotes(e.target.value)}
        />
      </FormGroup>

      <Input className="submitButton" type="submit" value="Add Resource" />
    </Form>
  );
};

export default NewResourceForm;
