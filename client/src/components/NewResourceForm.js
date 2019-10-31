// @flow

/*
TODO: Load categories correctly.
TODO: Have resource be created.
TODO: Have some fields be more in-depth than just a text bar.
TODO: Improve UI and UX.
*/

import React, { useState, useDebugValue, useEffect } from 'react';
import '../css/NewResourceForm.css';
import { Form, Input, Button, Cascader } from 'antd';
import Select from 'react-select';
import { addResource, getCategories } from '../utils/api';
import PhoneNumberFormItem from './NewResourcePhoneNumberForm';
import ContactFormItem from './NewResourceContactForm';
import FinancialAidFormItem from './NewResourceFinancialAidForm';
import CategorySelector from './NewResourceCategorySelector';

const { TextArea } = Input;

const onSubmitNewResourceForm = (e, enabled, resource, onSucc, onErr) => {
  e.preventDefault();

  if (enabled) {
    // res is a promise so yea
    const res = addResource(resource);
    if (res.status === 200) {
      onSucc(res);
    } else {
      onErr(res);
    }
  }
};

type FormProps = {
  form: {
    getFieldDecorator: () => any,
    getFieldValue: () => any,
  },
};

const NewResourceForm = (props: FormProps) => {
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

  const { getFieldDecorator, getFieldValue } = props.form;

  return (
    <Form
      className="newResourceForm"
      onSubmit={e =>
        onSubmitNewResourceForm(
          e,
          totalSubmitEnabled,
          {
            category,
            subcategory,
            resourceName: getFieldValue('resourceName'),
            description: getFieldValue('description'),
            website: getFieldValue('website'),
            email: getFieldValue('email'),
            phoneNumbers,
            contacts,
            address: getFieldValue('email'),
            city: getFieldValue('city'),
            hoursOfOperation: getFieldValue('hoursOfOperation'),
            eligibilityRequirements: getFieldValue('eligibilityRequirements'),
            financialAidDetails,
            cost: getFieldValue('cost'),
            availableLanguages: getFieldValue('availableLanguages'),
            recommendation: getFieldValue('recommendation'),
            comments: getFieldValue('comments'),
            internalNotes: getFieldValue('internalNotes'),
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
      <CategorySelector
        category={category}
        setCategory={setCategory}
        subcategory={subcategory}
        setSubcategory={setSubcategory}
        getFieldDecorator={getFieldDecorator}
      />
      <Form.Item label="Resource Name">
        {getFieldDecorator('resourceName', {
          rules: [
            {
              required: true,
              message: 'Please input a resource name!',
            },
          ],
        })(<Input placeholder="Resource Name" />)}
      </Form.Item>
      <Form.Item label="Description">
        {getFieldDecorator('description', {
          rules: [
            {
              required: true,
              message: 'Please input a description!',
            },
          ],
        })(<TextArea rows={4} placeholder="Description" />)}
      </Form.Item>
      <Form.Item label="Website">
        {getFieldDecorator('website', {})(<Input placeholder="Website" />)}
      </Form.Item>
      {PhoneNumberFormItem({
        phoneNumbers,
        setPhoneNumbers,
        setTotalSubmitEnabled,
      })}
      {ContactFormItem({
        contacts,
        setContacts,
        setTotalSubmitEnabled,
      })}
      <Form.Item label="Address">
        {getFieldDecorator('address', {})(<Input placeholder="Address" />)}
      </Form.Item>
      <Form.Item label="City">
        {getFieldDecorator('city', {})(<Input placeholder="City" />)}
      </Form.Item>
      <Form.Item label="Hours of Operation">
        {getFieldDecorator('hoursOfOperation', {})(
          <Input placeholder="Hours of Operation" />,
        )}
      </Form.Item>
      <Form.Item label="Eligibility Requirements">
        {getFieldDecorator('eligibilityRequirements', {})(
          <Input placeholder="Eligibility Requirements" />,
        )}
      </Form.Item>
      {FinancialAidFormItem({
        financialAidDetails,
        setFinancialAidDetails,
        setTotalSubmitEnabled,
      })}
      <Form.Item label="Cost">
        {getFieldDecorator('cost', {
          rules: [
            {
              type: 'number',
            },
          ],
        })(<Input placeholder="Cost" />)}
      </Form.Item>
      <Form.Item label="Available Languages">
        {getFieldDecorator('availableLanguages', {})(
          <Input placeholder="Available Languages" />,
        )}
      </Form.Item>
      <Form.Item label="Recommendation">
        {getFieldDecorator('recommendation', {})(
          <Input placeholder="Recommendation" />,
        )}
      </Form.Item>
      <Form.Item label="Comments">
        {getFieldDecorator('comments', {})(
          <TextArea rows={4} placeholder="Comments..." />,
        )}
      </Form.Item>
      <Form.Item label="Internal Notes">
        {getFieldDecorator('internalNotes', {})(
          <TextArea rows={4} placeholder="Internal notes..." />,
        )}
      </Form.Item>

      <Button type="primary" htmlType="submit" className="newResourceSubmit">
        Add Resource
      </Button>
    </Form>
  );
};

export default Form.create({ name: 'newResource' })(NewResourceForm);
