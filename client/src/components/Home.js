import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Button, Carousel } from 'antd';
import '../css/Home.css';
import { Textfit } from 'react-textfit';
import headerImg from '../imgs/homePage/headerImg.jpg';

const gradientBox = {
  backgroundImage: `radial-gradient(50% 141%, rgba(25,132,202,0.6) 1%,
  rgba(105,62,158,0.6) 100%), url(${headerImg})`,
  backgroundSize: 'cover, cover',
  opacity: '1',
};

export default class Home extends Component<Props, State> {
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
      <div>
        <Row
          className="home-block-1"
          type="flex"
          justify="center"
          align="middle"
          gutter={[16, 16]}
          style={gradientBox}
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
                <Link to="/filter">
                  <Button
                    className="find-resources-button"
                    type="primary"
                    style={{
                      backgroundColor: 'rgb(136,216,208',
                      borderColor: ' rgb(136,216,208',
                    }}
                  >
                    <strong>Find Resources</strong>
                  </Button>
                </Link>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row
          className="home-block-2"
          type="flex"
          justify="center"
          align="middle"
          gutter={[16, 16]}
        >
          <Col className="home-block-2__left" span={6}>
            <Row
              type="flex"
              justify="left"
              align="middle"
              style={{ height: '100%' }}
            >
              <Col span={20}>
                <Textfit className="home-block-2__left__text" mode="single">
                  About the Guide
                </Textfit>
              </Col>
            </Row>
          </Col>
          <Col className="home-block-2__right" span={14}>
            Juicy meatballs brisket slammin baked shoulder. Juicy smoker soy
            sauce burgers brisket. polenta mustard hunk greens. Wine technique
            snack skewers chuck excess. Oil heat slowly. slices natural
            delicious, set aside magic tbsp skillet, bay leaves brown
            centerpiece. fruit soften edges frond slices onion snack pork steem
            on wines excess technique cup; Cover smoker soy sauce fruit snack.
            Sweet one-dozen scrape delicious, non sheet raw crunch mustard.
            Minutes clever slotted tongs scrape, brown steem undisturbed rice.
          </Col>
        </Row>
        <Row
          className="home-block-3"
          type="flex"
          justify="center"
          align="middle"
          gutter={[16, 16]}
        >
          <Col span={23}>
            <Carousel dotPosition="right">
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
                        <h1 style={{ color: 'white' }}>{element.person}</h1>
                        <h3 style={{ color: 'white' }}>{element.country}</h3>
                        <p style={{ color: 'white', 'font-size': '2.5vh' }}>
                          {element.testimonial}
                        </p>
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
                  src={require('../imgs/homePage/partners/CU_Fair.jpg')}
                  alt="Champaign-Urbana Fair"
                />
              </Col>
              <Col className="home-block-4__partner" span={4}>
                <img
                  src={require('../imgs/homePage/partners/CUPHD.png')}
                  alt="Champaign-Urbana Public Health District"
                />
              </Col>
              <Col className="home-block-4__partner" span={4}>
                <img
                  src={require('../imgs/homePage/partners/Dhaitree.jpg')}
                  alt="Dhairtree"
                />
              </Col>
              <Col className="home-block-4__partner" span={4}>
                <img
                  src={require('../imgs/homePage/partners/Three_Spinners.jpg')}
                  alt="Three Spinners"
                />
              </Col>
              <Col className="home-block-4__partner" span={4}>
                <img
                  src={require('../imgs/homePage/partners/trc.jpg')}
                  alt="The Refugee Center"
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}
