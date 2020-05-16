import React, { useEffect, useState } from 'react';
import { Button, Col, Row, Carousel, notification } from 'antd';
import { HeartTwoTone } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import '../../css/Home.css';
import { getCategories, getHomePage } from '../../utils/api';

export const HomeBlock1Desktop = () => {
  const [categories, setCategories] = useState([]);
  const [backgroundImage, setBackgroundImage] = useState('');

  const fetchCategories = async () => {
    const res = await getCategories();
    const newCategories = [];
    if (res != null) {
      res.result.forEach(c => {
        newCategories.push(c.name);
      });
    }
    setCategories(newCategories);
  };

  const fetchBackgroundImage = async () => {
    const res = await getHomePage();
    if (res != null) {
      setBackgroundImage(
        `radial-gradient(70% 141% at 0 0, rgba(25, 132, 202, 0.6) 1%,` +
          ` rgba(105, 62, 158, 0.6) 100%),` +
          ` url('${res.result.backgroundPicture}')`,
      );
    }
  };
  const openNotification = () => {
    notification.open({
      message: 'COVID-19 Information & Resources',
      description: (
        <div>
          Find COVID-19 information & resources for immigrants in C-U in{' '}
          <a href="https://tinyurl.com/cuimmigrantcovid">this guide</a> updated
          daily.
        </div>
      ),
      icon: <HeartTwoTone twoToneColor="#eb2f96" />,
      top: 80,
    });
  };

  useEffect(() => {
    fetchCategories();
    fetchBackgroundImage();
    openNotification();
  }, []);

  return (
    <Row
      className="home-block-1"
      style={{ backgroundImage }}
      type="flex"
      justify="left"
      align="middle"
    >
      <Col className="welcome-text">
        Welcome to Urbana-Champaign
        {categories !== null && categories.length > 0 ? (
          <Row type="flex">
            <h1 className="welcome-text-bold">Find Resources for</h1>
            <div style={{ width: 'min-content' }}>
              <Carousel
                effect="fade"
                autoplay
                dotPosition="left"
                dots={false}
                autoplaySpeed={3000}
              >
                {categories.map(category => {
                  return category === 'Other' ? null : (
                    <Link
                      to={`/resources?category=${category}`}
                      className="welcome-text-link"
                    >
                      {category}
                    </Link>
                  );
                })}
              </Carousel>
            </div>
          </Row>
        ) : (
          <Row type="flex">
            <h1 className="welcome-text-bold">Find Resources</h1>
          </Row>
        )}
        <Row type="flex" justify="left" align="left">
          <Col span={14}>
            <Link to="/resources">
              <Button type="primary">Find Resources</Button>
            </Link>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export const HomeBlock2Desktop = () => {
  return (
    <Row className="home-block-2" type="flex" justify="center" align="middle">
      <Col className="home-block-2-divider" span={6}>
        <Row type="flex" justify="start" align="middle">
          <Col span={20} className="home-block-2-left">
            About the Guide
          </Col>
        </Row>
      </Col>
      <Col className="home-block-2-right" span={14}>
        Oasis exists to equalize and promote information access to Champaign
        resources catered to your unique lifestyle and needs. Securing reliable
        transportation, navigating the healthcare system, finding legal aid — it
        can be difficult figuring out where to go in a large place like
        Champaign that has hundreds of resources and a population of over 80,000
        people. This virtual guide, built with love by{' '}
        <a href="https://uiuc.hack4impact.org/">Hack4Impact</a> curates
        recommendations based on cost, language offerings, and more. As you
        explore Oasis, we would love to hear about your experiences and feedback
        through the{' '}
        <a href="mailto:lalinea@universityymca.org"> Welcome Center.</a>
      </Col>
    </Row>
  );
};

export const HomeBlock3Desktop = () => {
  const [testimonials, setTestimonials] = useState([]);

  const fetchTestimonials = async () => {
    const res = await getHomePage();
    const newTestimonials = [];
    if (res != null) {
      res.result.testimonials.forEach(t => {
        newTestimonials.push({
          person: t[0],
          picture: t[1],
          title: t[2],
          testimonial: t[3],
        });
      });
    }
    setTestimonials(newTestimonials);
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  return (
    <Row className="home-block-3" type="flex" justify="center" align="middle">
      <Col span={23}>
        <Carousel
          autoplay
          dotPosition="right"
          autoplaySpeed={5000}
          effect="fade"
        >
          {testimonials.map(element => {
            return (
              <div key={element}>
                <Row type="flex" justify="center" align="middle">
                  <Col span={5} style={{ marginTop: '1em' }}>
                    <img
                      className="testimonial-img"
                      src={element.picture}
                      alt="profile"
                    />
                  </Col>
                  <Col className="testimonial-text" span={12} offset={1}>
                    <h2>{element.person}</h2>
                    <h4>{element.title}</h4>
                    <p>{element.testimonial}</p>
                  </Col>
                </Row>
              </div>
            );
          })}
        </Carousel>
      </Col>
    </Row>
  );
};
