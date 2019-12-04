import React from 'react';
import { Textfit } from 'react-textfit';
import { Col, Row } from 'antd';

const HomeBlock2Mobile = () => {
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
          justify="left"
          align="middle"
        >
          <Col span={20}>
            <Textfit mode="single">About the Guide</Textfit>
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

export default HomeBlock2Mobile;
