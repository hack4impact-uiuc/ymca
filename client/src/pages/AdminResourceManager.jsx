// @flow

import React from 'react';
import { Tabs, Layout, Row, Button } from 'antd';

import '../css/AdminResourceManager.css';
import ResourceForm from '../components/ResourceForm';
import EditHome from '../components/EditHome';
import RoleApproval from '../components/RoleApproval';
import ModalView from '../components/ModalView';

const { Header } = Layout;
const { TabPane } = Tabs;

type Props = {
  match: {
    params: {
      id: number,
    },
  },
};

const AdminResourceManager = (props: Props): React$Element<'div'> => {
  const { match } = props;

  return (
    <div className="admin-resource-form">
      <Header className="header">
        <Row justify="center" type="flex">
          <h2>Admin Dashboard</h2>
        </Row>
      </Header>

      <div style={{ margin: '2%' }}>
        <Tabs defaultActiveKey="1">
          <TabPane
            tab={match.params.id ? 'Edit Resource' : 'Add Resource'}
            key="1"
          >
            <ResourceForm id={match.params.id} />
          </TabPane>
          <TabPane tab="Edit Home" key="2">
            <EditHome />
          </TabPane>
          <TabPane tab="Manage Users" key="3">
            <RoleApproval />
          </TabPane>
          <TabPane tab="Manage Resources" key="4">
            Manage Resources
          </TabPane>
        </Tabs>
      </div>
      <div>
        <ModalView modalType="add"> </ModalView>
      </div>
      <div>
        <ModalView modalType="delete"> </ModalView>
      </div>
      <div>
        <ModalView modalType="rename"> </ModalView>
      </div>
    </div>
  );
};

export default AdminResourceManager;
