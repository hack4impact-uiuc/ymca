import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Menu } from 'antd';

const { SubMenu } = Menu;

function ResourceCategoryFilter(props) {
  const {
    category,
    categories,
    categorySelectAll,
    onOpenChange,
    openKeys,
    subcategory,
    subcategorySelect,
  } = props;

  const [orderedCategories, setOrderedCategories] = useState({});
  useEffect(() => {
    const newCategories = {};
    Object.keys(categories)
      .sort()
      .forEach((key) => {
        newCategories[key] = categories[key].sort();
      });
    setOrderedCategories(newCategories);
  }, [categories]);

  return (
    <Menu
      mode="inline"
      selectedKeys={subcategory === '' ? category : subcategory}
      openKeys={openKeys}
      onOpenChange={onOpenChange}
    >
      <Menu.Item key="All Resources" onClick={categorySelectAll}>
        All Resources
      </Menu.Item>
      {Object.keys(orderedCategories).map((categoryName) => (
        <SubMenu key={categoryName} title={categoryName}>
          {orderedCategories[categoryName].map((subCategory) => (
            <Menu.Item
              key={subCategory}
              onClick={() => subcategorySelect(subCategory)}
            >
              {subCategory}
            </Menu.Item>
          ))}
        </SubMenu>
      ))}
    </Menu>
  );
}

ResourceCategoryFilter.propTypes = {
  category: PropTypes.string.isRequired,
  categories: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string))
    .isRequired,
  categorySelectAll: PropTypes.func.isRequired,
  onOpenChange: PropTypes.func.isRequired,
  openKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
  subcategory: PropTypes.string.isRequired,
  subcategorySelect: PropTypes.func.isRequired,
};

export default ResourceCategoryFilter;
