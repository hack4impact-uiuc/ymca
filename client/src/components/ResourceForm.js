// @flow

import React, { useState, useEffect, useRef, useCallback } from 'react';
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
import FormCarousel from './ResourceFormCarousel';

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
  const [hoursOfOperation, setHoursOfOperation] = useState({});

  const { id } = props;
  const { getFieldDecorator, getFieldValue, setFieldsValue } = props.form;

  useEffect(() => {
    async function fetchFields() {
      if (id) {
        const resource = await getResourceByID(id, false);
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

  const formCarouselRef = useRef();
  const formLabelRef = useRef();

  const onNextButtonClick = useCallback(() => {
    formCarouselRef.current.next();
  }, [formCarouselRef]);

  const onFormCarouselChange = useCallback(
    (current, to) => {
      formLabelRef.current.goTo(to);
    },
    [formLabelRef],
  );

  return (
    <Layout className="resourceForm">
      <Header className="header">
        <Row justify="center" type="flex">
          <h2>Add a Resource</h2>
        </Row>
      </Header>
      <Content className="content">
        <Carousel ref={formLabelRef} className="formLabel" dots={false}>
          <div>
            <p>Basic Information</p>
          </div>
          <div>
            <p>Contact Information</p>
          </div>
          <div>
            <p>Recommend Contacts</p>
          </div>
          <div>
            <p>Financial Aid</p>
          </div>
          <div>
            <p>Other</p>
          </div>
        </Carousel>
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
          <FormCarousel
            ref={formCarouselRef}
            beforeChange={onFormCarouselChange}
            categories={categories}
            setCategories={setCategories}
            subcategories={subcategories}
            setSubcategories={setSubcategories}
            phoneNumbers={phoneNumbers}
            setPhoneNumbers={setPhoneNumbers}
            contacts={contacts}
            setContacts={setContacts}
            financialAidDetails={financialAidDetails}
            setFinancialAidDetails={setFinancialAidDetails}
            availableLanguages={availableLanguages}
            setAvailableLanguages={setAvailableLanguages}
            comments={comments}
            setComments={setComments}
            internalNotes={internalNotes}
            setInternalNotes={setInternalNotes}
            hoursOfOperation={hoursOfOperation}
            setHoursOfOperation={setHoursOfOperation}
            totalSubmitEnabled={totalSubmitEnabled}
            setTotalSubmitEnabled={setTotalSubmitEnabled}
            setFieldsValue={setFieldsValue}
            getFieldValue={getFieldValue}
            getFieldDecorator={getFieldDecorator}
          />
          <Button
            type="default"
            className="carouselNextBtn"
            onClick={onNextButtonClick}
          >
            Next
          </Button>

          <Affix offsetBottom={33} style={{ width: '10em' }}>
            <Button
              type="primary"
              htmlType="submit"
              className="newResourceSubmit formBtn"
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
