import React from 'react';
import { Menu } from 'antd';
import { DownOutlined, EditOutlined, CloseOutlined } from '@ant-design/icons';

import '../css/ResourceManager.css';

const ResourceManager = () => {
  const { SubMenu } = Menu;

  return (
    <Menu
      style={{ width: 256 }}
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      mode="inline"
      expandIcon={<div />}
    >
      <SubMenu key="sub1" icon={<DownOutlined />} title="Navigation One">
        <Menu.Item key="1" className="subcategory">
          Citizenship Assistance
          <div>
            <EditOutlined />
            <CloseOutlined />
          </div>
        </Menu.Item>
        <Menu.Item key="2">Option 2</Menu.Item>
      </SubMenu>
      <SubMenu key="sub2" icon={<DownOutlined />} title="Navigation Two">
        <Menu.Item key="5">Option 5</Menu.Item>
        <Menu.Item key="6">Option 6</Menu.Item>
      </SubMenu>
      <SubMenu key="sub4" icon={<DownOutlined />} title="Navigation Three">
        <Menu.Item key="9">Option 9</Menu.Item>
        <Menu.Item key="10">Option 10</Menu.Item>
      </SubMenu>
    </Menu>
  );
};

export default ResourceManager;
