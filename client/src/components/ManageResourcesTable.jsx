// @flow

import React from 'react';
import { EditFilled } from '@ant-design/icons';
import { Select, Table, Tag } from 'antd';
import { editResourceCategories } from '../utils/api';
import type { Subcategory } from '../types/models';

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
  categories: {
    [string]: [Array<Subcategory>, number],
  },
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
  updateView: () => void,
};

const ManageResourcesTable = (props: Props) => {
  const {
    categories,
    selectedCategory,
    selectedSubcategory,
    resources,
    updateView,
  } = props;
  console.log(categories);

  const updateCategories = async (selectedValues, resource) => {
    const newCategories = [];
    const newSubcategories = [];
    selectedValues.forEach((selected) => {
      const tokens = selected.split('~');
      newCategories.push(tokens[0]);
      newSubcategories.push(tokens[1]);
    });
    await editResourceCategories(resource.id, newCategories, newSubcategories);
    await updateView();
  };

  const displayCategoryTags = (cats) => (
    <>
      {cats.map((c) => (
        <Tag key={c} color={CATEGORY_COLOR_DICT[c[0]?.toLowerCase()]}>
          {c}
        </Tag>
      ))}
    </>
  );

  const subcategoryTag = (tagProps, resource) => {
    const { label, value, closable, onClose } = tagProps;
    const tokens = value.split('~');
    const idx = resource.subcategories.indexOf(tokens[1]);

    return (
      <Tag
        color={
          resource.categories[idx]
            ? CATEGORY_COLOR_DICT[resource.categories[idx][0]?.toLowerCase()]
            : 'white'
        }
        closable={closable}
        onClose={onClose}
      >
        {label}
      </Tag>
    );
  };

  const displaySubcategoryTags = (resource) => (
    <Select
      mode="multiple"
      dropdownMatchSelectWidth={false}
      bordered={false}
      showArrow
      style={{ width: '100%' }}
      onChange={(e) => updateCategories(e, resource)}
      tagRender={(tagProps) => subcategoryTag(tagProps, resource)}
      value={resource.categoryPairs}
    >
      {Object.keys(categories).map((categoryName) => (
        <OptGroup key={categoryName} label={categoryName}>
          {categories[categoryName][0].map((subcat) => {
            const val = `${categoryName}~${subcat.name}`;
            return (
              <Option key={val} value={val}>
                {subcat.name}
              </Option>
            );
          })}
        </OptGroup>
      ))}
    </Select>
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
