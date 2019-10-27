import React, { Component } from 'react';
import '../css/ResourceDetail.css';
import { Col, Container, Row } from 'reactstrap';

export default class ResourceDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: 'Resource Name',
      phone: '0000000000',
      email: 'email@address.com',
      address: '123 Street Name',
      website: 'website.com',
      description: 'This is a description of the resource.',
      hours: [
        {
          start: '09:00',
          end: '17:00',
        },
        {
          start: '09:00',
          end: '17:00',
        },
        {
          start: '09:00',
          end: '17:00',
        },
        {
          start: '09:00',
          end: '17:00',
        },
        {
          start: '09:00',
          end: '17:00',
        },
      ],
      city: 'City Name',
      //   county: 'County Name',
      //   requiredDocs: [
      //     'Required Form 1',
      //     'Required Form 2',
      //     'Required Form 3',
      //     'Required Form 4',
      //   ],
      //   cost: 1.23,
      //   languages: ['Language 1', 'Language 2'],
    };
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
      //   county,
      //   requiredDocs,
      //   cost,
      //   languages,
    } = this.state;

    return (
      <div className="ResourceDetail">
        <Container>
          <Row>
            <Col className="resourceName">{name}</Col>
          </Row>
          <Row>
            <Col>{description}</Col>
            <Col>
              {hours.map((day, index) => {
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
              })}
            </Col>
          </Row>
          <Row>
            <Col>
              {'Contact\n'}
              {`${phone}\n`}
              {`Email: ${email}\n`}
              {`Website: ${website}\n`}
            </Col>
            <Col>{`Map showing ${address}, ${city}\n`}</Col>
          </Row>
        </Container>
      </div>
    );
  }
}
