import React from 'react';
import { Link } from 'react-router-dom/';
import PropTypes from 'prop-types';
import { Button, Icon, Popover } from 'antd';

function SaveButton(props) {
  const { authed, isSaved, deleteResourceHandler, saveResourceHandler } = props;

  const errorContent = (
    <>
      You must be logged in to use this feature! Login{' '}
      <Link to="/login">here</Link>.
    </>
  );

  return (
    <>
      {!authed ? (
        <Popover content={errorContent} Title="Error" trigger="click">
          <Button type="link">
            <Icon type="star" style={{ fontSize: '16px', color: '#562996' }} />
          </Button>
        </Popover>
      ) : (
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
              <Icon
                type="star"
                style={{ fontSize: '16px', color: '#562996' }}
              />
            </Button>
          )}
        </a>
      )}
    </>
  );
}

SaveButton.propTypes = {
  authed: PropTypes.bool.isRequired,
  isSaved: PropTypes.bool.isRequired,
  deleteResourceHandler: PropTypes.func.isRequired,
  saveResourceHandler: PropTypes.func.isRequired,
};

export default SaveButton;
