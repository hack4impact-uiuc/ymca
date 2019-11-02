// @flow

/*
TODO: Have resource be created.
TODO: Have some fields be more in-depth than just a text bar.
TODO: Improve UI and UX.
*/

import React, { useState } from 'react';
import '../css/NewResourceForm.css';
import { Form, Input, Button, Alert, Select } from 'antd';
import fetch from 'isomorphic-fetch';
import PhoneNumberFormItem from './NewResourcePhoneNumberForm';
import ContactFormItem from './NewResourceContactForm';
import FinancialAidFormItem from './NewResourceFinancialAidForm';
import CategorySelector from './NewResourceCategorySelector';
import AvailableLanguageFormItem from './NewResourceAvailableLangForm';
import CommentsFormItem from './NewResourceCommentsForm';
import InternalNotesFormItem from './NewResourceInternalNotesForm';

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
  const [phoneNumbers, setPhoneNumbers] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [financialAidDetails, setFinancialAidDetails] = useState({});
  const [availableLanguages, setAvailableLanguages] = useState([]);
  const [comments, setComments] = useState([]);
  const [internalNotes, setInternalNotes] = useState([]);

  const { getFieldDecorator, getFieldValue, setFieldsValue } = props.form;

  return (
    <Form
      className="newResourceForm"
      onSubmit={e => {
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
            lastedUpdated: new Date(Date.now()),
            recommendation: getFieldValue('recommendation'),
            comments: comments || [],
            internalNotes: internalNotes || [],
          },
          () => {
            setSuccessMessage('Resource successfully created!');
            setErrorMessage('');
          },
          res => {
            setSuccessMessage('');
            setErrorMessage(res.message);
          },
        );
      }}
    >
      {successMessage !== '' && (
        <Alert
          type="success"
          closable
          message={successMessage}
          onClose={() => {}}
        />
      )}

      {errorMessage !== '' && (
        <Alert
          type="error"
          closable
          message={errorMessage}
          onClose={() => {}}
        />
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
      <Form.Item label="Email">
        {getFieldDecorator('email', {})(<Input placeholder="Email" />)}
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
          <Input placeholder="00:00:00-00:00:00" />,
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
          rules: [{}],
        })(<Input placeholder="Cost" />)}
      </Form.Item>
      {AvailableLanguageFormItem({
        availableLanguages,
        setAvailableLanguages,
        setTotalSubmitEnabled,
      })}
      <Form.Item label="Recommendation">
        {getFieldDecorator('recommendation', {
          initialValue: 'Yes',
        })(
          <Select defaultValue="Yes">
            <Option value="Yes">Yes</Option>
            <Option value="Maybe">Maybe</Option>
            <Option value="No">No</Option>
          </Select>,
        )}
      </Form.Item>
      {CommentsFormItem({
        comments,
        setComments,
        setTotalSubmitEnabled,
      })}
      {InternalNotesFormItem({
        internalNotes,
        setInternalNotes,
        setTotalSubmitEnabled,
      })}
      <Button type="primary" htmlType="submit" className="newResourceSubmit">
        Add Resource
      </Button>
    </Form>
  );
};

export default Form.create({ name: 'newResource' })(NewResourceForm);
