// @flow

import React, { useEffect, useState } from 'react';
import '../../css_mobile/Navigation.css';
import { NavLink } from 'react-router-dom';
import { Drawer, Button, Icon, Menu } from 'antd';

type Props = {
  authed: Boolean,
  authRoleIsEquivalentTo: String => Boolean,
};

const NavMobile = (props: Props) => {
  const { authed, authRoleIsEquivalentTo } = props;
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(true);
  const [prevScroll, setPrevScroll] = useState(0);
  const handleScroll = () => {
    const lastScroll = prevScroll;
    const currentScroll = window.pageYOffset;
    setMenuVisible(lastScroll > currentScroll);
    setPrevScroll(currentScroll);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
  });

  return (
    <nav>
      <div className="nav-mobile" style={{ top: menuVisible ? '0em' : '-2em' }}>
        <div className="nav-topbar-container">
          <NavLink exact to="/">
            <div className="nav-mobile-logo" />
          </NavLink>
          <div className="nav-menu-button-container">
            <Button
              onClick={() => setDrawerVisible(true)}
              block
              type="link"
              id="navbar"
            >
              <div align="right">
                <Icon type="menu" style={{ fontSize: '2em', color: 'gray' }} />
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
            onClick={args => {
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
            {authRoleIsEquivalentTo('admin') && (
              <Menu.Item className="nav-mobile-menu-item">
                <NavLink className="nav-mobile-option" to="/role-approval">
                  Users
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

export default NavMobile;
