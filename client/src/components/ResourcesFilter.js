import React, { useCallback } from 'react';
import { Button, Dropdown, Radio } from 'antd';
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
    setCost,
    setLanguage,
    setLocation,
  } = props;

  const onChange = useCallback(
    (filterName, value) => {
      switch (filterName) {
        case 'Cost':
          setCost(value);
          break;
        case 'Languages Offered':
          setLanguage(value);
          break;
        case 'Location':
          setLocation(value);
          break;
        default:
      }
    },
    [setCost, setLanguage, setLocation],
  );

  const radio = useCallback(
    (filterName, filterOptions, value) => {
      return (
        <div className="radio-container">
          <h4 className="title">{filterName}</h4>
          <Radio.Group
            onChange={target => onChange(filterName, target.target.value)}
            value={value}
          >
            {filterOptions.map(option => (
              <Radio className="radio" key={option} value={option}>
                {option}
              </Radio>
            ))}
          </Radio.Group>
        </div>
      );
    },
    [onChange],
  );

  return (
    <div className="resources-filter">
      <Dropdown
        className="dropdown"
        overlay={radio('Cost', costs, costSelected)}
        placement="bottomLeft"
        trigger={['click']}
      >
        <Button className="button">Cost</Button>
      </Dropdown>
      <Dropdown
        className="dropdown"
        overlay={radio('Languages Offered', languages, languageSelected)}
        placement="bottomCenter"
        trigger={['click']}
      >
        <Button className="button">Languages Offered</Button>
      </Dropdown>
      <Dropdown
        className="dropdown"
        overlay={radio('Location', locations, locationSelected)}
        placement="bottomRight"
        trigger={['click']}
      >
        <Button className="button">Location</Button>
      </Dropdown>
      <ResourceFilterSearch />
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
  setCost: PropTypes.func.isRequired,
  setLanguage: PropTypes.func.isRequired,
  setLocation: PropTypes.func.isRequired,
};

export default ResourcesFilter;
