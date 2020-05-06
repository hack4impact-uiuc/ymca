// @flow

import React from 'react';
import { Link } from 'react-router-dom/';
import { Button, Icon, Popover } from 'antd';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import Search from 'antd/lib/input/Search';

// import '../css/SaveButton.css';

// TODO: Add an additional prop that is 'mode'. If prop.mode === 'icon' then
// return just the star icon like it is right now. Otherwise return full button
// that appears underneath the title
type SaveButtonProps = {
  className: String,
  type: String,
  fontSize: String,
  authed: Boolean,
  isSaved: Boolean,
  deleteResourceHandler: () => void,
  saveResourceHandler: () => void,
};

function SaveButton(props: SaveButtonProps) {
  const {
    authed,
    className,
    isSaved,
    deleteResourceHandler,
    saveResourceHandler,
  } = props;

  const type = props.type || 'star';
  const fontSize = props.fontSize || '2em';

  const btnClassName = ''.concat(
    `${type === 'heart' && 'heart-save-btn'}`,
    `${(type === 'star' && 'star-save-btn') || ''}`,
    `${(className && ` ${className}`) || ''}`,
  );

  const loginMessage = (
    <>
      <Link to="/login">Log in</Link> to save resources!
    </>
  );

  return (
    <>
      {!authed ? (
        <Popover content={loginMessage} Title="Error" trigger="click">
          <Button>
            <HeartOutlined />
            Save
          </Button>
        </Popover>
      ) : (
        <>
          {isSaved ? (
            <Button
              onClick={async () => {
                await deleteResourceHandler();
              }}
            >
              <HeartFilled />
              Save
            </Button>
          ) : (
            <Button
              onClick={async () => {
                await saveResourceHandler();
              }}
            >
              <HeartOutlined />
              Save
            </Button>
          )}
        </>
      )}
    </>
  );
}

export default SaveButton;
