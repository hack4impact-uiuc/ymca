// @flow

import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Layout, Drawer, Button, Menu, Select } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { FormattedMessage } from 'react-intl';

import useWindowDimensions from '../utils/mobile';
import { useAuth } from '../utils/use-auth';

import '../css/Navigation.css';

import { savedResourcesMessage } from '../utils/messages';

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

const { Option } = Select;

const NavDesktop = (props: NavigationProps) => {
  const { setLanguage } = props;
  const { authed, authRoleIsEquivalentTo } = useAuth();

  return (
    <Header className="nav-desktop">
      <NavLink exact to="/" aria-label="logo">
        <div className="nav-desktop-logo" />
      </NavLink>
      <Menu mode="horizontal">
        <Menu.Item key="home">
          <NavLink exact to="/" activeClassName="navbar-active-style">
            <FormattedMessage id="home" defaultMessage="Home" />
          </NavLink>
        </Menu.Item>
        <Menu.Item key="resources">
          <NavLink exact to="/resources" activeClassName="navbar-active-style">
            <FormattedMessage id="resources" defaultMessage="Resources" />
          </NavLink>
        </Menu.Item>

        {authed && (
          <Menu.Item key="saved">
            <NavLink exact to="/saved" activeClassName="navbar-active-style">
              <FormattedMessage {...savedResourcesMessage} />
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
              <FormattedMessage id="login" defaultMessage="Login" />
            </NavLink>
          </Menu.Item>
        ) : (
          <Menu.Item key="logout">
            <NavLink to="/logout" activeClassName="navbar-active-style">
              <FormattedMessage id="logout" defaultMessage="Logout" />
            </NavLink>
          </Menu.Item>
        )}
        <img
          src="/asset/icon/globe.svg"
          className="globe"
          alt="Globe"
          height="18"
          width="18"
        />
        <Select
          className="languages"
          defaultValue="English"
          bordered={false}
          onChange={setLanguage}
        >
          <Option value="English">English</Option>
          <Option value="Spanish">Español</Option>
          <Option value="French">Français</Option>
          <Option value="Chinese">中文</Option>
        </Select>
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
                  <FormattedMessage id="login" defaultMessage="Login" />
                </NavLink>
              </Menu.Item>
            )}
            <Menu.Item className="nav-mobile-menu-item">
              <NavLink className="nav-mobile-option" exact to="/">
                <FormattedMessage id="home" defaultMessage="Home" />
              </NavLink>
            </Menu.Item>
            {authed && (
              <Menu.Item className="nav-mobile-menu-item">
                <NavLink className="nav-mobile-option" exact to="/saved">
                  <FormattedMessage {...savedResourcesMessage} />
                </NavLink>
              </Menu.Item>
            )}
            <Menu.Item className="nav-mobile-menu-item">
              <NavLink className="nav-mobile-option" exact to="/resources">
                <FormattedMessage id="resources" defaultMessage="Resources" />
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
              <Menu.Item className="nav-mobile-menu-item" onSelect>
                <NavLink className="nav-mobile-option" to="/logout">
                  <FormattedMessage id="logout" defaultMessage="Logout" />
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
