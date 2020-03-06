// @flow

import React, { useEffect, useState } from 'react';
import '../../css_mobile/Navigation.css';
import { NavLink } from 'react-router-dom';
import { Drawer, Menu, Button, Icon } from 'antd';

type Props = {
  authed: Boolean,
};

const NavMobile = (props: Props) => {
  const { authed } = props;
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
      {menuVisible ? (
        <div className="nav-mobile">
          <Button
            onClick={() => setDrawerVisible(true)}
            block
            type="link"
            id="navbar"
          >
            <div align="left">
              <Icon type="menu" style={{ fontSize: '2em', color: 'gray' }} />
            </div>
          </Button>
          <Drawer
            placement="left"
            width="10em"
            closable={false}
            onClose={() => setDrawerVisible(false)}
            visible={drawerVisible}
          >
            <Menu>
              <Menu.Item>
                <NavLink exact to="/">
                  Home
                </NavLink>
              </Menu.Item>
              <Menu.Item>
                <NavLink to="/resources">Resources</NavLink>
              </Menu.Item>
              {authed && (
                <Menu.Item>
                  <NavLink to="/admin">Admin</NavLink>
                </Menu.Item>
              )}
              {authed && (
                <Menu.Item>
                  <NavLink to="/role-approval">Users</NavLink>
                </Menu.Item>
              )}
              {!authed ? (
                <Menu.Item>
                  <NavLink to="/login">Login</NavLink>
                </Menu.Item>
              ) : (
                <Menu.Item>
                  <NavLink to="/logout">Logout</NavLink>
                </Menu.Item>
              )}
            </Menu>
          </Drawer>
        </div>
      ) : null}
    </nav>
  );
};

export default NavMobile;
