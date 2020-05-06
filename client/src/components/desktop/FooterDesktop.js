// @flow

import React from 'react';
import { Layout, Tooltip } from 'antd';
import '../../css/Footer.css';

const { Footer } = Layout;

const FooterDesktop = () => {
  return (
    <Footer className="footer">
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
    </Footer>
  );
};

export default FooterDesktop;
