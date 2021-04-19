// @flow

import React, { useState, useEffect, useMemo } from 'react';
import { Textfit } from 'react-textfit';
import { Col, Row } from 'antd';
import { FormattedMessage } from 'react-intl';

import { getHomePage } from '../utils/api';
import { canBeWebpConverted, getIsWebpSupported } from '../utils/webp-detect';
import useWindowDimensions from '../utils/mobile';
import type { Testimonial } from '../types/models';

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

const Home = (): React$Element<React$FragmentType> => {
  const [partners, setPartners] = useState<
    Array<{ name: string, image: string, link: string }>,
  >([]);
  const [partnerRows, setPartnerRows] = useState<Array<number>>([]);
  const [partnerHover, setPartnerHover] = useState<string>('');
  const [testimonials, setTestimonials] = useState<Array<Testimonial>>([]);
  const [backgroundImage, setBackgroundImage] = useState<string>('');
  const isWebpSupported = useMemo(getIsWebpSupported, []);

  const [dimensions, isMobile] = useWindowDimensions();
  const spanNum = isMobile ? 20 : 6;
  useEffect(() => {
    const fetchHomeData = async () => {
      const res = await getHomePage();
      const newTestimonials = [];
      const newPartners = [];
      const newPartnerRows = [];
      let i = 0;
      if (res != null) {
        res.result.partners.forEach((t) => {
          newPartners.push({
            name: t[0],
            image:
              isWebpSupported && canBeWebpConverted(t[1])
                ? t[1]
                    .toLowerCase()
                    .replace('jpg', 'webp')
                    .replace('png', 'webp')
                : t[1],
            link: t[2],
          });
          if (i % 5 === 0) {
            newPartnerRows.push(i / 5);
          }
          i += 1;
        });

        res.result.testimonials.forEach(
          ({ person, image, title, testimonial }) => {
            newTestimonials.push({
              person,
              image:
                isWebpSupported && canBeWebpConverted(image)
                  ? image.toLowerCase().replace('jpg', 'webp')
                  : image,
              title,
              testimonial,
            });
          },
        );

        const background =
          isWebpSupported && canBeWebpConverted(res.result.backgroundImage)
            ? res.result.backgroundImage.replace('jpg', 'webp')
            : res.result.backgroundImage;
        setBackgroundImage(
          `radial-gradient(70% 141% at 0 0, rgba(25, 132, 202, 0.6) 1%,` +
            ` rgba(105, 62, 158, 0.6) 100%),` +
            ` url('${background}')`,
        );
      }
      setTestimonials(newTestimonials);
      setPartners(newPartners);
      setPartnerRows(newPartnerRows);
    };

    fetchHomeData();
  }, [setPartners, setPartnerRows, isWebpSupported]);

  return (
    <>
      {isMobile ? (
        <>
          <HomeBlock1Mobile backgroundImage={backgroundImage} />
          <HomeBlock2Mobile />
          <HomeBlock3Mobile testimonials={testimonials} />
        </>
      ) : (
        <>
          <HomeBlock1Desktop backgroundImage={backgroundImage} />
          <HomeBlock2Desktop />
          <HomeBlock3Desktop testimonials={testimonials} />
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
                  <FormattedMessage
                    id="homePartners"
                    defaultMessage="Partners in the Community"
                  />
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
                    key={element.name}
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
                    <Col
                      className="home-block-4-partner-name"
                      span={4}
                      key={element.name}
                    >
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
