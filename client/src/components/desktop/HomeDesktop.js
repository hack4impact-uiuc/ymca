import React, { useEffect, useState } from 'react';
import { Button, Col, Row, Carousel } from 'antd';
import { Link } from 'react-router-dom';

import '../../css/Home.css';
import testimonials from '../../data/testimonials';
import { getCategories } from '../../utils/api';

export const HomeBlock1Desktop = () => {
  const [categories, setCategories] = useState([]);

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

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <Row className="home-block-1" type="flex" justify="left" align="middle">
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
  return (
    <Row className="home-block-3" type="flex" justify="center" align="middle">
      <Col span={23}>
        <Carousel autoplay dotPosition="right" autoplaySpeed={5000}>
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
