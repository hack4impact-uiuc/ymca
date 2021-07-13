// @flow

import React, { useState, useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { SearchOutlined } from '@ant-design/icons';
import { AutoComplete, Input } from 'antd';
import { useIntl, defineMessages } from 'react-intl';

import { getResources } from '../utils/api';
import '../css/ResourcesFilter.css';

const { Option } = AutoComplete;

const messages = defineMessages({
  searchPlaceholder: {
    id: 'searchPlaceholder',
    defaultMessage: 'Search for a Resource',
  },
});

/*
on search have the resource grid be populated with the filtered results here
*/
const ResourceFilterSearch = (): React$Element<any> => {
  const history = useHistory();
  const intl = useIntl();

  const [allOptions, setAllOptions] = useState([]);
  const [allOptionsRep, setAllOptionsRep] = useState({});
  const [allCategories, setAllCategories] = useState(new Set());
  const [allSubcategories, setAllSubcategories] = useState(new Set());
  const [ascendantRelationMap, setAscendantRelationMap] = useState({});
  const [filterWhitelist, setFilterWhitelist] = useState([]);

  const populateOptions = useCallback(() => {
    getResources().then((res) => {
      if (res !== null) {
        if (res.code === 200) {
          const newOptions = [];
          const newAscendantRelationMap = {};

          const categoriesSet = new Set();
          const subcategoriesSet = new Set();
          const categoriesObj = {};

          Object.values(res.result.totalData).forEach((resource) => {
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

              if (!newAscendantRelationMap[resource._id]) {
                newAscendantRelationMap[resource._id] = new Set();
              }

              newAscendantRelationMap[resource._id].add(category);
              newAscendantRelationMap[resource._id].add(subcategory);

              categoriesObj[category][subcategory].push(resource._id);
            });
          });

          Object.keys(newAscendantRelationMap).forEach((resourceId) => {
            newAscendantRelationMap[resourceId] = Array.from(
              newAscendantRelationMap[resourceId],
            );
          });

          setAllOptionsRep(categoriesObj);

          Object.entries(categoriesObj).forEach(([category, subcategories]) => {
            console.log(category);
            newOptions.push(
              <Option
                className="rfs-category-option"
                key={category}
                label={category}
              >
                {intl.formatMessage({
                  id: `category-${category}`.replace(/\s/g, ''),
                  defaultMessage: category,
                })}
              </Option>,
            );

            Object.entries(subcategories).forEach(([subcategory]) => {
              newOptions.push(
                <Option
                  className="rfs-subcategory-option"
                  key={subcategory}
                  label={subcategory}
                >
                  {intl.formatMessage({
                    id: `subcategory-${subcategory}`.replace(/\s/g, ''),
                    defaultMessage: subcategory,
                  })}
                </Option>,
              );
            });
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
  }, [intl, setAllOptions]);

  const filterSearchResults = useCallback(
    (input, option) => {
      if (filterWhitelist.includes(option.props.key)) {
        return true;
      }

      if (
        option.props.children
          .toUpperCase()
          .substring(0, input.length)
          .indexOf(input.toUpperCase()) !== -1 ||
        option.props.children.toUpperCase().indexOf(input.toUpperCase()) !== -1
      ) {
        setFilterWhitelist(ascendantRelationMap[option.props.key]);
        return true;
      }
      return false;
    },
    [ascendantRelationMap, filterWhitelist],
  );

  const onSearchSelect = useCallback(
    (value) => {
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

  useEffect(populateOptions, [populateOptions]);

  return (
    <AutoComplete
      className="searchbar-filter"
      placeholder={intl.formatMessage(messages.searchPlaceholder)}
      dataSource={allOptions}
      filterOption={filterSearchResults}
      onSelect={onSearchSelect}
    >
      <Input suffix={<SearchOutlined />} />
    </AutoComplete>
  );
};

export default ResourceFilterSearch;
