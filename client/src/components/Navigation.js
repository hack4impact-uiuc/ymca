// @flow

import React, { useCallback } from 'react';
import { Layout, Menu } from 'antd';

import useWindowDimensions from '../utils/mobile';

import NavMobile from './mobile/NavigationMobile';
import NavDesktop from './desktop/NavigationDesktop';

const { Header } = Layout;

type Props = {
  authed: Boolean,
  authRoleIsEquivalentTo: String => void,
};

const Navigation = (props: Props) => {
  const { authed, authRoleIsEquivalentTo } = props;

  // Mobile Detection
  const [{ height, width }, isMobile] = useWindowDimensions();

  const desktop = <NavDesktop authed={authed} />;
  const mobile = <NavMobile authed={authed} />;

  return isMobile ? mobile : desktop;
};

export default Navigation;
