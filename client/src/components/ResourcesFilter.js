import React, { useCallback, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { AutoComplete, Button, Dropdown, Radio } from 'antd';
import PropTypes from 'prop-types';

import ResourceFilterSearch from './ResourceFilterSearch';

import '../css/ResourcesFilter.css';

function ResourcesFilter(props) {
  const {
    costs,
    costSelected,
    languages,
    languageSelected,
    locations,
    locationSelected,
    handleChangeFilter,
  } = props;

  const onChange = useCallback((filterName, value) => {
    switch (filterName) {
      case 'Cost':
        handleChangeFilter({
          cost: value,
          language: languageSelected,
          location: locationSelected,
        });
        break;
      case 'Languages Offered':
        handleChangeFilter({
          cost: costSelected,
          language: value,
          location: locationSelected,
        });
        break;
      case 'Location':
        handleChangeFilter({
          cost: costSelected,
          language: languageSelected,
          location: value,
        });
        break;
      default:
    }
  });

  const radio = useCallback((filterName, filterOptions, value) => {
    return (
      <div className="radio-container">
        <h4 className="title">{filterName}</h4>
        <Radio.Group
          onChange={target => onChange(filterName, target.target.value)}
          value={value}
        >
          {filterOptions.map(option => (
            <Radio className="radio" value={option}>
              {option}
            </Radio>
          ))}
        </Radio.Group>
      </div>
    );
  });

  return (
    <div className="resources-filter">
      <Dropdown
        className="dropdown"
        overlay={radio('Cost', costs, costSelected)}
        placement="topLeft"
      >
        <Button className="button">Cost</Button>
      </Dropdown>
      <Dropdown
        className="dropdown"
        overlay={radio('Languages Offered', languages, languageSelected)}
        placement="topCenter"
      >
        <Button className="button">Languages Offered</Button>
      </Dropdown>
      <Dropdown
        className="dropdown"
        overlay={radio('Location', locations, locationSelected)}
        placement="topRight"
      >
        <Button className="button">Location</Button>
      </Dropdown>
      <ResourceFilterSearch handleChangeFilter={handleChangeFilter} />
    </div>
  );
}

ResourcesFilter.propTypes = {
  costs: PropTypes.arrayOf(PropTypes.string).isRequired,
  costSelected: PropTypes.string.isRequired,
  languages: PropTypes.arrayOf(PropTypes.string).isRequired,
  languageSelected: PropTypes.string.isRequired,
  locations: PropTypes.arrayOf(PropTypes.string).isRequired,
  locationSelected: PropTypes.string.isRequired,
  handleChangeFilter: PropTypes.func.isRequired,
};

export default ResourcesFilter;
