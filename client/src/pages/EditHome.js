// @flow

import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import { Form, Input, Button, Col, Row, Layout } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

import { getHomePage } from '../utils/api';

import '../css/EditHome.css';

const rules = [{ required: true }];

const { Header } = Layout;

const EditHome = () => {
  const [backgroundImage, setBackgroundImage] = useState('');
  const [testimonials, setTestimonials] = useState([]);
  const [partners, setPartners] = useState([]);

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
          testimonialFields.push({ key: i });
        });
        res.result.partners.forEach((t, i) => {
          newPartners.push({
            name: t[0],
            image: t[1],
            link: t[2],
          });
          partnerFields.push({ key: i });
        });
      }
      setTestimonials(newTestimonials);
      setPartners(newPartners);
      form.setFieldsValue({ backgroundImage: res.result.backgroundPicture });
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
    fetchFields();
  }, [setBackgroundImage, setTestimonials, setPartners]);

  const onFinish = values => {
    console.log('Received values of form:', values);
  };
  return (
    <Layout className="edit-home-form-layout">
      <Header className="header">
        <Row justify="center" type="flex">
          <h2>Edit the Home Page</h2>
        </Row>
      </Header>
      <Form form={form} onFinish={onFinish} className="edit-home-form">
        <Form.Item label="Background Image URL" name="backgroundImage">
          <Input placeholder="Background Image URL" />
        </Form.Item>
        Testimonials
        <Form.List label="Testimonials" name="testimonials">
          {(fields, { add, remove }) => {
            return (
              <div>
                {fields.map((field, index) => (
                  <Row key={field.key}>
                    <Col>
                      <Form.Item
                        name={[field.key, 'name']}
                        fieldKey={[field.key, 'name']}
                        rules={rules}
                      >
                        <Input placeholder="Name" />
                      </Form.Item>
                    </Col>
                    <Col>
                      <Form.Item
                        name={[field.key, 'image']}
                        fieldKey={[field.key, 'image']}
                        rules={rules}
                      >
                        <Input placeholder="Image URL" />
                      </Form.Item>
                    </Col>
                    <Col>
                      <Form.Item
                        name={[field.key, 'title']}
                        fieldKey={[field.key, 'title']}
                        rules={rules}
                      >
                        <Input placeholder="Title" />
                      </Form.Item>
                    </Col>
                    <Col>
                      <Form.Item
                        name={[field.key, 'testimony']}
                        fieldKey={[field.key, 'testimony']}
                        rules={rules}
                      >
                        <Input.TextArea placeholder="Testimony" />
                      </Form.Item>
                    </Col>
                    <Col flex="none">
                      <MinusCircleOutlined
                        className="dynamic-delete-button"
                        onClick={() => {
                          remove(field.key);
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
                        name={[field.key, 'name']}
                        fieldKey={[field.key, 'name']}
                        rules={rules}
                      >
                        <Input placeholder="Name" />
                      </Form.Item>
                    </Col>
                    <Col>
                      <Form.Item
                        name={[field.key, 'image']}
                        fieldKey={[field.key, 'image']}
                        rules={rules}
                      >
                        <Input placeholder="Image URL" />
                      </Form.Item>
                    </Col>
                    <Col>
                      <Form.Item
                        name={[field.key, 'link']}
                        fieldKey={[field.key, 'link']}
                        rules={rules}
                      >
                        <Input placeholder="Link to Website" />
                      </Form.Item>
                    </Col>
                    <Col flex="none">
                      <MinusCircleOutlined
                        className="dynamic-delete-button"
                        onClick={() => {
                          remove(field.key);
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
