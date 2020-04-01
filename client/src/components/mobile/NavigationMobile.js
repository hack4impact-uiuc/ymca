// @flow

import React, { useEffect, useState } from 'react';
import '../../css_mobile/Navigation.css';
import { NavLink } from 'react-router-dom';
import { Drawer, Button, Icon } from 'antd';

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
      <div className="nav-mobile" style={{ top: menuVisible ? '0em' : '-2em' }}>
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
          align="center"
          placement="top"
          closable={false}
          onClose={() => setDrawerVisible(false)}
          onClick={() => setDrawerVisible(false)}
          visible={drawerVisible}
        >
          <p>
            <NavLink className="nav-mobile-option" exact to="/">
              Home
            </NavLink>
          </p>
          <p>
            <NavLink className="nav-mobile-option" exact to="/resources">
              Resources
            </NavLink>
          </p>
          {authed && (
            <p>
              <NavLink className="nav-mobile-option" exact to="/saved">
                Saved Resources
              </NavLink>
            </p>
          )}
          {authed && (
            <p>
              <NavLink className="nav-mobile-option" to="/admin">
                Admin
              </NavLink>
            </p>
          )}
          {authed && (
            <p>
              <NavLink className="nav-mobile-option" to="/role-approval">
                Users
              </NavLink>
            </p>
          )}
          {!authed ? (
            <p>
              <NavLink className="nav-mobile-option" to="/login">
                Login
              </NavLink>
            </p>
          ) : (
            <p>
              <NavLink className="nav-mobile-option" to="/logout">
                Logout
              </NavLink>
            </p>
          )}
        </Drawer>
      </div>
    </nav>
  );
};

export default NavMobile;
