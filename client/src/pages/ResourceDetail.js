import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Card, Col, Icon, message, Modal, Row } from 'antd';
import PropTypes from 'prop-types';
import '../css/ResourceDetail.css';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';

import { deleteResource, getResourceByID } from '../utils/api';
import ResourcesBreadcrumb from '../components/ResourcesBreadcrumb';

const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

async function addressToLatLong(address) {
  const apiLatLong = `${'http://www.mapquestapi.com/geocoding/v1/address?' +
    'key=QhpXMYz3yy5F0Yg5qZSqGmA2XFMIMRAi&maxResults=5&' +
    'outFormat=json&location='}${address}&boundingBox=40.121581,-88.253981,40.098315,-88.205082`;

  const response = await fetch(apiLatLong, {});
  const responseJson = await response.json();

  const { lat } = responseJson.results[0].locations[0].latLng;
  const { lng } = responseJson.results[0].locations[0].latLng;

  return [lat, lng];
}

export default class ResourceDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: 'Resource Name',
      phone: [],
      email: '',
      address: '',
      website: '',
      description: '',
      hours: ['', '', '', '', '', '', ''],
      city: '',
      languages: [],
      requiredDocuments: [],
      cost: '',
      category: '',
      subcategory: '',
      resourceExists: true,
      lat: 0.0,
      long: 0.0,
      eligibility: '',
      modalVisible: false,
    };
  }

  async componentDidMount() {
    const response = await getResourceByID(this.props.match.params.id);

    if (response !== null) {
      const { result } = response;

      const coords = await addressToLatLong('New York, USA');

      this.setState({
        name: result.name,
        phone: result.phoneNumbers,
        description: result.description,
        languages: result.availableLanguages,
        category: result.category[0],
        subcategory: result.subcategory[0],
        cost: result.cost,
        lat: coords[0],
        long: coords[1],
        email: result.email,
        website: result.website || '',
        eligibility: result.eligibilityRequirements,
      });
    } else {
      // redirect to resource unknown page
      this.setState({ resourceExists: false });
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
      email,
      address,
      website,
      description,
      hours,
      city,
      languages,
      requiredDocuments,
      cost,
      category,
      subcategory,
      resourceExists,
      lat,
      long,
      eligibility,
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
        <Row
          className="banner"
          type="flex"
          justify="center"
          align="middle"
          gutter={[16, 16]}
        />
        <Row>
          <ResourcesBreadcrumb
            categorySelected={category}
            subcategorySelected={subcategory}
            resourceSelected={name}
          />
        </Row>
        <Row>
          <Col span={15}>
            <span className="resource-name">{name}</span>
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
          <Col span={9}>
            {website.length > 0 ? (
              <a
                href={website}
                target="_blank"
                rel="noopener noreferrer"
              >{`${website}`}</a>
            ) : (
              'No website provided.'
            )}
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            {description.length > 0 ? description : 'No description provided.'}
            {eligibility && `\n\nEligibility Requirements: ${eligibility}`}
          </Col>
        </Row>
        <Row className="section">
          <Col span={4} className="section-label">
            Basic Information
          </Col>
          <Col span={20}>
            <Row className="card-row">
              <Col span={12}>
                <Card>
                  <Icon type="phone" theme="filled" />
                  <div className="card-label">Contact Information{'\n'}</div>
                  {phone.length > 0 ||
                  (email && email.length > 0) ||
                  (website && website.length > 0) ? (
                    <>
                      {phone.length > 0 &&
                        phone.map(p => {
                          return `${p.phoneType}: ${p.phoneNumber}\n`;
                        })}
                      {email.length > 0 && `${email}\n`}
                      {website.length > 0 && (
                        <a
                          href={website}
                          target="_blank"
                          rel="noopener noreferrer"
                        >{`${website}\n`}</a>
                      )}
                    </>
                  ) : (
                    'None provided.'
                  )}
                </Card>
              </Col>
              <Col span={12}>
                <Card>
                  <Icon type="wechat" theme="filled" />
                  <div className="card-label">Languages Spoken{'\n'}</div>
                  {languages.length > 0
                    ? languages.map(language => {
                        return language;
                      })
                    : 'None provided.'}
                </Card>
              </Col>
            </Row>
            <Row className="card-row">
              <Col span={12}>
                <Card>
                  <Icon type="folder-open" theme="filled" />
                  <div className="card-label">Required Documents {'\n'}</div>
                  {requiredDocuments.length > 0
                    ? requiredDocuments.map(doc => {
                        return doc;
                      })
                    : 'None provided.'}
                </Card>
              </Col>
              <Col span={12}>
                <Card>
                  <Icon type="dollar-circle" theme="filled" />
                  <div className="card-label">Cost{'\n'}</div>
                  {cost.length > 0 ? cost : 'None provided.'}
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col span={4} className="section-label">
            Schedule
          </Col>
          <Col span={20}>
            <Row className="cardRow">
              {hours.map((day, i) => {
                return (
                  <Col key={day} span={8}>
                    <Card>
                      <div className="card-label day-label">
                        {`${days[i]}\n`}
                      </div>
                      {day.length > 0 ? day : 'None'}
                    </Card>
                  </Col>
                );
              })}
            </Row>
          </Col>
        </Row>
        <Row className="section">
          <Col span={4} className="section-label">
            Location
          </Col>
          <Col span={20}>
            <Row className="cardRow">
              <Map
                style="mapbox://styles/mapbox/streets-v9"
                containerStyle={{
                  height: '450px',
                  width: '675px',
                }}
              >
                <Layer
                  type="symbol"
                  id="marker"
                  layout={{ 'icon-image': 'marker-15' }}
                >
                  <Feature coordinates={[lat, long]} />
                </Layer>
              </Map>
            </Row>
          </Col>
        </Row>
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
