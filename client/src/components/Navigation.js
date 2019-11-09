import React, { Component } from 'react';
import { Layout, Menu } from 'antd';
import '../css/Navigation.css';

const { Header } = Layout;

export default class Navigation extends Component {
  render() {
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
            <a href="/resources?category=All Resources">Resources</a>
          </Menu.Item>
          <Menu.Item key="login">
            <a href="/login">Login</a>
          </Menu.Item>
        </Menu>
      </Header>
    );
  }
}
