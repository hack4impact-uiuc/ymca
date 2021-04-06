// @flow

import React from 'react';
import { Divider, Row, Col } from 'antd';
import { CaretRightFilled } from '@ant-design/icons';

const MapViewEntry = (props: Props) => {
  const { selected } = props;
  const color = selected ? '#1890FF' : '#D9D9D9';

  return (
    <>
      <Row style={{ width: 300 }} align="middle">
        <Col span={16}>
          <Row>Crisis Nursery</Row>
          <Row justify="space-between">
            <Col>Urbana</Col>
            <Col>•</Col>
            <Col>1309 West Hill Street</Col>
          </Row>
          <Row justify="space-between">
            <Col>$</Col>
            <Col>•</Col>
            <Col>English, Spanish, French, Chinese</Col>
          </Row>
        </Col>
        <Col span={2}>
          <Divider type="vertical" style={{ height: 60 }} />
        </Col>
        <Col span={2}>
          <Row>1.2</Row>
          <Row>mi</Row>
        </Col>
        <Col
          span={1}
          style={{
            backgroundColor: color,
            borderTopRightRadius: 5,
            borderBottomRightRadius: 5,
            height: 60,
          }}
        >
          <CaretRightFilled
            style={{
              color: 'white',
              position: 'relative',
              top: 20,
            }}
          />
        </Col>
      </Row>
    </>
  );
};

export default MapViewEntry;
