import React, { Component } from 'react';
import '../css/ResourceDetail.css';
import { Container, Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';
import { getResourceByID } from '../utils/api';

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
      hours: [],
      city: '',
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
      <div>
        <div className="ResourceDetail">
          <Container>
            <Row>
              <Col className="resourceName">{name}</Col>
            </Row>
            <Row>
              <Col>
                {description.length > 0
                  ? description
                  : 'No description provided.\n'}
              </Col>
              <Col>
                {hours.length > 0
                  ? hours.map((day, index) => {
                      let dayOfWeek = '';

                      switch (index) {
                        case 0:
                          dayOfWeek = 'Monday';
                          break;
                        case 1:
                          dayOfWeek = 'Tuesday';
                          break;
                        case 2:
                          dayOfWeek = 'Wednesday';
                          break;
                        case 3:
                          dayOfWeek = 'Thursday';
                          break;
                        case 4:
                          dayOfWeek = 'Friday';
                          break;
                        case 5:
                          dayOfWeek = 'Saturday';
                          break;
                        case 6:
                          dayOfWeek = 'Sunday';
                          break;
                        default:
                          dayOfWeek = 'ERROR';
                          break;
                      }

                      return `${dayOfWeek}: ${day.start} - ${day.end}\n`;
                    })
                  : 'No hours of operation available.\n'}
              </Col>
            </Row>
            <Row>
              <Col>
                {'Contact:\n'}
                {phone.length > 0
                  ? phone.map(num => {
                      return `${num}\n`;
                    })
                  : 'No phone numbers.\n'}
                {'Email: '}
                {email.length > 0 ? email : 'No email provided.\n'}
                {'Website: '}
                {website.length > 0 ? website : 'No website provided.\n'}
              </Col>
              <Col>
                {address.length > 0 || city.length > 0
                  ? `Map showing ${address}, ${city}\n`
                  : 'No address provided.\n'}
              </Col>
            </Row>
            <Row>
              <Col>
                {'Languages:\n'}
                {languages.length > 0
                  ? languages.map(language => {
                      return `${language}\n`;
                    })
                  : 'No languages listed.\n'}
              </Col>
            </Row>
          </Container>
        </div>
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
