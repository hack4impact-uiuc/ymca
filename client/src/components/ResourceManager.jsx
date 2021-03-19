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

import ManageResourcesTable from './ManageResourcesTable';

import '../css/ResourceManager.css';

type Props = {
  categories: { [string]: Array<string> },
  categoryName: String,
};

const SidebarCategory = (props: Props) => {
  const { SubMenu } = Menu;

  const {
    categories,
    categoryName,
    setSelectedCategory,
    setSelectedSubcategory,
  } = props;
  const [opened, setOpened] = useState(false);

  const handleChange = () => {
    setOpened(!opened);
    if (!opened) setSelectedCategory(categoryName);
    else {
      setSelectedCategory('');
      setSelectedSubcategory('');
    }
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
      {categories[categoryName].map((subcategory) => (
        <Menu.Item
          key={subcategory}
          className="resource-manager-sidebar-category"
          onClick={() => {
            setSelectedSubcategory(subcategory);
            setSelectedCategory(categoryName);
          }}
        >
          {subcategory}
          <div>
            <EditOutlined />
            <CloseOutlined style={{ color: '#FF0000' }} />
          </div>
        </Menu.Item>
      ))}
      <Menu.Item
        key="Add Subcategory"
        className="resource-manager-sidebar-category"
      >
        Add Subcategory
        <PlusOutlined style={{ position: 'relative', top: 10 }} />
      </Menu.Item>
    </SubMenu>
  );
};

const ResourceManager = () => {
  const [categories, setCategories] = useState<{ [string]: Array<string> }>({});
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');

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
    <div className="resource-manager-flexbox">
      <div className="resource-manager-sidebar">
        <Menu mode="inline" expandIcon={<div />}>
          {Object.keys(categories).map((categoryName) => (
            <SidebarCategory
              categories={categories}
              categoryName={categoryName}
              key={categoryName}
              setSelectedCategory={setSelectedCategory}
              setSelectedSubcategory={setSelectedSubcategory}
            />
          ))}
          <Menu.Item
            key="Add Category"
            className="resource-manager-sidebar-category"
          >
            Add Category
            <PlusOutlined style={{ position: 'relative', top: 10 }} />
          </Menu.Item>
        </Menu>
      </div>
      <div className="resource-manager-table">
        <ManageResourcesTable
          selectedCategory={selectedCategory}
          selectedSubcategory={selectedSubcategory}
        />
      </div>
    </div>
  );
};

export default ResourceManager;
