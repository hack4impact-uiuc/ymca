// @flow

import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import { message, Form, Input, Button, Col, Row, Layout, Upload } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

import { getHomePage, editHomePage, imageToLink } from '../utils/api';

import '../css/EditHome.css';

const rules = [{ required: true }];

const { Header } = Layout;

const EditHome = () => {
  const [backgroundImage, setBackgroundImage] = useState('');
  const [testimonialValues, setTestimonialValues] = useState([]);
  const [partnerValues, setPartnerValues] = useState([]);
  const [testimonialFieldLength, setTestimonialFieldLength] = useState(0);
  const [partnerFieldLength, setPartnerFieldLength] = useState(0);

  const [form] = Form.useForm();

  useEffect(() => {
    message.warning('Images may take a while to upload');
    async function fetchFields() {
      const res = await getHomePage();
      const newTestimonials = [];
      const testimonialFields = [];
      const newPartners = [];
      const partnerFields = [];
      if (res != null) {
        setBackgroundImage(res.result.backgroundImage);
        res.result.testimonials.forEach((t, i) => {
          newTestimonials.push({
            name: t[0],
            image: t[1],
            title: t[2],
            testimony: t[3],
          });
          testimonialFields.push({ key: i, fieldKey: i, name: i });
        });
        res.result.partners.forEach((t, i) => {
          newPartners.push({
            name: t[0],
            image: t[1],
            link: t[2],
          });
          partnerFields.push({ key: i, fieldKey: i, name: i });
        });
        form.setFieldsValue({ backgroundImage: res.result.backgroundImage });
        form.setFieldsValue({ testimonials: testimonialFields });
        const newTestimonialValues = form.getFieldsValue().testimonials;
        newTestimonials.forEach((element, i) => {
          newTestimonialValues[i].name = element.name;
          newTestimonialValues[i].image = element.image;
          newTestimonialValues[i].title = element.title;
          newTestimonialValues[i].testimony = element.testimony;
        });
        form.setFieldsValue({ testimonials: newTestimonialValues });
        setTestimonialValues(newTestimonialValues);
        form.setFieldsValue({ partners: partnerFields });
        const newPartnerValues = form.getFieldsValue().partners;
        newPartners.forEach((element, i) => {
          newPartnerValues[i].name = element.name;
          newPartnerValues[i].image = element.image;
          newPartnerValues[i].link = element.link;
        });
        form.setFieldsValue({ partners: newPartnerValues });
        setPartnerValues(newPartnerValues);
        setTestimonialFieldLength(newTestimonialValues.length);
        setPartnerFieldLength(newPartnerValues.length);
      }
    }
    fetchFields();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setBackgroundImage, setTestimonialValues, setPartnerValues]);

  const onFinish = async (values) => {
    const partnersCompressed = [];
    values.partners.forEach((element) => {
      const slicedPartner = Array(3);
      Object.keys(element).forEach((field) => {
        if (field === 'name') {
          slicedPartner[0] = element[field];
        }
        if (field === 'image') {
          slicedPartner[1] = element[field];
        }
        if (field === 'link') {
          slicedPartner[2] = element[field];
        }
      });
      partnersCompressed.push(slicedPartner);
    });
    const testimonialsCompressed = [];
    values.testimonials.forEach((element) => {
      const slicedTestimonial = Array(4);
      Object.keys(element).forEach((field) => {
        if (field === 'name') {
          slicedTestimonial[0] = element[field];
        }
        if (field === 'image') {
          slicedTestimonial[1] = element[field];
        }
        if (field === 'title') {
          slicedTestimonial[2] = element[field];
        }
        if (field === 'testimony') {
          slicedTestimonial[3] = element[field];
        }
      });
      testimonialsCompressed.push(slicedTestimonial);
    });
    const homepage = {
      backgroundImage: values.backgroundImage,
      partners: partnersCompressed,
      testimonials: testimonialsCompressed,
    };
    const editedHomepage = await editHomePage(homepage);
    if (editedHomepage) {
      message.success('Edited the Home Page');
    } else {
      message.error('Failed to edit the Home Page');
    }
  };

  const beforeUpload = (file) => {
    const isValidImage =
      file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isValidImage) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isSmall = file.size / 1024 / 1024 < 1.5;
    if (!isSmall) {
      message.error(
        'Image must be smaller than 1.5MB! ' +
          'Use the URL option if your image is too big.',
      );
    }
    return isValidImage && isSmall;
  };

  const handleUploadBackground = (event) => {
    if (event.file.status !== 'uploading') {
      return;
    }
    const reader = new FileReader();
    reader.addEventListener('load', async () => {
      const imageRaw = reader.result;
      const res = await imageToLink(imageRaw);
      if (!res) {
        message.error('Upload failed!');
        return;
      }
      const imageLink = res.result;
      form.setFieldsValue({ backgroundImage: imageLink });
      setBackgroundImage(imageLink);
    });
    reader.readAsDataURL(event.file.originFileObj);
  };

  const extractTestimonialIndex = (oldIndex, newTestimonialValues) => {
    let newIndex = -1;
    for (let i = 0; i < newTestimonialValues.length; i += 1) {
      if (newTestimonialValues[i].key === oldIndex) {
        newIndex = i;
      }
    }
    return newIndex;
  };

  const extractPartnerIndex = (oldIndex, newPartnerValues) => {
    let newIndex = -1;
    for (let i = 0; i < newPartnerValues.length; i += 1) {
      if (newPartnerValues[i].key === oldIndex) {
        newIndex = i;
      }
    }
    return newIndex;
  };

  const handleUploadTestimonial = (event, index) => {
    if (event.file.status !== 'uploading') {
      return;
    }
    const reader = new FileReader();
    reader.addEventListener('load', async () => {
      const imageRaw = reader.result;
      const res = await imageToLink(imageRaw);
      if (!res) {
        message.error('Upload failed!');
        return;
      }
      const imageLink = res.result;
      const newTestimonialValues = await form.getFieldsValue().testimonials;
      const newIndex = extractTestimonialIndex(index, newTestimonialValues);
      if (newTestimonialValues[newIndex] === undefined) {
        newTestimonialValues[newIndex] = {};
      }
      newTestimonialValues[newIndex].image = imageLink;
      form.setFieldsValue({ testimonials: newTestimonialValues });
      setTestimonialValues(newTestimonialValues);
    });
    reader.readAsDataURL(event.file.originFileObj);
  };

  const handleUploadPartner = (event, index) => {
    if (event.file.status !== 'uploading') {
      return;
    }
    const reader = new FileReader();
    reader.addEventListener('load', async () => {
      const imageRaw = reader.result;
      const res = await imageToLink(imageRaw);
      if (!res) {
        message.error('Upload failed!');
        return;
      }
      const imageLink = res.result;
      const newPartnerValues = await form.getFieldsValue().partners;
      const newIndex = extractPartnerIndex(index, newPartnerValues);
      if (newPartnerValues[newIndex] === undefined) {
        newPartnerValues[newIndex] = {};
      }
      newPartnerValues[newIndex].image = imageLink;
      form.setFieldsValue({ partners: newPartnerValues });
      setPartnerValues(newPartnerValues);
    });
    reader.readAsDataURL(event.file.originFileObj);
  };

  return (
    <Layout className="edit-home-form-layout">
      <Header className="header">
        <Row justify="center" type="flex">
          <h2>Edit the Home Page</h2>
        </Row>
      </Header>
      <Form form={form} onFinish={onFinish} className="edit-home-form">
        <h3>Background Image</h3>
        <Row type="flex">
          <Col span={2}>
            <Upload
              listType="picture-card"
              showUploadList={false}
              beforeUpload={beforeUpload}
              onChange={handleUploadBackground}
            >
              {backgroundImage !== undefined &&
              backgroundImage !== null &&
              backgroundImage !== '' ? (
                <img src={backgroundImage} alt="" style={{ width: '100%' }} />
              ) : (
                <PlusOutlined style={{ fontSize: '3em' }} />
              )}
            </Upload>
          </Col>
          <div className="edit-home-or">or</div>
          <Col span={8} className="edit-home-textbox">
            <Form.Item label="Background Image URL" name="backgroundImage">
              <Input placeholder="Background Image URL" />
            </Form.Item>
          </Col>
        </Row>
        <h3>Testimonials</h3>
        <Form.List label="Testimonials" name="testimonials">
          {(fields, { add, remove }) => (
            <div>
              {fields.map((field) => (
                <Row key={field.key}>
                  <Col className="edit-home-textbox-main">
                    <Form.Item
                      name={[field.name, 'name']}
                      fieldKey={[field.fieldKey, 'name']}
                      rules={rules}
                    >
                      <Input placeholder="Name" />
                    </Form.Item>
                  </Col>
                  <Col>
                    <Form.Item
                      name={[field.name, 'upload']}
                      fieldKey={[field.fieldKey, 'upload']}
                    >
                      <Upload
                        listType="picture-card"
                        showUploadList={false}
                        beforeUpload={beforeUpload}
                        onChange={(e) => handleUploadTestimonial(e, field.key)}
                      >
                        {testimonialValues[
                          extractTestimonialIndex(field.key, testimonialValues)
                        ] !== undefined ? (
                          <img
                            src={
                              testimonialValues[
                                extractTestimonialIndex(
                                  field.key,
                                  testimonialValues,
                                )
                              ].image
                            }
                            alt=""
                            style={{ width: '100%' }}
                          />
                        ) : (
                          <PlusOutlined style={{ fontSize: '3em' }} />
                        )}
                      </Upload>
                    </Form.Item>
                  </Col>
                  <div className="edit-home-or">or</div>
                  <Col className="edit-home-textbox-main">
                    <Form.Item
                      name={[field.name, 'image']}
                      fieldKey={[field.fieldKey, 'image']}
                      rules={rules}
                    >
                      <Input placeholder="Image URL" />
                    </Form.Item>
                  </Col>
                  <Col className="edit-home-textbox-main">
                    <Form.Item
                      name={[field.name, 'title']}
                      fieldKey={[field.fieldKey, 'title']}
                      rules={rules}
                    >
                      <Input placeholder="Title" />
                    </Form.Item>
                  </Col>
                  <Col className="testimony-box" span={8}>
                    <Form.Item
                      name={[field.name, 'testimony']}
                      fieldKey={[field.fieldKey, 'testimony']}
                      rules={rules}
                    >
                      <Input.TextArea placeholder="Testimony" />
                    </Form.Item>
                  </Col>
                  <Col flex="none" className="edit-home-textbox-main">
                    <MinusCircleOutlined
                      className="dynamic-delete-button"
                      onClick={() => {
                        remove(field.name);
                      }}
                    />
                  </Col>
                </Row>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => {
                    add({
                      key: testimonialFieldLength,
                      fieldKey: testimonialFieldLength,
                    });
                    setTestimonialFieldLength(testimonialFieldLength + 1);
                  }}
                >
                  <PlusOutlined /> Add Testimonial
                </Button>
              </Form.Item>
            </div>
          )}
        </Form.List>
        <h3>Partners</h3>
        <Form.List label="Partners" name="partners">
          {(fields, { add, remove }) => (
            <div>
              {fields.map((field) => (
                <Row key={field.key}>
                  <Col className="edit-home-textbox-main">
                    <Form.Item
                      name={[field.name, 'name']}
                      fieldKey={[field.fieldKey, 'name']}
                      rules={rules}
                    >
                      <Input placeholder="Name" />
                    </Form.Item>
                  </Col>
                  <Col>
                    <Form.Item
                      name={[field.name, 'upload']}
                      fieldKey={[field.fieldKey, 'upload']}
                    >
                      <Upload
                        listType="picture-card"
                        showUploadList={false}
                        beforeUpload={beforeUpload}
                        onChange={(e) => handleUploadPartner(e, field.key)}
                      >
                        {partnerValues[
                          extractPartnerIndex(field.key, partnerValues)
                        ] !== undefined ? (
                          <img
                            src={
                              partnerValues[
                                extractPartnerIndex(field.key, partnerValues)
                              ].image
                            }
                            alt=""
                            style={{ width: '100%' }}
                          />
                        ) : (
                          <PlusOutlined style={{ fontSize: '3em' }} />
                        )}
                      </Upload>
                    </Form.Item>
                  </Col>
                  <div className="edit-home-or">or</div>
                  <Col className="edit-home-textbox-main">
                    <Form.Item
                      name={[field.name, 'image']}
                      fieldKey={[field.fieldKey, 'image']}
                      rules={rules}
                    >
                      <Input placeholder="Image URL" />
                    </Form.Item>
                  </Col>
                  <Col className="edit-home-textbox-main">
                    <Form.Item
                      name={[field.name, 'link']}
                      fieldKey={[field.fieldKey, 'link']}
                      rules={rules}
                    >
                      <Input placeholder="Link to Website" />
                    </Form.Item>
                  </Col>
                  <Col flex="none" className="edit-home-textbox-main">
                    <MinusCircleOutlined
                      className="dynamic-delete-button"
                      onClick={() => {
                        remove(field.name);
                      }}
                    />
                  </Col>
                </Row>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => {
                    add({
                      key: partnerFieldLength,
                      fieldKey: partnerFieldLength,
                    });
                    setPartnerFieldLength(partnerFieldLength + 1);
                  }}
                >
                  <PlusOutlined /> Add Partner
                </Button>
              </Form.Item>
            </div>
          )}
        </Form.List>
        <Form.Item>
          <Button className="submit-button" type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Layout>
  );
};

export default EditHome;
