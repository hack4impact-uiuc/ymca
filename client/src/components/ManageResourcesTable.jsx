import React, { useState, useEffect } from 'react';
import { EditFilled } from '@ant-design/icons';
import { Table, Tag } from 'antd';

import { getResources } from '../utils/api';

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

const ManageResourcesTable = () => {
  const [resources, setResources] = useState([]);

  const displayTags = (categories) => (
    <div>
      {categories.map((c) => (
        <Tag key={c} color={TAG_COLOR_DICT[c[0].toLowerCase()]}>
          {c}
        </Tag>
      ))}
      <Tag
        onClick={() => window.location.reload()}
        style={{ cursor: 'pointer' }}
      >
        +
      </Tag>
    </div>
  );

  useEffect(() => {
    const fetchResources = async () => {
      // TODO: replace with getResourcesByCategory and getResourcesBySubcategory
      // add some states with values from sidebar and filter accordingly
      // TODO: use optimized get request
      const res = await getResources();
      const newResources = [];
      if (res != null) {
        res.result.forEach((r) => {
          newResources.push({
            name: r.name,
            description: r.description,
            categories: [...new Set(r.category)],
            subcategories: [...new Set(r.subcategory)],
            id: r._id.toString(),
          });
        });
      }
      setResources(newResources);
    };
    fetchResources();
  }, []);

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
        return displayTags(resource.categories);
      },
    },
    {
      title: 'Subcategories',
      render: function showSubcategories(_, resource) {
        return displayTags(resource.subcategories);
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
        dataSource={resources}
        pagination={{ hideOnSinglePage: true }}
      />
    </div>
  );
};

export default ManageResourcesTable;
