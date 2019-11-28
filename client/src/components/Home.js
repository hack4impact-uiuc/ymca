import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Textfit } from 'react-textfit';
import { Button, Carousel, Col, Row } from 'antd';

import '../css/Home.css';
import testimonials from '../data/testimonials';

export default class Home extends Component {
  render() {
    return (
      <>
        <Row
          className="home-block-1"
          type="flex"
          justify="center"
          align="middle"
        >
          <Col span={6}>
            <Textfit className="welcome-text" mode="single">
              Welcome to
            </Textfit>
            <Textfit className="welcome-text" mode="single">
              Urbana-Champaign
            </Textfit>
            <Row type="flex" justify="center" align="middle">
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
        <Row
          className="home-block-2"
          type="flex"
          justify="center"
          align="middle"
        >
          <Col className="home-block-2__left" span={6}>
            <Row
              className="home-block-2__left__text"
              type="flex"
              justify="left"
              align="middle"
            >
              <Col span={20}>
                <Textfit mode="single">About the Guide</Textfit>
              </Col>
            </Row>
          </Col>
          <Col className="home-block-2__right" span={14}>
            Oasis exists to equalize and promote information access to Champaign
            resources catered to your unique lifestyle and needs. Securing
            reliable transportation, navigating the healthcare system, finding
            legal aid — it can be difficult figuring out where to go in a large
            place like Champaign that has hundreds of resources and a population
            of over 80,000 people. This virtual guide, built with love by
            <a href="https://www.facebook.com/h4iuiuc/"> Hack4Impact </a>
            curates recommendations based on cost, language offerings, and more.
            As you explore Oasis, we would love to hear about your experiences
            and feedback through the
            <a href="mailto:lalinea@universityymca.org"> Welcome Center. </a>
          </Col>
        </Row>
        <Row
          className="home-block-3"
          type="flex"
          justify="center"
          align="middle"
        >
          <Col span={23}>
            <Carousel autoplay dotPosition="right">
              {testimonials.map(element => {
                return (
                  <div>
                    <Row
                      className="testimonial-block"
                      type="flex"
                      justify="center"
                      align="middle"
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
                        <h3>{element.title}</h3>
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
        >
          <Col>
            <Row type="flex" justify="center" align="middle">
              <Col>
                <h1>Partners in the Community</h1>
              </Col>
            </Row>
            <Row type="flex" justify="center" align="middle">
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
