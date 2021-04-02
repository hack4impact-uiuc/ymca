// @flow

import React from 'react';
import { Divider, Row, Col } from 'antd';

const MapViewEntry = (props: Props) => {
  const { data } = props;

  return (
    <>
      <Row style={{ width: 300 }}>
        <Col span={16}>
          <Row>Crisis Nursery</Row>
          <Row>
            <Col>Urbana</Col>
            <Col>.</Col>
            <Col>1309 West Hill Street</Col>
          </Row>
          <Row>
            <Col>$</Col>
            <Col> . </Col>
            <Col>English, Spanish, French, Chinese</Col>
          </Row>
        </Col>
        <Col span={2}>
          <Divider type="vertical" style={{ height: 60 }} />
        </Col>
        <Col span={6}>
          <Row>1.2</Row>
          <Row>mi</Row>
        </Col>
      </Row>
    </>
  );
};

export default MapViewEntry;
