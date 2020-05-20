import React, { useState, useCallback, useEffect } from 'react';
import { CaretDownOutlined, DownOutlined, UpOutlined } from '@ant-design/icons';
import { Button, Menu, Dropdown, message, Input, Card, Table } from 'antd';
import Loader from 'react-loader-spinner';

import { getUsersForRolesPage, changeRole } from '../utils/auth';

const RoleApproval = () => {
  const [loading, setLoading] = useState(false);
  const [newRole, setNewRole] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState([]);
  const [sortedUsers, setSortedUsers] = useState([]);
  const [userWithNewRole, setUserWithNewRole] = useState('');
  const [sort, setSort] = useState('Email');
  const [ascendingEmail, setAscendingEmail] = useState(false);
  const [ascendingRole, setAscendingRole] = useState(true);
  const [grayEmail, setGrayEmail] = useState('');
  const [grayRole, setGrayRole] = useState('gray');

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

  const updateSort = useCallback(
    sortParam => {
      console.log(sortParam)
      switch (sortParam) {
        case 'Email': {
          const newUsers = users.sort(compareEmails);
          console.log(newUsers)
          setSort('Email');
          setSortedUsers(newUsers);
          break;
        }
        case 'Role': {
          const newUsers = users.sort(compareRoles);
          setSort('Role');
          setSortedUsers(newUsers);
          break;
        }
        default:
      }
    },
    [users],
  );

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

  useEffect(() => {
    updateSort('Email');
  }, [updateSort]);

  const setNewRoleAndUser = useCallback(
    (newRoleToSet, userWithNewRoleToSet) => {
      setNewRole(newRoleToSet);
      setUserWithNewRole(userWithNewRoleToSet);
    },
    [setNewRole, setUserWithNewRole],
  );

  const submitNewRole = async event => {
    event.preventDefault();
    if (userWithNewRole.length === 0) return;
    const changeRoleData = await changeRole(userWithNewRole, newRole, password);

    const [changeRoleDataParsed, userData] = await Promise.all([
      changeRoleData.json(),
      getUsersForRolesPage(),
    ]);
    const userDataParsed = await userData.json();

    if (changeRoleDataParsed.status === 400)
      message.error(changeRoleDataParsed.message);
    else message.success(changeRoleDataParsed.message);

    setNewRole('');
    setUsers(userDataParsed.user_emails);
    setUserWithNewRole('');
  };

  const RoleMenu = email => {
    return (
      <Menu onClick={e => setNewRoleAndUser(e.key, email)}>
        <Menu.Item key="public">public</Menu.Item>
        <Menu.Item key="intern">intern</Menu.Item>
        <Menu.Item key="admin">admin</Menu.Item>
      </Menu>
    );
  };

  const columns = [
    {
      title: (
        <span>
          Email
          <Button
            type="link"
            onClick={() => {
              updateSort('Email');
              if (!ascendingEmail) setSortedUsers(sortedUsers.reverse());
              setAscendingEmail(!ascendingEmail);
              setGrayEmail('');
              setAscendingRole(true);
              setGrayRole('gray');
            }}
          >
            {ascendingEmail ? (
              <DownOutlined style={{ color: grayEmail }} />
            ) : (
              <UpOutlined />
            )}
          </Button>
        </span>
      ),
      dataIndex: 'email',
    },
    {
      title: (
        <span>
          Role
          <Button
            type="link"
            onClick={() => {
              updateSort('Role');
              if (!ascendingRole) setSortedUsers(sortedUsers.reverse());
              setAscendingRole(!ascendingRole);
              setGrayRole('');
              setAscendingEmail(true);
              setGrayEmail('gray');
            }}
          >
            {ascendingRole ? (
              <DownOutlined style={{ color: grayRole }} />
            ) : (
              <UpOutlined />
            )}
          </Button>
        </span>
      ),
      dataIndex: 'role',
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
          onClick={event => submitNewRole(event)}
        >
          Submit
        </Button>
      ),
    },
  ];

  console.log(sortedUsers)

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
            dataSource={sortedUsers}
            pagination={{ hideOnSinglePage: true }}
          />
          <br />
          {!localStorage.getItem('google') && (
            <div align="left" style={{ align: 'left' }}>
              <b>Confirm Password</b>
              <br />
              <Input.Password
                style={{ width: '25%' }}
                onChange={event => setPassword(event.target.value)}
              />
            </div>
          )}
        </Card>
      )}
    </div>
  );
};

export default RoleApproval;
