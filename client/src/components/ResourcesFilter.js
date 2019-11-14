import React, { useCallback, useEffect, useState } from 'react';
import { AutoComplete, Button, Dropdown, Radio } from 'antd';
import PropTypes from 'prop-types';

import { getCategories, getResources } from '../utils/api';

import '../css/ResourcesFilter.css';

const { Option, OptGroup } = AutoComplete;

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

  const [allResourceNames, setAllResourceNames] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [searchDataSource, setSearchDataSource] = useState([]);

  const onChange = useCallback((filterName, value) => {
    switch (filterName) {
      case 'Cost':
        handleChangeFilter(value, languageSelected, locationSelected);
        break;
      case 'Languages Offered':
        handleChangeFilter(costSelected, value, locationSelected);
        break;
      case 'Location':
        handleChangeFilter(costSelected, languageSelected, value);
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

  const getResourceNames = useCallback(() => {
    getResources().then(res => {
      if (res !== null) {
        if (res.code === 200) {
          // there exists null required values in the resource data structures?!
          setAllResourceNames(
            Object.values(res.result).map(resource =>
              resource.name !== null ? resource.name : '_',
            ),
          );
        } else {
          // show some error
        }
      }
      // also show error
    });
  });

  const getCategoryNames = useCallback(() => {
    getCategories().then(res => {
      if (res !== null) {
        if (res.code === 200) {
          setAllCategories(res.result);
        } else {
          // show err
        }
      }
      // show err
    });
  });

  const generateOptions = useCallback(() => {
    const options = [];

    return options;
  }, [allResourceNames, allCategories]);

  const filterSearchResults = useCallback(
    (input, option) =>
      option.props.children
        .toUpperCase()
        .substring(0, input.length)
        .indexOf(input.toUpperCase()) !== -1 ||
      option.props.children.toUpperCase().indexOf(input.toUpperCase()) !== -1,
  );

  useEffect(getResourceNames, []);
  useEffect(getCategoryNames, []);

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
      <AutoComplete
        className="searchbar"
        dataSource={[
          <OptGroup key="category" label="Category">
            <OptGroup key="subcategory" label="Subcategory">
              <Option key="value" value="value">
                value
              </Option>
            </OptGroup>
          </OptGroup>,
        ]}
        placeholder="Search for a Resource"
        filterOption={filterSearchResults}
      />
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
