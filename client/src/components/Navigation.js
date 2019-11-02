import React, { Component } from 'react';
import { Layout, Menu } from 'antd';
import '../css/Navigation.css';

const { Header } = Layout;

export default class Navigation extends Component {
  render() {
    return (
      <Header className="header">
        <div className="logo" />
        <Menu mode="horizontal">
          <Menu.Item key="home">
            <a href="/">YMCA</a>
          </Menu.Item>
          <Menu.Item key="resources">
            <a href="/filter">Resources</a>
          </Menu.Item>
          <Menu.Item key="login">
            <a href="/login">Login</a>
          </Menu.Item>
        </Menu>
      </Header>
    );
  }
}
