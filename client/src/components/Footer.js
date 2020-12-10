// @flow

import React from 'react';
import { Layout, Tooltip } from 'antd';

import '../css/Footer.css';
import useWindowDimensions from '../utils/mobile';

const AntFooter = Layout.Footer;

const Footer = () => {
  const isMobile = useWindowDimensions()[1];
  return isMobile ? <FooterMobile /> : <FooterDesktop />;
};

const FooterDesktop = () => {
  return (
    <AntFooter className="footer">
      <div className="footer-left">
        Built with{' '}
        <span role="img" aria-label="heart">
          &#x1F49C;
        </span>{' '}
        by <a href="https://uiuc.hack4impact.org/">Hack4Impact UIUC</a> &copy;
        2020
      </div>
      <div className="footer-list">
        <Tooltip title="Coming soon!">
          <span>Usage Guide</span>
        </Tooltip>{' '}
        &bull; <a href="https://forms.gle/iELSfzN1EAfVGYot5">Feedback</a>
      </div>
    </AntFooter>
  );
};

const FooterMobile = () => {
  return (
    <AntFooter className="footer-mobile">
      <div className="footer-mobile-item">
        <Tooltip title="Coming soon!">
          <span>Usage Guide</span>
        </Tooltip>{' '}
        &bull; <a href="https://forms.gle/iELSfzN1EAfVGYot5">Feedback</a>
      </div>
      <>
        Built with{' '}
        <span role="img" aria-label="heart">
          &#x1F49C;
        </span>{' '}
        by <a href="https://uiuc.hack4impact.org/">Hack4Impact UIUC</a> &copy;
        2020
      </>
    </AntFooter>
  );
};

export default Footer;
