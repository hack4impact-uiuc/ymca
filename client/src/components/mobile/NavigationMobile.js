// @flow

import React from 'react';
import '../../css_mobile/Navigation.css';

type Props = {
  authed: Boolean,
  setAuthed: Boolean => void,
};

const NavMobile = (props: Props) => {
  const { authed, setAuthed } = props;

  return (
    <nav role="navigation">
      <div id="menuToggle">
        <input type="checkbox" />

        <span />
        <span />
        <span />

        <ul id="menu">
          <a href="/">
            <li>Home</li>
          </a>
          <a href="/resources">
            <li>Resources</li>
          </a>
          {authed && (
            <a href="/admin">
              <li>Admin</li>
            </a>
          )}
          {!authed ? (
            <a href="/login">
              <li>Login</li>
            </a>
          ) : (
            <a href="/logout">
              <li>Logout</li>
            </a>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavMobile;
