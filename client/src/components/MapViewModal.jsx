// @flow

import React from 'react';
import { Card, Row, Col } from 'antd';
import {
  CompassTwoTone,
  HeartTwoTone,
  ShareAltOutlined,
  EnvironmentTwoTone,
  GlobalOutlined,
  PhoneTwoTone,
  MailTwoTone,
  DollarTwoTone,
  MessageTwoTone,
  FolderOpenTwoTone,
} from '@ant-design/icons';

import '../css/MapViewModal.css';

type ItemProps = {};

const GridItem = (props: ItemProps) => {
  const { icon, text } = props;

  return (
    <Row>
      <Col span={4} className="grid-item">
        {icon}
      </Col>
      <Col span={20} className="grid-text">
        {text}
      </Col>
    </Row>
  );
};

type Props = {};

const MapViewModal = (props: Props) => {
  const { data } = props;

  return (
    <Card
      hoverable
      className="card"
      cover={
        <img alt="example" src="/asset/images/splash.webp" className="cover" />
      }
    >
      <h5>Resource Name</h5>
      <p>
        src\components\ResourceModal.jsx Line 11:11: 'data' is assigned a value
        but never used no-unused-vars
      </p>
      <Row className="top-row">
        <Col span={8}>
          <CompassTwoTone className="main-icon" />
          Directions
        </Col>
        <Col span={8}>
          <HeartTwoTone className="main-icon" />
          Save
        </Col>
        <Col span={8}>
          <ShareAltOutlined
            className="main-icon"
            style={{ color: '#1890FF' }}
          />
          Share
        </Col>
      </Row>
      <GridItem icon={<EnvironmentTwoTone />} text="my home" />
      <GridItem
        icon={<GlobalOutlined style={{ color: '#1890FF' }} />}
        text="my home"
      />
      <GridItem icon={<PhoneTwoTone />} text="my home" />
      <GridItem icon={<MailTwoTone />} text="my home" />
      <GridItem icon={<DollarTwoTone />} text="my home" />
      <GridItem icon={<MessageTwoTone />} text="my home" />
      <GridItem icon={<FolderOpenTwoTone />} text="my home" />
    </Card>
  );
};

export default MapViewModal;
