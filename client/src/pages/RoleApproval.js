import React, { useState, useCallback, useEffect } from 'react';
import { Button, Icon } from 'antd';
import {
  Table,
  Card,
  CardBody,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';
import Loader from 'react-loader-spinner';

import { getUsersForRolesPage, changeRole } from '../utils/auth';

const RoleApproval = () => {
  const [loading, setLoading] = useState(false);
  const [newRole, setNewRole] = useState('');
  const [response, setResponse] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState([]);
  const [sortedUsers, setSortedUsers] = useState([]);
  const [userWithNewRole, setUserWithNewRole] = useState(-1);

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
    sort => {
      switch (sort) {
        case 'Email': {
          const newUsers = users.sort(compareEmails);
          setSortedUsers(newUsers);
          break;
        }
        case 'Role': {
          const newUsers = users.sort(compareRoles);
          setSortedUsers(newUsers);
          break;
        }
        default:
      }
    },
    [setSortedUsers, users],
  );

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const userData = await getUsersForRolesPage();
      const userDataParsed = await userData.json();

      if (userDataParsed.user_emails) {
        setUsers(userDataParsed.user_emails);
        updateSort('Email');
      }
      setLoading(false);
    }
    fetchData();
  }, [setUsers, updateSort]);

  const setNewRoleAndUser = useCallback(
    (newRoleToSet, userWithNewRoleToSet) => {
      setNewRole(newRoleToSet);
      setUserWithNewRole(userWithNewRoleToSet);
    },
    [setNewRole, setUserWithNewRole],
  );

  const submitNewRole = async event => {
    event.preventDefault();
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

    setNewRole('');
    setResponse(changeRoleDataParsed.message);
    setUsers(userDataParsed.user_emails);
    setUserWithNewRole(-1);
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
                      }}
                    >
                      <Icon type="down" />
                    </Button>
                  </th>
                  <th>
                    Role{' '}
                    <Button
                      type="link"
                      onClick={() => {
                        updateSort('Role');
                      }}
                    >
                      <Icon type="down" />
                    </Button>
                  </th>
                  <th>Change Role</th>
                  <th> </th>
                </tr>
              </thead>
              <tbody>
                {sortedUsers.map((user, idx) => (
                  <tr key={user.email}>
                    <th scope="row">{idx + 1}</th>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>
                      <UncontrolledDropdown style={{ marginLeft: '0px' }}>
                        <DropdownToggle className="carousel-move-btn" caret>
                          {idx === userWithNewRole ? newRole : 'New Role'}
                        </DropdownToggle>
                        <DropdownMenu color="info">
                          <DropdownItem
                            onClick={() => setNewRoleAndUser('public', idx)}
                          >
                            Public
                          </DropdownItem>
                          <DropdownItem
                            onClick={() => setNewRoleAndUser('intern', idx)}
                          >
                            Intern
                          </DropdownItem>
                          <DropdownItem
                            onClick={() => setNewRoleAndUser('admin', idx)}
                          >
                            Admin
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
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
                ))}
              </tbody>
            </Table>
            {!localStorage.getItem('google') ? (
              <div align="left" style={{ display: 'inline', width: '300px' }}>
                <FormGroup size="sm">
                  <Label for="examplePassword">Confirm Password</Label>
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
      {response}
    </div>
  );
};

export default RoleApproval;
