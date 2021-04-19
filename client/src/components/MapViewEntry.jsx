/* eslint-disable radix */
// @flow

import React from 'react';
import { Divider, Row, Col } from 'antd';
import { CaretRightFilled } from '@ant-design/icons';

import '../css/MapViewEntry.css';

type Props = {
  selected: boolean,
};

const MapViewEntry = (props: Props) => {
  const { resource, selected } = props;
  const color = selected ? '#1890FF' : '#D9D9D9';

  return (
    <>
      <Row className="entry">
        <Col span={16}>
          <Row>
            <b>{resource.name}</b>
          </Row>
          <Row className="row">
            <Col>{resource.city}</Col>
            <Col className="second-element">•</Col>
            <Col className="third-element">
              {resource.address || 'Address not provided'}
            </Col>
          </Row>
          <Row>
            <Col>$</Col>
            <Col className="second-element">•</Col>
            <Col className="third-element">
              {resource.languages.join(', ') || 'English'}
            </Col>
          </Row>
        </Col>
        <Col span={3}>
          <Divider type="vertical" className="bar" />
        </Col>
        <Col span={3}>
          <Row>
            <b>{resource.distance.toString().slice(0, 3)}</b>
          </Row>
          <Row>
            <b>mi</b>
          </Row>
        </Col>
        <Col
          span={1.5}
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
