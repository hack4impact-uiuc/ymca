// @flow

import React, { useState, useEffect } from 'react';
import { EditFilled } from '@ant-design/icons';
import { Select, Table, Tag } from 'antd';
import { getCategories, editResourceCategories } from '../utils/api';

const { Option, OptGroup } = Select;

const CATEGORY_COLOR_DICT = {
  a: 'blue',
  b: 'gold',
  c: 'volcano',
  d: 'volcano',
  e: 'green',
  f: 'magenta',
  g: 'orange',
  h: 'cyan',
  i: 'magenta',
  j: 'gold',
  k: 'purple',
  l: 'orange',
  m: 'green',
  n: 'green',
  o: 'purple',
  p: 'cyan',
  q: 'blue',
  r: 'blue',
  s: 'geekblue',
  t: 'volcano',
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
    categoryPairs: Array<string>,
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
  }, [fetchedCategories]);

  const updateCategories = (selectedValues, resource) => {
    const newCategories = [];
    const newSubcategories = [];
    selectedValues.forEach((selected) => {
      const tokens = selected.split('~');
      newCategories.push(tokens[0]);
      newSubcategories.push(tokens[1]);
    });
    editResourceCategories(resource.id, newCategories, newSubcategories);
  };

  const addCategoryAndSubcategory = (selected, resource) => {
    const tokens = selected.split('~');
    const newCategories = resource.categories;
    const newSubcategories = resource.subcategories;
    newCategories.push(tokens[0]);
    newSubcategories.push(tokens[1]);
    editResourceCategories(resource.id, newCategories, newSubcategories);
  };

  const removeCategoryAndSubcategory = (selected, resource) => {
    const idx = resource.subcategories.indexOf(selected);
    const newCategories = resource.categories;
    const newSubcategories = resource.subcategories;
    newCategories.splice(idx, 1);
    newSubcategories.splice(idx, 1);
    editResourceCategories(resource.id, newCategories, newSubcategories);
  };

  const displayCategoryTags = (categories) => (
    <>
      {categories.map((c) => (
        <Tag key={c} color={CATEGORY_COLOR_DICT[c[0]?.toLowerCase()]}>
          {c}
        </Tag>
      ))}
    </>
  );

  const displaySubcategoryTags = (resource) => (
    <>
      {resource.subcategories.map((c, idx) => (
        <Tag
          key={c}
          color={
            CATEGORY_COLOR_DICT[resource.categories[idx][0]?.toLowerCase()]
          }
        >
          <span>
            {c}
            <t
              onClick={() => removeCategoryAndSubcategory(c, resource)}
              style={{ marginLeft: '5px', cursor: 'pointer' }}
            >
              x
            </t>
          </span>
        </Tag>
      ))}
      <Select
        placeholder="+"
        showArrow={false}
        size="small"
        dropdownMatchSelectWidth={false}
        onChange={(e) => addCategoryAndSubcategory(e, resource)}
      >
        {/* <Select
        mode="multiple"
        defaultValue={resource.categoryPairs}
        dropdownMatchSelectWidth={false}
        bordered={false}
        style={{ width: '100%' }}
        onChange={(e) => updateCategories(e, resource)}
      > */}
        {fetchedCategories.map((cat) => (
          <OptGroup key={cat.name} label={cat.name}>
            {cat.subcategories.map((subcat) => {
              const val = `${cat.name}~${subcat}`;
              return (
                <Option key={val} value={val}>
                  {subcat}
                </Option>
              );
            })}
          </OptGroup>
        ))}
      </Select>
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
        return displayCategoryTags([...new Set(resource.categories)]);
      },
    },
    {
      title: 'Subcategories',
      render: function showSubcategories(_, resource) {
        return displaySubcategoryTags(resource);
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
