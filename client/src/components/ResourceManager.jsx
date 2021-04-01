// @flow

import React, { useCallback, useEffect, useState } from 'react';
import { Menu } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';

import { getCategories, getResources } from '../utils/api';

import ManageResourcesTable from './ManageResourcesTable';

import '../css/ResourceManager.css';
import EditCategoryModal from './EditCategoryModal';

type Props = {
  categories: { [string]: Array<string> },
  categoryName: string,
  updateView: () => void,
};

const SidebarCategory = (props: Props) => {
  const { SubMenu } = Menu;

  const {
    categories,
    categoryName,
    setSelectedCategory,
    setSelectedSubcategory,
    updateView,
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
            <EditCategoryModal
              modalType="rename"
              categoryType="category"
              id={categories[categoryName][1]}
              categoryName={categoryName}
              updateView={updateView}
            />
            <EditCategoryModal
              modalType="delete"
              categoryType="category"
              id={categories[categoryName][1]}
              categoryName={categoryName}
              updateView={updateView}
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
      {categories[categoryName][0].map((subcategory) => {
        console.log(categories, categoryName);
        return (
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
              <EditCategoryModal
                modalType="rename"
                categoryType="subcategory"
                subcategoryName={subcategory}
                id={categories[categoryName][1]}
                categoryName={categoryName}
                updateView={updateView}
              />
              <EditCategoryModal
                modalType="delete"
                categoryType="subcategory"
                subcategoryName={subcategory}
                id={categories[categoryName][1]}
                categoryName={categoryName}
                updateView={updateView}
              />
            </div>
          </Menu.Item>
        );
      })}
      <Menu.Item
        key={categories[categoryName][1].toString().concat('-add-subcategory')}
        className="resource-manager-sidebar-category"
      >
        Add Subcategory
        <EditCategoryModal
          modalType="add"
          categoryType="subcategory"
          id={categories[categoryName][1]}
          categoryName={categoryName}
          updateView={updateView}
        />
      </Menu.Item>
    </SubMenu>
  );
};

const ResourceManager = () => {
  // Category: [subcategories, _id]
  const [categories, setCategories] = useState<{
    [string]: [Array<string>, number],
  }>({});
  const [resources, setResources] = useState<
    Array<{
      name: string,
      description: string,
      categories: Array<string>,
      subcategories: Array<string>,
      id: string,
    }>,
  >([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');

  const fetchCategories = async () => {
    const res = await getCategories();
    const newCategories = {};
    if (res != null) {
      res.result.forEach((c) => {
        newCategories[c.name] = [c.subcategories, c._id];
      });
      setCategories(newCategories);
    }
  };

  const fetchResources = async () => {
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
    console.log(newResources);
    setResources(newResources);
  };

  const updateView = useCallback(async () => {
    await Promise.all([fetchCategories(), fetchResources()]);
  }, []);

  useEffect(() => {
    updateView();
  }, [updateView]);

  return (
    <div className="resource-manager-flexbox">
      <div className="resource-manager-sidebar">
        <Menu mode="inline" expandIcon={<div />}>
          {Object.keys(categories).map((categoryName) => (
            <SidebarCategory
              categories={categories}
              categoryName={categoryName}
              key={categoryName}
              updateView={updateView}
              setSelectedCategory={setSelectedCategory}
              setSelectedSubcategory={setSelectedSubcategory}
            />
          ))}
          <Menu.Item
            key="Add Category"
            className="resource-manager-sidebar-category"
          >
            Add Category
            <EditCategoryModal
              modalType="add"
              categoryType="category"
              updateView={updateView}
            />
          </Menu.Item>
        </Menu>
      </div>
      <div className="resource-manager-table">
        <ManageResourcesTable
          selectedCategory={selectedCategory}
          selectedSubcategory={selectedSubcategory}
          resources={resources}
        />
      </div>
    </div>
  );
};

export default ResourceManager;
