// @flow

import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, Affix, message } from 'antd';

import { addResource, editResource, getResourceByID } from '../utils/api';

import PhoneNumberFormItem from './ResourcePhoneNumberForm';
import ContactFormItem from './ResourceContactForm';
import FinancialAidFormItem from './ResourceFinancialAidForm';
import CategorySelector, { CAT_SUB_SPLITTER } from './ResourceCategorySelector';
import StrListFormItem from './ResourceStrListForm';

const { TextArea } = Input;
const { Option } = Select;

const onSubmitNewResourceForm = async (e, enabled, id, resource) => {
  e.preventDefault();
  if (enabled) {
    if (id) {
      const editedResource = await editResource(id, resource);
      if (editedResource) {
        message.success('Resource successfully edited!');
      } else {
        message.error(
          `Resource could not be edited.
          ${' '}Please check that all of the required fields are filled out!`,
        );
      }
    } else {
      const createdResource = await addResource(resource);
      if (createdResource) {
        message.success('Resource successfully created!');
      } else {
        message.error(
          `Resource could not be created.
          ${' '}Please check that all of the required fields are filled out!`,
        );
      }
    }
  }
};

type FormProps = {
  id: number,
  form: {
    getFieldDecorator: () => any,
    getFieldValue: () => any,
    setFieldsValue: () => any,
  },
};

const ResourceForm = (props: FormProps) => {
  const [totalSubmitEnabled, setTotalSubmitEnabled] = useState(true);

  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [phoneNumbers, setPhoneNumbers] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [financialAidDetails, setFinancialAidDetails] = useState({});
  const [availableLanguages, setAvailableLanguages] = useState([]);
  const [comments, setComments] = useState([]);
  const [internalNotes, setInternalNotes] = useState([]);

  const { id } = props;
  const { getFieldDecorator, getFieldValue, setFieldsValue } = props.form;

  useEffect(() => {
    async function fetchFields() {
      if (id) {
        const resource = await getResourceByID(id);
        if (resource) {
          const { name, category, subcategory, ...result } = resource.result;

          // generate initial category values
          const categoryInitialValues = [];
          for (let i = 0; i < category.length; ) {
            categoryInitialValues.push(
              category[i] + CAT_SUB_SPLITTER + subcategory[i],
            );
            i += 1;
          }

          setFieldsValue({
            resourceName: name,
            categorySelect: categoryInitialValues,
            ...result,
          });
          setCategories(category);
          setSubcategories(subcategory);
          setPhoneNumbers(result.phoneNumbers);
          setContacts(result.contacts);
          setFinancialAidDetails(
            result.financialAidDetails ? result.financialAidDetails : {},
          );
          setAvailableLanguages(result.availableLanguages);
          setComments(result.comments);
          setInternalNotes(result.internalNotes);
        }
      }
    }
    fetchFields();
  }, [id, setFieldsValue]);

  return (
    <Form
      onSubmit={e => {
        onSubmitNewResourceForm(e, totalSubmitEnabled, id, {
          category: categories,
          subcategory: subcategories,
          name: getFieldValue('resourceName') || '',
          description: getFieldValue('description') || '',
          website: getFieldValue('website') || '',
          email: getFieldValue('email') || '',
          phoneNumbers,
          contacts,
          address: getFieldValue('address') || '',
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
        });
      }}
    >
      <CategorySelector
        categories={categories}
        subcategories={subcategories}
        setCategories={setCategories}
        setSubcategories={setSubcategories}
        getFieldDecorator={getFieldDecorator}
        setFieldsValue={setFieldsValue}
        getFieldValue={getFieldValue}
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
        {getFieldDecorator(
          'hoursOfOperation',
          {},
        )(<Input placeholder="Hours of Operation" />)}
      </Form.Item>
      <Form.Item label="Eligibility Requirements">
        {getFieldDecorator(
          'eligibilityRequirements',
          {},
        )(<Input placeholder="Eligibility Requirements" />)}
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
      <StrListFormItem
        formName="availableLanguage"
        label="Available Languages"
        placeholder="Available Language"
        listOfStrings={availableLanguages}
        setListOfStrings={setAvailableLanguages}
        setTotalSubmitEnabled={setTotalSubmitEnabled}
      />
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
      <StrListFormItem
        formName="commentForm"
        label="Comments"
        placeholder="Enter a comment"
        listOfStrings={comments}
        setListOfStrings={setComments}
        setTotalSubmitEnabled={setTotalSubmitEnabled}
      />
      <StrListFormItem
        formName="internalNotesForm"
        label="Internal Notes"
        placeholder="Enter a note..."
        listOfStrings={internalNotes}
        setListOfStrings={setInternalNotes}
        setTotalSubmitEnabled={setTotalSubmitEnabled}
      />
      <Affix offsetBottom={20}>
        <Button type="primary" htmlType="submit" className="newResourceSubmit">
          {id ? 'Submit Edit' : 'Add Resource'}
        </Button>
      </Affix>
    </Form>
  );
};

export default Form.create({ name: 'newResource' })(ResourceForm);
