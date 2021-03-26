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

type ItemProps = {};

const GridItem = (props: ItemProps) => {
  const { icon, text } = props;

  return (
    <Row align="bottom">
      <Col span={4}>{icon}</Col>
      <Col span={20}>{text}</Col>
    </Row>
  );
};

type Props = {};

const ResourceModal = (props: Props) => {
  const { data } = props;

  return (
    <Card
      hoverable
      style={{ width: 250 }}
      cover={<img alt="example" src="/asset/images/splash.webp" />}
    >
      <h4>Resource Name</h4>
      <p>
        src\components\ResourceModal.jsx Line 11:11: 'data' is assigned a value
        but never used no-unused-vars Search for the keywords to learn more
        about each warning. To ignore, add // eslint-disable-next-line to the
        line before.
      </p>
      <Row justify="center">
        <Col span={8}>
          <CompassTwoTone />
        </Col>
        <Col span={8}>
          <HeartTwoTone />
        </Col>
        <Col span={8}>
          <ShareAltOutlined />
        </Col>
      </Row>
      <GridItem icon={<EnvironmentTwoTone />} text="my home" />
      <GridItem icon={<GlobalOutlined />} text="my home" />
      <GridItem icon={<PhoneTwoTone />} text="my home" />
      <GridItem icon={<MailTwoTone />} text="my home" />
      <GridItem icon={<DollarTwoTone />} text="my home" />
      <GridItem icon={<MessageTwoTone />} text="my home" />
      <GridItem icon={<FolderOpenTwoTone />} text="my home" />
    </Card>
  );
};

export default ResourceModal;
