import React, { Component } from 'react';
import '../css/ResourceDetail.css';
import { Row, Col, Card, Icon } from 'antd';
import PropTypes from 'prop-types';
import { getResourceByID } from '../utils/api';

export default class ResourceDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: 'Resource Name',
      phone: [],
      email: '',
      address: '123 Street Name',
      website: '',
      description: '',
      hours: [],
      city: 'City',
      languages: [],
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
    } = this.state;

    return (
      <div className="ResourceDetail">
        <Row>
          <Col span={15}>
            <div className="resourceName">{name}</div>
          </Col>
          <Col span={9}>
            {address.length > 0 || city.length > 0
              ? address + '\n' + city
              : 'No address provided.'}
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            {description.length > 0
              ? description
              : 'No description provided.'}
          </Col>
        </Row>
        <Row className="basicInfo">
            <Col span={4} className="sectionLabel">
              Basic Information
            </Col>
            <Col span={20}>
              <Row className="cardRow">
                <Col span={12}>
                  <Card>
                    <Icon type="phone" theme="filled" />
                    <div className="cardLabel">Contact Information{"\n"}</div>
                    {(phone.length > 0 || email.length > 0 || website.length > 0) 
                      ? 
                        <div>
                          {phone.length > 0 && phone.map(num => {
                            return num + "\n";
                          })}
                          {email.length > 0 && email + "\n"}
                          {website.length > 0 && website + "\n"}
                        </div>
                      : "None provided."
                    }
                  </Card>
                </Col>
                <Col span={12}>
                  <Card>

                  </Card>
                </Col>
              </Row>
              <Row className="cardRow">
                <Col span={12}>
                  <Card>

                  </Card>
                </Col>
                <Col span={12}>
                  <Card>

                  </Card>
                </Col>
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
