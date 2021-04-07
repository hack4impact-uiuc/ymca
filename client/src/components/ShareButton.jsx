// @flow

import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Popover } from 'antd';
import { ShareAltOutlined } from '@ant-design/icons';
import { useIntl, FormattedMessage } from 'react-intl';

import '../css/ShareButton.css';

type ShareButtonProps = {
  fullButton: Boolean,
};

function ShareButton(props: ShareButtonProps) {
  const { fullButton } = props;
  const location = useLocation();
  const intl = useIntl();

  const [info, setInfo] = useState('Copy resource link!');

  const copyLink = () => {
    const link = `https://nawc.vercel.app${location.pathname}`;
    navigator.clipboard.writeText(link);
    setInfo(
      intl.formatMessage({
        id: 'linkCopied',
        defaultMessage: 'Resource link copied!',
      }),
    );
  };

  return (
    <>
      {fullButton ? (
        <Popover content={info} Title="Error" trigger="click">
          <Button className="share-button" onClick={copyLink}>
            <ShareAltOutlined />
            <FormattedMessage id="share" defaultMessage="Share" />
          </Button>
        </Popover>
      ) : (
        <Popover content={info} Title="Error" trigger="click">
          <Button className="share-button" shape="circle" onClick={copyLink}>
            <ShareAltOutlined />
          </Button>
        </Popover>
      )}
    </>
  );
}

export default ShareButton;
