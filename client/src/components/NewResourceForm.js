import React, { useState, useDebugValue, useEffect } from 'react';
import '../css/NewResourceForm.css';
import { Form, Input, Button, Cascader } from 'antd';
import Select from 'react-select';
import { addResource, getCategories } from '../utils/api';
import NewResourcePhoneNumberFormItem from './NewResourcePhoneNumberForm';
import NewResourceContactForm from './NewResourceContactForm';
import NewResourceFinancialAidForm from './NewResourceFinancialAidForm';

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

const fetchCategories = async setErrorMessage => {
  const res = await getCategories();

  if (res.code === 200) {
    return res.result;
  }
  setErrorMessage(res.message);
};

const generateCategoryOptions = fetchedCategories => {
  const categories = [];

  fetchedCategories.forEach(fetched => {
    categories.push({
      value: fetched.name,
      label: fetched.name,
    });
  });

  return categories;
};

const getSubcategoriesOf = (category, fetchedCategories) => {
  let subcategories = [];

  if (category != '') {
    fetchCategories.forEach(entry => {
      if (entry.name === category) {
        subcategories = [];

        entry.subcategories.forEach(name => {
          subcategories.push({
            value: name,
            label: name,
          });
        });
      }
    });
  }

  return subcategories;
};

const NewResourceForm = props => {
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

  const [categoryOptions, setCategoryOptions] = useState([]);
  const [subcategoryOptions, setSubcategoryOptions] = useState([
    {
      label: 'Please select a category first',
      value: 'null',
    },
  ]);

  let fetchedCategories = [];

  useEffect(() => {
    fetchedCategories = fetchCategories(setErrorMessage).then(categories => {
      setCategoryOptions(generateCategoryOptions(categories));
      setSubcategoryOptions(category, categories);

      return categories;
    });

    return () => {
      fetchedCategories = null;
    };
  });

  const {
    getFieldDecorator,
    getFieldsError,
    getFieldError,
    isFieldTouched,
  } = props.form;

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
      <Form.Item label="Category">
        {getFieldDecorator('category', {
          rules: [
            {
              required: true,
              message: 'Please select a category!',
            },
          ],
        })(
          <Select
            className="newResourceSelect"
            options={categoryOptions}
            onChange={e => setCategory(e.value)}
            placeholder="Select category..."
          />,
        )}
      </Form.Item>
      <Form.Item label="Subcategory">
        {getFieldDecorator('subcategory', {
          rules: [
            {
              required: true,
              message: 'Please select a subcategory!',
            },
          ],
        })(
          <Select
            className="newResourceSelect"
            options={subcategoryOptions}
            onChange={e => setSubcategory(e.value)}
            placeholder="Select subcategory..."
          />,
        )}
      </Form.Item>
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
      {NewResourcePhoneNumberFormItem({
        phoneNumbers,
        setPhoneNumbers,
        setTotalSubmitEnabled,
        getFieldDecorator,
      })}
      <Form.Item label="Contacts"></Form.Item>
      <Form.Item label="Address"></Form.Item>
      <Form.Item label="City">
        {getFieldDecorator('city', {})(<Input placeholder="City" />)}
      </Form.Item>
      <Form.Item label="Hours of Operation"></Form.Item>
      <Form.Item label="Eligibility Requirements"></Form.Item>
      <Form.Item label="Financial Aid Details"></Form.Item>
      <Form.Item label="Cost"></Form.Item>
      <Form.Item label="Available Languages"></Form.Item>
      <Form.Item label="Recommendation"></Form.Item>
      <Form.Item label="Comments"></Form.Item>
      <Form.Item label="Internal Notes"></Form.Item>

      <Button type="primary" htmlType="submit" className="newResourceSubmit">
        Add Resource
      </Button>
    </Form>
  );
};

export default Form.create({ name: 'newResource' })(NewResourceForm);
