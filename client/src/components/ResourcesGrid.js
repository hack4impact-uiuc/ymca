import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'antd';

import ResourcePreview from './ResourcePreview';
import '../css/ResourcesGrid.css';

function ResourcesGrid(props) {
  const { filteredResources } = props;

  const cards = Array(Math.ceil(filteredResources.length / 3))
    .fill()
    .map((_, index) => {
      const first = filteredResources[index * 3];
      const second =
        index * 3 + 1 < filteredResources.length
          ? filteredResources[index * 3 + 1]
          : null;
      const third =
        index * 3 + 2 < filteredResources.length
          ? filteredResources[index * 3 + 2]
          : null;
      return (
        <Row gutter={[32, 32]} type="flex">
          <Col xs={24} md={8}>
            <ResourcePreview
              availableLanguages={first.availableLanguages}
              cost={first.cost}
              id={first._id}
              key={first._id}
              location={first.location}
              name={first.name}
            />
          </Col>
          {second && (
            <Col xs={24} md={8}>
              <ResourcePreview
                availableLanguages={second.availableLanguages}
                cost={second.cost}
                id={second._id}
                key={second._id}
                location={second.location}
                name={second.name}
              />
            </Col>
          )}
          {third && (
            <Col xs={24} md={8}>
              <ResourcePreview
                availableLanguages={third.availableLanguages}
                cost={third.cost}
                id={third._id}
                key={third._id}
                location={third.location}
                name={third.name}
              />
            </Col>
          )}
        </Row>
      );
    });

  return <div className="grid-container">{cards}</div>;
}

ResourcesGrid.propTypes = {
  filteredResources: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      availableLanguages: PropTypes.string,
      category: PropTypes.number.isRequired,
      comments: PropTypes.arrayOf(PropTypes.string),
      contacts: PropTypes.arrayOf(PropTypes.string),
      cost: PropTypes.string,
      description: PropTypes.string.isRequired,
      internalNotes: PropTypes.arrayOf(PropTypes.string),
      lastUpdated: PropTypes.string.isRequired,
      location: PropTypes.string,
      name: PropTypes.string.isRequired,
      phoneNumbers: PropTypes.arrayOf(PropTypes.string),
      subcategory: PropTypes.string,
    }),
  ).isRequired,
};

export default ResourcesGrid;
