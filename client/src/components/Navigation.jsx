// @flow

import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Layout, Drawer, Button, Menu } from 'antd';
import { MenuOutlined } from '@ant-design/icons';

import useWindowDimensions from '../utils/mobile';
import { useAuth } from '../utils/use-auth';

import '../css/Navigation.css';

const { Header } = Layout;

type NavigationProps = {
  setLanguage: (string) => void,
};

const Navigation = (props: NavigationProps) => {
  const { setLanguage } = props;
  const isMobile = useWindowDimensions()[1];
  return isMobile ? (
    <NavMobile setLanguage={setLanguage} />
  ) : (
    <NavDesktop setLanguage={setLanguage} />
  );
};

const NavDesktop = (props: NavigationProps) => {
  const { setLanguage } = props;
  const { authed, authRoleIsEquivalentTo } = useAuth();

  return (
    <Header className="nav-desktop">
      <NavLink exact to="/" aria-label="logo">
        <div className="nav-desktop-logo" />
      </NavLink>
      <Button onClick={() => setLanguage('English')}>English</Button>
      <Button onClick={() => setLanguage('Spanish')}>Spanish</Button>
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

const NavMobile = (props: NavigationProps) => {
  const { setLanguage } = props;
  const { authed, authRoleIsEquivalentTo } = useAuth();
  const [drawerVisible, setDrawerVisible] = useState(false);

  return (
    <nav>
      <div className="nav-mobile">
        <div className="nav-mobile-topbar-container">
          <NavLink exact to="/">
            <div className="nav-mobile-logo" />
          </NavLink>
          <Button onClick={() => setLanguage('English')}>English</Button>
          <Button onClick={() => setLanguage('Spanish')}>Spanish</Button>
          <div className="nav-mobile-menu-btn-container">
            <Button
              onClick={() => setDrawerVisible(true)}
              block
              type="link"
              id="navbar"
            >
              <div align="right">
                <MenuOutlined className="nav-mobile-menu-btn-icon" />
              </div>
            </Button>
          </div>
        </div>
        <Drawer
          placement="right"
          closable={false}
          onClose={() => setDrawerVisible(false)}
          visible={drawerVisible}
        >
          <Menu
            className="nav-mobile-menu"
            mode="inline"
            onClick={(args) => {
              const { key } = args;
              if (key !== 'resources') {
                setDrawerVisible(false);
              }
            }}
          >
            {!authed && (
              <Menu.Item className="nav-mobile-menu-item">
                <NavLink className="nav-mobile-option" to="/login">
                  Login
                </NavLink>
              </Menu.Item>
            )}
            <Menu.Item className="nav-mobile-menu-item">
              <NavLink className="nav-mobile-option" exact to="/">
                Home
              </NavLink>
            </Menu.Item>
            {authed && (
              <Menu.Item className="nav-mobile-menu-item">
                <NavLink className="nav-mobile-option" exact to="/saved">
                  Saved
                </NavLink>
              </Menu.Item>
            )}
            <Menu.Item className="nav-mobile-menu-item">
              <NavLink className="nav-mobile-option" exact to="/resources">
                Resources
              </NavLink>
            </Menu.Item>
            {authRoleIsEquivalentTo('admin') && (
              <Menu.Item className="nav-mobile-menu-item">
                <NavLink className="nav-mobile-option" to="/admin">
                  Admin
                </NavLink>
              </Menu.Item>
            )}
            {authed && (
              <Menu.Item className="nav-mobile-menu-item">
                <NavLink className="nav-mobile-option" to="/logout">
                  Logout
                </NavLink>
              </Menu.Item>
            )}
          </Menu>
        </Drawer>
      </div>
    </nav>
  );
};

export default Navigation;
