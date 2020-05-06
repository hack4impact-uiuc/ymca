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
  const savedMessage = <>Save resource</>;
  const unsavedMessage = <>Unsave resource</>;

  return (
    <>
      {!authed ? (
        <Popover content={loginMessage}>
          <Button>
            <HeartOutlined />
            Save
          </Button>
        </Popover>
      ) : (
        <>
          {isSaved ? (
            <Popover content={unsavedMessage}>
              <Button
                onClick={async () => {
                  await deleteResourceHandler();
                }}
              >
                <HeartFilled />
                Save
              </Button>
            </Popover>
          ) : (
            <Popover content={savedMessage}>
              <Button
                onClick={async () => {
                  await saveResourceHandler();
                }}
              >
                <HeartOutlined />
                Save
              </Button>
            </Popover>
          )}
        </>
      )}
    </>
  );
}

export default SaveButton;
