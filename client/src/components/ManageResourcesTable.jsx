// @flow

import React, { useState, useEffect } from 'react';
import { EditFilled } from '@ant-design/icons';
import { Select, Table, Tag } from 'antd';
import { CAT_SUB_SPLITTER } from './ResourceCategorySelector';
import { getCategories } from '../utils/api';

const { Option, OptGroup } = Select;

const TAG_COLOR_DICT = {
  a: 'blue',
  b: 'gold',
  c: 'red',
  d: 'volcano',
  e: 'green',
  f: 'geekblue',
  g: 'orange',
  h: 'cyan',
  i: 'magenta',
  j: 'gold',
  k: 'purple',
  l: 'purple',
  m: 'green',
  n: 'green',
  o: 'blue',
  p: 'cyan',
  q: 'blue',
  r: 'blue',
  s: 'geekblue',
  t: 'geekblue',
  u: 'purple',
  v: 'purple',
  w: 'purple',
  x: 'purple',
  y: 'purple',
  z: 'purple',
};

type Props = {
  selectedCategory: string,
  selectedSubcategory: string,
  resources: Array<{
    name: string,
    description: string,
    categories: Array<string>,
    subcategories: Array<string>,
    id: string,
  }>,
};

const ManageResourcesTable = (props: Props) => {
  const { selectedCategory, selectedSubcategory, resources } = props;

  const [fetchedCategories, setFetchedCategories] = useState([]);

  useEffect(() => {
    getCategories().then((res) => {
      if (res !== null) {
        if (res.code === 200) {
          setFetchedCategories(res.result);
        }
      }
    });
  }, []);

  const displayTags = (categories, displayDropdown) => (
    <>
      {categories.map((c) => (
        <Tag key={c} color={TAG_COLOR_DICT[c[0].toLowerCase()]}>
          {c}
        </Tag>
      ))}
      {displayDropdown && (
        <Select
          placeholder="+"
          showArrow={false}
          style={{ width: '250px' }}
          // onChange={onCategoryChange}
        >
          {fetchedCategories.map((cat) => (
            <OptGroup key={cat.name} label={cat.name}>
              {cat.subcategories.map((subcat) => {
                const val = `${cat.name}${CAT_SUB_SPLITTER}${subcat}`;
                return (
                  <Option key={val} value={val}>
                    {subcat}
                  </Option>
                );
              })}
            </OptGroup>
          ))}
        </Select>
      )}
    </>
  );

  const filterResources = (resource) =>
    !selectedCategory ||
    (!selectedSubcategory && resource.categories.includes(selectedCategory)) ||
    (resource.categories.includes(selectedCategory) &&
      resource.subcategories.includes(selectedSubcategory));

  function compareNames(current, next) {
    const textCurrent = current.name.toUpperCase();
    const textNext = next.name.toUpperCase();
    const bool = textCurrent > textNext ? 1 : 0;
    return textCurrent < textNext ? -1 : bool;
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      defaultSortOrder: 'ascend',
      sorter: compareNames,
    },
    {
      title: 'Description',
      render: function truncateDescription(_, resource) {
        return resource.description.length < 100
          ? resource.description
          : `${resource.description.substring(0, 99)}...`;
      },
    },
    {
      title: 'Categories',
      render: function showCategories(_, resource) {
        return displayTags(resource.categories, false);
      },
    },
    {
      title: 'Subcategories',
      render: function showSubcategories(_, resource) {
        return displayTags(resource.subcategories, true);
      },
    },
    {
      title: ' ',
      render: function goToEditResource(_, resource) {
        return (
          <a href={`/admin/${resource.id}`}>
            <EditFilled />
          </a>
        );
      },
    },
  ];

  return (
    <div align="center">
      <Table
        columns={columns}
        dataSource={resources.filter(filterResources)}
        pagination={{ hideOnSinglePage: true }}
      />
    </div>
  );
};

export default ManageResourcesTable;
