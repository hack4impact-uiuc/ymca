import React, { Component } from 'react';
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

class RoleApproval extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      newRole: '',
      userWithNewRole: -1,
      password: '',
    };
  }

  async componentDidMount() {
    const userData = await getUsersForRolesPage();
    const userDataParsed = await userData.json();
    console.log(userDataParsed);
    if (userDataParsed.user_emails) {
      this.setState({ users: userDataParsed.user_emails });
    }
  }

  setNewRole = (newRole, userWithNewRole) => () => {
    this.setState({ newRole, userWithNewRole });
  };

  submitNewRole = async event => {
    event.preventDefault();
    const changeRoleData = await changeRole(
      this.state.users[this.state.userWithNewRole].email,
      this.state.newRole,
      this.state.password,
    );
    const changeRoleDataParsed = await changeRoleData.json();
    const userData = await getUsersForRolesPage();
    const userDataParsed = await userData.json();
    this.setState({
      users: userDataParsed.user_emails,
      userWithNewRole: -1,
      newRole: '',
      response: changeRoleDataParsed.message,
    });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <div align="center">
        <Card
          className="interview-card"
          style={{ height: '60%', margin: '2%' }}
        >
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
                {this.state.users.map((user, idx) => (
                  <tr>
                    <th scope="row">{idx + 1}</th>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>
                      <UncontrolledDropdown>
                        <DropdownToggle caret>
                          {idx === this.state.userWithNewRole
                            ? this.state.newRole
                            : 'New Role'}
                        </DropdownToggle>
                        <DropdownMenu color="info">
                          <DropdownItem
                            onClick={this.setNewRole('public', idx)}
                          >
                            Public
                          </DropdownItem>
                          <DropdownItem
                            onClick={this.setNewRole('intern', idx)}
                          >
                            Intern
                          </DropdownItem>
                          <DropdownItem onClick={this.setNewRole('admin', idx)}>
                            Admin
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </td>
                    <td>
                      <Button
                        color="info"
                        size="sm"
                        onClick={this.submitNewRole}
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
                    value={this.state.password}
                    onChange={this.handleChange}
                  />
                </FormGroup>
              </div>
            ) : null}
          </CardBody>
        </Card>
        {this.state.response}
      </div>
    );
  }
}

export default RoleApproval;
