// @flow

import React, { useState, useCallback, useEffect, useReducer } from 'react';
import { useHistory } from 'react-router-dom';
import { AutoComplete, Icon, Input } from 'antd';

import { getResources } from '../utils/api';
import '../css/ResourcesFilter.css';

const { Option, OptGroup } = AutoComplete;

/*
on search have the resource grid be populated with the filtered results here
*/
const ResourceFilterSearch = () => {
  const history = useHistory();

  const [allOptions, setAllOptions] = useState([]);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [allOptionsRep, setAllOptionsRep] = useState({});
  const [filteredOptionsRep, setFilteredOptionsRep] = useState({});

  const populateOptions = useCallback(() => {
    getResources().then(res => {
      if (res !== null) {
        if (res.code === 200) {
          const newOptions = [];
          const categories = {};

          Object.values(res.result).forEach(resource => {
            resource.category.forEach((category, index) => {
              if (!categories[category]) {
                categories[category] = {};
              }

              const subcategory = resource.subcategory[index];

              if (!categories[category][subcategory]) {
                categories[category][subcategory] = [];
              }

              categories[category][subcategory].push(resource.name);
            });
          });

          setAllOptionsRep(categories);
          setFilteredOptionsRep(categories);

          Object.entries(categories).forEach(([category, subcategories]) => {
            newOptions.push(
              <Option
                className="rfs-category-option"
                key={category}
                label={category}
              >
                {category}
              </Option>,
            );

            Object.entries(subcategories).forEach(
              ([subcategory, resourceNames]) => {
                newOptions.push(
                  <Option
                    className="rfs-subcategory-option"
                    key={subcategory}
                    label={subcategory}
                  >
                    {subcategory}
                  </Option>,
                );

                resourceNames.forEach(name => {
                  newOptions.push(
                    <Option
                      className="rfs-res-name-option"
                      key={name}
                      label={name}
                    >
                      {name}
                    </Option>,
                  );
                });
              },
            );
          });

          setAllOptions(newOptions);
          setFilteredOptions(newOptions);
        } else {
          // show some error
        }
      }
      // also show error
    });
  }, [setAllOptions]);

  // const filterSearchResults = useCallback(
  //   (input, option) =>
  //     option.key
  //       .toUpperCase()
  //       .substring(0, input.length)
  //       .indexOf(input.toUpperCase()) !== -1 ||
  //     option.key.toUpperCase().indexOf(input.toUpperCase()) !== -1,
  //   [],
  // );

  const filterSearchResults = useCallback((input, option) => {
    const keyUpper = option.key.toUpperCase();

    if (
      keyUpper.substring(0, input.length).indexOf(input.toUpperCase()) !== -1 ||
      keyUpper.indexOf(input.toUpperCase()) !== -1
    ) {
      return true;
    }

    return false;
  });

  const onSearchSelect = useCallback(
    value => {
      history.push(`/resources/${value}`);
    },
    [history],
  );

  useEffect(populateOptions, []);

  return (
    <AutoComplete
      className="searchbar-filter"
      placeholder="Search for a Resource"
      dataSource={filteredOptions}
      filterOption={filterSearchResults}
      onSelect={onSearchSelect}
    >
      <Input suffix={<Icon type="search" />} />
    </AutoComplete>
  );
};

export default ResourceFilterSearch;
