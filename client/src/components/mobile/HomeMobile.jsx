// @flow

import React, { useEffect, useState } from 'react';
import { Textfit } from 'react-textfit';
import { Button, Col, Row, Carousel } from 'antd';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import type { Testimonial } from '../../pages/Home';

import '../../css/Home.css';
import { getCategories } from '../../utils/api';

type Block1Props = {
  backgroundImage: string,
};

export const HomeBlock1Mobile = ({ backgroundImage }: Block1Props) => {
  const [categories, setCategories] = useState<Array<string>>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await getCategories();
      const newCategories = [];
      if (res != null) {
        res.result.forEach((c) => {
          newCategories.push(c.name);
        });
      }
      setCategories(newCategories);
    };

    fetchCategories();
  }, []);

  return (
    <Row
      className="home-block-1"
      style={{ backgroundImage }}
      type="flex"
      justify="center"
      align="middle"
    >
      <Col className="welcome-text-mobile">
        <Textfit className="welcome-to" mode="single">
          <FormattedMessage
            id="homeWelcome"
            defaultMessage="Welcome to Urbana-Champaign"
          />
        </Textfit>
        {categories !== null && categories.length > 0 ? (
          <Row type="flex" align="middle" justify="center">
            <Textfit mode="single" className="welcome-text-mobile-bold">
              <FormattedMessage
                id="homeResources"
                defaultMessage="Find Resources for"
              />
            </Textfit>
            <Carousel
              effect="fade"
              autoplay
              dotPosition="left"
              dots={false}
              autoplaySpeed={3000}
              className="welcome-carousel"
            >
              {categories.map(
                (category) =>
                  category !== 'Other' && (
                    <Link
                      to={`/resources?category=${category}`}
                      className="welcome-text-mobile-link"
                    >
                      <FormattedMessage
                        id={`category-${category}`.replace(/\s/g, '')}
                        defaultMessage={category}
                      />
                    </Link>
                  ),
              )}
            </Carousel>
          </Row>
        ) : (
          <Row type="flex" align="middle" justify="center">
            <Textfit mode="single" className="welcome-text-mobile-bold">
              <FormattedMessage
                id="homeResourcesButton"
                defaultMessage="Find Resources"
              />
            </Textfit>
          </Row>
        )}
        <Row type="flex" justify="center" align="center">
          <Link to="/resources">
            <Button type="primary">
              <FormattedMessage
                id="homeResourcesButton"
                defaultMessage="Find Resources"
              />
            </Button>
          </Link>
        </Row>
      </Col>
    </Row>
  );
};
export const HomeBlock2Mobile = () => (
  <Row className="home-block-2" type="flex" justify="center" align="middle">
    <Col className="home-block-2" span={24}>
      <Row type="flex" justify="center" align="middle">
        <Col span={20} className="home-block-2-top-text">
          <Textfit mode="single">
            <strong>
              <FormattedMessage
                id="homeAboutGuide"
                defaultMessage="About the Guide"
              />
            </strong>
          </Textfit>
        </Col>
      </Row>
      <Row
        className="home-block-2-bottom-text"
        type="flex"
        justify="center"
        align="middle"
      >
        <Col span={20}>
          <Textfit mode="multi">
            <FormattedMessage
              id="homeAbout"
              defaultMessage="
        Oasis exists to equalize and promote information access to Champaign
        resources catered to your unique lifestyle and needs. Securing reliable
        transportation, navigating the healthcare system, finding legal aid — it
        can be difficult figuring out where to go in a large place like
        Champaign that has hundreds of resources and a population of over 80,000
        people. This virtual guide, built with love by {linkH4I}, curates
        recommendations based on cost, language offerings, and more. As you
        explore Oasis, we would love to hear about your experiences and feedback
        through the {linkWelcome}."
              values={{
                linkH4I: (
                  <a href="https://uiuc.hack4impact.org/">Hack4Impact</a>
                ),
                linkWelcome: (
                  <a href="mailto:lalinea@universityymca.org">Welcome Center</a>
                ),
              }}
            />
          </Textfit>
        </Col>
      </Row>
    </Col>
  </Row>
);

type Block3Props = {
  testimonials: Array<Testimonial>,
};

export const HomeBlock3Mobile = ({ testimonials }: Block3Props) => (
  <Row className="home-block-3" type="flex" justify="center" align="middle">
    <Col span={23}>
      <Carousel
        autoplay
        dotPosition="bottom"
        autoplaySpeed={5000}
        effect="fade"
      >
        {testimonials.map((element) => (
          <div
            key={`${element.person}-${element.title}`}
            className="testimonial-block"
          >
            <Row type="flex" justify="center" align="middle">
              <Col span={23} justify="center" align="middle">
                <img
                  className="testimonial-block-top-img"
                  src={element.image}
                  alt=""
                />
              </Col>
            </Row>
            <Row className="testimonial-block-bottom">
              <Col>
                <h1>{element.person}</h1>
                <p>
                  <Textfit mode="multi">
                    <FormattedMessage
                      id={`testimonial-title-${element.person}-${element.title}`
                        .toLowerCase()
                        .replace(/\s/g, '')}
                      defaultMessage={element.title}
                    />
                  </Textfit>
                </p>
                <p>
                  <Textfit mode="multi">
                    <FormattedMessage
                      id={`testimonial-${element.person}-${element.title}`
                        .toLowerCase()
                        .replace(/\s/g, '')}
                      defaultMessage={element.testimonial}
                    />
                  </Textfit>
                </p>
              </Col>
            </Row>
          </div>
        ))}
      </Carousel>
    </Col>
  </Row>
);
