// @flow

import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Tooltip } from 'antd';

function ShareButton(props) {
  const location = useLocation();

  const [tipText, setTipText] = useState('Copy resource link!');

  const copyLink = () => {
    const link = `https://nawc.now.sh${location.pathname}`;
    navigator.clipboard.writeText(link);
    setTipText('Resource link copied!');
  };

  return (
    <>
      <Tooltip title={tipText}>
        <Button onClick={() => copyLink()}>Share</Button>
      </Tooltip>
    </>
  );
}

export default ShareButton;
