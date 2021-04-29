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
  CloseCircleFilled,
} from '@ant-design/icons';

import '../css/MapViewModal.css';
import languageConversion from '../utils/languages';

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

type Props = {
  resource: Resource,
};

const MapViewModal = (props: Props) => {
  const { resource, setModalOpened } = props;

  let languages = '';
  resource.languages.forEach((language) => {
    languages += `${languageConversion[language]}, `;
  });
  if (languages !== '') {
    languages = languages.slice(0, languages.length - 2);
  }

  const handleClose = () => {
    setModalOpened(false);
  };

  return (
    <Card
      hoverable
      className="card"
      cover={
        <img alt="example" src="/asset/images/splash.webp" className="cover" />
      }
    >
      <h5>{resource.name}</h5>
      <p>{resource.description}</p>
      <Row className="top-row">
        <Col span={8}>
          <Row className="icon-pair">
            <CompassTwoTone className="main-icon" />
          </Row>
          <Row className="icon-pair">Directions</Row>
        </Col>
        <Col span={8}>
          <Row className="icon-pair">
            <HeartTwoTone className="main-icon" />
          </Row>
          <Row className="icon-pair">Save</Row>
        </Col>
        <Col span={8}>
          <Row className="icon-pair">
            <ShareAltOutlined
              className="main-icon"
              style={{ color: '#1890FF' }}
            />
          </Row>
          <Row className="icon-pair">Share</Row>
        </Col>
      </Row>
      <GridItem
        icon={<EnvironmentTwoTone />}
        text={resource.address || 'No Address Provided'}
      />
      <GridItem
        icon={<GlobalOutlined style={{ color: '#1890FF' }} />}
        text={resource.website}
      />
      <GridItem
        icon={<PhoneTwoTone />}
        text={resource.phoneNumber || 'No Phone Number Provided'}
      />
      <GridItem
        icon={<MailTwoTone />}
        text={resource.email || 'No Email Provided'}
      />
      <GridItem icon={<DollarTwoTone />} text={resource.cost || 'Free'} />
      <GridItem icon={<MessageTwoTone />} text={languages || 'English'} />
      <GridItem
        icon={<FolderOpenTwoTone />}
        text={resource.category || 'No Category Provided'}
      />
      <CloseCircleFilled onClick={handleClose} className="close" />
    </Card>
  );
};

export default MapViewModal;
