// @flow

import React from 'react';
import { Layout, Tooltip } from 'antd';
import { useIntl, FormattedMessage, defineMessages } from 'react-intl';

import '../css/Footer.css';
import useWindowDimensions from '../utils/mobile';

const AntFooter = Layout.Footer;

const messages = defineMessages({
  builtWith: {
    id: 'builtWith',
    defaultMessage: 'Built with {heart} by {linkH4I}',
  },
  usageGuide: {
    id: 'usageGuide',
    defaultMessage: 'Usage Guide',
  },
  comingSoon: {
    id: 'comingSoon',
    defaultMessage: 'Coming soon!',
  },
  feedback: {
    id: 'feedback',
    defaultMessage: 'Feedback',
  },
});

const Footer = () => {
  const isMobile = useWindowDimensions()[1];
  return isMobile ? <FooterMobile /> : <FooterDesktop />;
};

const FooterDesktop = () => {
  const intl = useIntl();

  return (
    <AntFooter className="footer">
      <div className="footer-left">
        <FormattedMessage
          {...messages.builtWith}
          values={{
            heart: (
              <span role="img" aria-label="heart">
                &#x1F49C;
              </span>
            ),
            linkH4I: (
              <a href="https://uiuc.hack4impact.org/">Hack4Impact UIUC</a>
            ),
          }}
        />{' '}
        &copy; 2021
      </div>
      <div className="footer-list">
        <Tooltip title={intl.formatMessage(messages.comingSoon)}>
          <span>
            <FormattedMessage {...messages.usageGuide} />
          </span>
        </Tooltip>{' '}
        &bull;{' '}
        <a href="https://forms.gle/iELSfzN1EAfVGYot5">
          <FormattedMessage {...messages.feedback} />
        </a>
      </div>
    </AntFooter>
  );
};

const FooterMobile = () => {
  const intl = useIntl();
  return (
    <AntFooter className="footer-mobile">
      <div className="footer-mobile-item">
        <Tooltip title={intl.formatMessage(messages.comingSoon)}>
          <span>
            <FormattedMessage {...messages.usageGuide} />
          </span>
        </Tooltip>{' '}
        &bull;{' '}
        <a href="https://forms.gle/iELSfzN1EAfVGYot5">
          <FormattedMessage {...messages.feedback} />
        </a>
      </div>
      <>
        <FormattedMessage
          {...messages.builtWith}
          values={{
            heart: (
              <span role="img" aria-label="heart">
                &#x1F49C;
              </span>
            ),
            linkH4I: (
              <a href="https://uiuc.hack4impact.org/">Hack4Impact UIUC</a>
            ),
          }}
        />{' '}
        &copy; 2021
      </>
    </AntFooter>
  );
};

export default Footer;
