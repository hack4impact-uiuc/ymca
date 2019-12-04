import React from 'react';
import { Textfit } from 'react-textfit';
import { Col, Row } from 'antd';

const HomeBlock2Desktop = () => {
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
        Juicy meatballs brisket slammin baked shoulder. Juicy smoker soy sauce
        burgers brisket. polenta mustard hunk greens. Wine technique snack
        skewers chuck excess. Oil heat slowly. slices natural delicious, set
        aside magic tbsp skillet, bay leaves brown centerpiece. fruit soften
        edges frond slices onion snack pork steem on wines excess technique cup;
        Cover smoker soy sauce fruit snack. Sweet one-dozen scrape delicious,
        non sheet raw crunch mustard. Minutes clever slotted tongs scrape, brown
        steem undisturbed rice.
      </Col>
    </Row>
  );
};

export default HomeBlock2Desktop;
