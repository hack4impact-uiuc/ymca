// @flow

import React from 'react';
import { Link } from 'react-router-dom/';
import { Button, Popover } from 'antd';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';

import '../css/SaveButton.css';

type SaveButtonProps = {
  authed: Boolean,
  isSaved: Boolean,
  fullButton: Boolean,
  deleteResourceHandler: () => void,
  saveResourceHandler: () => void,
};

function SaveButton(props: SaveButtonProps) {
  const {
    authed,
    isSaved,
    fullButton,
    deleteResourceHandler,
    saveResourceHandler,
  } = props;

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
        <>
          {fullButton ? (
            <Popover content={loginMessage}>
              <Button className="save-button">
                <HeartOutlined />
                Save
              </Button>
            </Popover>
          ) : (
            <a onClick={e => e.preventDefault()}>
              <Popover content={loginMessage}>
                <Button shape="circle" className="save-button">
                  <HeartOutlined />
                </Button>
              </Popover>
            </a>
          )}
        </>
      ) : (
        <>
          {isSaved ? (
            <>
              {fullButton ? (
                <Popover content={unsavedMessage}>
                  <Button
                    className="save-button"
                    onClick={async () => {
                      await deleteResourceHandler();
                    }}
                  >
                    <HeartFilled />
                    Save
                  </Button>
                </Popover>
              ) : (
                <a onClick={e => e.preventDefault()}>
                  <Popover content={unsavedMessage}>
                    <Button
                      className="save-button"
                      shape="circle"
                      onClick={async () => {
                        await deleteResourceHandler();
                      }}
                    >
                      <HeartFilled />
                    </Button>
                  </Popover>
                </a>
              )}
            </>
          ) : (
            <>
              {fullButton ? (
                <Popover content={savedMessage}>
                  <Button
                    className="save-button"
                    onClick={async () => {
                      await saveResourceHandler();
                    }}
                  >
                    <HeartOutlined />
                    Save
                  </Button>
                </Popover>
              ) : (
                <a onClick={e => e.preventDefault()}>
                  <Popover content={savedMessage}>
                    <Button
                      className="save-button"
                      shape="circle"
                      onClick={async () => {
                        await saveResourceHandler();
                      }}
                    >
                      <HeartFilled />
                    </Button>
                  </Popover>
                </a>
              )}
            </>
          )}
        </>
      )}
    </>
  );
}

export default SaveButton;
