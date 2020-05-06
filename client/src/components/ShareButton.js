// @flow

import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Popover } from 'antd';
import { ShareAltOutlined } from '@ant-design/icons';

function ShareButton(props) {
  const location = useLocation();

  const [info, setInfo] = useState('Copy resource link!');

  const copyLink = () => {
    const link = `https://nawc.now.sh${location.pathname}`;
    navigator.clipboard.writeText(link);
    setInfo('Resource link copied!');
  };

  return (
    <>
      <Popover content={info} Title="Error" trigger="click">
        <Button onClick={() => copyLink()}>
          <ShareAltOutlined />
          Share
        </Button>
      </Popover>
    </>
  );
}

export default ShareButton;
