// @flow

import React, { useState, useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { AutoComplete } from 'antd';

import { getResources } from '../utils/api';
import '../css/ResourcesFilter.css';

const { Option } = AutoComplete;

/*
on search have the resource grid be populated with the filtered results here
*/
const ResourceFilterSearch = () => {
  const history = useHistory();

  const [allResourceOptions, setAllResourceOptions] = useState([]);

  const getResourceNames = useCallback(() => {
    getResources().then(res => {
      if (res !== null) {
        if (res.code === 200) {
          setAllResourceOptions(
            Object.values(res.result).map(resource => (
              <Option key={resource.name} value={resource._id}>
                {resource.name !== null ? resource.name : '_'}
              </Option>
            )),
          );
        } else {
          // show some error
        }
      }
      // also show error
    });
  }, [setAllResourceOptions]);

  const filterSearchResults = useCallback(
    (input, option) =>
      option.props.children
        .toUpperCase()
        .substring(0, input.length)
        .indexOf(input.toUpperCase()) !== -1 ||
      option.props.children.toUpperCase().indexOf(input.toUpperCase()) !== -1,
    [],
  );

  const onSearchSelect = useCallback(
    value => {
      history.push(`/resources/${value}`);
    },
    [history],
  );

  useEffect(getResourceNames, []);

  return (
    <AutoComplete
      className="searchbar"
      dataSource={allResourceOptions}
      placeholder="Search for a Resource"
      filterOption={filterSearchResults}
      onSelect={onSearchSelect}
    />
  );
};

export default ResourceFilterSearch;
