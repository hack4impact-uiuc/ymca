// @flow
import React from 'react';
import { message, Button, Tooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { reportTranslationError } from '../utils/api';

import '../css/TranslationPopup.css';

type Props = {
  id: string,
  type: string,
  isMobile: boolean,
};

function TranslationPopup(props: Props) {
  const { id, type, isMobile } = props;

  const reportError = async () => {
    const language = localStorage.getItem('language') || 'English';
    const report = await reportTranslationError(id, language, type);
    if (report?.success) {
      message.success('Thank you for your feedback!');
    } else {
      message.error('There was a problem submitting a report.');
    }
  };

  return (
    <Tooltip
      color="white"
      placement={isMobile ? 'top' : 'right'}
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
