// @flow

import React, { useState, useEffect, useCallback } from 'react';
import { Redirect } from 'react-router-dom';
import { Carousel, Row, Col, Rate, Icon, Timeline, Button } from 'antd';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import TimelineItem from 'antd/lib/timeline/TimelineItem';
import moment from 'moment';

import ResourceDetail from '../desktop/ResourceDetail';
import ResourcesBreadcrumb from '../ResourcesBreadcrumb';
import SaveButton from '../SaveButton';
import useWindowDimensions from '../../utils/mobile';
import { deleteResource, getResourceByID } from '../../utils/api';
import {
  saveResource,
  deleteSavedResource,
  getSavedResources,
} from '../../utils/auth';
import determineStockPhoto from '../../utils/determineStockPhoto';

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
  const [address, setAddress] = useState(null);
  const [addressLine2, setAddressLine2] = useState(null);
  const [aptUnitSuite, setAptUnitSuite] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [languages, setLanguages] = useState([]);
  const [requiredDocuments, setRequiredDocuments] = useState(null);
  const [cost, setCost] = useState(null);
  const [internalNotes, setInternalNotes] = useState([]);
  const [hours, setHours] = useState(null);
  const [recommendation, setRecommendation] = useState(0);
  const [image, setImage] = useState(null);

  const [resourceExists, setResourceExists] = useState(true);

  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [distFromResource, setDistFromResource] = useState(null);

  const [eligibility, setEligibility] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const [isSaved, setIsSaved] = useState(false);
  const [isWithinOperationHours, setIsWithinOperationHours] = useState(null);

  // componentDidMount
  useEffect(() => {
    async function loadResource() {
      const response = await getResourceByID(resourceId, true);

      if (response) {
        const { result } = response;

        setImage(
          result.image && result.image !== ''
            ? result.image
            : determineStockPhoto(result.category, result.subcategory),
        );

        setCategory(result.category.length > 0 && result.category[0]);
        setSubcategory(result.subcategory.length > 0 && result.subcategory[0]);

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
          result.hoursOfOperation &&
            result.hoursOfOperation.hoursOfOperation.length > 0
            ? result.hoursOfOperation.hoursOfOperation
            : null,
        );

        setLat(result.lat || 0);
        setLng(result.lng || 0);
      } else {
        setResourceExists(false);
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

  useEffect(() => {
    async function updateDistFromResource() {
      // inspired by haversine formula from stack overflow:
      // https://stackoverflow.com/questions/27928
      // /calculate-distance-between-two-latitude-
      // longitude-points-haversine-formula
      function deg2rad(deg) {
        return deg * (Math.PI / 180);
      }

      function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
        const R = 6371; // Radius of the earth in km
        const dLat = deg2rad(lat2 - lat1); // deg2rad below
        const dLon = deg2rad(lon2 - lon1);
        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(deg2rad(lat1)) *
            Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c; // Distance in km
        return d;
      }

      window.navigator.geolocation.getCurrentPosition(pos => {
        setDistFromResource(
          (
            getDistanceFromLatLonInKm(
              lat,
              lng,
              pos.coords.latitude,
              pos.coords.longitude,
            ) / 1.60924
          ).toFixed(1),
        );
      });
    }

    if (
      window.navigator.geolocation &&
      lat !== null &&
      lat !== 0 &&
      lng !== null &&
      lng !== 0
    ) {
      updateDistFromResource();
    }
  }, [lat, lng]);

  useEffect(() => {
    setIsWithinOperationHours(
      hours &&
        hours.map(entry => {
          const { day } = entry;
          const { period } = entry;
          let withinHours = false;

          if (period) {
            const givenDay = moment()
              .day(day)
              .day();
            const start = moment(period[0], 'h:mm a');
            const startHour = start.hour();
            const startMin = start.minute();
            const end = moment(period[1], 'h:mm a');
            const endHour = end.hour();
            const endMin = end.minute();
            const now = moment();
            const nowHour = now.hour();
            const nowMin = now.minute();
            const nowDay = now.day();

            if (nowDay === givenDay) {
              const inHour =
                Math.min(nowHour, startHour) === startHour &&
                Math.max(nowHour, endHour) === endHour;

              const inMin =
                Math.min(nowMin, startMin) === startMin &&
                Math.max(nowMin, endMin) === endMin;

              if (inHour) {
                if (nowHour === startHour || nowHour === endHour) {
                  withinHours =
                    (nowHour === startHour &&
                      Math.min(nowMin, startMin) === startMin) ||
                    (nowHour === endHour &&
                      Math.max(nowMin, endMin) === endMin);
                } else {
                  withinHours = true;
                }
              }
            }
          }

          return { day, withinHours };
        }),
    );
  }, [hours]);

  if (!resourceExists) {
    return <Redirect to="/resources/unknown" />;
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
      </Carousel>
      <div className="mb-rd-block-container">
        <div className="mb-rd-block-1">
          <ResourcesBreadcrumb
            categorySelected={category}
            subcategorySelected={subcategory}
            resourceSelected={name}
          />
          <Row className="mb-rd-header-bar" type="flex">
            <Col>
              <h2 className="mb-rd-header-text">{name}</h2>
            </Col>
            <Col>
              <SaveButton
                className="mb-rd-save-btn"
                type="heart"
                fontSize="2em"
                authed={authed}
                isSaved={isSaved}
                deleteResourceHandler={deleteResourceHandler}
                saveResourceHandler={saveResourceHandler}
              />
            </Col>
          </Row>
          <Row>
            <Rate className="mb-rd-rate" disabled value={recommendation} />
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
            content={[].concat(
              phone && phone.length > 0
                ? phone.map(
                    entry =>
                      `${entry.phoneType.charAt(0).toUpperCase() +
                        entry.phoneType.slice(1)}: ${entry.phoneNumber}`,
                  )
                : ['No phone number provided.'],
              [
                email || 'No email provided.',
                <a href={website}>{website || 'No website provided.'}</a>,
              ],
            )}
          />
          <InfoBlock
            title="Languages Spoken"
            icon={<Icon className="mb-rd-icon" type="wechat" theme="filled" />}
            content={[
              languages && languages.length > 0
                ? languages.join(', ')
                : 'None.',
            ]}
          />
          <InfoBlock
            title="Cost"
            icon={
              <Icon
                className="mb-rd-icon"
                type="dollar-circle"
                theme="filled"
              />
            }
            content={[cost || 'None provided.']}
          />
          <InfoBlock
            title="Required Documents"
            icon={
              <Icon className="mb-rd-icon" type="folder-open" theme="filled" />
            }
            content={[requiredDocuments || 'None.']}
          />
        </div>
        <div className="mb-rd-block-2">
          <Row className="mb-rd-block-title">Location</Row>
          <Row className="mb-rd-location-info mb-rd-thin-text">
            <Row>{address}</Row>
            {addressLine2 && <Row>{addressLine2}</Row>}
            <Row type="flex" justify="space-between">
              <Col>{`${city}${state && `, ${state}`}`}</Col>
              <Col>{distFromResource && `${distFromResource} mi`}</Col>
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
                    hours && hours.filter(entry => entry.day === day)[0].period
                  }
                  isWithinOperationHours={
                    isWithinOperationHours &&
                    isWithinOperationHours.filter(entry => entry.day === day)[0]
                      .withinHours
                  }
                />
              ))}
            </Timeline>
          </Row>
        </div>
      </div>
    </div>
  );
};

type ScheduleEntryProps = {
  className: String,
  day: String,
  period: [String],
  isWithinOperationHours: Boolean,
};
const ScheduleEntry = (props: ScheduleEntryProps) => {
  const { className, day, period, isWithinOperationHours } = props;

  const startTime = period && period[0];
  const endTime = period && period[1];

  return (
    <Timeline.Item
      color="rgb(136, 216, 208)"
      dot={<div className="mb-rd-schedule-dot" />}
    >
      <Row className="md-rd-schedule-entry">
        <Row className="mb-rd-schedule-entry-title">{day}</Row>
        <Row className="mb-rd-schedule-text">
          {startTime && endTime ? `${startTime} - ${endTime}` : 'None'}
        </Row>
        {isWithinOperationHours && (
          <Row className="mb-rd-schedule-open-now">Open now!</Row>
        )}
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

  console.log(content);
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

export default ResourceDetailMobile;
