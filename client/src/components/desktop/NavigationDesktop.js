// @flow

import React from 'react';
import { Layout, Menu } from 'antd';
import '../../css/Navigation.css';
import { NavLink } from 'react-router-dom';

const { Header } = Layout;

type Props = {
  authed: Boolean,
  authRoleIsEquivalentTo: String => void,
};

const NavDesktop = (props: Props) => {
  const { authed, authRoleIsEquivalentTo } = props;

  return (
    <Header className="navigation">
      <NavLink exact to="/" aria-label="logo">
        <div className="logo" />
      </NavLink>
      <Menu mode="horizontal">
        <Menu.Item key="home">
          <NavLink exact to="/" activeClassName="navbar-active-style">
            Home
          </NavLink>
        </Menu.Item>
        <Menu.Item key="resources">
          <NavLink exact to="/resources" activeClassName="navbar-active-style">
            Resources
          </NavLink>
        </Menu.Item>

        {authed && (
          <Menu.Item key="saved">
            <NavLink exact to="/saved" activeClassName="navbar-active-style">
              Saved Resources
            </NavLink>
          </Menu.Item>
        )}

        {authRoleIsEquivalentTo('admin') && (
          <Menu.Item key="admin">
            <NavLink to="/admin" activeClassName="navbar-active-style">
              Admin
            </NavLink>
          </Menu.Item>
        )}

        {authRoleIsEquivalentTo('admin') && (
          <Menu.Item key="edit-home">
            <NavLink to="/edit-home" activeClassName="navbar-active-style">
              Edit Home
            </NavLink>
          </Menu.Item>
        )}

        {authRoleIsEquivalentTo('admin') && (
          <Menu.Item key="approval">
            <NavLink to="/role-approval" activeClassName="navbar-active-style">
              Users
            </NavLink>
          </Menu.Item>
        )}

        {!authed ? (
          <Menu.Item key="login">
            <NavLink to="/login" activeClassName="navbar-active-style">
              Login
            </NavLink>
          </Menu.Item>
        ) : (
          <Menu.Item key="logout">
            <NavLink to="/logout" activeClassName="navbar-active-style">
              Logout
            </NavLink>
          </Menu.Item>
        )}
      </Menu>
    </Header>
  );
};

export default NavDesktop;
