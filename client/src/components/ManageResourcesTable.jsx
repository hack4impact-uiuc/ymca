import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { EditFilled } from '@ant-design/icons';
import { Button, Menu, Dropdown, Table, Tag } from 'antd';

import { getResources } from '../utils/api';

const ManageResourcesTable = () => {
  const category = 'Education';
  const subcategory = 'Children Education';
  const [resources, setResources] = useState([]);

  const colorMap = {
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

  const displayTags = (categories) => (
    <div>
      {categories.map((c) => (
        <Tag key={c} color={colorMap[c[0].toLowerCase()]}>
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
      // TODO: replace with optimized get request
      const res = await getResources();
      const newCategories = [];
      console.log(res.result);
      if (res != null) {
        res.result.forEach((r) => {
          newCategories.push({
            name: r.name,
            description: r.description,
            categories: r.category,
            subcategories: r.subcategory,
            id: r._id.toString(),
          });
        });
      }
      setResources(newCategories);
    };
    fetchResources();
  }, []);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
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
          <NavLink
            to={`/admin/${resource.id}`}
            onClick={() => window.location.reload()}
          >
            <EditFilled />
          </NavLink>
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
