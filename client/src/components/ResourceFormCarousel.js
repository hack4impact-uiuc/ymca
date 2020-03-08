// @flow

import React, { useState } from 'react';
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
  Carousel,
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
import HoursOfOperationFormItem from './ResourceHoursOfOperationForm';

import '../css/ResourceForm.css';

const { TextArea } = Input;
const { Option } = Select;
const { Header, Content } = Layout;

type CarouselProps = {
  beforeChange: any => any,

  categories: any,
  setCategories: any => any,
  subcategories: any,
  setSubcategories: any => any,
  phoneNumbers: any,
  setPhoneNumbers: any => any,
  contacts: any,
  setContacts: any => any,
  financialAidDetails: any,
  setFinancialAidDetails: any => any,
  availableLanguages: any,
  setAvailableLanguages: any => any,
  comments: any,
  setComments: any => any,
  internalNotes: any,
  setInternalNotes: any => any,
  hoursOfOperation: any,
  setHoursOfOperation: any => any,

  totalSubmitEnabled: Boolean,
  setTotalSubmitEnabled: Boolean => any,

  setFieldsValue: any => any,
  getFieldValue: any => any,
  getFieldDecorator: any => any,
};

const FormCarousel = React.forwardRef((props: CarouselProps, ref) => {
  const {
    beforeChange,

    categories,
    setCategories,
    subcategories,
    setSubcategories,
    phoneNumbers,
    setPhoneNumbers,
    contacts,
    setContacts,
    financialAidDetails,
    setFinancialAidDetails,
    availableLanguages,
    setAvailableLanguages,
    comments,
    setComments,
    internalNotes,
    setInternalNotes,
    hoursOfOperation,
    setHoursOfOperation,

    totalSubmitEnabled,
    setTotalSubmitEnabled,

    setFieldsValue,
    getFieldValue,
    getFieldDecorator,
  } = props;

  return (
    <Carousel
      ref={ref}
      className="formCarousel"
      dotPosition="bottom"
      onChange={() => {}}
      beforeChange={beforeChange}
    >
      <div htmlFor="basicInformation">
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
        <Row>
          <LabelWrapper
            label="Hours of Operation"
            component={
              <HoursOfOperationFormItem
                setHoursOfOperation={setHoursOfOperation}
                hoursOfOperation={hoursOfOperation}
                setTotalSubmitEnabled={setTotalSubmitEnabled}
              />
            }
          />
        </Row>
      </div>
      <div htmlFor="contactInformation">
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
      </div>
      <div htmlFor="recommendedContacts">
        {ContactFormItem({
          contacts,
          setContacts,
          setTotalSubmitEnabled,
        })}
      </div>
      <div htmlFor="financialAid">
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
            <Select mode="multiple" placeholder="Select available language(s)">
              {languages.map(lang => (
                <Option key={lang} value={lang}>
                  {lang}
                </Option>
              ))}
            </Select>,
          )}
        </Form.Item>
      </div>
      <div htmlFor="other">
        {InternalNotesFormItem({
          internalNotes,
          setInternalNotes,
          setTotalSubmitEnabled,
        })}
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
      </div>
    </Carousel>
  );
});

export default FormCarousel;
