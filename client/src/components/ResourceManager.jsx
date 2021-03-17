// @flow

import React, { useEffect, useState } from 'react';
import { Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import { getCategories } from '../utils/api';

import '../css/ResourceManager.css';
import EditCategoryModal from './EditCategoryModal';

const ResourceManager = () => {
  const { SubMenu } = Menu;
  const [categories, setCategories] = useState<{ [string]: Array<string> }>({});
  const [categoryIds, setCategoryIds] = useState({});
  useEffect(() => {
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
                <EditCategoryModal
                  modalType="rename"
                  categoryType="subcategory"
                  subcategoryName={subCategory}
                  id={categoryIds[categoryName]}
                  categoryName={categoryName}
                />
                <EditCategoryModal
                  modalType="delete"
                  categoryType="subcategory"
                  subcategoryName={subCategory}
                  id={categoryIds[categoryName]}
                  categoryName={categoryName}
                />
              </div>
            </Menu.Item>
          ))}
        </SubMenu>
      ))}
    </Menu>
  );
};

export default ResourceManager;
