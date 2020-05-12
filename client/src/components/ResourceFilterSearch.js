// @flow

import React, { useState, useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { AutoComplete, Icon, Input } from 'antd';

import { getResources } from '../utils/api';
import '../css/ResourcesFilter.css';

const { Option } = AutoComplete;

/*
on search have the resource grid be populated with the filtered results here
*/
const ResourceFilterSearch = () => {
  const history = useHistory();

  const [allOptions, setAllOptions] = useState([]);
  const [allOptionsRep, setAllOptionsRep] = useState({});
  const [allCategories, setAllCategories] = useState(new Set());
  const [allSubcategories, setAllSubcategories] = useState(new Set());
  const [ascendantRelationMap, setAscendantRelationMap] = useState({});
  const [filterWhitelist, setFilterWhitelist] = useState([]);

  const populateOptions = useCallback(() => {
    getResources().then(res => {
      if (res !== null) {
        if (res.code === 200) {
          const newOptions = [];
          const newAscendantRelationMap = {};

          const categoriesSet = new Set();
          const subcategoriesSet = new Set();
          const categoriesObj = {};

          Object.values(res.result).forEach(resource => {
            newOptions.push(
              <Option key={resource._id} label={resource.name}>
                {resource.name}
              </Option>,
            );

            resource.category.forEach((category, index) => {
              if (!categoriesObj[category]) {
                categoriesObj[category] = {};
              }

              const subcategory = resource.subcategory[index];
              newAscendantRelationMap[subcategory] = [category];

              if (!newAscendantRelationMap[category]) {
                newAscendantRelationMap[category] = [];
              }

              newAscendantRelationMap[category].push(subcategory);

              categoriesSet.add(category);
              subcategoriesSet.add(subcategory);

              if (!categoriesObj[category][subcategory]) {
                categoriesObj[category][subcategory] = [];
              }

              if (!newAscendantRelationMap[resource.name]) {
                newAscendantRelationMap[resource.name] = new Set();
              }

              newAscendantRelationMap[resource.name].add(category);
              newAscendantRelationMap[resource.name].add(subcategory);

              categoriesObj[category][subcategory].push(resource.name);
            });

            newAscendantRelationMap[resource.name] = Array.from(
              newAscendantRelationMap[resource.name],
            );
          });

          setAllOptionsRep(categoriesObj);

          Object.entries(categoriesObj).forEach(([category, subcategories]) => {
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
              },
            );
          });

          setAllOptions(newOptions);
          setAllCategories(categoriesSet);
          setAllSubcategories(subcategoriesSet);
          setAscendantRelationMap(newAscendantRelationMap);
        } else {
          // show some error
        }
      }
      // also show error
    });
  }, [setAllOptions]);

  const filterSearchResults = useCallback(
    (input, option) => {
      if (filterWhitelist.includes(option.props.children)) {
        return true;
      }

      if (
        option.props.children
          .toUpperCase()
          .substring(0, input.length)
          .indexOf(input.toUpperCase()) !== -1 ||
        option.props.children.toUpperCase().indexOf(input.toUpperCase()) !== -1
      ) {
        setFilterWhitelist(ascendantRelationMap[option.props.children]);
        return true;
      }
      return false;
    },
    [ascendantRelationMap, filterWhitelist],
  );

  const onSearchSelect = useCallback(
    value => {
      if (allCategories.has(value)) {
        history.push(`/resources?category=${value}`);
      } else if (allSubcategories.has(value)) {
        const category = Object.entries(allOptionsRep).filter(
          ([_, subcategories]) => subcategories[value],
        )[0][0];
        history.push(`/resources?category=${category}&subcategory=${value}`);
      } else {
        history.push(`/resources/${value}`);
      }
    },
    [history, allCategories, allSubcategories, allOptionsRep],
  );

  useEffect(populateOptions, []);

  return (
    <AutoComplete
      className="searchbar-filter"
      placeholder="Search for a Resource"
      dataSource={allOptions}
      filterOption={filterSearchResults}
      onSelect={onSearchSelect}
    >
      <Input suffix={<Icon type="search" />} />
    </AutoComplete>
  );
};

export default ResourceFilterSearch;
