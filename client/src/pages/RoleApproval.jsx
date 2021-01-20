import React, { useState, useCallback, useEffect } from 'react';
import { CaretDownOutlined } from '@ant-design/icons';
import { Button, Menu, Dropdown, message, Input, Card, Table } from 'antd';
import Loader from 'react-loader-spinner';

import { getUsersForRolesPage, changeRole } from '../utils/auth';

const RoleApproval = () => {
  const [loading, setLoading] = useState(false);
  const [newRole, setNewRole] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState([]);
  const [userWithNewRole, setUserWithNewRole] = useState('');

  function compareEmails(current, next) {
    const textCurrent = current.email.toUpperCase();
    const textNext = next.email.toUpperCase();
    const bool = textCurrent > textNext ? 1 : 0;
    return textCurrent < textNext ? -1 : bool;
  }

  function compareRoles(current, next) {
    const textCurrent = current.role.toUpperCase();
    const textNext = next.role.toUpperCase();
    const bool = textCurrent > textNext ? 1 : 0;
    return textCurrent < textNext ? -1 : bool;
  }

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const userData = await getUsersForRolesPage();
      const userDataParsed = await userData.json();

      if (userDataParsed.user_emails) {
        setUsers(userDataParsed.user_emails);
      }
      setLoading(false);
    }
    fetchData();
  }, [setUsers]);

  const setNewRoleAndUser = useCallback(
    (newRoleToSet, userWithNewRoleToSet) => {
      setNewRole(newRoleToSet);
      setUserWithNewRole(userWithNewRoleToSet);
    },
    [setNewRole, setUserWithNewRole],
  );

  const submitNewRole = async (event) => {
    event.preventDefault();
    if (userWithNewRole.length === 0) {
      return;
    }
    const changeRoleData = await changeRole(userWithNewRole, newRole, password);

    const [changeRoleDataParsed, userData] = await Promise.all([
      changeRoleData.json(),
      getUsersForRolesPage(),
    ]);
    const userDataParsed = await userData.json();

    if (changeRoleDataParsed.status === 400) {
      message.error(changeRoleDataParsed.message);
    } else {
      message.success(changeRoleDataParsed.message);
    }

    setNewRole('');
    setUsers(userDataParsed.user_emails);
    setUserWithNewRole('');
  };

  const RoleMenu = (email) => (
    <Menu onClick={(e) => setNewRoleAndUser(e.key, email)}>
      <Menu.Item key="public">public</Menu.Item>
      <Menu.Item key="intern">intern</Menu.Item>
      <Menu.Item key="admin">admin</Menu.Item>
    </Menu>
  );

  const columns = [
    {
      title: 'Email',
      dataIndex: 'email',
      defaultSortOrder: 'ascend',
      sorter: (a, b) => compareEmails(a, b),
    },
    {
      title: 'Role',
      dataIndex: 'role',
      sorter: (a, b) => compareRoles(a, b),
    },
    {
      title: 'Change Role',
      render: (text, user) => (
        <Dropdown
          overlay={RoleMenu(user.email)}
          placement="bottomLeft"
          trigger={['click']}
        >
          <Button className="carousel-move-btn">
            {user.email === userWithNewRole ? (
              newRole
            ) : (
              <span>
                {'New Role '}
                <CaretDownOutlined />
              </span>
            )}
          </Button>
        </Dropdown>
      ),
    },
    {
      title: ' ',
      render: () => (
        <Button
          className="carousel-move-btn"
          onClick={(event) => submitNewRole(event)}
        >
          Submit
        </Button>
      ),
    },
  ];

  return (
    <div align="center">
      {loading ? (
        <Loader
          className="loader"
          type="Circles"
          color="#6A3E9E"
          height={100}
          width={100}
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
      ) : (
        <Card
          className="interview-card"
          style={{ height: '60%', margin: '2%' }}
        >
          <Table
            columns={columns}
            dataSource={users}
            pagination={{ hideOnSinglePage: true }}
          />
          <br />
          {!localStorage.getItem('google') && (
            <div align="left" style={{ align: 'left' }}>
              <b>Confirm Password</b>
              <br />
              <Input.Password
                style={{ width: '25%' }}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
          )}
        </Card>
      )}
    </div>
  );
};

export default RoleApproval;
