import React, { useEffect, useState } from 'react';
import { AutoComplete, Button, Dropdown, Radio } from 'antd';
import PropTypes from 'prop-types';

import '../css/ResourcesFilter.css';

function ResourcesFilter(props) {
  const { costs, languages, locations, handleChangeFilter } = props;

  const [costValue, setCostValue] = useState(costs[0]);
  const [languageValue, setLanguageValue] = useState(languages[0]);
  const [locationValue, setLocationValue] = useState(locations[0]);

  useEffect(() => {
    handleChangeFilter(costValue, languageValue, locationValue);
  }, [costValue, languageValue, locationValue]);

  const radio = (filterName, filterOptions, onChange, value) => {
    return (
      <div className="radio-container">
        <h4 className="title">{filterName}</h4>
        <Radio.Group
          onChange={target => onChange(target.target.value)}
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
  };

  return (
    <div className="header-container">
      <Dropdown
        className="dropdown"
        overlay={radio('Cost', costs, setCostValue, costValue)}
        placement="topLeft"
      >
        <Button className="button">Cost</Button>
      </Dropdown>
      <Dropdown
        className="dropdown"
        overlay={radio('Language', languages, setLanguageValue, languageValue)}
        placement="topCenter"
      >
        <Button className="button">Language</Button>
      </Dropdown>
      <Dropdown
        className="dropdown"
        overlay={radio('Location', locations, setLocationValue, locationValue)}
        placement="topRight"
      >
        <Button className="button">Location</Button>
      </Dropdown>
      <AutoComplete className="searchbar" placeholder="Search for a Resource" />
    </div>
  );
}

ResourcesFilter.propTypes = {
  costs: PropTypes.arrayOf(PropTypes.string).isRequired,
  languages: PropTypes.arrayOf(PropTypes.string).isRequired,
  locations: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleChangeFilter: PropTypes.func.isRequired,
};

export default ResourcesFilter;
