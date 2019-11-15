// @flow

import React, { useState, useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { AutoComplete } from 'antd';

import { getResources } from '../utils/api';
import '../css/ResourcesFilter.css';

type Props = {};

/*
on search have the resource grid be populated with the filtered results here
*/
const ResourceFilterSearch = (props: Props) => {
  const history = useHistory();
  const [allResources, setAllResources] = useState([]);
  const [allResourceNames, setAllResourceNames] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [searchDataSource, setSearchDataSource] = useState([]);

  const getResourceNames = useCallback(() => {
    getResources().then(res => {
      if (res !== null) {
        if (res.code === 200) {
          setAllResources(res.result);

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

  const filterSearchResults = useCallback(
    (input, option) =>
      option.props.children
        .toUpperCase()
        .substring(0, input.length)
        .indexOf(input.toUpperCase()) !== -1 ||
      option.props.children.toUpperCase().indexOf(input.toUpperCase()) !== -1,
  );

  const onSearchSelect = useCallback((value, option) => {
    const filteredResources = allResources.filter(
      resource => resource.name === value,
    );

    if (filteredResources.length > 0) {
      history.push(`/resources/${filteredResources[0]._id}`);
    }
  });

  useEffect(getResourceNames, []);

  return (
    <AutoComplete
      className="searchbar"
      dataSource={allResourceNames}
      placeholder="Search for a Resource"
      filterOption={filterSearchResults}
      onSelect={onSearchSelect}
    />
  );
};

export default ResourceFilterSearch;
