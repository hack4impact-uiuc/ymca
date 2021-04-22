// @flow
import React from 'react';
import {
  CheckCircleTwoTone,
  ExclamationCircleTwoTone,
} from '@ant-design/icons';

import '../css/StatusTag.css';

type StatusTagProps = {
  status: 'Verified' | 'Unverified',
};

function StatusTag(props: StatusTagProps) {
  const { status } = props;

  switch (status) {
    case 'Verified':
      return (
        <div className="status-tag">
          <CheckCircleTwoTone twoToneColor="#52c41a" />{' '}
          <span className="verified-status-name">{status}</span>
        </div>
      );
    case 'Unverified':
      return (
        <div className="status-tag">
          <ExclamationCircleTwoTone twoToneColor="#ff9900" />
          <span className="unverified-status-name">{status}</span>
        </div>
      );
    default:
      return <div />;
  }
}

export default StatusTag;
