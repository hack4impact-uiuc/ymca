// @flow

import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Layout, Menu } from 'antd';

import useWindowDimensions from '../utils/mobile';

import NavMobile from './mobile/NavigationMobile';
import NavDesktop from './desktop/NavigationDesktop';

const { Header } = Layout;

type Props = {
  authed: Boolean,
  setAuthed: Boolean => void,
};

const Navigation = (props: Props) => {
  const { authed, setAuthed } = props;

  // Mobile Detection
  const [{ height, width }, isMobile] = useWindowDimensions();

  const desktop = <NavDesktop authed={authed} setAuthed={setAuthed} />;
  const mobile = <NavMobile authed={authed} setAuthed={setAuthed} />;

  return isMobile ? mobile : desktop;
};

export default Navigation;
