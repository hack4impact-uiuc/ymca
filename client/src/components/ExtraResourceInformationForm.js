// @flow

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

type Props = {|
  setWebsite: () => void,
  setEmail: () => void,
  setPhoneNumbers: () => void,
  setContacts: () => void,
  setAddress: () => void,
  setCity: () => void,
  setHoursOfOperation: () => void,
  setEligibilityRequirements: () => void,
  setFinancialAidDetails: () => void,
  setCost: () => void,
  setAvailableLanguages: () => void,
  setRecommendation: () => void,
  setComments: () => void,
  setInternalNotes: () => void,
|};

const ExtraResourceInformationForm = (props: Props) => {
  const {
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
  } = props;

  return (
    <>
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
        <Input
          type="text"
          name="phoneNumbers"
          placeholder="0-000-000-0000"
          onChange={e => setPhoneNumbers(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Label for="contacts">Contacts</Label>
        {
          // add contact form / show saved contacts
        }
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
        <Input
          name="financialAidDetails"
          placeholder="Details..."
          onChange={e => setFinancialAidDetails(e.target.value)}
        />
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
    </>
  );
};

export default ExtraResourceInformationForm;
