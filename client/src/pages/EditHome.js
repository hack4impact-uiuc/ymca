// @flow

import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import { message, Form, Input, Button, Col, Row, Layout, Upload } from 'antd';
import {
  MinusCircleOutlined,
  PlusOutlined,
  LoadingOutlined,
} from '@ant-design/icons';

import { getHomePage, editHomePage } from '../utils/api';

import '../css/EditHome.css';

const rules = [{ required: true }];

const { Header } = Layout;

const EditHome = () => {
  const [backgroundImage, setBackgroundImage] = useState('');
  const [testimonials, setTestimonials] = useState([]);
  const [partners, setPartners] = useState([]);
  const [backgroundImageRaw, setBackgroundImageRaw] = useState();

  const [form] = Form.useForm();

  useEffect(() => {
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
        setTestimonials(newTestimonials);
        setPartners(newPartners);
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
  }, [setBackgroundImage, setTestimonials, setPartners]);

  const onFinish = values => {
    console.log(values);
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
      backgroundImage: values.backgroundImage,
      partners: partnersCompressed,
      testimonials: testimonialsCompressed,
    };
    editHomePage(homepage);
    message.success('Edited the Home Page');
  };

  const beforeUpload = file => {
    const isValidImage =
      file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isValidImage) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isSmall = file.size / 1024 / 1024 < 2;
    if (!isSmall) {
      message.error('Image must be smaller than 2MB!');
    }
    return isValidImage && isSmall;
  };

  // const createImage = url =>
  //   new Promise((resolve, reject) => {
  //     const img = new Image();
  //     img.addEventListener('load', () => resolve(img));
  //     img.addEventListener('error', error => reject(error));
  //     img.src = url;
  //   });

  const handleUpload = event => {
    if (event.file.status !== 'uploading') return;
    const reader = new FileReader();
    reader.addEventListener('load', () => setBackgroundImageRaw(reader.result));
    reader.readAsDataURL(event.file.originFileObj);
    // const img = await createImage(backgroundImageRaw);
  };

  const finishUpload = async () => {};

  return (
    <Layout className="edit-home-form-layout">
      <Header className="header">
        <Row justify="center" type="flex">
          <h2>Edit the Home Page</h2>
        </Row>
      </Header>
      <Form form={form} onFinish={onFinish} className="edit-home-form">
        <Row justify="center" type="flex">
          <Col span={4}>
            <Form.Item
              label="Background Image Upload"
              name="backgroundImageRaw"
            >
              <Upload
                listType="picture-card"
                showUploadList={false}
                beforeUpload={beforeUpload}
                onchange={handleUpload}
              >
                {backgroundImageRaw !== '' &&
                backgroundImageRaw !== null &&
                backgroundImageRaw !== undefined ? (
                  <img
                    src={backgroundImageRaw}
                    alt=""
                    style={{ width: '100%' }}
                  />
                ) : (
                  <PlusOutlined style={{ fontSize: '3em' }} />
                )}
              </Upload>
            </Form.Item>
          </Col>
          or &nbsp; &nbsp;
          <Col span={8}>
            <Form.Item label="Background Image URL" name="backgroundImage">
              <Input placeholder="Background Image URL" />
            </Form.Item>
          </Col>
        </Row>
        Testimonials
        <Form.List label="Testimonials" name="testimonials">
          {(fields, { add, remove }) => {
            return (
              <div>
                {fields.map((field, index) => (
                  <Row key={field.key}>
                    <Col>
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
                        name={[field.name, 'image']}
                        fieldKey={[field.fieldKey, 'image']}
                        rules={rules}
                      >
                        <Input placeholder="Image URL" />
                      </Form.Item>
                    </Col>
                    <Col>
                      <Form.Item
                        name={[field.name, 'title']}
                        fieldKey={[field.fieldKey, 'title']}
                        rules={rules}
                      >
                        <Input placeholder="Title" />
                      </Form.Item>
                    </Col>
                    <Col>
                      <Form.Item
                        name={[field.name, 'testimony']}
                        fieldKey={[field.fieldKey, 'testimony']}
                        rules={rules}
                      >
                        <Input.TextArea placeholder="Testimony" />
                      </Form.Item>
                    </Col>
                    <Col flex="none">
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
                      add();
                    }}
                  >
                    <PlusOutlined /> Add field
                  </Button>
                </Form.Item>
              </div>
            );
          }}
        </Form.List>
        Partners
        <Form.List label="Partners" name="partners">
          {(fields, { add, remove }) => {
            return (
              <div>
                {fields.map((field, index) => (
                  <Row key={field.key}>
                    <Col>
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
                        name={[field.name, 'image']}
                        fieldKey={[field.fieldKey, 'image']}
                        rules={rules}
                      >
                        <Input placeholder="Image URL" />
                      </Form.Item>
                    </Col>
                    <Col>
                      <Form.Item
                        name={[field.name, 'link']}
                        fieldKey={[field.fieldKey, 'link']}
                        rules={rules}
                      >
                        <Input placeholder="Link to Website" />
                      </Form.Item>
                    </Col>
                    <Col flex="none">
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
                      add();
                    }}
                  >
                    <PlusOutlined /> Add field
                  </Button>
                </Form.Item>
              </div>
            );
          }}
        </Form.List>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Layout>
  );
};

export default EditHome;
