/* eslint-disable radix */
// @flow

import React from 'react';
import { Divider, Row, Col } from 'antd';
import { CaretRightFilled } from '@ant-design/icons';

import '../css/MapViewEntry.css';
import languageConversion from '../utils/languages';

type Props = {
  resource: Resource,
  selected: boolean,
};

const MapViewEntry = (props: Props) => {
  const { resource, selected } = props;
  const color = selected ? '#1890FF' : '#D9D9D9';

  let languages = '';
  resource.languages.forEach((language) => {
    languages += `${languageConversion[language]}, `;
  });
  if (languages !== '') {
    languages = languages.slice(0, languages.length - 2);
  }

  return (
    <>
      <Row className="mapview-entry">
        <Col span={16}>
          <Row>
            <b>{resource.name}</b>
          </Row>
          <Row>
            <Col>{resource.city}</Col>
            <Col className="mapview-dot">•</Col>
            <Col className="mapview-address">
              {resource.address || 'Address not provided'}
            </Col>
          </Row>
          <Row>
            <Col>{resource.cost || '$'}</Col>
            <Col className="mapview-dot">•</Col>
            <Col className="mapview-languages">{languages || 'English'}</Col>
          </Row>
        </Col>
        <Col span={3}>
          <Divider type="vertical" className="mapview-bar" />
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
          className="mapview-arrow"
        >
          <CaretRightFilled className="mapview-caret" />
        </Col>
      </Row>
    </>
  );
};

export default MapViewEntry;
