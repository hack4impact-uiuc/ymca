// @flow

import React, { useState, useEffect, useCallback } from 'react';
import { Carousel, Row, Col, Rate, Icon, Timeline, Button } from 'antd';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import TimelineItem from 'antd/lib/timeline/TimelineItem';

import ResourceDetail from '../../pages/ResourceDetail';
import useWindowDimensions from '../../utils/mobile';
import { deleteResource, getResourceByID } from '../../utils/api';
import {
  saveResource,
  deleteSavedResource,
  getSavedResources,
} from '../../utils/auth';
import ResourcesBreadcrumb from '../ResourcesBreadcrumb';

import '../../css_mobile/ResourceDetail.css';

type Props = {
  authed: Boolean,
  authRoleIsEquivalentTo: String => Boolean,
  match: {
    params: {
      id: any,
    },
  },
};

const ResourceDetailMobile = (props: Props) => {
  const { authed, authRoleIsEquivalentTo } = props;

  const resourceId = props.match.params.id;
  const isMobile = useWindowDimensions()[1];

  /* SETUP START */

  // ResourceDetail page will get all this stuff prior to this
  // being loaded but for right now everything will be fetched.
  // by this component.
  const [name, setName] = useState(null);
  const [category, setCategory] = useState(null);
  const [subcategory, setSubcategory] = useState(null);
  const [description, setDescription] = useState(null);
  const [website, setWebsite] = useState(null);
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState([]);
  const [address, setAddress] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [aptUnitSuite, setAptUnitSuite] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [languages, setLanguages] = useState([]);
  const [requiredDocuments, setRequiredDocuments] = useState([]);
  const [cost, setCost] = useState(null);
  const [internalNotes, setInternalNotes] = useState([]);
  const [hours, setHours] = useState(null);
  const [recommendation, setRecommendation] = useState(0);
  const [image, setImage] = useState(null);

  const [resourceExists, setResourceExists] = useState(true);

  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [eligibility, setEligibility] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const [isSaved, setIsSaved] = useState(false);

  // componentDidMount
  useEffect(() => {
    async function loadResource() {
      const response = await getResourceByID(resourceId, true);

      if (response) {
        const { result } = response;

        setImage(result.image);

        setCategory(result.category);
        setSubcategory(result.subcategory);

        setName(result.name);
        setDescription(result.description);

        setPhone(result.phoneNumbers);
        setEmail(result.email);
        setWebsite(result.website);

        setLanguages(result.availableLanguages);
        setCost(result.cost);

        setAddress(result.address);
        setAddressLine2(result.addressLine2);
        setCity(result.city);
        setRecommendation(result.recommendation);

        setHours(
          result.hoursOfOperation !== [] ? result.hoursOfOperation : null,
        );
      }
    }

    loadResource();
  }, [resourceId]);

  const saveResourceHandler = useCallback(async () => {
    const result = await saveResource(resourceId);
    if (result != null && result.code === 200) {
      setIsSaved(true);
    }
  }, []);

  const deleteResourceHandler = useCallback(async () => {
    const result = await deleteSavedResource(resourceId);
    if (result != null && result.code === 200) {
      setIsSaved(false);
    }
  }, []);

  useEffect(() => {
    async function updateIsSaved() {
      if (authed) {
        let savedSet = new Set();
        const json = await getSavedResources();
        savedSet = new Set(json.result);

        setIsSaved(!!savedSet.has(resourceId));
      }
    }
    updateIsSaved();
  }, [authed]);

  // just to keep something on the screen when not on mobile
  if (!isMobile) {
    return <ResourceDetail {...props} />;
  }

  const Map = ReactMapboxGl({
    accessToken:
      'pk.eyJ1IjoiYW5vb2psYWwiLCJhIjoiY2syemtiYjZoMGp1' +
      'eDNscXQ3azJzajl0bCJ9.FDSFjP1IfSisbm4uvd70vg',
    interactive: true,
  });

  /* SETUP END */

  return (
    <div className="mb-rd-container">
      <Carousel className="mb-rd-carousel">
        {image ? (
          <img className="mb-rd-carousel-img" src={image} alt="" />
        ) : (
          <div />
        )}
        <div />
      </Carousel>
      <div className="mb-rd-block-1">
        <ResourcesBreadcrumb
          categorySelected={category}
          subcategorySelected={subcategory}
          resourceSelected={name}
        />
        <Row className="mb-rd-header-bar" type="flex">
          <Col span={21}>
            <h2 className="mb-rd-header-text">{name}</h2>
          </Col>
          <Col span={3}>
            <ResourceDetailSaveButton
              authed={authed}
              isSaved={isSaved}
              deleteResourceHandler={deleteResourceHandler}
              saveResourceHandler={saveResourceHandler}
            />
          </Col>
        </Row>
        <Row>
          <Rate className="mb-rd-rate" disabled defaultValue={recommendation} />
        </Row>
        <Row className="mb-rd-description-container">
          <Col className="mb-rd-description" span={20}>
            {description}
          </Col>
        </Row>
      </div>
      <div className="mb-rd-block-2">
        <Row className="mb-rd-block-title">Basic Information</Row>
        <InfoBlock
          title="Contact Information"
          icon={
            <Icon
              className="mb-rd-phone-icon mb-rd-icon"
              type="phone"
              theme="filled"
            />
          }
          content={[
            phone && phone[0]
              ? phone[0].phoneNumber
              : 'No phone number provided.',
            email || 'No email provided.',
            <a href={website}>{website || 'No website provided.'}</a>,
          ]}
        />
        <InfoBlock
          title="Languages Spoken"
          icon={<Icon className="mb-rd-icon" type="wechat" theme="filled" />}
          content={[languages.join(', ')]}
        />
        <InfoBlock
          title="Cost"
          icon={
            <Icon className="mb-rd-icon" type="dollar-circle" theme="filled" />
          }
          content={[cost || 'None provided.']}
        />
        <InfoBlock
          title="Required Documents"
          icon={
            <Icon className="mb-rd-icon" type="folder-open" theme="filled" />
          }
          content={[]}
        />
      </div>
      <div className="mb-rd-block-2">
        <Row className="mb-rd-block-title">Location</Row>
        <Row className="mb-rd-thin-text">
          <Row>{address}</Row>
          <Row>{addressLine2}</Row>
          <Row type="flex" justify="space-between">
            <Col>{`${city}${state && `, ${state}`}`}</Col>
            <Col>Far Aways</Col>
          </Row>
        </Row>
        <Row>
          <Map
            style="mapbox://styles/mapbox/light-v9"
            center={[lng, lat]}
            containerStyle={{
              height: '350px',
              width: '100%',
            }}
            zoom={[15]}
          >
            <Layer
              type="symbol"
              id="marker"
              layout={{ 'icon-image': 'marker-15' }}
            >
              <Feature coordinates={[lng, lat]} />
            </Layer>
          </Map>
        </Row>
      </div>
      <div className="mb-rd-block-2">
        <Row className="mb-rd-block-title">Schedule</Row>
        <Row>
          <Timeline className="mb-rd-schedule">
            {[
              'Sunday',
              'Monday',
              'Tuesday',
              'Wednesday',
              'Thursday',
              'Friday',
              'Saturday',
            ].map(day => (
              <ScheduleEntry
                day={day}
                period={
                  hours &&
                  hours.hoursOfOperation.filter(entry => entry.day === day)
                    .period
                }
              />
            ))}
          </Timeline>
        </Row>
      </div>
    </div>
  );
};

type ScheduleEntryProps = {
  className: String,
  day: String,
  period: [String],
};
const ScheduleEntry = (props: ScheduleEntryProps) => {
  const { className, day, period } = props;

  const startTime = period && period[0];
  const endTime = period && period[1];

  return (
    <Timeline.Item
      color="rgb(136, 216, 208)"
      dot={<div className="mb-rd-schedule-dot" />}
    >
      <Row className="md-rd-schedule-entry">
        <Row className="mb-rd-schedule-entry-title">{day}</Row>
        <Row>{startTime && endTime ? `${startTime} - ${endTime}` : 'None'}</Row>
      </Row>
    </Timeline.Item>
  );
};

type InfoBlockProps = {
  className: String,
  title: String,
  icon: any,
  content: any,
};
const InfoBlock = (props: InfoBlockProps) => {
  const { icon, title, content, className } = props;

  return (
    <Row className={`mb-rd-info-block ${className}`} gutter={[16, 16]}>
      <Col span={4}>
        <Row className="mb-rd-icon-container" type="flex" justify="center">
          {icon}
        </Row>
      </Col>
      <Col span={20}>
        <Row className="mb-rd-info-title">{title}</Row>
        {content.map(entry => (
          <Row className="mb-rd-thin-text">{entry}</Row>
        ))}
      </Col>
    </Row>
  );
};

type ResourceDetailSaveButtonProps = {
  authed: Boolean,
  isSaved: Boolean,
  deleteResourceHandler: () => any,
  saveResourceHandler: () => any,
};
const ResourceDetailSaveButton = (props: ResourceDetailSaveButtonProps) => {
  const { authed, isSaved, deleteResourceHandler, saveResourceHandler } = props;

  return (
    authed && (
      <a onClick={e => e.preventDefault()}>
        <div className="mb-rd-save-btn">
          {isSaved ? (
            <Button
              onClick={async () => {
                await deleteResourceHandler();
              }}
              type="link"
            >
              <Icon type="heart" theme="filled" style={{ color: '#562996' }} />
            </Button>
          ) : (
            <Button
              onClick={async () => {
                await saveResourceHandler();
              }}
              type="link"
            >
              <Icon type="heart" theme="filled" style={{ color: 'black' }} />
            </Button>
          )}
        </div>
      </a>
    )
  );
};

type ImageCarouselProps = {
  images: Array<String>,
};
const ImageCarousel = (props: ImageCarouselProps) => {};

export default ResourceDetailMobile;
