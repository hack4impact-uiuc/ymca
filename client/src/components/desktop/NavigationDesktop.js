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

  const activeStyle = { fontWeight: 'bold', color: 'black' };

  return (
    <Header className="navigation">
      <NavLink exact to="/" activeStyle={activeStyle} aria-label="logo">
        <div className="logo" />
      </NavLink>
      <Menu mode="horizontal">
        <Menu.Item key="home">
          <NavLink exact to="/" activeStyle={activeStyle}>
            YMCA
          </NavLink>
        </Menu.Item>
        <Menu.Item key="resources">
          <NavLink to="/resources" activeStyle={activeStyle}>
            Resources
          </NavLink>
        </Menu.Item>

        {authed ? (
          <Menu.Item key="saved">
            <NavLink to="/saved" activeStyle={activeStyle}>
              Saved Resources
            </NavLink>
          </Menu.Item>
        ) : null}

        {authRoleIsEquivalentTo('admin') && (
          <Menu.Item key="admin">
            <NavLink to="/admin" activeStyle={activeStyle}>
              Admin
            </NavLink>
          </Menu.Item>
        )}

        {authRoleIsEquivalentTo('admin') && (
          <Menu.Item key="approval">
            <NavLink to="/role-approval" activeStyle={activeStyle}>
              Users
            </NavLink>
          </Menu.Item>
        )}

        {!authed ? (
          <Menu.Item key="login">
            <NavLink to="/login" activeStyle={activeStyle}>
              Login
            </NavLink>
          </Menu.Item>
        ) : (
          <Menu.Item key="logout">
            <NavLink to="/logout" activeStyle={activeStyle}>
              Logout
            </NavLink>
          </Menu.Item>
        )}
      </Menu>
    </Header>
  );
};

export default NavDesktop;
