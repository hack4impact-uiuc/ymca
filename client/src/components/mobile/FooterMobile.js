// @flow

import React from 'react';
import { Layout, Tooltip } from 'antd';

const { Footer } = Layout;

const FooterMobile = () => {
  return (
    <Footer style={{ textAlign: 'center' }}>
      <div style={{ marginBottom: '1rem' }}>
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
    </Footer>
  );
};

export default FooterMobile;
