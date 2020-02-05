import React from 'react';
import { Textfit } from 'react-textfit';
import { Col, Row, Carousel } from 'antd';

import testimonials from '../../data/testimonials';

export const HomeBlock2Desktop = () => {
  return (
    <Row
      className="home-block-2"
      type="flex"
      justify="center"
      align="middle"
      gutter={[16, 16]}
    >
      <Col className="home-block-2__left" span={6}>
        <Row
          className="home-block-2__left__text"
          type="flex"
          justify="start"
          align="middle"
        >
          <Col span={20}>
            <Textfit mode="single">
              <strong>About the Guide</strong>
            </Textfit>
          </Col>
        </Row>
      </Col>
      <Col className="home-block-2__right" span={14}>
        Oasis exists to equalize and promote information access to Champaign
        resources catered to your unique lifestyle and needs. Securing reliable
        transportation, navigating the healthcare system, finding legal aid — it
        can be difficult figuring out where to go in a large place like
        Champaign that has hundreds of resources and a population of over 80,000
        people. This virtual guide, built with love by{' '}
        <a href="https://www.facebook.com/h4iuiuc/">Hack4Impact</a> curates
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
        <Carousel autoplay dotPosition="right">
          {testimonials.map(element => {
            return (
              <div key={element}>
                <Row
                  className="testimonial-block"
                  type="flex"
                  justify="center"
                  align="middle"
                >
                  <Col className="testimonial-block__left" span={6} offset={1}>
                    <img
                      className="testimonial-block__left__img"
                      src={element.picture}
                      alt=""
                    />
                  </Col>
                  <Col
                    className="testimonial-block__right"
                    span={12}
                    offset={1}
                  >
                    <h1>{element.person}</h1>
                    <h3>{element.title}</h3>
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
