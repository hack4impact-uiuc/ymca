import React, { Component } from 'react';
import '../css/ResourceDetail.css';
import { Row, Col, Card, Icon } from 'antd';
import PropTypes from 'prop-types';
import { getResourceByID } from '../utils/api';
import ResourceBreadcrumb from './ResourceBreadcrumb';

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

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
      hours: ["", "", "", "", "", "", ""],
      city: '',
      languages: [],
      requiredDocuments: [],
      cost: '',
      category: '',
      subcategory: ''
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
        subcategory: result.subcategory
      });
    } else {
      // redirect to 404
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
      subcategory
    } = this.state;

    return (
      <div className="ResourceDetail">
        {category.length > 0 && subcategory.length > 0
        && <Row>
          <ResourceBreadcrumb categorySelected={category} subcategorySelected={subcategory} resource={name}/>
        </Row>}
        <Row>
          <Col span={15}>
            <div className="resourceName">{name}</div>
          </Col>
          <Col span={9}>
            {address.length > 0 || city.length > 0 ? (
              <div>
                {address.length > 0 && `${address}\n`}
                {city.length > 0 && `${city}\n`}
              </div>
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
          <Col span={4} className="sectionLabel">
            Basic Information
          </Col>
          <Col span={20}>
            <Row className="cardRow">
              <Col span={12}>
                <Card>
                  <Icon type="phone" theme="filled" />
                  <div className="cardLabel">Contact Information{'\n'}</div>
                  {phone.length > 0 ||
                  email.length > 0 ||
                  website.length > 0 ? (
                    <div>
                      {phone.length > 0 &&
                        phone.map(num => {
                          return `${num}\n`;
                        })}
                      {email.length > 0 && `${email}\n`}
                      {website.length > 0 && `${website}\n`}
                    </div>
                  ) : (
                    'None provided.'
                  )}
                </Card>
              </Col>
              <Col span={12}>
                <Card>
                  <Icon type="wechat" theme="filled" />
                  <div className="cardLabel">Languages Spoken{'\n'}</div>
                  {languages.length > 0
                    ? languages.map(language => {
                        return language;
                      })
                    : 'None provided.'}
                </Card>
              </Col>
            </Row>
            <Row className="cardRow">
              <Col span={12}>
                <Card>
                  <Icon type="folder-open" theme="filled" />
                  <div className="cardLabel">Required Documents {'\n'}</div>
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
                  <div className="cardLabel">Cost{'\n'}</div>
                  {cost.length > 0 ? cost : 'None provided.'}
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col span={4} className="sectionLabel">
            Schedule
          </Col>
          <Col span={20}>
            <Row className="cardRow">
              {hours.map((day, i) => {
                return (
                  <Col span={8}>
                    <Card>
                      <div className="cardLabel dayLabel">{days[i] + '\n'}</div>
                      {day.length > 0 ? day : "None"}
                    </Card>
                  </Col>
                )
              })}
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
