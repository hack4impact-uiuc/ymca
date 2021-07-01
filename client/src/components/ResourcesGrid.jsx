import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'antd';

import ResourcePreview2 from './ResourcePreview2';
import '../css/ResourcesGrid.css';

function ResourcesGrid(props) {
  const {
    filteredResources,
    savedResources,
    updateSaved,
    resourceCount,
    updatePagination,
    pageSize,
    page,
  } = props;

  const cards = (
    <List
      grid={{
        gutter: [32, 16],
        xs: 1,
        sm: 3,
        md: 3,
        lg: 3,
        xl: 3,
        xxl: 3,
      }}
      dataSource={filteredResources}
      pagination={{
        pageSizeOptions: ['6', '15', '30'],
        showSizeChanger: true,
        total: resourceCount,
        current: page,
        pageSize,
        onChange: updatePagination,
        onShowSizeChange: (current, size) => updatePagination(1, size),
      }}
      renderItem={(resource) => (
        <List.Item>
          <ResourcePreview2
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
            image={resource.image ?? ''}
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
