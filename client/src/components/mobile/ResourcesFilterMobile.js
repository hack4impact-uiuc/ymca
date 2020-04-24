import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from 'antd';

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
        <b>Cost</b>
        {costs.map(cost => (
          <div className="filter-type" onClick={() => setTempCost(cost)}>
            {cost}
            {cost === tempCost && (
              <Icon type="check" style={{ float: 'right' }} />
            )}
          </div>
        ))}
      </div>
      <div className="filter-category">
        <b>Language</b>
        {languages.map(language => (
          <div
            className="filter-type"
            onClick={() => setTempLanguage(language)}
          >
            {language}
            {language === tempLanguage && (
              <Icon type="check" style={{ float: 'right' }} />
            )}
          </div>
        ))}
      </div>
      <div className="filter-category">
        <b>Location</b>
        {locations.map(location => (
          <div
            className="filter-type"
            onClick={() => setTempLocation(location)}
          >
            {location}
            {location === tempLocation && (
              <Icon type="check" style={{ float: 'right' }} />
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
  setFilterVisible: PropTypes.func.isRequired,
};

export default ResourcesFilterMobile;
