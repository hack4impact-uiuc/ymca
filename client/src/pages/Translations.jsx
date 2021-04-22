// @flow

import React from 'react';
import { Tabs, Layout, Row, Table } from 'antd';
import { Link } from 'react-router-dom';
import '../css/Translations.css';
import StatusTag from '../components/StatusTag';
import PriorityIcon from '../components/PriorityIcon';

const { Header } = Layout;
const { TabPane } = Tabs;

function Translations() {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
      key: 'priority',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Translate',
      key: 'translate',
      dataIndex: 'translate',
    },
  ];

  const data = [
    {
      key: '1',
      name: 'New York No. 1 Lake Park',
      priority: <PriorityIcon priorityType="High" />,
      status: <StatusTag status="Verified" />,
      translate: <Link to="#/">Translate</Link>,
    },
    {
      key: '2',
      name: 'London No. 1 Lake Park',
      priority: <PriorityIcon priorityType="Urgent" />,
      status: <StatusTag status="Unverified" />,
      translate: <Link to="#/">Translate</Link>,
    },
    {
      key: '3',
      name: 'Sidney No. 1 Lake Park',
      priority: <PriorityIcon priorityType="Low" />,
      status: <StatusTag status="Unverified" />,
      translate: <Link to="#/">Translate</Link>,
    },
  ];

  return (
    <div className="tranlsations-header">
      <Header className="header">
        <Row justify="left" type="flex">
          <h2>Translations</h2>
        </Row>
      </Header>

      <div style={{ margin: '2%' }}>
        <Tabs defaultActiveKey="1">
          <TabPane tab="Español" key="1">
            <Tabs type="card">
              <TabPane tab="Needs Attention" key="1">
                <Table columns={columns} dataSource={data} />
              </TabPane>
              <TabPane tab="Completed" key="2">
                <Table columns={columns} dataSource={data} />
              </TabPane>
            </Tabs>
          </TabPane>
          <TabPane tab="Français" key="2">
            <Tabs type="card">
              <TabPane tab="Needs Attention" key="1">
                <Table columns={columns} dataSource={data} />
              </TabPane>
              <TabPane tab="Completed" key="2">
                <Table columns={columns} dataSource={data} />
              </TabPane>
            </Tabs>
          </TabPane>
          <TabPane tab="中文" key="3">
            <Tabs type="card">
              <TabPane tab="Needs Attention" key="1">
                <Table columns={columns} dataSource={data} />
              </TabPane>
              <TabPane tab="Completed" key="2">
                <Table columns={columns} dataSource={data} />
              </TabPane>
            </Tabs>
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
}

export default Translations;
