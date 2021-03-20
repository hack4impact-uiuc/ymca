// @flow

import React from 'react';
import { Link } from 'react-router-dom/';
import { Button, Popover } from 'antd';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import { FormattedMessage } from 'react-intl';

import '../css/SaveButton.css';
import { useAuth } from '../utils/use-auth';

type SaveButtonProps = {
  isSaved: Boolean,
  fullButton: Boolean,
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

  const loginMessage = (
    <>
      <FormattedMessage
        id="logInSave"
        defaultMessage="{loginLink} to save resources!"
        values={{
          loginLink: (
            <Link to="/login">
              <FormattedMessage
                id="logInSaveLinkText"
                defaultMessage="Log in"
              />
            </Link>
          ),
        }}
      />
    </>
  );
  const savedMessage = (
    <FormattedMessage id="saveResource" defaultMessage="Save resource" />
  );
  const unsavedMessage = (
    <FormattedMessage id="unsaveResource" defaultMessage="Unsave resource" />
  );

  return (
    <>
      {!authed ? (
        <>
          {fullButton ? (
            <Popover content={loginMessage}>
              <Button className="save-button">
                <HeartOutlined />
                <FormattedMessage id="save" defaultMessage="Save" />
              </Button>
            </Popover>
          ) : (
            <button type="button" onClick={(e) => e.preventDefault()}>
              <Popover content={loginMessage}>
                <Button shape="circle" className="save-button">
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
                    className="save-button"
                    onClick={async () => {
                      await deleteResourceHandler();
                    }}
                  >
                    <HeartFilled />
                    <FormattedMessage id="save" defaultMessage="Save" />
                  </Button>
                </Popover>
              ) : (
                <button type="button" onClick={(e) => e.preventDefault()}>
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
                </button>
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
                    <FormattedMessage id="save" defaultMessage="Save" />
                  </Button>
                </Popover>
              ) : (
                <button type="button" onClick={(e) => e.preventDefault()}>
                  <Popover content={savedMessage}>
                    <Button
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
