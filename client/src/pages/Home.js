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
  const [dharitree, setDharitreeHover] = useState(false);
  const [threeSpinnersHover, setThreeSpinnersHover] = useState(false);
  const [refugeeCenterHover, setRefugeeCenterHover] = useState(false);

  const [dimensions, isMobile] = useWindowDimensions();
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
              <a
                href="https://www.cu-fair.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  onMouseEnter={() => setCUFairHover(true)}
                  onMouseLeave={() => setCUFairHover(false)}
                  src="/asset/partners/cu_fair.jpg"
                  alt="Champaign-Urbana Fair"
                />
              </a>
            </Col>
            <Col className="home-block-4__partner" span={isMobile ? 10 : 4}>
              <a
                href="https://www.c-uphd.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  onMouseEnter={() => setCUPHDHover(true)}
                  onMouseLeave={() => setCUPHDHover(false)}
                  src="/asset/partners/cuphd.png"
                  alt="Champaign-Urbana Public Health District"
                />
              </a>
            </Col>
            <Col className="home-block-4__partner" span={isMobile ? 10 : 4}>
              <a
                href="https://twitter.com/dharitreee/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  onMouseEnter={() => setDharitreeHover(true)}
                  onMouseLeave={() => setDharitreeHover(false)}
                  src="/asset/partners/dhai_tree.jpg"
                  alt="Dharitree"
                />
              </a>
            </Col>
            <Col className="home-block-4__partner" span={isMobile ? 10 : 4}>
              <a
                href="https://www.threespinners.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  onMouseEnter={() => setThreeSpinnersHover(true)}
                  onMouseLeave={() => setThreeSpinnersHover(false)}
                  src="/asset/partners/three_spinners.jpg"
                  alt="Three Spinners"
                />
              </a>
            </Col>
            <Col className="home-block-4__partner" span={isMobile ? 10 : 4}>
              <a
                href="https://www.therefugeecenter-cu.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  onMouseEnter={() => setRefugeeCenterHover(true)}
                  onMouseLeave={() => setRefugeeCenterHover(false)}
                  src="/asset/partners/trc.jpg"
                  alt="The Refugee Center"
                />
              </a>
            </Col>
          </Row>
          {dimensions.width > 976 && (
            <Row type="flex" justify="center" align="middle">
              <Col className="home-block-4__partner" span={4}>
                <h5
                  style={{
                    opacity: cuFair ? 1 : 0,
                    marginTop: '15px',
                  }}
                >
                  Champaign-Urbana Fair
                </h5>
              </Col>
              <Col className="home-block-4__partner" span={4}>
                <h5
                  style={{
                    opacity: cuphd ? 1 : 0,
                    marginTop: '20px',
                  }}
                >
                  Champaign-Urbana Public Health District
                </h5>
              </Col>
              <Col className="home-block-4__partner" span={4}>
                <h5
                  style={{
                    opacity: dharitree ? 1 : 0,
                  }}
                >
                  Dharitree
                </h5>
              </Col>
              <Col className="home-block-4__partner" span={4}>
                <h5
                  style={{
                    opacity: threeSpinnersHover ? 1 : 0,
                  }}
                >
                  Three Spinners
                </h5>
              </Col>
              <Col className="home-block-4__partner" span={4}>
                <h5
                  style={{
                    opacity: refugeeCenterHover ? 1 : 0,
                  }}
                >
                  The Refugee Center
                </h5>
              </Col>
            </Row>
          )}
        </Col>
      </Row>
    </>
  );
};

export default Home;
