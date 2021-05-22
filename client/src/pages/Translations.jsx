// @flow

import React, { useState, useEffect, useCallback } from 'react';
import { Tabs, Layout, Row, Table } from 'antd';
import { Link } from 'react-router-dom';
import '../css/Translations.css';
import StatusTag from '../components/StatusTag';
import PriorityIcon from '../components/PriorityIcon';
import { getVerifications } from '../utils/api';

const { Header } = Layout;
const { TabPane } = Tabs;

const languages = ['Spanish', 'French', 'Chinese'];
const priorities = { Urgent: 4, High: 3, Medium: 2, Low: 1 };

function Translations() {
  const [verifiedList, setVerifiedList] = useState({});
  const [unverifiedList, setUnverifiedList] = useState({});

  const updateLists = useCallback((verifications) => {
    const verifiedResources = { Spanish: [], French: [], Chinese: [] };
    const unverifiedResources = { Spanish: [], French: [], Chinese: [] };
    languages.forEach((l) => {
      const resources = verifications[l];

      resources?.forEach((verification) => {
        const percentage =
          (verification.verifiedTranslationsCount /
            verification.totalTranslations) *
          100;

        if (verification.totalReports >= 1 && percentage !== 100.0) {
          unverifiedResources[l].push({
            key: verification._id,
            name: verification.name,
            priority: <PriorityIcon priorityType="Urgent" />,
            status: <StatusTag status="Unverified" />,
            translate: (
              <Link
                to={
                  `/translations/${verification._id}?` +
                  `language=${l}&type=${verification.type}`
                }
              >
                Translate
              </Link>
            ),
          });
        } else if (percentage === 100.0) {
          verifiedResources[l].push({
            key: verification._id,
            name: verification.name,
            status: <StatusTag status="Verified" />,
            translate: (
              <Link
                to={
                  `/translations/${verification._id}?` +
                  `language=${l}&type=${verification.type}`
                }
              >
                Translate
              </Link>
            ),
          });
        } else {
          let priority;
          if (percentage < 30) {
            priority = <PriorityIcon priorityType="High" />;
          } else if (percentage < 50) {
            priority = <PriorityIcon priorityType="Medium" />;
          } else {
            priority = <PriorityIcon priorityType="Low" />;
          }
          unverifiedResources[l].push({
            key: verification._id,
            name: verification.name,
            priority,
            status: <StatusTag status="Unverified" />,
            translate: (
              <Link
                to={
                  `/translations/${verification._id}?` +
                  `language=${l}&type=${verification.type}`
                }
              >
                Translate
              </Link>
            ),
          });
        }
      });
    });
    setVerifiedList(verifiedResources);
    setUnverifiedList(unverifiedResources);
  }, []);

  useEffect(() => {
    const newVerifications = {};
    languages.forEach(async (language) => {
      const res = await getVerifications(language);
      if (res) {
        newVerifications[language] = res.result;
      }
      updateLists(newVerifications);
    });
  }, [updateLists]);

  const unverifiedColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
      key: 'priority',
      defaultSortOrder: 'descending',
      sorter: (a, b) =>
        priorities[a.priority.props.priorityType] -
        priorities[b.priority.props.priorityType],
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

  const verifiedColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
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

  return (
    <div className="translations-header">
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
                <Table
                  columns={unverifiedColumns}
                  dataSource={unverifiedList.Spanish}
                />
              </TabPane>
              <TabPane tab="Completed" key="2">
                <Table
                  columns={verifiedColumns}
                  dataSource={verifiedList.Spanish}
                />
              </TabPane>
            </Tabs>
          </TabPane>
          <TabPane tab="Français" key="2">
            <Tabs type="card">
              <TabPane tab="Needs Attention" key="1">
                <Table
                  columns={unverifiedColumns}
                  dataSource={unverifiedList.French}
                />
              </TabPane>
              <TabPane tab="Completed" key="2">
                <Table
                  columns={verifiedColumns}
                  dataSource={verifiedList.French}
                />
              </TabPane>
            </Tabs>
          </TabPane>
          <TabPane tab="中文" key="3">
            <Tabs type="card">
              <TabPane tab="Needs Attention" key="1">
                <Table
                  columns={unverifiedColumns}
                  dataSource={unverifiedList.Chinese}
                />
              </TabPane>
              <TabPane tab="Completed" key="2">
                <Table
                  columns={verifiedColumns}
                  dataSource={verifiedList.Chinese}
                />
              </TabPane>
            </Tabs>
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
}

export default Translations;
