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

  const [options, setOptions] = useState([]);
  const [resourceToCategories, setResourceToCategories] = useState({});
  const [keysToShow, setKeysToShow] = useState([]);

  const populateOptions = useCallback(() => {
    getResources().then(res => {
      if (res !== null) {
        if (res.code === 200) {
          const optionsBlueprint = [];

          Object.values(res.result).forEach(resource => {
            resourceToCategories[resource.name] = {
              category: resource.category,
              subcategory: resource.subcategory,
            };

            resource.category.forEach((category, index) => {
              const subcategory = resource.subcategory[index];

              const filteredCategories = optionsBlueprint.filter(
                group => group.title === category,
              );
              const categoryGroupExists = filteredCategories.length > 0;
              const categoryGroup = categoryGroupExists
                ? filteredCategories[0]
                : { title: category, children: [] };

              const filteredSubcategories = categoryGroup.children.filter(
                group => group.title === subcategory,
              );
              const subcategoryGroupExists = filteredSubcategories.length > 0;
              const subcategoryGroup = subcategoryGroupExists
                ? filteredSubcategories[0]
                : { title: subcategory, children: [] };

              subcategoryGroup.children.push(resource.name);

              if (!subcategoryGroupExists) {
                categoryGroup.children.push(subcategoryGroup);
              }

              if (!categoryGroupExists) {
                optionsBlueprint.push(categoryGroup);
              }
            });
          });

          setOptions(
            optionsBlueprint.map(categoryGroup => (
              <OptGroup
                key={categoryGroup.title}
                label={<a>{categoryGroup.title}</a>}
              >
                {categoryGroup.children.map(subcategoryGroup => (
                  <OptGroup
                    key={subcategoryGroup.title}
                    label={<a>{subcategoryGroup.title}</a>}
                  >
                    {subcategoryGroup.children.map(resourceName => (
                      <Option key={resourceName} label={resourceName}>
                        {resourceName}
                      </Option>
                    ))}
                  </OptGroup>
                ))}
              </OptGroup>
            )),
          );
        } else {
          // show some error
        }
      }
      // also show error
    });
  }, [setOptions]);

  const existsInString = useCallback(
    (source, target) =>
      source
        .toUpperCase()
        .substring(0, target.length)
        .indexOf(target.toUpperCase) !== -1 ||
      source.toUpperCase().indexOf(target.toUpperCase()) !== -1,
    [],
  );

  const filterSearchResults = useCallback((input, option) => {
    if (option.type === Option && existsInString(option.key, input)) {
      setKeysToShow([
        ...keysToShow,
        option.key,
        ...resourceToCategories[option.key].category,
        ...resourceToCategories[option.key].subcategory,
      ]);
      return true;
    }
    if (
      option.type === OptGroup &&
      (existsInString(option.key, input) || keysToShow.includes(option.key))
    ) {
      return true;
    }
    console.log(keysToShow);
    return false;
  }, []);

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
      dataSource={options}
      filterOption={filterSearchResults}
      onSelect={onSearchSelect}
    >
      <Input suffix={<Icon type="search" />} />
    </AutoComplete>
  );
};

export default ResourceFilterSearch;
