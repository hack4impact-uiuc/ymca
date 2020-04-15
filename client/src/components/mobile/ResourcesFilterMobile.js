import React, { useCallback } from 'react';
import { Button, Dropdown, Radio } from 'antd';
import PropTypes from 'prop-types';

import ResourceFilterSearch from '../ResourceFilterSearch';

import '../../css_mobile/ResourcesFilterMobile.css';

function ResourcesFilterMobile(props) {
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
        <div className="radio-container-mobile">
          <h5 className="title-filter-mobile">{filterName}</h5>
          <Radio.Group
            onChange={target => onChange(filterName, target.target.value)}
            value={value}
          >
            {filterOptions.map(option => (
              <Radio className="radio-filter-mobile" key={option} value={option}>
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
    <div className="resources-filter-mobile">
      <div className="filter-search-mobile" align="center">
        <ResourceFilterSearch />
      </div>
      <div className="dropdown-filter" align="left">
        <Dropdown
          overlay={radio('Cost', costs, costSelected)}
          placement="bottomLeft"
          trigger={['click']}
        >
          <Button className="button-mobile">Cost</Button>
        </Dropdown>{' '}
        <Dropdown
          overlay={radio('Languages Offered', languages, languageSelected)}
          placement="bottomLeft"
          trigger={['click']}
        >
          <Button className="button-mobile">Language</Button>
        </Dropdown>{' '}
        <Dropdown
          overlay={radio('Location', locations, locationSelected)}
          placement="bottomLeft"
          trigger={['click']}
        >
          <Button className="button-mobile">Location</Button>
        </Dropdown>
      </div>
    </div>
  );
}

ResourcesFilterMobile.propTypes = {
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

export default ResourcesFilterMobile;
