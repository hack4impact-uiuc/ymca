import React, { useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { Menu } from 'antd';
import '../css/Antdesign.css';

import { allResourcesMessage } from '../utils/messages';

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
  const intl = useIntl();

  const [orderedCategories, setOrderedCategories] = useState([]);
  useEffect(() => {
    const newCategories = categories;
    newCategories
      .sort((a, b) => {
        // Sorts alphabetically by category name
        const textA = a.name?.toUpperCase();
        const textB = b.name?.toUpperCase();
        if (textA < textB) {
          return -1;
        }
        if (textA > textB) {
          return 1;
        }
        return 0;
      })
      .forEach((c) => {
        c.subcategories.sort((a, b) => {
          // Sorts alphabetically by subcategory name
          const textA = a.name?.toUpperCase();
          const textB = b.name?.toUpperCase();
          if (textA < textB) {
            return -1;
          }
          if (textA > textB) {
            return 1;
          }
          return 0;
        });
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
        <FormattedMessage {...allResourcesMessage} />
      </Menu.Item>
      {orderedCategories.map((c) => (
        <SubMenu
          key={c.name}
          title={intl.formatMessage({
            id: `category-${c._id}`,
            defaultMessage: c.name,
          })}
        >
          {c.subcategories.map((subCategory) => (
            <Menu.Item
              key={subCategory.name}
              onClick={() => subcategorySelect(subCategory.name)}
            >
              <FormattedMessage
                id={`subcategory-${subCategory._id}`}
                defaultMessage={subCategory.name}
              />
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
