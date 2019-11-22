// @flow

import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Layout, Menu } from 'antd';

import { detectMobile } from '../utils/mobile';
import NavMobile from './mobile/NavigationMobile'
import NavDesktop from './desktop/NavigationDesktop'

const { Header } = Layout;

type Props = {
  authed: Boolean,
  setAuthed: Boolean => void,
};

const Navigation = (props: Props) => {
  const { authed, setAuthed } = props;

  const [isMobile, setIsMobile] = useState(detectMobile());

  let desktop = <NavDesktop authed={props.authed} setAuthed={props.setAuthed}/>
  let mobile = <NavMobile />
  let renderJSX = isMobile ? mobile : desktop

  return renderJSX;
};

export default Navigation;
