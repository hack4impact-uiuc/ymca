// @flow
import React from 'react';
import { message, Button, Tooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

import '../css/TranslationPopup.css';

type Props = {
  id: number,
  type: string,
};

function TranslationPopup(props: Props) {
  const { id, type } = props;

  const reportError = () => {
    // TODO: call error report endpoint here
    // get language with localStorage.getItem('language') || 'English'
    message.success('Thank you for your feedback!');
  };

  return (
    <Tooltip
      color="white"
      placement="right"
      title={
        <div className="translation-popup-text">
          This page has automated translations.
          <br />
          <Button
            className="translation-popup-link"
            onClick={reportError}
            size="small"
            type="link"
          >
            Report an error?
          </Button>
        </div>
      }
    >
      <InfoCircleOutlined className="translation-popup-icon" />
    </Tooltip>
  );
}

export default TranslationPopup;
