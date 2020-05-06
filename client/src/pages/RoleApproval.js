import React, { useState, useCallback, useEffect } from 'react';
import { Button, Icon, Menu, Dropdown, message } from 'antd';
import { Table, Card, CardBody, FormGroup, Label, Input } from 'reactstrap';
import Loader from 'react-loader-spinner';

import { getUsersForRolesPage, changeRole } from '../utils/auth';

const RoleApproval = () => {
  const [loading, setLoading] = useState(false);
  const [newRole, setNewRole] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState([]);
  const [sortedUsers, setSortedUsers] = useState([]);
  const [userWithNewRole, setUserWithNewRole] = useState(-1);
  const [sort, setSort] = useState('Email');
  const [ascendingEmail, setAscendingEmail] = useState(true);
  const [ascendingRole, setAscendingRole] = useState(true);
  const [grayEmail, setGrayEmail] = useState('');
  const [grayRole, setGrayRole] = useState('');

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
      switch (sortParam) {
        case 'Email': {
          const newUsers = users.sort(compareEmails);
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
    if (userWithNewRole < 0) return;
    const changeRoleData = await changeRole(
      users[userWithNewRole].email,
      newRole,
      password,
    );

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
    setUserWithNewRole(-1);
  };

  const RoleMenu = idx => {
    return (
      <Menu onClick={e => setNewRoleAndUser(e.key, idx)}>
        <Menu.Item key="public">public</Menu.Item>
        <Menu.Item key="intern">intern</Menu.Item>
        <Menu.Item key="admin">admin</Menu.Item>
      </Menu>
    );
  };

  const UsersGrid = () => {
    return sortedUsers.map((user, idx) => {
      return (
        <tr key={user.email}>
          <th scope="row">{idx + 1}</th>
          <td>{user.email}</td>
          <td>{user.role}</td>
          <td>
            <Dropdown
              overlay={RoleMenu(idx)}
              placement="bottomLeft"
              trigger={['click']}
            >
              <Button className="carousel-move-btn">
                {idx === userWithNewRole ? (
                  newRole
                ) : (
                  <span>
                    {'New Role '}
                    <Icon type="caret-down" />
                  </span>
                )}
              </Button>
            </Dropdown>
          </td>
          <td>
            <Button
              className="carousel-move-btn"
              onClick={event => submitNewRole(event)}
            >
              Submit
            </Button>
          </td>
        </tr>
      );
    });
  };

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
          <CardBody>
            <Table hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>
                    Email{' '}
                    <Button
                      type="link"
                      onClick={() => {
                        updateSort('Email');
                        if (!ascendingEmail)
                          setSortedUsers(sortedUsers.reverse());
                        setAscendingEmail(!ascendingEmail);
                        setGrayEmail('');
                        setAscendingRole(true);
                        setGrayRole('gray');
                      }}
                    >
                      {ascendingEmail ? (
                        <Icon type="down" style={{ color: grayEmail }} />
                      ) : (
                        <Icon type="up" />
                      )}
                    </Button>
                  </th>
                  <th>
                    Role{' '}
                    <Button
                      type="link"
                      onClick={() => {
                        updateSort('Role');
                        if (!ascendingRole)
                          setSortedUsers(sortedUsers.reverse());
                        setAscendingRole(!ascendingRole);
                        setGrayRole('');
                        setAscendingEmail(true);
                        setGrayEmail('gray');
                      }}
                    >
                      {ascendingRole ? (
                        <Icon type="down" style={{ color: grayRole }} />
                      ) : (
                        <Icon type="up" />
                      )}
                    </Button>
                  </th>
                  <th>Change Role</th>
                  <th> </th>
                </tr>
              </thead>
              <tbody>
                <UsersGrid />
              </tbody>
            </Table>
            {!localStorage.getItem('google') ? (
              <div align="left" style={{ display: 'inline', width: '300px' }}>
                <FormGroup size="sm">
                  <Label for="examplePassword">
                    <b>Confirm Password</b>
                  </Label>
                  <Input
                    type="password"
                    name="password"
                    maxLength="128"
                    value={password}
                    onChange={event => setPassword(event.target.value)}
                  />
                </FormGroup>
              </div>
            ) : null}
          </CardBody>
        </Card>
      )}
    </div>
  );
};

export default RoleApproval;
