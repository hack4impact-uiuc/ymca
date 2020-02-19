// @flow

import React from 'react';
import '../../css_mobile/Navigation.css';
import { NavLink } from 'react-router-dom';

type Props = {
  authed: Boolean,
};

const NavMobile = (props: Props) => {
  const { authed } = props;

  return (
    <nav id="nav-mobile" role="navigation">
      <div id="menuToggle">
        <input type="checkbox" />

        <span />
        <span />
        <span />

        <ul id="menu">
          <NavLink exact to="/">
            <li>Home</li>
          </NavLink>
          <NavLink to="/resources">
            <li>Resources</li>
          </NavLink>
          {authed && (
            <NavLink to="/admin">
              <li>Admin</li>
            </NavLink>
          )}
          {authed && (
            <NavLink to="/role-approval">
              <li>Users</li>
            </NavLink>
          )}
          {!authed ? (
            <NavLink to="/login">
              <li>Login</li>
            </NavLink>
          ) : (
            <NavLink to="/logout">
              <li>Logout</li>
            </NavLink>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavMobile;
