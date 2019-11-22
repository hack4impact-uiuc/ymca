import React, { useState, useEffect } from 'react';
import '../css_mobile/Navigation.css';

const NavigationMobile = () => {
  return (
    <nav role="navigation">
      <div id="menuToggle">
        <input type="checkbox" />

        <span />
        <span />
        <span />

        <ul id="menu">
          <a href="#">
            <li>Home</li>
          </a>
          <a href="#">
            <li>About</li>
          </a>
          <a href="#">
            <li>Info</li>
          </a>
          <a href="#">
            <li>Contact</li>
          </a>
          <a href="https://erikterwan.com/" target="_blank">
            <li>Show me more</li>
          </a>
        </ul>
      </div>
    </nav>
  );
};

export default NavigationMobile;
