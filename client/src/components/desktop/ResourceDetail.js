import React, { useCallback, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Col, Icon, message, Modal, Row, Layout } from 'antd';
import PropTypes from 'prop-types';
import '../../css/ResourceDetail.css';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import * as moment from 'moment';

import { deleteResource, getResourceByID } from '../../utils/api';
import {
  saveResource,
  deleteSavedResource,
  getSavedResources,
} from '../../utils/auth';
import ResourcesBreadcrumb from '../ResourcesBreadcrumb';
import SaveButton from '../SaveButton';

const { Header } = Layout;

function ResourceDetail(props) {
  const [name, setName] = useState('Resource Name');
  const [phone, setPhone] = useState([]);
  const [address, setAddress] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [aptUnitSuite, setAptUnitSuite] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [description, setDescription] = useState('');
  const [languages, setLanguages] = useState([]);
  const [requiredDocuments, setRequiredDocuments] = useState([]);
  const [cost, setCost] = useState('');
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [resourceExists, setResourceExists] = useState(true);
  const [lat, setLat] = useState(0.0);
  const [lng, setLng] = useState(0.0);
  const [eligibility, setEligibility] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [internalNotes, setInternalNotes] = useState([]);
  const [hours, setHours] = useState([]);
  const [isSaved, setIsSaved] = useState(false);
  const [recommendation, setRecommendation] = useState(0);
  const [addressString, setAddresString] = useState('');

  const updateIsSaved = useCallback(
    savedSet => {
      setIsSaved(!!savedSet.has(props.match.params.id));
    },
    [props.match.params.id],
  );

  useEffect(() => {
    async function didMount() {
      const response = await getResourceByID(props.match.params.id, true);
      if (response !== null) {
        const { result } = response;
        setName(result.name);
        setPhone(result.phoneNumbers);
        setAddress(result.address || '');
        setAddressLine2(result.addressLine2 || '');
        setAptUnitSuite(result.aptUnitSuite || '');
        setCity(result.city || '');
        setState(result.state || '');
        setZip(result.zip || '');
        setDescription(result.description);
        setLanguages(result.availableLanguages);
        setCategory(result.category[0]);
        setSubcategory(result.subcategory[0]);
        setCost(result.cost);
        setLat(
          Number.isNaN(result.lat) || result.lat == null ? 0.0 : result.lat,
        );
        setLng(
          Number.isNaN(result.lng) || result.lng == null ? 0.0 : result.lng,
        );
        setEmail(result.email);
        setWebsite(result.website || '');
        setEligibility(result.eligibilityRequirements);
        setInternalNotes(result.internalNotes);
        setHours(
          result.hoursOfOperation
            ? result.hoursOfOperation.hoursOfOperation
            : [],
        );
        setRecommendation(result.recommendation ? result.recommendation : 0);

        if (props.authed) {
          let savedSet = new Set();
          const json = await getSavedResources();
          savedSet = new Set(json.result);
          updateIsSaved(savedSet);
        }
      } else {
        // redirect to resource unknown page
        setResourceExists(false);
      }
    }
    didMount();
  }, [props.authed, props.match.params.id, updateIsSaved]);

  useEffect(() => {
    async function didUpdate() {
      if (props.authed) {
        let savedSet = new Set();
        const json = await getSavedResources();
        savedSet = new Set(json.result);
        updateIsSaved(savedSet);
      }
    }
    didUpdate();
  }, [props.authed, updateIsSaved]);

  useEffect(() => {
    let adr = 'No address provided.';
    if (address.length > 0) {
      adr = address;
      if (addressLine2.length > 0) {
        adr += `, ${addressLine2}`;
      }
      if (aptUnitSuite.length > 0) {
        adr += ` ${aptUnitSuite}`;
      }
      if (city.length > 0) {
        adr += `, ${city}`;
      }
      if (state.length > 0) {
        adr += `, ${state}`;
      }
      if (zip.length > 0) {
        adr += ` ${zip}`;
      }
    }
    setAddresString(adr);
  }, [address, addressLine2, aptUnitSuite, city, state, zip]);

  const showModal = () => {
    setModalVisible(true);
  };

  const isOpen = hrs => {
    if (hrs === null || hrs.length === 0) {
      return false;
    }

    const format = 'hh:mm a';
    const currentTime = moment();
    let dayIndex = new Date().getDay() - 1;

    if (dayIndex < 0) {
      dayIndex += 7;
    }

    const currentDay = hrs[dayIndex];
    const open = moment(currentDay.period[0], format);
    const close = moment(currentDay.period[1], format);

    return currentTime.isBetween(open, close);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const displayNote = note => {
    if (note.body.length > 0) {
      if (note.subject.length > 0)
        return <li>{`${note.subject}: ${note.body}`}</li>;
      return <li>{note.body}</li>;
    }
    return null;
  };

  const saveResourceHandler = async () => {
    const result = await saveResource(props.match.params.id);
    if (result != null && result.code === 200) {
      setIsSaved(true);
    }
  };

  const deleteSavedResourceHandler = async () => {
    const result = await deleteSavedResource(props.match.params.id);
    if (result != null && result.code === 200) {
      setIsSaved(false);
    }
  };

  const deleteResourceHandler = async id => {
    const deletedResource = await deleteResource(id);
    if (deletedResource) {
      message.success('Resource successfully deleted!');
    } else {
      message.error(`Resource failed to be deleted.`);
      return;
    }
    props.history.push('/resources');
  };

  const Map = ReactMapboxGl({
    accessToken:
      'pk.eyJ1IjoiYW5vb2psYWwiLCJhIjoiY2syemtiYjZoMGp1' +
      'eDNscXQ3azJzajl0bCJ9.FDSFjP1IfSisbm4uvd70vg',
    interactive: true,
  });

  const { authed, match, authRoleIsEquivalentTo } = props;

  if (!resourceExists) {
    return <Redirect to="/resources/unknown" />;
  }

  const stars = [];
  if (recommendation !== null) {
    for (let i = 0; i < recommendation; i += 1) {
      stars.push(<Icon type="star" theme="filled" className="filled-star" />);
    }

    for (let i = 0; i < 5 - recommendation; i += 1) {
      stars.push(<Icon type="star" theme="filled" className="unfilled-star" />);
    }
  }

  return (
    <div className="resource-detail">
      <Modal
        title="Confirm Delete"
        visible={modalVisible}
        onOk={() => deleteResourceHandler(match.params.id)}
        onCancel={handleCancel}
      >
        Are you sure you want to delete this resource? Warning: this cannot be
        undone.
      </Modal>
      <Header className="banner" type="flex" justify="center">
        <Row style={{ paddingTop: '2%' }}>
          <ResourcesBreadcrumb
            categorySelected={category}
            subcategorySelected={subcategory}
            resourceSelected={name}
          />
        </Row>
      </Header>
      <Row className="section">
        <Col span={15}>
          <span className="resource-name">{`${name}\n`}</span>
          {recommendation !== null && stars}
          <SaveButton
            authed={authed}
            isSaved={isSaved}
            deleteResourceHandler={deleteSavedResourceHandler}
            saveResourceHandler={saveResourceHandler}
          />

          {authed && authRoleIsEquivalentTo('admin') && (
            <span className="resource-edit-delete">
              <Button href={`/admin/${match.params.id}`}>Edit</Button>
              <span className="resource-delete">
                <Button type="danger" ghost="true" onClick={showModal}>
                  Delete
                </Button>
              </span>
            </span>
          )}
        </Col>
        <Col span={9} className="header-info">
          <Icon type="global" theme="outlined" />
          {website.length > 0 ? (
            <a href={website} target="_blank" rel="noopener noreferrer">
              {`${website}`}
              {'\n'}
            </a>
          ) : (
            'No website provided.\n'
          )}
          <Icon type="phone" theme="filled" />
          {phone.length > 0
            ? phone.map(p => {
                return `${p.phoneType}: ${p.phoneNumber}\n`;
              })
            : 'No phone number provided.\n'}
          <Icon type="environment" theme="outlined" />
          {addressString}
        </Col>
      </Row>
      <Row className="section card-row">
        <Col span={24}>
          {description.length > 0 ? description : 'No description provided.'}
          {eligibility && `\n\nEligibility Requirements: ${eligibility}`}
        </Col>
      </Row>
      <Row>
        <Col span={24} className="section-label card-row">
          Basic Information
        </Col>
      </Row>
      <Row className="card-row">
        <Col span={1}>
          <Icon type="folder-open" theme="filled" />
        </Col>
        <Col span={11}>
          <div className="card-label">Required Documents {'\n'}</div>
          {requiredDocuments.length > 0
            ? requiredDocuments.map(doc => {
                return doc;
              })
            : 'None provided.'}
        </Col>
        <Col span={1}>
          <Icon type="dollar-circle" theme="filled" />
        </Col>
        <Col span={11}>
          <div className="card-label">Cost{'\n'}</div>
          {cost != null ? cost : 'None provided.'}
        </Col>
      </Row>
      <Row className="card-row">
        <Col span={1}>
          <Icon type="wechat" theme="filled" />
        </Col>
        <Col span={11}>
          <div className="card-label">Languages Spoken{'\n'}</div>
          {languages.length > 0
            ? languages.map(language => {
                return language;
              })
            : 'None provided.'}
        </Col>
      </Row>
      <Row className="section">
        <Col span={24} className="section-label card-row">
          Location and Hours
        </Col>
      </Row>
      <Row className="section card-row">
        <Col span={12}>{addressString}</Col>
        <Col span={12} className="open-now">
          {isOpen(hours) && 'Open now!'}
        </Col>
      </Row>
      <Row className="section card-row">
        <Col span={12}>
          <Map
            // eslint-disable-next-line
            style="mapbox://styles/mapbox/light-v9"
            center={[lng, lat]}
            containerStyle={{
              height: '350px',
              width: '400px',
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
        </Col>
        <Col span={12}>
          {hours.length > 0
            ? hours.map(day => {
                return (
                  <div>
                    <span className="day-of-week">{`${day.day}: `}</span>
                    {day.period.length > 0
                      ? `${day.period[0]} - ${day.period[1]}`
                      : 'None'}
                  </div>
                );
              })
            : 'No schedule provided'}
        </Col>
      </Row>
      {authRoleIsEquivalentTo('admin') && (
        <Row>
          <Col span={4} className="section-label">
            Internal Notes
          </Col>
          <Col span={20}>
            <Row className="cardRow">
              {internalNotes.length > 0
                ? internalNotes.map(note => displayNote(note))
                : 'No internal notes provided'}
            </Row>
          </Col>
        </Row>
      )}
    </div>
  );
}

ResourceDetail.defaultProps = {
  match: null,
  history: null,
};

ResourceDetail.propTypes = {
  authed: PropTypes.bool.isRequired,
  authRoleIsEquivalentTo: PropTypes.func.isRequired,
  history: PropTypes.element,
  match: PropTypes.shape({
    params: PropTypes.shape({ id: PropTypes.string }),
  }),
};

export default ResourceDetail;
