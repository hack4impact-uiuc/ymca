import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { DownOutlined } from '@ant-design/icons';
import { Button, Drawer, Menu } from 'antd';
import { useIntl, FormattedMessage } from 'react-intl';

import ResourceCategoryFilter from '../ResourceCategoryFilter';
import useWindowDimensions from '../../utils/mobile';

import '../../css/ResourcesCat.css';
import ResourcesFilterMobile from './ResourcesFilterMobile';

function ResourcesCatMobile(props) {
  const intl = useIntl();
  const { category, subcategory } = props;

  const [categoriesVisible, setCategoriesVisible] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);
  const { width, height } = useWindowDimensions()[0];

  // Makes the dropdown disappear if the user selects a different subcategory
  useEffect(() => {
    if (subcategory !== '') {
      setCategoriesVisible(false);
    }
  }, [subcategory]);
  let dropdownId = '';
  const dropdownTitle = subcategory || category;
  if (subcategory !== '') {
    dropdownId = `subcategory-${subcategory}`.replace(/\s/g, '');
  } else {
    dropdownId =
      category === 'All Resources'
        ? 'allResources'
        : `category-${category}`.replace(/\s/g, '');
  }

  return (
    <nav>
      <div>
        <Menu
          openKeys={categoriesVisible ? ['categories'] : []}
          onClick={() => setCategoriesVisible(true)}
        >
          <Menu.Item key="categories">
            <span className="category-dropdown">
              <FormattedMessage
                id={dropdownId}
                defaultMessage={dropdownTitle}
              />
              <DownOutlined className="down-icon" />
            </span>
            <button type="button" className="filter">
              <Button
                onClick={(e) => {
                  setFilterVisible(true);
                  e.stopPropagation();
                }}
                type="link"
              >
                <img
                  src="/asset/icon/filter.svg"
                  alt="filter.svg"
                  height="25"
                  width="25"
                />
              </Button>
            </button>
          </Menu.Item>
        </Menu>
        <Drawer
          title="Filter Categories"
          placement="left"
          width={(width * 4) / 5}
          onClose={() => setFilterVisible(false)}
          visible={filterVisible}
          headerStyle={{ display: 'none' }}
        >
          <ResourcesFilterMobile
            filterVisible={filterVisible}
            setFilterVisible={setFilterVisible}
            {...props}
          />
        </Drawer>
        <Drawer
          title={intl.formatMessage({
            id: 'resourceCategories',
            defaultMessage: 'Resource Categories',
          })}
          placement="bottom"
          height={(height * 4) / 5}
          closable
          onClose={() => setCategoriesVisible(false)}
          visible={categoriesVisible}
        >
          <ResourceCategoryFilter {...props} />
        </Drawer>
      </div>
    </nav>
  );
}

ResourcesCatMobile.propTypes = {
  category: PropTypes.string.isRequired,
  subcategory: PropTypes.string.isRequired,
};

export default ResourcesCatMobile;
