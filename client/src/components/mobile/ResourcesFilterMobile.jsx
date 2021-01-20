import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { CheckOutlined } from '@ant-design/icons';
import { Button } from 'antd';

import '../../css/ResourcesFilterMobile.css';

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
    filterVisible,
    setFilterVisible,
  } = props;

  const [tempCost, setTempCost] = useState(costSelected);
  const [tempLanguage, setTempLanguage] = useState(languageSelected);
  const [tempLocation, setTempLocation] = useState(locationSelected);

  useEffect(() => {
    setTempCost(costSelected);
    setTempLanguage(languageSelected);
    setTempLocation(locationSelected);
  }, [costSelected, languageSelected, locationSelected, filterVisible]);

  const applyFilters = useCallback(() => {
    setCost(tempCost);
    setLanguage(tempLanguage);
    setLocation(tempLocation);
    setFilterVisible(false);
  }, [
    setCost,
    setFilterVisible,
    setLanguage,
    setLocation,
    tempCost,
    tempLanguage,
    tempLocation,
  ]);

  return (
    <>
      <div className="filter-category filter-top">
        <div className="filter-title">
          <b>Cost</b>
        </div>
        {costs.map((cost) => (
          <div className="filter-type" onClick={() => setTempCost(cost)}>
            {cost}
            {cost === tempCost && <CheckOutlined style={{ float: 'right' }} />}
          </div>
        ))}
      </div>
      <div className="filter-category">
        <div className="filter-title">
          <b>Language</b>
        </div>
        {languages.map((language) => (
          <div
            className="filter-type"
            onClick={() => setTempLanguage(language)}
          >
            {language}
            {language === tempLanguage && (
              <CheckOutlined style={{ float: 'right' }} />
            )}
          </div>
        ))}
      </div>
      <div className="filter-category">
        <div className="filter-title">
          <b>Location</b>
        </div>
        {locations.map((location) => (
          <div
            className="filter-type"
            onClick={() => setTempLocation(location)}
          >
            {location}
            {location === tempLocation && (
              <CheckOutlined style={{ float: 'right' }} />
            )}
          </div>
        ))}
      </div>
      <div className="apply-button">
        <Button
          type="primary"
          shape="round"
          size="large"
          onClick={applyFilters}
        >
          Apply Filters
        </Button>
      </div>
    </>
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
  filterVisible: PropTypes.bool.isRequired,
  setFilterVisible: PropTypes.func.isRequired,
};

export default ResourcesFilterMobile;
