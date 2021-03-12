// @flow

import React, { useEffect, useState } from 'react';
import { Menu } from 'antd';
import {
  DownOutlined,
  EditOutlined,
  CloseOutlined,
  PlusOutlined,
} from '@ant-design/icons';

import { getCategories } from '../utils/api';

import '../css/ResourceManager.css';

const ResourceManager = () => {
  const { SubMenu } = Menu;
  const [categories, setCategories] = useState<{ [string]: Array<string> }>({});

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await getCategories();
      const newCategories = {};
      if (res != null) {
        res.result.forEach((c) => {
          newCategories[c.name] = c.subcategories;
        });
      }
      setCategories(newCategories);
    };

    fetchCategories();
  }, []);

  return (
    <Menu style={{ width: 280 }} mode="inline" expandIcon={<div />}>
      {Object.keys(categories).map((categoryName) => (
        <SubMenu
          key={categoryName}
          title={
            <React.Fragment style="display: flex; justify-content: flex-end">
              {categoryName}
              <>
                <EditOutlined />
                <CloseOutlined style={{ color: '#FF0000' }} />
              </>
            </React.Fragment>
          }
          icon={<DownOutlined style={{ position: 'relative', top: -2 }} />}
        >
          {categories[categoryName].map((subCategory) => (
            <Menu.Item key={subCategory} className="subcategory">
              {subCategory}
              <div>
                <EditOutlined />
                <CloseOutlined style={{ color: '#FF0000' }} />
              </div>
            </Menu.Item>
          ))}
          <Menu.Item key="Add Subcategory" className="subcategory">
            Add Subcategory
            <PlusOutlined style={{ position: 'relative', top: 10 }} />
          </Menu.Item>
        </SubMenu>
      ))}
      <Menu.Item key="Add Category" className="subcategory">
        Add Category
        <PlusOutlined style={{ position: 'relative', top: 10 }} />
      </Menu.Item>
    </Menu>
  );
};

export default ResourceManager;
