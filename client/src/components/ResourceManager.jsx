// @flow

import React, { useEffect, useState } from 'react';
import { Menu } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';

import { getCategories } from '../utils/api';

import '../css/ResourceManager.css';
import EditCategoryModal from './EditCategoryModal';

type Props = {
  categories: { [string]: Array<string> },
  categoryName: string,
  categoryIds: { [string]: Array<string> },
  fetchCategories: () => void,
};

const SidebarCategory = (props: Props) => {
  const { SubMenu } = Menu;

  const { categories, categoryName, categoryIds, fetchCategories } = props;
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
            <EditCategoryModal
              modalType="rename"
              categoryType="category"
              id={categoryIds[categoryName]}
              categoryName={categoryName}
              fetchCategories={fetchCategories}
            />
            <EditCategoryModal
              modalType="delete"
              categoryType="category"
              id={categoryIds[categoryName]}
              categoryName={categoryName}
              fetchCategories={fetchCategories}
            />
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
            <EditCategoryModal
              modalType="rename"
              categoryType="subcategory"
              subcategoryName={subCategory}
              id={categoryIds[categoryName]}
              categoryName={categoryName}
              fetchCategories={fetchCategories}
            />
            <EditCategoryModal
              modalType="delete"
              categoryType="subcategory"
              subcategoryName={subCategory}
              id={categoryIds[categoryName]}
              categoryName={categoryName}
              fetchCategories={fetchCategories}
            />
          </div>
        </Menu.Item>
      ))}
      <Menu.Item
        key={categoryIds[categoryName].toString().concat('-add-subcategory')}
        className="subcategory"
      >
        Add Subcategory
        <EditCategoryModal
          modalType="add"
          categoryType="subcategory"
          id={categoryIds[categoryName]}
          categoryName={categoryName}
          fetchCategories={fetchCategories}
        />
      </Menu.Item>
    </SubMenu>
  );
};

const ResourceManager = () => {
  const [categories, setCategories] = useState<{ [string]: Array<string> }>({});
  const [categoryIds, setCategoryIds] = useState({});

  const fetchCategories = async () => {
    const res = await getCategories();
    const newCategories = {};
    const ids = {};
    if (res != null) {
      res.result.forEach((c) => {
        newCategories[c.name] = c.subcategories;
        ids[c.name] = c._id;
      });
    }
    setCategories(newCategories);
    setCategoryIds(ids);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <Menu style={{ width: 280 }} mode="inline" expandIcon={<div />}>
      {Object.keys(categories).map((categoryName) => (
        <SidebarCategory
          categories={categories}
          categoryName={categoryName}
          key={categoryName}
          categoryIds={categoryIds}
          fetchCategories={fetchCategories}
        />
      ))}
      <Menu.Item key="Add Category" className="subcategory">
        Add Category
        <EditCategoryModal
          modalType="add"
          categoryType="category"
          fetchCategories={fetchCategories}
        />
      </Menu.Item>
    </Menu>
  );
};

export default ResourceManager;
