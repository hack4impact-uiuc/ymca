import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { EditFilled } from '@ant-design/icons';
import { Button, Menu, Dropdown, Table } from 'antd';

import { getResources } from '../utils/api';

const ManageResourcesTable = () => {
  const category = 'Education';
  const subcategory = 'Children Education';
  const [resources, setResources] = useState([]);

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
        return resource.categories.toString();
      },
    },
    {
      title: 'Subcategories',
      render: function showSubcategories(_, resource) {
        return resource.subcategories.toString();
      },
    },
    {
      title: ' ',
      render: function goToEditResource() {
        return (
          <NavLink exact to="/">
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
