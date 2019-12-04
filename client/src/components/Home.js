import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Textfit } from 'react-textfit';
import { Button, Carousel, Col, Row } from 'antd';

import '../css/Home.css';
import HomeBlock2Desktop from './desktop/HomeDesktop';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      testimonials: [
        {
          person: 'Kendalyn Hesterson',
          picture:
            'https://media.licdn.com/dms/image/C5603AQE4fiq2wYLN4w/' +
            'profile-displayphoto-shrink_200_200/0?e=1575504000&v=beta&' +
            't=ENWJca_rj3uyCKSjckj0IkVQj-Z__6hCr9-rSIDvQOc',
          country: 'Switzerland',
          testimonial: `Lorem ipsum dolor amet mustache knausgaard +1, 
                  blue bottle waistcoat tbh semiotics artisan synth stumptown 
                  gastropub cornhole celiac swag. Brunch raclette vexillologist 
                  post-ironic glossier ennui XOXO mlkshk godard pour-over blog 
                  tumblr humblebrag. Blue bottle put a bird on it twee prism 
                  biodiesel brooklyn. Blue bottle ennui tbh succulents.`,
        },
        {
          person: 'Neeraj Aggarwal',
          picture:
            'https://media.licdn.com/dms/image/C5603AQEvEZTMzhTq4w/' +
            'profile-displayphoto-shrink_800_800/0?e=1577923200&v=beta&' +
            't=kkhlkYaFc_v6QEnSaWYfPFXOGHVU8qARMo60j6lXMB8',
          country: 'France',
          testimonial: `Lorem ipsum dolor amet mustache knausgaard +1, 
                  blue bottle waistcoat tbh semiotics artisan synth stumptown 
                  gastropub cornhole celiac swag. Brunch raclette vexillologist 
                  post-ironic glossier ennui XOXO mlkshk godard pour-over blog 
                  tumblr humblebrag. Blue bottle put a bird on it twee prism 
                  biodiesel brooklyn. Blue bottle ennui tbh succulents.`,
        },
        {
          person: 'Annie Gu',
          picture:
            'https://media.licdn.com/dms/image/C5603AQHtN2qYAwV4pw/' +
            'profile-displayphoto-shrink_800_800/0?e=1577923200&v=beta&' +
            't=tGzGaXGBwFs5BHiOg11JkTCpMl5lgzmYiIGwApypizM',
          country: 'Turkey',
          testimonial: `Lorem ipsum dolor amet mustache knausgaard +1, 
                  blue bottle waistcoat tbh semiotics artisan synth stumptown 
                  gastropub cornhole celiac swag. Brunch raclette vexillologist 
                  post-ironic glossier ennui XOXO mlkshk godard pour-over blog 
                  tumblr humblebrag. Blue bottle put a bird on it twee prism 
                  biodiesel brooklyn. Blue bottle ennui tbh succulents.`,
        },
      ],
    };
  }

  render() {
    return (
      <>
        <Row
          className="home-block-1"
          type="flex"
          justify="center"
          align="middle"
          gutter={[16, 16]}
        >
          <Col span={6}>
            <Textfit className="welcome-text" mode="single">
              Welcome to
            </Textfit>
            <Textfit className="welcome-text" mode="single">
              Urbana-Champaign
            </Textfit>
            <Row type="flex" justify="center" align="middle" gutter={[16, 16]}>
              <Col span={18}>
                <Link to="/resources">
                  <Button type="primary">
                    <strong>Find Resources</strong>
                  </Button>
                </Link>
              </Col>
            </Row>
          </Col>
        </Row>
        {true && HomeBlock2Desktop}
        <Row
          className="home-block-3"
          type="flex"
          justify="center"
          align="middle"
          gutter={[16, 16]}
        >
          <Col span={23}>
            <Carousel autoplay dotPosition="right">
              {this.state.testimonials.map(element => {
                return (
                  <div>
                    <Row
                      className="testimonial-block"
                      type="flex"
                      justify="center"
                      align="middle"
                      gutter={[16, 16]}
                    >
                      <Col
                        className="testimonial-block__left"
                        span={6}
                        offset={1}
                      >
                        <img
                          className="testimonial-block__left__img"
                          src={element.picture}
                          alt=""
                        />
                      </Col>
                      <Col
                        className="testimonial-block__right"
                        span={12}
                        offset={1}
                      >
                        <h1>{element.person}</h1>
                        <h3>{element.country}</h3>
                        <p>{element.testimonial}</p>
                      </Col>
                    </Row>
                  </div>
                );
              })}
            </Carousel>
          </Col>
        </Row>
        <Row
          className="home-block-4"
          type="flex"
          justify="center"
          align="middle"
          gutter={[16, 16]}
        >
          <Col>
            <Row type="flex" justify="center" align="middle" gutter={[16, 16]}>
              <Col>
                <h1>Partners in the Community</h1>
              </Col>
            </Row>
            <Row type="flex" justify="center" align="middle" gutter={[16, 16]}>
              <Col className="home-block-4__partner" span={4}>
                <img
                  src="/asset/partners/cu_fair.jpg"
                  alt="Champaign-Urbana Fair"
                />
              </Col>
              <Col className="home-block-4__partner" span={4}>
                <img
                  src="/asset/partners/cuphd.png"
                  alt="Champaign-Urbana Public Health District"
                />
              </Col>
              <Col className="home-block-4__partner" span={4}>
                <img src="/asset/partners/dhai_tree.jpg" alt="Dhairtree" />
              </Col>
              <Col className="home-block-4__partner" span={4}>
                <img
                  src="/asset/partners/three_spinners.jpg"
                  alt="Three Spinners"
                />
              </Col>
              <Col className="home-block-4__partner" span={4}>
                <img src="/asset/partners/trc.jpg" alt="The Refugee Center" />
              </Col>
            </Row>
          </Col>
        </Row>
      </>
    );
  }
}
