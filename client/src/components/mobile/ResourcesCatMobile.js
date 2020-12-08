import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { DownOutlined } from '@ant-design/icons';
import { Button, Drawer, Menu } from 'antd';

import ResourceCategoryFilter from '../ResourceCategoryFilter';
import useWindowDimensions from '../../utils/mobile';

import '../../css/ResourcesCat.css';
import ResourcesFilterMobile from './ResourcesFilterMobile';

function ResourcesCatMobile(props) {
  const [categoriesVisible, setCategoriesVisible] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);
  const { width, height } = useWindowDimensions()[0];

  // Makes the dropdown disappear if the user selects a different subcategory
  useEffect(() => {
    if (props.subcategory !== '') {
      setCategoriesVisible(false);
    }
  }, [props.subcategory]);

  return (
    <nav>
      <div>
        <Menu
          openKeys={categoriesVisible ? ['categories'] : []}
          onClick={() => setCategoriesVisible(true)}
        >
          <Menu.Item key="categories">
            <span className="category-dropdown">
              {props.subcategory ? props.subcategory : props.category}
              <DownOutlined className="down-icon" />
            </span>
            <a className="filter">
              <Button
                onClick={e => {
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
            </a>
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
          title="Resource Categories"
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
