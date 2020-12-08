// @flow

import React from 'react';

import useWindowDimensions from '../utils/mobile';

import NavMobile from './mobile/NavigationMobile';
import NavDesktop from './desktop/NavigationDesktop';

const Navigation = () => {
  const isMobile = useWindowDimensions()[1];

  return isMobile ? <NavMobile /> : <NavDesktop />;
};

export default Navigation;
