import React, { Component } from 'react';
import { Menu } from 'antd';
import '../css/App.css';

export default class AppNavbar extends Component {
  render() {
    return (
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
    );
  }
}
