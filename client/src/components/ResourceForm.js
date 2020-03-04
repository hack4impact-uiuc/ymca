// @flow

import React, { useState, useEffect } from 'react';
import {
  Form,
  Input,
  Button,
  Select,
  Affix,
  message,
  Radio,
  Rate,
  Row,
  Col,
  Layout,
} from 'antd';
import { Textfit } from 'react-textfit';

import languages from '../data/languages';
import { addResource, editResource, getResourceByID } from '../utils/api';

import PhoneNumberFormItem from './ResourcePhoneNumberForm';
import ContactFormItem from './ResourceContactForm';
import FinancialAidFormItem from './ResourceFinancialAidForm';
import CategorySelector, { CAT_SUB_SPLITTER } from './ResourceCategorySelector';
import StrListFormItem from './ResourceStrListForm';
import InternalNotesFormItem from './ResourceInternalNotesForm';
import LabelWrapper from './LabelWrapper';

import '../css/ResourceForm.css';

const { TextArea } = Input;
const { Option } = Select;
const { Header, Content } = Layout;

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
    <Layout className="resourceForm">
      <Header className="header">
        <Row justify="center" type="flex">
          <h2>Add a Resource</h2>
        </Row>
      </Header>
      <Content className="content">
        <div className="formLabel">
          <p>Basic Information</p>
        </div>
        <Form
          className="form"
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
          <LabelWrapper
            label="Categories"
            required
            component={
              <CategorySelector
                setCategories={setCategories}
                setSubcategories={setSubcategories}
                getFieldDecorator={getFieldDecorator}
                setFieldsValue={setFieldsValue}
                getFieldValue={getFieldValue}
              />
            }
          />
          <LabelWrapper
            label="Resource Name"
            required
            component={
              <Form.Item>
                {getFieldDecorator('resourceName', {
                  rules: [
                    {
                      required: true,
                      message: 'Please input a resource name!',
                    },
                  ],
                })(
                  <Input
                    placeholder="Resource Name"
                    onFocus={() => setTotalSubmitEnabled(true)}
                  />,
                )}
              </Form.Item>
            }
          />
          <LabelWrapper
            label="Description"
            required
            component={
              <Form.Item>
                {getFieldDecorator('description', {
                  rules: [
                    {
                      required: true,
                      message: 'Please input a description!',
                    },
                  ],
                })(
                  <TextArea
                    rows={4}
                    placeholder="Description"
                    onFocus={() => setTotalSubmitEnabled(true)}
                  />,
                )}
              </Form.Item>
            }
          />
          <LabelWrapper
            label="Address"
            required
            component={
              <Form.Item>
                {getFieldDecorator(
                  'address',
                  {},
                )(
                  <Input
                    placeholder="Address"
                    onFocus={() => setTotalSubmitEnabled(true)}
                  />,
                )}
              </Form.Item>
            }
          />
          <Row gutter={16}>
            <Col span={18}>
              <LabelWrapper
                label="Address Line 2"
                component={
                  <Form.Item>
                    {getFieldDecorator(
                      'address2',
                      {},
                    )(
                      <Input
                        placeholder="Address 2"
                        onFocus={() => setTotalSubmitEnabled(true)}
                      />,
                    )}
                  </Form.Item>
                }
              />
            </Col>
            <Col span={6}>
              <LabelWrapper
                label="Apt/Unit/Suite"
                component={
                  <Form.Item>
                    {getFieldDecorator(
                      'aptUnitSuite',
                      {},
                    )(
                      <Input
                        placeholder=""
                        onFocus={() => setTotalSubmitEnabled(true)}
                      />,
                    )}
                  </Form.Item>
                }
              />
            </Col>
          </Row>
          <Row justify="space-around" gutter={16}>
            <Col span={8}>
              <LabelWrapper
                label="City"
                component={
                  <Form.Item>
                    {getFieldDecorator(
                      'city',
                      {},
                    )(
                      <Input
                        placeholder="City"
                        onFocus={() => setTotalSubmitEnabled(true)}
                      />,
                    )}
                  </Form.Item>
                }
              />
            </Col>
            <Col span={8}>
              <LabelWrapper
                label="State"
                component={
                  <Form.Item>
                    {getFieldDecorator(
                      'state',
                      {},
                    )(
                      <Input
                        placeholder="State"
                        onFocus={() => setTotalSubmitEnabled(true)}
                      />,
                    )}
                  </Form.Item>
                }
              />
            </Col>
            <Col span={8}>
              <LabelWrapper
                label="Zip"
                component={
                  <Form.Item>
                    {getFieldDecorator(
                      'zip',
                      {},
                    )(
                      <Input
                        placeholder="Zip"
                        onFocus={() => setTotalSubmitEnabled(true)}
                      />,
                    )}
                  </Form.Item>
                }
              />
            </Col>
          </Row>
          <LabelWrapper
            label="Website"
            component={
              <Form.Item>
                {getFieldDecorator(
                  'website',
                  {},
                )(
                  <Input
                    placeholder="Website"
                    onFocus={() => setTotalSubmitEnabled(true)}
                  />,
                )}
              </Form.Item>
            }
          />
          <LabelWrapper
            label="Email"
            component={
              <Form.Item>
                {getFieldDecorator(
                  'email',
                  {},
                )(
                  <Input
                    placeholder="Email"
                    onFocus={() => setTotalSubmitEnabled(true)}
                  />,
                )}
              </Form.Item>
            }
          />
          {PhoneNumberFormItem({
            phoneNumbers,
            setPhoneNumbers,
            setTotalSubmitEnabled,
          })}
          {InternalNotesFormItem({
            internalNotes,
            setInternalNotes,
            setTotalSubmitEnabled,
          })}
          {ContactFormItem({
            contacts,
            setContacts,
            setTotalSubmitEnabled,
          })}

          <Form.Item className="input" label="City"></Form.Item>
          <Form.Item className="input" label="Hours of Operation">
            {getFieldDecorator(
              'hoursOfOperation',
              {},
            )(
              <Input
                placeholder="Monday-Friday 9:00am-5:00pm, 
                Saturday and Sunday 12:00-2:00pm"
                onFocus={() => setTotalSubmitEnabled(true)}
              />,
            )}
          </Form.Item>
          <Form.Item className="input" label="Eligibility Requirements">
            {getFieldDecorator(
              'eligibilityRequirements',
              {},
            )(
              <Input
                placeholder="Visa or receipt letter"
                onFocus={() => setTotalSubmitEnabled(true)}
              />,
            )}
          </Form.Item>
          {FinancialAidFormItem({
            financialAidDetails,
            setFinancialAidDetails,
            setTotalSubmitEnabled,
          })}
          <Form.Item className="input" label="Cost">
            {getFieldDecorator('cost', {
              rules: [{}],
            })(
              <Radio.Group onFocus={() => setTotalSubmitEnabled(true)}>
                <Radio value="Free">Free</Radio>
                <Radio value="$">$</Radio>
                <Radio value="$$">$$</Radio>
                <Radio value="$$$">$$$</Radio>
              </Radio.Group>,
            )}
          </Form.Item>
          <Form.Item className="input" label="Available Languages">
            {getFieldDecorator(
              'availableLanguages',
              {},
            )(
              <Select
                mode="multiple"
                placeholder="Select available language(s)"
              >
                {languages.map(lang => (
                  <Option key={lang} value={lang}>
                    {lang}
                  </Option>
                ))}
              </Select>,
            )}
          </Form.Item>
          <Form.Item className="input" label="Recommendation">
            {getFieldDecorator('recommendation', {})(<Rate />)}
          </Form.Item>
          <StrListFormItem
            className="input"
            formName="commentForm"
            label="Comments"
            placeholder="Enter a comment"
            listOfStrings={comments}
            setListOfStrings={setComments}
            setTotalSubmitEnabled={setTotalSubmitEnabled}
          />
          <Affix offsetBottom={20}>
            <Button
              type="primary"
              htmlType="submit"
              className="newResourceSubmit"
              onClick={() => setTotalSubmitEnabled(true)}
            >
              {id ? 'Submit Edit' : 'Add Resource'}
            </Button>
          </Affix>
        </Form>
      </Content>
    </Layout>
  );
};

export default Form.create({ name: 'newResource' })(ResourceForm);
