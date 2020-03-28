import React from 'react';
import { Textfit } from 'react-textfit';
import { Col, Row, Carousel } from 'antd';

import testimonials from '../../data/testimonials';

export const HomeBlock2Mobile = () => {
  return (
    <Row
      className="home-block-2"
      type="flex"
      justify="center"
      align="middle"
    >
      <Col className="home-block-2" span={24}>
        <Row type="flex" justify="center" align="middle">
          <Col span={20} className="home-block-2__top__text">
            <Textfit mode="single">
              <strong>About the Guide </strong>
            </Textfit>
          </Col>
        </Row>
        <Row
          className="home-block-2__bottom__text"
          type="flex"
          justify="center"
          align="middle"
        >
          <Col span={20}>
            <Textfit mode="multi">
              Oasis exists to equalize and promote information access to
              Champaign resources catered to your unique lifestyle and needs.
              Securing reliable transportation, navigating the healthcare
              system, finding legal aid — it can be difficult figuring out where
              to go in a large place like Champaign that has hundreds of
              resources and a population of over 80,000 people. This virtual
              guide, built with love by{' '}
              <a href="https://uiuc.hack4impact.org/">Hack4Impact</a> curates
              recommendations based on cost, language offerings, and more. As
              you explore Oasis, we would love to hear about your experiences
              and feedback through the{' '}
              <a href="mailto:lalinea@universityymca.org"> Welcome Center.</a>
            </Textfit>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export const HomeBlock3Mobile = () => {
  return (
    <Row className="home-block-3" type="flex" justify="center" align="middle">
      <Col span={23}>
        <Carousel autoplay dotPosition="right">
          {testimonials.map(element => {
            return (
              <div className="testimonial-block">
                <Row type="flex" justify="center" align="middle">
                  <Col span={23} justify="center" align="middle">
                    <img
                      className="testimonial-block__top__img"
                      src={element.picture}
                      alt=""
                    />
                  </Col>
                </Row>
                <Row className="testimonial-block__bottom">
                  <Col>
                    <h1>{element.person}</h1>
                    <p>
                      <Textfit mode="multi">{element.title}</Textfit>
                    </p>
                    <p>
                      <Textfit mode="multi">{element.testimonial}</Textfit>
                    </p>
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
