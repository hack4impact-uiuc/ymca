import React, { useState, useCallback, useEffect } from 'react';
import {
  Table,
  Card,
  CardBody,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';

import { getUsersForRolesPage, changeRole } from '../utils/auth';

const RoleApproval = () => {
  const [newRole, setNewRole] = useState('');
  const [response, setResponse] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState([]);
  const [userWithNewRole, setUserWithNewRole] = useState(-1);

  useEffect(() => {
    async function fetchData() {
      const userData = await getUsersForRolesPage();
      const userDataParsed = await userData.json();

      if (userDataParsed.user_emails) {
        setUsers(userDataParsed.user_emails);
      }
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
      <Card className="interview-card" style={{ height: '60%', margin: '2%' }}>
        <CardBody>
          <Table hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Email</th>
                <th>Role</th>
                <th>Change Role</th>
                <th> </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, idx) => (
                <tr key={user.email}>
                  <th scope="row">{idx + 1}</th>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <UncontrolledDropdown style={{ marginLeft: '0px' }}>
                      <DropdownToggle caret>
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
                      color="info"
                      size="sm"
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
      {response}
    </div>
  );
};

export default RoleApproval;
