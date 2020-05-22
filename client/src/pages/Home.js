import React, { useState, useEffect } from 'react';
import { Textfit } from 'react-textfit';
import { Col, Row } from 'antd';

import { getHomePage } from '../utils/api';

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
  const [partners, setPartners] = useState([]);
  const [partnerRows, setPartnerRows] = useState([]);
  const [partnerHover, setPartnerHover] = useState('');

  const [dimensions, isMobile] = useWindowDimensions();
  const spanNum = isMobile ? 20 : 6;

  const fetchPartners = async () => {
    const res = await getHomePage();
    const newPartners = [];
    const newPartnerRows = [];
    let i = 0;
    if (res != null) {
      res.result.partners.forEach(t => {
        newPartners.push({
          name: t[0],
          image: t[1],
          link: t[2],
        });
        if (i % 5 === 0) {
          newPartnerRows.push(i / 5);
        }
        i += 1;
      });
    }
    setPartners(newPartners);
    setPartnerRows(newPartnerRows);
  };

  useEffect(() => {
    fetchPartners();
  }, [setPartners, setPartnerRows]);

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
          {partnerRows.map(index => {
            return (
              <>
                <Row type="flex" justify="center" align="middle">
                  {partners.slice(index * 5, (index + 1) * 5).map(element => {
                    return (
                      <Col
                        className="home-block-4__partner"
                        span={isMobile ? 10 : 4}
                      >
                        <a
                          href={element.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img
                            onMouseEnter={() => setPartnerHover(element.name)}
                            onMouseLeave={() => setPartnerHover('')}
                            src={element.image}
                            alt={element.name}
                          />
                        </a>
                      </Col>
                    );
                  })}
                </Row>
                <Row type="flex" justify="center" align="middle">
                  {dimensions.width > 976 &&
                    partners.slice(index * 5, (index + 1) * 5).map(element => {
                      return (
                        <Col className="home-block-4__partner" span={4}>
                          <h5
                            style={{
                              opacity: partnerHover === element.name ? 1 : 0,
                              marginTop: '15px',
                            }}
                          >
                            {element.name}
                          </h5>
                        </Col>
                      );
                    })}
                </Row>
              </>
            );
          })}
        </Col>
      </Row>
    </>
  );
};

export default Home;
