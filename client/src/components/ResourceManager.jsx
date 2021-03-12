// @flow

import React, { useEffect, useState } from 'react';
import { Menu } from 'antd';
import { DownOutlined, EditOutlined, CloseOutlined } from '@ant-design/icons';

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
          title={categoryName}
          icon={<DownOutlined />}
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
        </SubMenu>
      ))}
    </Menu>
  );
};

export default ResourceManager;
