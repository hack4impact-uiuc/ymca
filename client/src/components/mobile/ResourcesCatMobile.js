import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Drawer, Menu } from 'antd';

import ResourceCategoryFilter from '../ResourceCategoryFilter';
import useWindowDimensions from '../../utils/mobile';

const { SubMenu } = Menu;

function ResourcesCatMobile(props) {
  const [visible, setVisible] = useState(false);
  const { height } = useWindowDimensions()[0];

  // Makes the dropdown disappear if the user selects a different subcategory
  useEffect(() => {
    if (props.subcategory !== '') {
      setVisible(false);
    }
  }, [props.subcategory]);

  return (
    <nav>
      <div>
        <Menu mode="inline" openKeys={visible ? ['categories'] : []}>
          <SubMenu
            key="categories"
            onTitleClick={() => setVisible(true)}
            title={props.subcategory ? props.subcategory : props.category}
          />
        </Menu>
        <Drawer
          title="Resource Categories"
          placement="bottom"
          height={(height * 4) / 5}
          closable
          onClose={() => setVisible(false)}
          visible={visible}
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
