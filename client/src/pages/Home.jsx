// @flow

import React, { useState, useEffect, useMemo } from 'react';
import { Textfit } from 'react-textfit';
import { Col, Row } from 'antd';

import { getHomePage } from '../utils/api';
import { canBeWebpConverted, getIsWebpSupported } from '../utils/webp-detect';
import useWindowDimensions from '../utils/mobile';

import '../css/Home.css';

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

export type Testimonial = {
  person: string,
  image: string,
  title: string,
  testimonial: string,
};

const Home = () => {
  const [partners, setPartners] = useState<
    Array<{ name: string, image: string, link: string }>,
  >([]);
  const [partnerRows, setPartnerRows] = useState<Array<number>>([]);
  const [partnerHover, setPartnerHover] = useState<string>('');
  const isWebpSupported = useMemo(getIsWebpSupported, []);

  const [dimensions, isMobile] = useWindowDimensions();
  const spanNum = isMobile ? 20 : 6;

  const fetchPartners = async () => {
    const res = await getHomePage();
    const newPartners = [];
    const newPartnerRows = [];
    let i = 0;
    if (res != null) {
      res.result.partners.forEach((t) => {
        newPartners.push({
          name: t[0],
          image:
            isWebpSupported && canBeWebpConverted(t[1])
              ? t[1].toLowerCase().replace('jpg', 'webp').replace('png', 'webp')
              : t[1],
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
            <Col span={spanNum} className="home-block-4-title">
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
          {partnerRows.map((index) => (
            <>
              <Row type="flex" justify="center" align="middle">
                {partners.slice(index * 5, (index + 1) * 5).map((element) => (
                  <Col
                    className="home-block-4-partner"
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
                ))}
              </Row>
              <Row type="flex" justify="center" align="middle">
                {dimensions.width > 976 &&
                  partners.slice(index * 5, (index + 1) * 5).map((element) => (
                    <Col className="home-block-4-partner-name" span={4}>
                      <h5
                        style={{
                          opacity: partnerHover === element.name ? 1 : 0,
                          marginTop: '15px',
                        }}
                      >
                        {element.name}
                      </h5>
                    </Col>
                  ))}
              </Row>
            </>
          ))}
        </Col>
      </Row>
    </>
  );
};

export default Home;