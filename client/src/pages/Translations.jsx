// @flow

import React from 'react';
import { Tabs, Layout, Row } from 'antd';

const { Header } = Layout;
const { TabPane } = Tabs;

const AdminResourceManager = (props: Props): React$Element<'div'> => {
  const { match } = props;

  return (
    <div className="admin-resource-form">
      <Header className="header">
        <Row justify="left" type="flex">
          <h2>Translations</h2>
        </Row>
      </Header>

      <div style={{ margin: '2%' }}>
        <Tabs defaultActiveKey="1">
          <TabPane tab="Español" key="1">
            <div>test</div>
          </TabPane>
          <TabPane tab="Français" key="2">
            <div>test</div>
          </TabPane>
          <TabPane tab="中文" key="3">
            <div>test</div>
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminResourceManager;
