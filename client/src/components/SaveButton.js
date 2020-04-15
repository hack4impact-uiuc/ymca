import React, { useState } from 'react';
import { Link } from 'react-router-dom/';
import PropTypes from 'prop-types';
import { Button, Icon, Modal } from 'antd';

function SaveButton(props) {
  const { authed, isSaved, deleteResourceHandler, saveResourceHandler } = props;

  const [saveError, setSaveError] = useState(false);

  return (
    <a onClick={e => e.preventDefault()}>
      <Modal
        title="Error"
        closable={false}
        cancelButtonProps={{ style: { display: 'none' } }}
        visible={saveError}
        onOk={() => setSaveError(false)}
      >
        You must be logged in to use this feature! Login{' '}
        <Link to="/login">here</Link>.
      </Modal>
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
            if (authed) {
              await saveResourceHandler();
            } else {
              setSaveError(true);
            }
          }}
          type="link"
        >
          <Icon type="star" style={{ fontSize: '16px', color: '#562996' }} />
        </Button>
      )}
    </a>
  );
}

SaveButton.propTypes = {
  authed: PropTypes.bool.isRequired,
  isSaved: PropTypes.bool.isRequired,
  deleteResourceHandler: PropTypes.func.isRequired,
  saveResourceHandler: PropTypes.func.isRequired,
};

export default SaveButton;
