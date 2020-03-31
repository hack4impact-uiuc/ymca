import React from 'react';
import { Link } from 'react-router-dom';
import { Textfit } from 'react-textfit';
import { Button, Col, Row } from 'antd';

import '../css/Home.css';
import '../css_mobile/Home.css';

import useWindowDimensions from '../utils/mobile';
import {
  HomeBlock2Desktop,
  HomeBlock3Desktop,
} from '../components/desktop/HomeDesktop';
import {
  HomeBlock2Mobile,
  HomeBlock3Mobile,
} from '../components/mobile/HomeMobile';

const Home = () => {
  const isMobile = useWindowDimensions()[1];
  const spanNum = isMobile ? 20 : 6;

  return (
    <>
      <Row
        className="home-block-1"
        type="flex"
        justify={isMobile ? 'center' : 'left'}
        align="middle"
      >
        <Col className={isMobile ? 'welcome-text-mobile' : 'welcome-text'}>
          Welcome to <br /> Urbana-Champaign
          <Row type="flex" justify={isMobile ? 'center' : 'left'} align="left">
            <Col span={14}>
              <Link to="/resources">
                <Button type="primary">Find Resources</Button>
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
            <Col span={spanNum} className="home-block-4__title">
              <Textfit mode="single">
                <strong>Partners in the Community</strong>
              </Textfit>
            </Col>
          </Row>
          <Row type="flex" justify="center" align="middle">
            <Col className="home-block-4__partner" span={isMobile ? 10 : 4}>
              <img
                src="/asset/partners/cu_fair.jpg"
                alt="Champaign-Urbana Fair"
              />
            </Col>
            <Col className="home-block-4__partner" span={isMobile ? 10 : 4}>
              <img
                src="/asset/partners/cuphd.png"
                alt="Champaign-Urbana Public Health District"
              />
            </Col>
            <Col className="home-block-4__partner" span={isMobile ? 10 : 4}>
              <img src="/asset/partners/dhai_tree.jpg" alt="Dhairtree" />
            </Col>
            <Col className="home-block-4__partner" span={isMobile ? 10 : 4}>
              <img
                src="/asset/partners/three_spinners.jpg"
                alt="Three Spinners"
              />
            </Col>
            <Col className="home-block-4__partner" span={isMobile ? 10 : 4}>
              <img src="/asset/partners/trc.jpg" alt="The Refugee Center" />
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default Home;
