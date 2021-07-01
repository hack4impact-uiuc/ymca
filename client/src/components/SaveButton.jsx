// @flow

import React from 'react';
import { Button, Popover } from 'antd';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import { FormattedMessage } from 'react-intl';

import '../css/SaveButton.css';
import { useAuth } from '../utils/use-auth';
import {
  loginMessage,
  savedMessage,
  unsavedMessage,
} from '../utils/savedMessages';

type SaveButtonProps = {
  isSaved: boolean,
  fullButton: boolean,
  deleteResourceHandler: () => void,
  saveResourceHandler: () => void,
};

function SaveButton(props: SaveButtonProps) {
  const { authed } = useAuth();
  const {
    isSaved,
    fullButton,
    deleteResourceHandler,
    saveResourceHandler,
  } = props;

  return (
    <>
      {!authed ? (
        <>
          {fullButton ? (
            <Popover content={loginMessage}>
              <Button type="text" className="save-button">
                <HeartOutlined style={{ marginRight: 4 }} />
                <FormattedMessage id="save" defaultMessage="Save" />
              </Button>
            </Popover>
          ) : (
            <button type="button" onClick={(e) => e.preventDefault()}>
              <Popover content={loginMessage}>
                <Button type="text" shape="circle" className="save-button">
                  <HeartOutlined />
                </Button>
              </Popover>
            </button>
          )}
        </>
      ) : (
        <>
          {isSaved ? (
            <>
              {fullButton ? (
                <Popover content={unsavedMessage}>
                  <Button
                    type="text"
                    className="save-button"
                    onClick={async () => {
                      await deleteResourceHandler();
                    }}
                  >
                    <HeartFilled style={{ marginRight: 4 }} />
                    <FormattedMessage id="save" defaultMessage="Save" />
                  </Button>
                </Popover>
              ) : (
                <button type="button" onClick={(e) => e.preventDefault()}>
                  <Popover content={unsavedMessage}>
                    <Button
                      type="text"
                      className="save-button"
                      shape="circle"
                      onClick={async () => {
                        await deleteResourceHandler();
                      }}
                    >
                      <HeartFilled />
                    </Button>
                  </Popover>
                </button>
              )}
            </>
          ) : (
            <>
              {fullButton ? (
                <Popover content={savedMessage}>
                  <Button
                    type="text"
                    className="save-button"
                    onClick={async () => {
                      await saveResourceHandler();
                    }}
                  >
                    <HeartOutlined style={{ marginRight: 4 }} />
                    <FormattedMessage id="save" defaultMessage="Save" />
                  </Button>
                </Popover>
              ) : (
                <button type="button" onClick={(e) => e.preventDefault()}>
                  <Popover content={savedMessage}>
                    <Button
                      type="text"
                      className="save-button"
                      shape="circle"
                      onClick={async () => {
                        await saveResourceHandler();
                      }}
                    >
                      <HeartOutlined />
                    </Button>
                  </Popover>
                </button>
              )}
            </>
          )}
        </>
      )}
    </>
  );
}

export default SaveButton;
