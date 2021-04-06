// @flow

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Button, message, Layout, Carousel } from 'antd';

import { addResource, editResource, getResourceByID } from '../utils/api';

import { CAT_SUB_SPLITTER } from './ResourceCategorySelector';
import FormCarousel from './ResourceFormCarousel';

import '../css/ResourceForm.css';

const { Content } = Layout;

const linkResource = (resourceId, type) => (
  <>
    Resource {type}! Click
    <a href={`/resources/${resourceId}`}> here </a>
    to view!
  </>
);
const onSubmitNewResourceForm = async (e, enabled, id, resource) => {
  e.preventDefault();
  if (enabled) {
    if (id) {
      const editedResource = await editResource(id, resource);
      if (editedResource) {
        message.success(linkResource(id, 'edited'));
      } else {
        message.error(
          `Resource could not be edited.
          ${' '}Please check that all of the required fields
    are filled out!`,
        );
      }
    } else {
      const createdResource = await addResource(resource);
      if (createdResource) {
        message.success(linkResource(createdResource.result._id, 'created'));
      } else {
        message.error(
          `Resource could not be created.
          ${' '}Please check that all of the required fields
    are filled out!`,
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

const CAROUSEL_CATEGORIES = [
  'Basic Information',
  'Contact Information',
  'Recommended Contacts',
  'Financial Aid',
  'Other',
];

const ResourceForm = (props: FormProps) => {
  const [totalSubmitEnabled, setTotalSubmitEnabled] = useState(true);
  const [showBackButton, setShowBackButton] = useState(false);
  const [showSubmitButton, setShowSubmitButton] = useState(false);

  const createCarouselCategories = useCallback(
    () =>
      CAROUSEL_CATEGORIES.map((category) => (
        <div key={category}>
          <p>{category}</p>
        </div>
      )),
    [],
  );

  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [phoneNumbers, setPhoneNumbers] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [financialAidDetails, setFinancialAidDetails] = useState({});
  const [availableLanguages, setAvailableLanguages] = useState([]);
  const [requiredDocuments, setRequiredDocuments] = useState([]);
  const [internalNotes, setInternalNotes] = useState([]);
  const [hoursOfOperation, setHoursOfOperation] = useState([]);
  const [image, setImage] = useState('');

  const { id, form } = props;
  const { getFieldDecorator, getFieldValue, setFieldsValue } = form;

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
          setRequiredDocuments(result.requiredDocuments);
          setInternalNotes(result.internalNotes);
          setHoursOfOperation(
            result.hoursOfOperation !== undefined
              ? result.hoursOfOperation.hoursOfOperation
              : [],
          );
          setImage(result.image);
        }
      }
    }
    fetchFields();
  }, [id, setFieldsValue]);

  const formCarouselRef = useRef();
  const formLabelRef = useRef();

  const onBackButtonClick = useCallback(() => formCarouselRef.current.prev(), [
    formCarouselRef,
  ]);

  const onNextButtonClick = useCallback(() => formCarouselRef.current.next(), [
    formCarouselRef,
  ]);

  const onFormCarouselChange = useCallback(
    (current, to) => {
      formLabelRef.current.goTo(to);

      setShowBackButton(to > 0);
      setShowSubmitButton(
        CAROUSEL_CATEGORIES[to] ===
          CAROUSEL_CATEGORIES[CAROUSEL_CATEGORIES.length - 1],
      );

      setTotalSubmitEnabled(showSubmitButton);
    },
    [formLabelRef, setShowBackButton, setShowSubmitButton, showSubmitButton],
  );

  return (
    <Layout className="resource-form-layout">
      <Content className="content">
        <Carousel ref={formLabelRef} className="form-label" dots={false}>
          {createCarouselCategories()}
        </Carousel>
        <Form
          className="resource-form"
          onSubmit={(e) => {
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
              addressLine2: getFieldValue('addressLine2') || '',
              aptUnitSuite: getFieldValue('aptUnitSuite') || '',
              city: getFieldValue('city') || '',
              state: getFieldValue('state') || '',
              zip: getFieldValue('zip') || '',
              hoursOfOperation: { hoursOfOperation } || {
                hoursOfOperation: {},
              },
              eligibilityRequirements:
                getFieldValue('eligibilityRequirements') || '',
              financialAidDetails,
              cost: getFieldValue('cost') || '',
              availableLanguages: getFieldValue('availableLanguages') || [],
              lastedUpdated: new Date(Date.now()),
              recommendation: getFieldValue('recommendation'),
              requiredDocuments: requiredDocuments || [],
              internalNotes: internalNotes || [],
              image: image || '',
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
            requiredDocuments={requiredDocuments}
            setRequiredDocuments={setRequiredDocuments}
            internalNotes={internalNotes}
            setInternalNotes={setInternalNotes}
            hoursOfOperation={hoursOfOperation}
            setHoursOfOperation={setHoursOfOperation}
            image={image}
            setImage={setImage}
            totalSubmitEnabled={totalSubmitEnabled}
            setTotalSubmitEnabled={setTotalSubmitEnabled}
            setFieldsValue={setFieldsValue}
            getFieldValue={getFieldValue}
            getFieldDecorator={getFieldDecorator}
          />
          <div className="carousel-move-btn-container">
            {!showSubmitButton ? (
              <>
                {showBackButton && (
                  <Button
                    type="default"
                    className="carousel-move-btn"
                    onClick={onBackButtonClick}
                  >
                    Back
                  </Button>
                )}
                <Button
                  type="default"
                  className="carousel-move-btn"
                  onClick={onNextButtonClick}
                >
                  Next
                </Button>
              </>
            ) : (
              <>
                <Button
                  type="default"
                  htmlType="submit"
                  className="carousel-move-btn new-resource-submit"
                  onClick={() => setTotalSubmitEnabled(true)}
                >
                  {id ? 'Submit Edit' : 'Add Resource'}
                </Button>
              </>
            )}
          </div>
        </Form>
      </Content>
    </Layout>
  );
};

export default Form.create({ name: 'newResource' })(ResourceForm);
