// @flow

/*
TODO: Have resource be created.
TODO: Have some fields be more in-depth than just a text bar.
TODO: Improve UI and UX.
*/

import React, { useDebugValue, useEffect, useState } from 'react';
import { Alert, Button, Cascader, Form, Input, Select } from 'antd';
import fetch from 'isomorphic-fetch';
import '../css/NewResourceForm.css';

import { addResource, getCategories } from '../utils/api';

import AvailableLanguageFormItem from './NewResourceAvailableLangForm';
import CategorySelector from './NewResourceCategorySelector';
import ContactFormItem from './NewResourceContactForm';
import FinancialAidFormItem from './NewResourceFinancialAidForm';
import PhoneNumberFormItem from './NewResourcePhoneNumberForm';

const { TextArea } = Input;
const { Option } = Select;

const SERVER_URI = 'https://ymca.now.sh';

const onSubmitNewResourceForm = (e, enabled, resource, onSucc, onErr) => {
  e.preventDefault();

  if (enabled) {
    fetch(`${SERVER_URI}/api/resources`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(resource),
    })
      .then(res => res.json())
      .then(res => {
        if (res.code === 201) {
          onSucc(res.result);
        } else {
          onErr(res);
        }
      });
  }
};

type FormProps = {
  form: {
    getFieldDecorator: () => any,
    getFieldValue: () => any,
    setFieldsValue: () => any,
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

  const { getFieldDecorator, getFieldValue, setFieldsValue } = props.form;

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
            name: getFieldValue('resourceName') || '',
            description: getFieldValue('description') || '',
            website: getFieldValue('website') || '',
            email: getFieldValue('email') || '',
            phoneNumbers,
            contacts,
            address: getFieldValue('email') || '',
            city: getFieldValue('city') || '',
            hoursOfOperation: getFieldValue('hoursOfOperation') || '',
            eligibilityRequirements:
              getFieldValue('eligibilityRequirements') || '',
            financialAidDetails,
            cost: getFieldValue('cost') || '',
            availableLanguages: availableLanguages || [],
            lastedUpdated: Date.now(),
            recommendation: getFieldValue('recommendation'),
            comments: getFieldValue('comments') || [],
            internalNotes: getFieldValue('internalNotes') || [],
          },
          res => {
            setSuccessMessage('Resource successfully created!');
            setErrorMessage('');
          },
          res => {
            setSuccessMessage('');
            setErrorMessage(res.message);
          },
        )
      }
    >
      {successMessage !== '' && (
        <Alert
          type="success"
          closable
          message={successMessage}
          onClose={e => {}}
        />
      )}

      {errorMessage !== '' && (
        <Alert type="error" closable message={errorMessage} onClose={e => {}} />
      )}

      <CategorySelector
        category={category}
        setCategory={setCategory}
        subcategory={subcategory}
        setSubcategory={setSubcategory}
        getFieldDecorator={getFieldDecorator}
        setFieldsValue={setFieldsValue}
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
      {AvailableLanguageFormItem({
        availableLanguages,
        setAvailableLanguages,
        setTotalSubmitEnabled,
      })}
      <Form.Item label="Recommendation">
        {getFieldDecorator('recommendation', {})(
          <Select defaultValue="Yes">
            <Option value="Yes">Yes</Option>
            <Option value="Maybe">Maybe</Option>
            <Option value="No">No</Option>
          </Select>,
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
