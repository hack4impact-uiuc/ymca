import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'antd';

import ResourcePreview from './ResourcePreview';
import '../css/ResourcesGrid.css';

function ResourcesGrid(props) {
  const { filteredResources, savedResources, updateSaved } = props;

  const cards = (
    <List
      grid={{
        gutter: [32, 16],
        xs: 1,
        sm: 2,
        md: 4,
        lg: 4,
        xl: 6,
        xxl: 3,
      }}
      dataSource={filteredResources}
      renderItem={(resource) => (
        <List.Item>
          <ResourcePreview
            availableLanguages={resource.availableLanguages}
            category={resource.category}
            city={resource.city}
            cost={resource.cost}
            id={resource._id}
            key={resource._id}
            name={resource.name}
            subcategory={resource.subcategory}
            isSaved={savedResources.has(resource._id)}
            updateSaved={updateSaved}
            image={resource.image || ''}
            description={resource.description}
          />
        </List.Item>
      )}
    />
  );

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
  updateSaved: PropTypes.func.isRequired,
};

export default ResourcesGrid;
