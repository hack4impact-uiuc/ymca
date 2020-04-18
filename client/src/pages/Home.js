import React, { useState } from 'react';
import { Textfit } from 'react-textfit';
import { Col, Row } from 'antd';

import '../css/Home.css';
import '../css_mobile/Home.css';

import useWindowDimensions from '../utils/mobile';
import {
  HomeBlock1Desktop,
  HomeBlock2Desktop,
  HomeBlock3Desktop,
} from '../components/desktop/HomeDesktop';
import {
  HomeBlock1Mobile,
  HomeBlock2Mobile,
  HomeBlock3Mobile,
} from '../components/mobile/HomeMobile';

const Home = () => {
  const [cuFair, setCUFairHover] = useState(false);
  const [cuphd, setCUPHDHover] = useState(false);
  const [dhairtree, setDhairtreeHover] = useState(false);
  const [threeSpinnersHover, setThreeSpinnersHover] = useState(false);
  const [refugeeCenterHover, setRefugeeCenterHover] = useState(false);

  const isMobile = useWindowDimensions()[1];
  const spanNum = isMobile ? 20 : 6;

  return (
    <>
      {isMobile ? (
        <>
          <HomeBlock1Mobile />
          <HomeBlock2Mobile />
          <HomeBlock3Mobile />
        </>
      ) : (
        <>
          <HomeBlock1Desktop />
          <HomeBlock2Desktop />
          <HomeBlock3Desktop />
        </>
      )}
      <Row className="home-block-4" type="flex" justify="center" align="middle">
        <Col span={24}>
          <Row type="flex" justify="center" align="middle">
            <Col span={spanNum} className="home-block-4__title">
              <Textfit mode="single">
                <p
                  className="home-block-4-title"
                  style={{
                    paddingTop: `${isMobile ? '2em' : '.5em'}`,
                    paddingBottom: '.5em',
                    fontSize: `${isMobile ? '0.32em' : '0.45em'}`,
                  }}
                >
                  Partners in the Community
                </p>
              </Textfit>
            </Col>
          </Row>
          <Row type="flex" justify="center" align="middle">
            <Col className="home-block-4__partner" span={isMobile ? 10 : 4}>
              <img
                onMouseEnter={() => setCUFairHover(true)}
                onMouseLeave={() => setCUFairHover(false)}
                src="/asset/partners/cu_fair.jpg"
                alt="Champaign-Urbana Fair"
              />
              <h5
                style={{
                  opacity: cuFair ? 1 : 0,
                  marginTop: '15px',
                }}
              >
                Champaign-Urbana Fair
              </h5>
            </Col>
            <Col className="home-block-4__partner" span={isMobile ? 10 : 4}>
              <Row>
                <img
                  onMouseEnter={() => setCUPHDHover(true)}
                  onMouseLeave={() => setCUPHDHover(false)}
                  src="/asset/partners/cuphd.png"
                  alt="Champaign-Urbana Public Health District"
                />
              </Row>
              <Row>
                <h5
                  style={{
                    opacity: cuphd ? 1 : 0,
                    marginTop: '20px',
                  }}
                >
                  Champaign-Urbana Public Health District
                </h5>
              </Row>
            </Col>
            <Col className="home-block-4__partner" span={isMobile ? 10 : 4}>
              <img
                onMouseEnter={() => setDhairtreeHover(true)}
                onMouseLeave={() => setDhairtreeHover(false)}
                src="/asset/partners/dhai_tree.jpg"
                alt="Dhairtree"
              />
              <h5
                style={{
                  opacity: dhairtree ? 1 : 0,
                }}
              >
                Dhairtree
              </h5>
            </Col>
            <Col className="home-block-4__partner" span={isMobile ? 10 : 4}>
              <img
                onMouseEnter={() => setThreeSpinnersHover(true)}
                onMouseLeave={() => setThreeSpinnersHover(false)}
                src="/asset/partners/three_spinners.jpg"
                alt="Three Spinners"
              />
              <h5
                style={{
                  opacity: threeSpinnersHover ? 1 : 0,
                }}
              >
                Three Spinners
              </h5>
            </Col>
            <Col className="home-block-4__partner" span={isMobile ? 10 : 4}>
              <Row>
                <img
                  onMouseEnter={() => setRefugeeCenterHover(true)}
                  onMouseLeave={() => setRefugeeCenterHover(false)}
                  src="/asset/partners/trc.jpg"
                  alt="The Refugee Center"
                />
              </Row>
              <Row>
                <h5
                  style={{
                    opacity: refugeeCenterHover ? 1 : 0,
                  }}
                >
                  The Refugee Center
                </h5>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default Home;
