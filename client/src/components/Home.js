import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Textfit } from 'react-textfit';
import { Button, Col, Row } from 'antd';

import '../css/Home.css';
import '../css_mobile/Home.css';

import useWindowDimensions from '../utils/mobile';

import { HomeBlock2Desktop, HomeBlock3Desktop } from './desktop/HomeDesktop';
import { HomeBlock2Mobile, HomeBlock3Mobile } from './mobile/HomeMobile';

const Home = () => {
  const [{ height, width }, isMobile] = useWindowDimensions();

  return (
    <>
      <Row className="home-block-1" type="flex" justify="center" align="middle">
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
      {isMobile ? (
        <>
          <HomeBlock2Mobile />
          <HomeBlock3Mobile />
        </>
      ) : (
        <>
          <HomeBlock2Desktop />
          <HomeBlock3Desktop />
        </>
      )}
      <Row className="home-block-4" type="flex" justify="center" align="middle">
        <Col span={24}>
          <Row type="flex" justify="center" align="middle">
            <Col span={16} classname="home-block-4__title">
              <Textfit mode="single">
                <strong>Partners in the Community</strong>
              </Textfit>
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
};

export default Home;
