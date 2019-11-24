// @flow

import React, { useCallback } from 'react';
import { Layout, Menu } from 'antd';
import '../css/Navigation.css';

const { Header } = Layout;

type Props = {
  authed: Boolean,
  authRoleIsEquivalentTo: String => void,
};

const Navigation = (props: Props) => {
  const { authed, authRoleIsEquivalentTo } = props;

  return (
    <Header className="navigation">
      <a href="/" aria-label="logo">
        <div className="logo" />
      </a>
      <Menu mode="horizontal">
        <Menu.Item key="home">
          <a href="/">YMCA</a>
        </Menu.Item>
        <Menu.Item key="resources">
          <a href="/resources">Resources</a>
        </Menu.Item>

        {authed && authRoleIsEquivalentTo('admin') && (
          <Menu.Item key="admin">
            <a href="/admin">Admin</a>
          </Menu.Item>
        )}

        {!authed ? (
          <Menu.Item key="login">
            <a href="/login">Login</a>
          </Menu.Item>
        ) : (
          <Menu.Item key="logout">
            <a href="/logout">Logout</a>
          </Menu.Item>
        )}
      </Menu>
    </Header>
  );
};

export default Navigation;
