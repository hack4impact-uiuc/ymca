import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Card, Col, Icon, message, Modal, Row, Layout } from 'antd';
import PropTypes from 'prop-types';
import '../css/ResourceDetail.css';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';

import { deleteResource, getResourceByID } from '../utils/api';
import {
  saveResource,
  deleteSavedResource,
  getSavedResources,
} from '../utils/auth';
import ResourcesBreadcrumb from '../components/ResourcesBreadcrumb';
import SaveButton from '../components/SaveButton';

const { Header } = Layout;

export default class ResourceDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: 'Resource Name',
      phone: [],
      address: '',
      email: '',
      website: '',
      description: '',
      languages: [],
      requiredDocuments: [],
      cost: '',
      category: '',
      subcategory: '',
      resourceExists: true,
      lat: 0.0,
      lng: 0.0,
      eligibility: '',
      modalVisible: false,
      internalNotes: [],
      hours: [],
      isSaved: false,
    };
  }

  async componentDidMount() {
    const response = await getResourceByID(this.props.match.params.id, true);

    if (response !== null) {
      const { result } = response;

      this.setState({
        name: result.name,
        phone: result.phoneNumbers,
        address: result.address || '',
        addressLine2: result.addressLine2 || '',
        aptUnitSuite: result.aptUnitSuite || '',
        city: result.city || '',
        state: result.state || '',
        zip: result.zip || '',
        description: result.description,
        languages: result.availableLanguages,
        category: result.category[0],
        subcategory: result.subcategory[0],
        cost: result.cost,
        lat: Number.isNaN(result.lat) || result.lat == null ? 0.0 : result.lat,
        lng: Number.isNaN(result.lng) || result.lng == null ? 0.0 : result.lng,
        email: result.email,
        website: result.website || '',
        eligibility: result.eligibilityRequirements,
        internalNotes: result.internalNotes,
        hours: result.hoursOfOperation
          ? result.hoursOfOperation.hoursOfOperation
          : [],
      });
    } else {
      // redirect to resource unknown page
      this.setState({ resourceExists: false });
    }
  }

  async componentDidUpdate(prevProps) {
    if (this.props.authed && prevProps.authed === null) {
      let savedSet = new Set();
      const json = await getSavedResources();
      savedSet = new Set(json.result);
      this.updateIsSaved(savedSet);
    }
  }

  showModal = () => {
    this.setState({
      modalVisible: true,
    });
  };

  handleCancel = () => {
    this.setState({
      modalVisible: false,
    });
  };

  displayNote = note => {
    if (note.body.length > 0) {
      if (note.subject.length > 0)
        return <li>{`${note.subject}: ${note.body}`}</li>;
      return <li>{note.body}</li>;
    }
    return null;
  };

  saveResourceHandler = async () => {
    await saveResource(this.props.match.params.id);
  };

  deleteResourceHandler = async () => {
    await deleteSavedResource(this.props.match.params.id);
  };

  updateIsSaved(savedSet) {
    this.setState({
      isSaved: !!savedSet.has(this.props.match.params.id),
    });
  }

  async deleteResource(id) {
    const deletedResource = await deleteResource(id);
    if (deletedResource) {
      message.success('Resource successfully deleted!');
    } else {
      message.error(`Resource failed to be deleted.`);
      return;
    }
    this.props.history.push('/resources');
  }

  render() {
    const {
      name,
      phone,
      address,
      addressLine2,
      city,
      state,
      zip,
      email,
      website,
      description,
      languages,
      requiredDocuments,
      cost,
      category,
      subcategory,
      resourceExists,
      lat,
      lng,
      eligibility,
      internalNotes,
      hours,
      isSaved,
    } = this.state;

    const Map = ReactMapboxGl({
      accessToken:
        'pk.eyJ1IjoiYW5vb2psYWwiLCJhIjoiY2syemtiYjZoMGp1' +
        'eDNscXQ3azJzajl0bCJ9.FDSFjP1IfSisbm4uvd70vg',
      interactive: true,
    });

    const { authed, match, authRoleIsEquivalentTo } = this.props;

    if (!resourceExists) {
      return <Redirect to="/resources/unknown" />;
    }

    let addressString = 'No address provided.'
    if (address.length > 0) {
      addressString = address;
      if (addressLine2.length > 0) {
        addressString += `, ${addressLine2}`
      }
      if (city.length > 0) {
        addressString += `, ${city}`
      }
      if (state.length > 0) {
        addressString += `, ${state}`
      }
      if (zip.length > 0) {
        addressString += ` ${zip}`
      }
    }

    return (
      <div className="resource-detail">
        <Modal
          title="Confirm Delete"
          visible={this.state.modalVisible}
          onOk={() => this.deleteResource(match.params.id)}
          onCancel={this.handleCancel}
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
            <span className="resource-name">{name}</span>
            <SaveButton
              authed={authed}
              isSaved={isSaved}
              deleteResourceHandler={this.deleteResourceHandler}
              saveResourceHandler={this.saveResourceHandler}
            />

            {authed && authRoleIsEquivalentTo('admin') && (
              <span className="resource-edit-delete">
                <Button href={`/admin/${match.params.id}`}>Edit</Button>
                <span className="resource-delete">
                  <Button type="danger" ghost="true" onClick={this.showModal}>
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
          <Col span={12}>
            {addressString}
          </Col>
          <Col span={12}>{/* Open now! */}</Col>
        </Row>
        <Row className="section card-row">
          <Col span={12}>
            <Map
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
                  ? internalNotes.map(note => this.displayNote(note))
                  : 'No internal notes provided'}
              </Row>
            </Col>
          </Row>
        )}
      </div>
    );
  }
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
