// @flow

import React from 'react';

import useWindowDimensions from '../utils/mobile';

import FooterMobile from './mobile/FooterMobile';
import FooterDesktop from './desktop/FooterDesktop';

const Footer = () => {
  const isMobile = useWindowDimensions()[1];
  return isMobile ? <FooterMobile /> : <FooterDesktop />;
};

export default Footer;
