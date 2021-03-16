// @flow

import React, { useEffect, useState } from 'react';
import { Menu } from 'antd';
import {
  DownOutlined,
  UpOutlined,
  EditOutlined,
  CloseOutlined,
  PlusOutlined,
} from '@ant-design/icons';

import { getCategories } from '../utils/api';

import '../css/ResourceManager.css';

type Props = {
  categories: { [string]: Array<string> },
  categoryName: String,
};

const SidebarCategory = (props: Props) => {
  const { SubMenu } = Menu;

  const { categories, categoryName } = props;
  const [opened, setOpened] = useState(false);

  const handleChange = () => {
    setOpened(!opened);
  };

  return (
    <SubMenu
      {...props}
      title={
        <span>
          {categoryName}
          <span style={{ position: 'absolute', right: 15 }}>
            <EditOutlined />
            <CloseOutlined style={{ color: '#FF0000' }} />
          </span>
        </span>
      }
      icon={
        opened ? (
          <UpOutlined style={{ position: 'relative', top: -2 }} />
        ) : (
          <DownOutlined style={{ position: 'relative', top: -2 }} />
        )
      }
      onTitleClick={handleChange}
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
  );
};

const ResourceManager = () => {
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
        <SidebarCategory
          categories={categories}
          categoryName={categoryName}
          key={categoryName}
        />
      ))}
      <Menu.Item key="Add Category" className="subcategory">
        Add Category
        <PlusOutlined style={{ position: 'relative', top: 10 }} />
      </Menu.Item>
    </Menu>
  );
};

export default ResourceManager;
