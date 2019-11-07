// @flow

import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import '../css/Navigation.css';

const { Header } = Layout;

type Props = {};

const ToHomePage = () => {};

const Navigation = (props: Props) => {
  return (
    <Header className="header">
      <div className="logo" />
      <Menu mode="horizontal">
        <Menu.Item key="home">
          <a href="/">YMCA</a>
        </Menu.Item>
        <Menu.Item key="resources">
          <a href="/resources?category=All Resources">Resources</a>
        </Menu.Item>
        <Menu.Item key="login">
          <a href="/login">Login</a>
        </Menu.Item>
      </Menu>
    </Header>
  );
};

export default Navigation;
