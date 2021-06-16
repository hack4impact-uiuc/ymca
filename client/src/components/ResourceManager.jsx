// @flow

import React, { useCallback, useEffect, useState } from 'react';
import { Menu, Button } from 'antd';
import { DownOutlined, UpOutlined, ExportOutlined } from '@ant-design/icons';

import { getCategories, getResources } from '../utils/api';
import type { Subcategory } from '../types/models';

import ManageResourcesTable from './ManageResourcesTable';
import ResourcesBreadcrumb from './ResourcesBreadcrumb';

import '../css/ResourceManager.css';
import EditCategoryModal from './EditCategoryModal';

const { SubMenu } = Menu;

type Props = {
  categories: { [string]: [Array<Subcategory>, number] },
  categoryName: string,
  isOpen: boolean,
  setSelectedCategory: (string) => void,
  setSelectedSubcategory: (string) => void,
  updateView: () => void,
};

const SidebarCategory = (props: Props) => {
  const {
    categories,
    categoryName,
    isOpen,
    setSelectedCategory,
    setSelectedSubcategory,
    updateView,
  } = props;
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
        isOpen ? (
          <UpOutlined style={{ position: 'relative', top: -2 }} />
        ) : (
          <DownOutlined style={{ position: 'relative', top: -2 }} />
        )
      }
    >
      {categories[categoryName][0].map((subcategory) => (
        <Menu.Item
          key={subcategory.name}
          className="resource-manager-sidebar-category"
          onClick={() => {
            setSelectedSubcategory(subcategory.name);
            setSelectedCategory(categoryName);
          }}
        >
          {subcategory.name}
          <div>
            <EditCategoryModal
              modalType="rename"
              categoryType="subcategory"
              subcategoryName={subcategory.name}
              subcategoryId={subcategory._id}
              id={categories[categoryName][1]}
              categoryName={categoryName}
              updateView={updateView}
            />
            <EditCategoryModal
              modalType="delete"
              categoryType="subcategory"
              subcategoryName={subcategory.name}
              subcategoryId={subcategory._id}
              id={categories[categoryName][1]}
              categoryName={categoryName}
              updateView={updateView}
            />
          </div>
        </Menu.Item>
      ))}
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
    [string]: [Array<Subcategory>, number],
  }>({});
  const [resources, setResources] = useState<
    Array<{
      name: string,
      description: string,
      categories: Array<string>,
      subcategories: Array<string>,
      categoryPairs: Array<string>,
      lastUpdated: Date,
      id: string,
    }>,
  >([]);
  const [selectedCategory, setSelectedCategory] = useState('All Resources');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [openKeys, setOpenKeys] = useState<Array<string>>([]);

  const fetchCategories = async () => {
    const res = await getCategories();
    const newCategories = {};
    if (res !== null && res !== undefined) {
      res.result.forEach((c) => {
        newCategories[c.name] = [c.subcategories, c._id];
      });
      setCategories(newCategories);
    }
  };

  const fetchResources = async () => {
    const res = await getResources();
    const newResources = [];
    if (res !== null && res !== undefined) {
      res.result.totalData.forEach((r) => {
        const pairs = r.subcategory.map(
          (subcat, idx) => `${r.category[idx]}~${subcat}`,
        );
        newResources.push({
          name: r.name,
          description: r.description,
          categories: r.category,
          subcategories: r.subcategory,
          categoryPairs: pairs,
          lastUpdated: r.lastUpdated,
          id: r._id.toString(),
        });
      });
    }
    setResources(newResources);
  };

  const updateView = useCallback(async () => {
    await Promise.all([fetchCategories(), fetchResources()]);
  }, []);

  useEffect(() => {
    updateView();
  }, [updateView]);

  const onOpenChange = (newOpenKeys: Array<string>) => {
    if (newOpenKeys.length === 0) {
      setSelectedCategory('All Resources');
      setSelectedSubcategory('');
      setOpenKeys([]);
      return;
    }

    const latestOpenKey = newOpenKeys.find(
      (key) => openKeys.indexOf(key) === -1,
    );
    if (Object.keys(categories).indexOf(latestOpenKey) === -1) {
      setOpenKeys(newOpenKeys);
    } else {
      setOpenKeys(
        latestOpenKey !== null && latestOpenKey !== undefined
          ? [latestOpenKey]
          : [],
      );
    }
    setSelectedCategory(latestOpenKey);
    setSelectedSubcategory('');
  };

  const categorySelectAll = () => {
    setSelectedCategory('All Resources');
    setSelectedSubcategory('');
    setOpenKeys([]);
  };

  return (
    <div className="resource-manager-flexbox">
      <div className="resource-manager-header">
        <div className="resource-manager-header-title"> Categories </div>
        <div className="resource-manager-header-content">
          <div className="resource-manager-header-breadcrumb">
            <ResourcesBreadcrumb
              categorySelected={selectedCategory}
              subcategorySelected={selectedSubcategory}
              tColor="#000000"
            />
          </div>
          <Button
            className="resource-manager-header-export"
            icon={<ExportOutlined />}
            onClick={(e) => {
              e.preventDefault();
              window.location.href =
                'https://nawc-staging.vercel.app/api/categories/download';
            }}
          >
            Export
          </Button>
        </div>
      </div>
      <div className="resource-manager-content">
        <div className="resource-manager-sidebar">
          <Menu
            mode="inline"
            selectedKeys={
              selectedSubcategory === ''
                ? selectedCategory
                : selectedSubcategory
            }
            openKeys={openKeys}
            onOpenChange={onOpenChange}
            expandIcon={<div />}
          >
            <Menu.Item key="All Resources" onClick={categorySelectAll}>
              All Resources
            </Menu.Item>
            {Object.keys(categories).map((categoryName) => (
              <SidebarCategory
                categories={categories}
                categoryName={categoryName}
                key={categoryName}
                isOpen={categoryName === selectedCategory}
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
            categories={categories}
            selectedCategory={selectedCategory}
            selectedSubcategory={selectedSubcategory}
            resources={resources}
            updateView={updateView}
          />
        </div>
      </div>
    </div>
  );
};

export default ResourceManager;
