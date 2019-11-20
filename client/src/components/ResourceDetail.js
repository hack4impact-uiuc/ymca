import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Card, Col, Icon, Row } from 'antd';
import PropTypes from 'prop-types';
import '../css/ResourceDetail.css';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';

import { getResourceByID } from '../utils/api';

import ResourcesBreadcrumb from './ResourcesBreadcrumb';

const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

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
    };
  }

  async componentDidMount() {
    const response = await getResourceByID(this.props.match.params.id);

    if (response !== null) {
      const { result } = response;

      this.setState({
        name: result.name,
        phone: result.phoneNumbers,
        description: result.description,
        languages: result.availableLanguages,
        category: result.category,
        subcategory: result.subcategory,
      });
    } else {
      // redirect to resource unknown page
      this.setState({ resourceExists: false });
    }
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
    } = this.state;

    const Map = ReactMapboxGl({
      accessToken:
        'pk.eyJ1IjoiYW5vb2psYWwiLCJhIjoiY2syemtiYjZoMGp1eDNscXQ3azJzajl0bCJ9.FDSFjP1IfSisbm4uvd70vg',
      interactive: false
    })

    if (!resourceExists) {
      return <Redirect to="/resources/unknown" />;
    }

    return (
      <div className="resource-detail">
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
            <div className="resource-name">{name}</div>
          </Col>
          <Col span={9}>
            {address.length > 0 || city.length > 0 ? (
              <>
                {address.length > 0 && `${address}\n`}
                {city.length > 0 && `${city}\n`}
              </>
            ) : (
              'No address provided.'
            )}
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            {description.length > 0 ? description : 'No description provided.'}
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
                  email.length > 0 ||
                  website.length > 0 ? (
                    <>
                      {phone.length > 0 &&
                        phone.map(num => {
                          return `${num}\n`;
                        })}
                      {email.length > 0 && `${email}\n`}
                      {website.length > 0 && `${website}\n`}
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
                  <Col span={8}>
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
                  height: '900px',
                  width: '900px'
                }}
              >
                <Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}>
                  <Feature coordinates={[-0.481747846041145, 51.3233379650232]} />
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
};

ResourceDetail.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({ id: PropTypes.string }),
  }),
};
