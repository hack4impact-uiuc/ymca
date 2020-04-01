import React from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Row } from 'antd';

import ResourcePreview from './ResourcePreview';
import '../css/ResourcesGrid.css';

function ResourcesGrid(props) {
  const { filteredResources, savedResources, authed, updateSaved } = props;

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
        <Row key={first.name} gutter={[32, 32]} type="flex">
          <Col xs={24} md={8}>
            <ResourcePreview
              availableLanguages={first.availableLanguages}
              category={first.category}
              city={first.city}
              cost={first.cost}
              id={first._id}
              key={first._id}
              name={first.name}
              subcategory={first.subcategory}
              isSaved={savedResources.has(first._id)}
              authed={authed}
              updateSaved={updateSaved}
              image={first.image || ''}
            />
          </Col>
          {second && (
            <Col xs={24} md={8}>
              <ResourcePreview
                availableLanguages={second.availableLanguages}
                category={second.category}
                city={second.city}
                cost={second.cost}
                id={second._id}
                key={second._id}
                name={second.name}
                subcategory={second.subcategory}
                isSaved={savedResources.has(second._id)}
                authed={authed}
                updateSaved={updateSaved}
                image={second.image || ''}
              />
            </Col>
          )}
          {third && (
            <Col xs={24} md={8}>
              <ResourcePreview
                availableLanguages={third.availableLanguages}
                category={third.category}
                city={third.city}
                cost={third.cost}
                id={third._id}
                key={third._id}
                name={third.name}
                subcategory={third.subcategory}
                isSaved={savedResources.has(third._id)}
                authed={authed}
                updateSaved={updateSaved}
                image={third.image || ''}
              />
            </Col>
          )}
        </Row>
      );
    });

  return <div className="resources-grid">{cards}</div>;
}

ResourcesGrid.propTypes = {
  filteredResources: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      availableLanguages: PropTypes.arrayOf(PropTypes.string),
      category: PropTypes.arrayOf(PropTypes.string).isRequired,
      city: PropTypes.string,
      cost: PropTypes.string,
      name: PropTypes.string.isRequired,
      subcategory: PropTypes.arrayOf(PropTypes.string),
      image: PropTypes.string,
    }),
  ).isRequired,
  savedResources: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  authed: PropTypes.bool.isRequired,
  updateSaved: PropTypes.func.isRequired,
};

export default ResourcesGrid;
