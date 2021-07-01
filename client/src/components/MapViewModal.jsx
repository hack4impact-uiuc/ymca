// @flow

import React from 'react';
import { Popover, Card, Row, Col } from 'antd';
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
  HeartFilled,
} from '@ant-design/icons';
import { useIntl, FormattedMessage } from 'react-intl';
import { saveResource, deleteSavedResource } from '../utils/auth';
import { useAuth } from '../utils/use-auth';
import {
  loginMessage,
  savedMessage,
  unsavedMessage,
} from '../utils/savedMessages';

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
  directionsURL: string,
  resource: Resource,
  setModalOpened: (boolean) => void,
  isSaved: boolean,
  updateSaved: () => void,
};

const MapViewModal = (props: Props) => {
  const { authed } = useAuth();
  const intl = useIntl();
  const {
    directionsURL,
    resource,
    setModalOpened,
    isSaved,
    updateSaved,
  } = props;

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

  const copyLink = () => {
    const link = `https://nawc-staging.vercel.app/resources/${resource.id}`;
    navigator.clipboard.writeText(link);
  };

  const saveResourceHandler = async () => {
    await saveResource(resource.id);
    updateSaved();
  };

  const deleteSavedResourceHandler = async () => {
    await deleteSavedResource(resource.id);
    updateSaved();
  };

  let saveButton = (
    <Popover content={loginMessage}>
      <HeartTwoTone className="main-icon" />
    </Popover>
  );
  if (authed) {
    if (isSaved) {
      saveButton = (
        <Popover content={unsavedMessage}>
          <HeartFilled
            className="main-icon"
            onClick={async () => {
              await deleteSavedResourceHandler();
            }}
            style={{ color: '#1890ff' }}
          />
        </Popover>
      );
    } else {
      saveButton = (
        <Popover content={savedMessage}>
          <HeartTwoTone
            className="main-icon"
            onClick={async () => {
              await saveResourceHandler();
            }}
          />
        </Popover>
      );
    }
  }

  return (
    <Card
      className="card"
      cover={
        <img
          alt="example"
          src={resource.image || '/asset/images/splash.webp'}
          className="cover"
        />
      }
    >
      <h5>{resource.name}</h5>
      <p>{resource.description}</p>
      <Row className="top-row">
        <Col span={8}>
          <Row className="icon-pair">
            <CompassTwoTone
              className="main-icon"
              onClick={() => window.open(directionsURL)}
            />
          </Row>
          <Row className="icon-pair">Directions</Row>
        </Col>
        <Col span={8}>
          <Row className="icon-pair">{saveButton}</Row>
          <Row className="icon-pair">
            <FormattedMessage id="save" defaultMessage="Save" />
          </Row>
        </Col>
        <Col span={8}>
          <Row className="icon-pair">
            <Popover
              content={intl.formatMessage({
                id: 'linkCopied',
                defaultMessage: 'Resource link copied!',
              })}
              trigger="click"
            >
              <ShareAltOutlined
                className="main-icon"
                style={{ color: '#1890FF' }}
                onClick={copyLink}
              />
            </Popover>
          </Row>
          <Row className="icon-pair">
            <FormattedMessage id="share" defaultMessage="Share" />
          </Row>
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
