// @flow

import React from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from 'antd';

function ShareButton(props) {
  const location = useLocation();

  const copyLink = () => {
    const link = `https://nawc.now.sh${location.pathname}`;
    navigator.clipboard.writeText(link);
    console.log('Link copied!');
  };

  return (
    <>
      <Button onClick={() => copyLink()}>Share</Button>
    </>
  );
}

export default ShareButton;
