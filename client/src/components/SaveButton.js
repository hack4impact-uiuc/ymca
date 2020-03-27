import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from 'antd';

function SaveButton(props) {
  const { authed, isSaved, deleteResourceHandler, saveResourceHandler } = props;

  return authed ? (
    <a onClick={e => e.preventDefault()}>
      {isSaved ? (
        <Button
          onClick={async () => {
            await deleteResourceHandler();
          }}
          type="link"
        >
          <Icon
            type="star"
            theme="filled"
            style={{ fontSize: '16px', color: '#562996' }}
          />
        </Button>
      ) : (
        <Button
          onClick={async () => {
            await saveResourceHandler();
          }}
          type="link"
        >
          <Icon type="star" style={{ fontSize: '16px', color: '#562996' }} />
        </Button>
      )}
    </a>
  ) : null;
}

SaveButton.propTypes = {
  authed: PropTypes.bool.isRequired,
  isSaved: PropTypes.bool.isRequired,
  deleteResourceHandler: PropTypes.func.isRequired,
  saveResourceHandler: PropTypes.func.isRequired,
};

export default SaveButton;
