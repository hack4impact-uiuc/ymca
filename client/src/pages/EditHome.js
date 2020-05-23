// @flow

import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import { message, Form, Input, Button, Col, Row, Layout, Upload } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

import { getHomePage, editHomePage } from '../utils/api';

import '../css/EditHome.css';

const rules = [{ required: true }];

const { Header } = Layout;

const EditHome = () => {
  const [backgroundImage, setBackgroundImage] = useState('');
  const [testimonialImages, setTestimonialImages] = useState({});
  const [partnerImages, setPartnerImages] = useState({});
  const [backgroundImageRaw, setBackgroundImageRaw] = useState();

  const [form] = Form.useForm();

  useEffect(() => {
    message.warning(
      'If you are uploading multiple images at once, the request may fail.',
    );
    async function fetchFields() {
      const res = await getHomePage();
      const newTestimonials = [];
      const testimonialFields = [];
      const newPartners = [];
      const partnerFields = [];
      if (res != null) {
        setBackgroundImage(backgroundImage);
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
        const testimonialValues = form.getFieldsValue().testimonials;
        newTestimonials.forEach((element, i) => {
          testimonialValues[i].name = element.name;
          testimonialValues[i].image = element.image;
          testimonialValues[i].title = element.title;
          testimonialValues[i].testimony = element.testimony;
        });
        form.setFieldsValue({ testimonials: testimonialValues });
        form.setFieldsValue({ partners: partnerFields });
        const partnerValues = form.getFieldsValue().partners;
        newPartners.forEach((element, i) => {
          partnerValues[i].name = element.name;
          partnerValues[i].image = element.image;
          partnerValues[i].link = element.link;
        });
        form.setFieldsValue({ partners: partnerValues });
      }
    }
    fetchFields();
  }, [setBackgroundImage]);

  const shiftIndices = (images, indexRemoved) => {
    const newImages = JSON.parse(JSON.stringify(images));
    Object.keys(images).forEach(function(key) {
      if (key >= indexRemoved) {
        delete newImages[key];
      }
    });
    Object.keys(images).forEach(function(key) {
      if (key > indexRemoved) {
        newImages[key - 1] = images[key];
      }
    });
    return newImages;
  };

  const onFinish = async values => {
    const partnersCompressed = [];
    values.partners.forEach(element => {
      const slicedPartner = Object.values(element).slice(2);
      partnersCompressed.push(slicedPartner);
    });
    const testimonialsCompressed = [];
    values.testimonials.forEach(element => {
      const slicedTestimonial = Object.values(element).slice(2);
      testimonialsCompressed.push(slicedTestimonial);
    });
    const homepage = {
      backgroundImageRaw,
      partnerImages,
      testimonialImages,
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
    console.log(partnerImages);
  };

  const beforeUpload = file => {
    const isValidImage =
      file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isValidImage) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isSmall = file.size / 1024 / 1024 < 1;
    if (!isSmall) {
      message.error(
        'Image must be smaller than 1MB!' +
          'Use the URL option if your image is too big.',
      );
    }
    return isValidImage && isSmall;
  };

  const handleUploadBackground = event => {
    if (event.file.status !== 'uploading') return;
    const reader = new FileReader();
    reader.addEventListener('load', () => setBackgroundImageRaw(reader.result));
    reader.readAsDataURL(event.file.originFileObj);
  };

  const handleUploadTestimonial = (event, index) => {
    if (event.file.status !== 'uploading') return;
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      const newTestimonialImages = JSON.parse(
        JSON.stringify(testimonialImages),
      );
      newTestimonialImages[index] = reader.result;
      setTestimonialImages(newTestimonialImages);
    });
    reader.readAsDataURL(event.file.originFileObj);
  };

  const handleUploadPartner = (event, index) => {
    if (event.file.status !== 'uploading') return;
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      const newPartnerImages = JSON.parse(JSON.stringify(partnerImages));
      newPartnerImages[index] = reader.result;
      setPartnerImages(newPartnerImages);
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
              {backgroundImageRaw !== undefined &&
              backgroundImageRaw !== null &&
              backgroundImageRaw !== '' ? (
                <img
                  src={backgroundImageRaw}
                  alt=""
                  style={{ width: '100%' }}
                />
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
          {(fields, { add, remove }) => {
            return (
              <div>
                {fields.map((field, index) => (
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
                      <Upload
                        listType="picture-card"
                        showUploadList={false}
                        beforeUpload={beforeUpload}
                        onChange={e => handleUploadTestimonial(e, field.key)}
                      >
                        {field.key in testimonialImages &&
                        testimonialImages[field.key] !== undefined &&
                        testimonialImages[field.key] !== null &&
                        testimonialImages[field.key] !== '' ? (
                          <img
                            src={testimonialImages[field.key]}
                            alt=""
                            style={{ width: '100%' }}
                          />
                        ) : (
                          <PlusOutlined style={{ fontSize: '3em' }} />
                        )}
                      </Upload>
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
                          const newTestimonialImages = shiftIndices(
                            testimonialImages,
                            field.key,
                          );
                          setTestimonialImages(newTestimonialImages);
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
                      add();
                    }}
                  >
                    <PlusOutlined /> Add Testimonial
                  </Button>
                </Form.Item>
              </div>
            );
          }}
        </Form.List>
        <h3>Partners</h3>
        <Form.List label="Partners" name="partners">
          {(fields, { add, remove }) => {
            return (
              <div>
                {fields.map((field, index) => (
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
                      <Upload
                        listType="picture-card"
                        showUploadList={false}
                        beforeUpload={beforeUpload}
                        onChange={e => handleUploadPartner(e, field.key)}
                      >
                        {field.key in partnerImages &&
                        partnerImages[field.key] !== undefined &&
                        partnerImages[field.key] !== null &&
                        partnerImages[field.key] !== '' ? (
                          <img
                            src={partnerImages[field.key]}
                            alt=""
                            style={{ width: '100%' }}
                          />
                        ) : (
                          <PlusOutlined style={{ fontSize: '3em' }} />
                        )}
                      </Upload>
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
                          const newPartnerImages = shiftIndices(
                            partnerImages,
                            field.key,
                          );
                          setPartnerImages(newPartnerImages);
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
                      add();
                    }}
                  >
                    <PlusOutlined /> Add Partner
                  </Button>
                </Form.Item>
              </div>
            );
          }}
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
