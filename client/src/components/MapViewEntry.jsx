// @flow

import React from 'react';
import { Divider, Row, Col } from 'antd';
import { CaretRightFilled } from '@ant-design/icons';

import '../css/MapViewEntry.css';

type Props = {
  selected: boolean,
};

const MapViewEntry = (props: Props) => {
  const { selected } = props;
  const color = selected ? '#1890FF' : '#D9D9D9';

  return (
    <>
      <Row className="entry">
        <Col span={16}>
          <Row>
            <b>Crisis Nursery</b>
          </Row>
          <Row className="row">
            <Col>Urbana</Col>
            <Col className="second">•</Col>
            <Col className="third">1309 West Hill Street</Col>
          </Row>
          <Row>
            <Col>$</Col>
            <Col className="second">•</Col>
            <Col className="third">English, Spanish, French, Chinese</Col>
          </Row>
        </Col>
        <Col span={2}>
          <Divider type="vertical" className="bar" />
        </Col>
        <Col span={2}>
          <Row>
            <b>1.2</b>
          </Row>
          <Row>
            <b>mi</b>
          </Row>
        </Col>
        <Col
          span={1}
          style={{
            backgroundColor: color,
          }}
          className="arrow"
        >
          <CaretRightFilled className="caret" />
        </Col>
      </Row>
    </>
  );
};

export default MapViewEntry;
