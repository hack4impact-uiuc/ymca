// @flow

import React from 'react';
import { Tabs, Layout, Row } from 'antd';

import '../css/EditTranslations.css';

const { Header } = Layout;
const { TabPane } = Tabs;

function Translations() {
  return (
    <div className="edit-tranlsations-header">
      <Header className="header">
        <Row justify="left" type="flex">
          <h2>Edit Resource Translations</h2>
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
}

export default Translations;
